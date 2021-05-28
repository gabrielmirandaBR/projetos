import React, { Component } from "react";
import ListaDeNotas from "./components/ListaDeNotas";
import FormularioCadastro from "./components/FormularioCadastro";
import "./assets/App.css";
import './assets/index.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(title, text) {
    this.setState(({ tasks }) => ({
      tasks: [...tasks, { text, title }]
    }));
  }

  render() {
    const { tasks } = this.state
    return (
      <section className="conteudo">
        <FormularioCadastro handleClick={ this.handleClick }/>
        <ListaDeNotas tasks={ tasks }/>
      </section>
    );
  }
}

export default App;
