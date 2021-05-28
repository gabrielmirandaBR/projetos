import React, { Component } from "react";
import CardNota from "../CardNota";
import "./estilo.css";
class ListaDeNotas extends Component {

  render() {
    const { tasks } = this.props;
    return (
      <ul className="lista-notas">
        {
          tasks.map((task, index) => {
            return (
              <li className="lista-notas_item" key={ index }>
                <CardNota task={ task }/>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default ListaDeNotas;
