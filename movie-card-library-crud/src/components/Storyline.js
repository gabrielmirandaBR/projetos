import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Storyline extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label htmlFor="movie_storyline">
          <textarea
            id="movie_storyline"
            value={ value }
            onChange={ onChange }
          />
          Sinopse
        </label>
      </div>
    );
  }
}

Storyline.propTypes = ({
  value: PropTypes.string,
  onChage: PropTypes.func,
}).isRequired;

export default Storyline;
