type ButtonProps = {
  text: string; // para setar como opcional: text? : string || children acessa o conteúdo de uma tag
}

export function Button(props: ButtonProps) {
  return (
    <button>{props.text}</button> // caso seja opcional: {props.text || 'Default'}
  )
}