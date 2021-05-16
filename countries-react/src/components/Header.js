import React, { Component } from 'react';
import './Header.css';


class Header extends Component {
  render() {
    return (
      <header className="header-container">
        <h1 className="title">Lista de países</h1>
      </header>
    );
  }
}

export default Header