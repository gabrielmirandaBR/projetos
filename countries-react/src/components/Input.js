import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
  render() {
    const { value, handleOnchange } = this.props
    return (
      <div className='input-container'>
        <label className='label-text'>
          { `Digite o nome do país: `}
          <input 
            type="text"
            name="value"
            className="input"
            value={ value }
            placeholder="Brasil"
            onChange={ handleOnchange }
          />
        </label>
      </div>
    );
  }
}

export default Input;
