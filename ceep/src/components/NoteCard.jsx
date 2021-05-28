import React, { Component } from 'react';

class NoteCard extends Component {
  render() {
    return (
      <section className='card-section'>
        <header className='header-content'>
          <h3 className='header-title'>Título</h3>
        </header>
        <p>Escreva sua nota</p>
      </section>
    );
  }
}

export default NoteCard;