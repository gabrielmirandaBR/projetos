import React, { Component } from "react";
import "./estilo.css";
import { ReactComponent as DeleteSVG } from "../../assets/img/delete.svg";

class CardNota extends Component {
  render() {
    const { task, removeTask, index } = this.props;
    return (
      <section className="card-nota">
        <header className="card-nota_cabecalho">
          <h3 className="card-nota_titulo">{ task.titulo }</h3>
          <DeleteSVG onClick={ () => removeTask(index) }/>
          <h4>{task.categoria}</h4>
        </header>
        <p className="card-nota_texto">{ task.texto }</p>
      </section>
    );
  };
};

export default CardNota;
