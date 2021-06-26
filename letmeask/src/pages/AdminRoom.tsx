import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode'
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import { database } from '../services/firebase';


type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const params = useParams<RoomParams>(); // <> é um generic do TypeScript para que a função saiba qual tipo de parâmetro irá receber
  const roomId = params.id;
  const history = useHistory();

  // const { user } = useAuth();
  const { questions, title } = useRoom(roomId)

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({ // update altera os dados da sala
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
   if(window.confirm('Tem certeza que deseja excluir esta pergunta?')) { //  modal padrao do JS que retorna um booleano
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
   } 
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    })
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={ logoImg } alt="Letmeask" />
          <div>
            <RoomCode code={ roomId } />
            <Button isOutLined onClick={ handleEndRoom }>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
    
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
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={ checkImg } alt="Marcar pergunta como respondida" />
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={ answerImg } alt="Dar destaque à pergunta" />
                    </button>
                  </>
                  )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="remover pergunta" />
                </button>

              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
}