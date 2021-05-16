import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieCard.css';

class MovieCard extends React.Component {
  render() {
    const { movie: { id, title, imagePath, storyline } } = this.props;
    return (
      <div data-testid="movie-card" className="movie-card">
        <h2 className="title">{ title }</h2>
        <img className="image" src={ imagePath } alt={ title } width="100%" />
        <p className="storyline">{ storyline }</p>

        <nav>
          <Link className="link-details" to={ `movies/${id}` }>VER DETALHES</Link>
        </nav>

      </div>
    );
  }
}

MovieCard.propTypes = ({
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imagePath: PropTypes.string,
    storyline: PropTypes.string,
  }).isRequired,
});

export default MovieCard;
