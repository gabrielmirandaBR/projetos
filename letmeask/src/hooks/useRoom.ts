import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likeCount: number;
  likedId: string | undefined;
}

type FirebaseQuestions = Record<string, { // Record no TS é para identificar um objeto
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likes: Record<string, { // é um objeto Record que recebe uma string(id) e outra chave que é o authorId
    authorId: string;
  }>;
}>

export function useRoom(roomId: string) {
  const { user } = useAuth();
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
          likeCount: Object.values(value.likes ?? {}).length,
          likedId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0], // esse último ? verifica se naão retornar nada ele irá retornar nulo
        }
      });

      setQuestions(parsedQuestions);
      setTitle(databaseRoom.title);
    });

    return () => {
      roomRef.off('value') // função do firebase que remove todos os eventListener que tem 'value'
    }

  }, [roomId, user?.id]);
  return {
    questions,
    title,
  }
}
