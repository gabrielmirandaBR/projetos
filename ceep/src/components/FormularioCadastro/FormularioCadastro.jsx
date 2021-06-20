import React, { Component } from "react";
import "./estilo.css";
class FormularioCadastro extends Component {
  constructor(props) {
    super(props);

    this.state={
      title:'',
      texto: '',
      categoria: props.categorias,
    };

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange({ target: { name, value } }){
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { titulo, texto, categoria } = this.state;
    const { criaTask, categorias } = this.props
    return (
      <form className="form-cadastro ">
        <select 
          className="form-cadastro_input"
          name="categoria"
          onChange={ this.handleChange }
        >
          <option value="Sem Categoria">Sem Categoria</option>
          {
            categorias.map((categoria) => 
            <option 
              key={ categoria } 
              value={ categoria }
            >
              { categoria }
            </option>)
          }
        </select>
        <input
          name='titulo'
          type="text"
          placeholder="Título"
          className="form-cadastro_input"
          onChange={ this.handleChange }
        />
        <textarea
          name='texto'
          rows={15}
          placeholder="Escreva sua nota..."
          className="form-cadastro_input"
          onChange={ this.handleChange }
        />
        <button type="button" 
          className="form-cadastro_input form-cadastro_submit" 
          onClick={ () => criaTask(titulo, texto, categoria) }
        >
          Criar Nota
        </button>
      </form>
    );
  };
};

export default FormularioCadastro;
