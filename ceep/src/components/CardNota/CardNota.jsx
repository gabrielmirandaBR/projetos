import React, { Component } from "react";
import "./estilo.css";
class CardNota extends Component {
  render() {
    const { task } = this.props;
    return (
      <section className="card-nota">
        <header className="card-nota_cabecalho">
          <h3 className="card-nota_titulo">{ task.title }</h3>
        </header>
        <p className="card-nota_texto">{ task.text }</p>
      </section>
    );
  }
}

export default CardNota;
