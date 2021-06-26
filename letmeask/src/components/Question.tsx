import { ReactNode } from 'react';
import '../styles/question.scss';
import cx from 'classnames';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode; // qualquer conteúdo JSX (textos, divs, componentes...)
  isAnswered?: boolean;
  isHighLighted?: boolean;
}


export function Question({
  content, 
  author, 
  children, 
  isHighLighted = false, 
  isAnswered = false,
}: QuestionProps) {

  return (
    <div 
      className={cx(  // `question ${isAnswered ? 'answered' : ''} ${isHighLighted ? 'highlighted' : ''}`
        'question',
        { answered: isAnswered },
        { highlighted: isHighLighted && !isAnswered },
      )}
    >
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