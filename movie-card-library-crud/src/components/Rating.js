import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Rating extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label htmlFor="movie_rating">
          <input
            placeholder="Dê a avaliação do filme"
            id="movie_rating"
            type="number"
            step={ 0.1 }
            min={ 0 }
            max={ 5 }
            value={ value }
            onChange={ onChange }
          />
          Avaliação
        </label>
      </div>
    );
  }
}

Rating.propTypes = ({
  value: PropTypes.string,
  onChage: PropTypes.func,
}).isRequired;

export default Rating;
