import React, { Component } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import RegistrationForm from './components/RegistrationForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegistrationForm />
        <NoteList />
      </div>
    );
  }
}

export default App;
