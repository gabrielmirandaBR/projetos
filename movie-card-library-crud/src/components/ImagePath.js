import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImagePath extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div className="row">
        <label htmlFor="movie_image">
          <input
            placeholder="Insira o caminho da imagem"
            id="movie_image"
            type="text"
            value={ value }
            onChange={ onChange }
          />
          Imagem
        </label>
      </div>
    );
  }
}

ImagePath.propTypes = ({
  value: PropTypes.string,
  onChage: PropTypes.func,
}).isRequired;

export default ImagePath;
