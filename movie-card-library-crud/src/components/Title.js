import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label htmlFor="movie_title">
          <input
            placeholder="Insira o título"
            id="movie_title"
            type="text"
            className="validate"
            value={ value }
            onChange={ onChange }
          />
          Título
        </label>
      </div>
    );
  }
}

Title.propTypes = ({
  value: PropTypes.string,
  onChage: PropTypes.func,
}).isRequired;

export default Title;
