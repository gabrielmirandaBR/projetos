import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImage from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


export function Home() {
  const history = useHistory(); //hook utilizado para acessar as informações de navegação https://reactrouter.com/web/api/Hooks/usehistory
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  
  async function handleCreateRoom() {
    if(!user) { // se não estiver salvo abre o pop-up para entrar e se usuário já estiver logado nao faz a requisição novamente
      await signInWithGoogle();
    }

    history.push('/rooms/new'); // redireciona para a pagina /rooms/new
  };

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${ roomCode }`).get() //acessa o banco de dados do firebase e busca todos os registros com get

    if(!roomRef.exists()) { // se nao existir o id da sala
      alert('Room does not exists.');
      return;
    }

    if(roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${ roomCode }`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={ illustrationImg } alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={ logoImg } alt="Letmeask"  />
          <button onClick={ handleCreateRoom } className="create-room">
            <img src={ googleIconImage } alt="Logo do Google" />
            Crie sua sala com Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={ handleJoinRoom }>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}