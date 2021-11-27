import React, { Component } from 'react';
import './estilo.css';

class ListaDeCategorias extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  };
  
  handleChange(event) {
    const { novaCategoria } = this.props;
    const value = event.target.value;

    if (event.key === 'Enter') {
      novaCategoria(value);
    };
  };

  render() {
    const { categorias } = this.props;
    return (
      <section className="lista-categorias">
        <ul className="lista-categorias_lista">
          {
            categorias.map((categoria, index) => 
              <li 
                key={ index } 
                className="lista-categorias_item"
              >
                { categoria }
              </li>)
          }
        </ul>
        <input 
          type="text" 
          onKeyUp={ this.handleChange } 
          className="lista-categorias_input" 
          placeholder="Adicionar Categoria"
        />
      </section>
    );
  };
};

export default ListaDeCategorias;