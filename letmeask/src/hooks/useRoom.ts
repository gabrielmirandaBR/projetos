import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type QuestionType = {
  id: string,
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean,
}

type FirebaseQuestions = Record<string, { // Record no TS é para identificar um objeto
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean,
}>


export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(()=> {
    const roomRef = database.ref(`rooms/${roomId}`) // acessa a referencia do banco de dados para saber onde estão as perguntas
    
    roomRef.on('value', room => { //documentacao do firebase --> on é um event listener (em tempo real) que oberserva que qualquer informação mudar ele executará o código e substituir as info em tela
      const databaseRoom = room.val(); // pega as informações do banco de dados
      const fireBaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(fireBaseQuestions).map(([key, value]) => { // o firebase retorna um objeto e poir isso foi necessário criar um array com Object.entries
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
        }
      });

      setQuestions(parsedQuestions);
      setTitle(databaseRoom.title);
    });

  }, [roomId]);
  return {
    questions,
    title,
  }
}
