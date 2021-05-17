import React, { Component } from 'react';
import NoteCard from './NoteCard';

class NoteList extends Component {
  render() {
    return (
      <ul>
        <li>
          <div>
          </div>
          <NoteCard />
        </li>
      </ul>
    );
  } 
}

export default NoteList;