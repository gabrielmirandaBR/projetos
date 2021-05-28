import React, { Component } from "react";
import "./estilo.css";
class FormularioCadastro extends Component {
  constructor() {
    super();

    this.state={
      title:'',
      text: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }){
    this.setState({
      [name]: value,
    });

  }

  render() {
    const { title, text } = this.state;
    const { handleClick } = this.props
    return (
      <form className="form-cadastro ">
        <input
          name='title'
          type="text"
          placeholder="Título"
          className="form-cadastro_input"
          onChange={ this.handleChange }

        />
        <textarea
          name='text'
          rows={15}
          placeholder="Escreva sua nota..."
          className="form-cadastro_input"
          onChange={ this.handleChange }
        />
        <button type="button" className="form-cadastro_input form-cadastro_submit" onClick={ () => handleClick(title, text) }>
          Criar Nota
        </button>
      </form>
    );
  }
}

export default FormularioCadastro;
