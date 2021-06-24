import { ReactNode } from 'react';
import '../styles/question.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string,
    avatar: string,
  }
  children?: ReactNode // qualquer conteúdo JSX (textos, divs, componentes...)
}


export function Question({content, author, children}: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.avatar} />
          <span>{author.name}</span>
        </div>
        <div>
          { children }
        </div>
      </footer>
    </div>
  )
}