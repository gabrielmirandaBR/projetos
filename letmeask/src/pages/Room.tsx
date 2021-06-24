import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Question } from '../components/Qustion';

import '../styles/room.scss';
import { useRoom } from '../hooks/useRoom';


type RoomParams = {
  id: string;
}

export function Room() {
  const params = useParams<RoomParams>(); // <> é um generic do TypeScript para que a função saiba qual tipo de parâmetro irá receber
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const { user } = useAuth();
  const { questions, title } = useRoom(roomId)

  async function handleSendQuestion(event: FormEvent) { // função responsável por enviar uma pergunta
    event.preventDefault();

    if(newQuestion.trim() === '') { // se não houver nada escrio na pergunta retorna
      return;
    }

    if(!user) { // se o usuário nao estiver logado retorna erro
      throw new Error ('You must be logged in');
    }

    const question = { // cria um objeto com as informações para cada pergunta
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false, // check feito pelo admin para saber se a pergunta está sendo respondida
      isAnswered: false, // se a pergunta já foi respondida ou nao
    };

    await database.ref(`rooms/${roomId}/questions`).push(question); //  acessa a sala com seu id(conf do banco de dados) e salva uma lista(por isso do push) informação chamada questions com a question criada no state 
    
    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={ logoImg } alt="Letmeask" />
          <RoomCode code={ roomId } />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={ handleSendQuestion }>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value = { newQuestion }
          />

          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={ user.avatar } alt={ user.name } />
                <span>{ user.name }</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            ) }
            <Button type="submit" disabled={ !user }>Enviar pergunta</Button>
          </div>
        </form>
        
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question 
                content={ question.content } 
                author={ question.author }
                key={ question.id }
              />
            )
          })}
        </div>
      </main>
    </div>
  );
}