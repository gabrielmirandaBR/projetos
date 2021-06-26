import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Question } from '../components/Question';

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

    if(newQuestion.trim() === '') { // se não houver nada escrito na pergunta, retorna
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

  async function handleLikeQuestion(questionId: string, likedId: string | undefined) { // função que envia o authorId para dentro dessa rota(ref) do banco de dados 
    if(likedId) { // se já tiver com like e clicar novamente. irá remover
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likedId}`).remove();
    } else { // se nao tiver dado o like irá dar o like
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
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
                isAnswered= {question.isAnswered}
                isHighLighted= {question.isHighLighted}
              >
                {!question.isAnswered && (
                  <button
                    className={`like-button ${question.likedId ? 'liked': ''}`}
                    type="button"
                    aria-label="Marcar como gostei" // para botões sem texto é interessante essa propriedade de acessibilidade para saber o que o botão irá fazer
                    onClick={ () => handleLikeQuestion(question.id, question.likedId) } // como a unção recebe parâmetro então deve ser uma arrow function
                  > 
                    <span>{question.likeCount > 0 && question.likeCount}</span> 
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
}
