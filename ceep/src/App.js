import React, { Component } from "react";
import ListaDeNotas from "./components/ListaDeNotas";
import FormularioCadastro from "./components/FormularioCadastro";
import ListaDeCategorias from './components/ListaDeCategorias/ListaDeCategorias';
import "./assets/App.css";
import './assets/index.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
      categorias: [],
    }

    this.criaTask = this.criaTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.adicionaCategoria = this.adicionaCategoria.bind(this);
  }

  criaTask(titulo, texto, categoria) {
    this.setState(({ tasks }) => ({
      tasks: [...tasks, { texto, titulo, categoria }]
    }));
  }

  removeTask(index){
    const { tasks } = this.state;
    const newTasks = tasks;
    newTasks.splice(index, 1);
    this.setState({
      tasks: newTasks,
    });
  }

  adicionaCategoria(categoria){
    const { categorias } = this.state;

    this.setState({
      categorias: [...categorias, categoria],
    });
  }

  render() {
    const { tasks, categorias } = this.state
    return (
      <section className="conteudo">
        <FormularioCadastro criaTask={ this.criaTask } categorias={ categorias }/>
        <main className="listas">
          <ListaDeCategorias novaCategoria={ this.adicionaCategoria } categorias={ categorias }/>
          <ListaDeNotas tasks={ tasks } removeTask={ this.removeTask }/>
        </main>
      </section>
    );
  }
}

export default App;
