import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Subtitle extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label htmlFor="movie_subtitle">
          <input
            placeholder="Insira o subtítulo"
            id="movie_subtitle"
            type="text"
            value={ value }
            onChange={ onChange }
          />
          Subtítulo
        </label>
      </div>
    );
  }
}

Subtitle.propTypes = ({
  value: PropTypes.string,
  onChage: PropTypes.func,
}).isRequired;

export default Subtitle;
