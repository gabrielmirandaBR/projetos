import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Genre extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label htmlFor="movie_genre">
          Gênero
          <select
            id="movie_genre"
            value={ value }
            onChange={ onChange }
          >
            <option value="action">Ação</option>
            <option value="comedy">Comédia</option>
            <option value="thriller">Suspense</option>
            <option value="fantasy">Fantasia</option>
          </select>
        </label>
      </div>
    );
  }
}

Genre.propTypes = ({
  value: PropTypes.string,
  onChange: PropTypes.func,
}).isRequired;

export default Genre;
