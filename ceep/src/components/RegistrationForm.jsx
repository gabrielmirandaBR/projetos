import React, { Component } from 'react';

class RegistrationForm extends Component {
  render() {
    return (
      <section>
        <form>
          <label> 
            {`Título da nota: `}
            <input type='text' placeholder='Escreva o título da nota'/>
          </label>

          <label>
            {`Descrição da nota: `}
            <textarea placeholder='Escreva sua nota...'/>
          </label>
          
          <button type='submit'>Criar Nota</button>
        </form>
      </section>
    );
  }
}

export default RegistrationForm;