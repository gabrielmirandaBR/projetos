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
    if(!user) { // se o usuário não estiver salvo(useEffect com [], garante que users existirá antes do componente ser renderizado), isso evita novas requisições desnecessárias, caso já tiver o user
      await signInWithGoogle();
    }

    history.push('/rooms/new'); // redireciona para a pagina /rooms/new
  };

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') { // se o valor do input estiver em branco faz um retorno, ou seja, não acontece nada.
      return;
    }

    const roomRef = await database.ref(`rooms/${ roomCode }`).get() //acessa o banco de dados do firebase e pega o id com a funcao get. Tal id é armazenado como o estado do componente(valor do input)

    if(!roomRef.exists()) { // funcao firebasse se nao existir o id da sala retorna um alert
      alert('Room does not exists.');
      return;
    }

    if(roomRef.val().endedAt) { // funcao do firebase que retorna true caso haja a chave endedAt
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${ roomCode }`) // depois de realizar as verificações, o usuário é redirecionado para a página Room, pegando o valor do estado roomCode(que é o id do bando de dados) e acrescetando na rota
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
              onChange={ event => setRoomCode(event.target.value) }
              value={ roomCode }
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
