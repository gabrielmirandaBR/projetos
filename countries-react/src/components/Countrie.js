import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Countrie.css';

class Countrie extends Component {
  render() {
    const { countrie: { name, flag, translations: { br }} } = this.props;
    return (
      <ul className='list-countries'>
        <li> 
          <Link className='country-link' to={ `/countries/${ name }` }>
            <img 
              className='flag'
              src={ flag } 
              alt={ name } 
              width='50px'
            />
            <span 
              className='country-name'
            >
            { br }
            </span>
          </Link>
        </li>
      </ul>
    );
  }
}

export default Countrie;