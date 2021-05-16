import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MovieDetails.css';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      movieDetails: {},
    };

    this.fetchMovieDetails = this.fetchMovieDetails.bind(this);
    this.fetchDeleteMovie = this.fetchDeleteMovie.bind(this);
  }

  componentDidMount() {
    this.fetchMovieDetails();
  }

  fetchMovieDetails() {
    this.setState({
      isLoading: true,
    },
    async () => {
      const { match: { params: { id } } } = this.props;
      const requestMovieDetails = await movieAPI.getMovie(id);
      this.setState({
        isLoading: false,
        movieDetails: requestMovieDetails,
      });
    });
  }

  async fetchDeleteMovie() {
    const { match: { params: { id } } } = this.props;
    await movieAPI.deleteMovie(id);
  }

  render() {
    const { isLoading, movieDetails:
      {
        id,
        title,
        storyline,
        imagePath,
        genre,
        rating,
        subtitle,
      } } = this.state;

    return (
      <div className="movie-container">
        <div data-testid="movie-details" className="movie-details">
          {
            isLoading ? <Loading /> : (
              <>
                <h2 className="title">{title}</h2>
                <img className="image" alt="Movie Cover" src={ `../${imagePath}` } />
                <p className="subtitle">{ `Subtitle: ${subtitle}` }</p>
                <p className="storyline">{ `Storyline: ${storyline}` }</p>
                <p className="genre">{ `Genre: ${genre}` }</p>
                <p className="rating">{ `Rating: ${rating}` }</p>
              </>
            )
          }
        </div>
        {
          !isLoading
          && (
            <nav className="links-container">
              <Link className="link-edit" to={ `/movies/${id}/edit` }>EDITAR</Link>
              <Link className="link-back" to="/">VOLTAR</Link>
              <Link
                className="link-delete"
                to="/"
                onClick={ this.fetchDeleteMovie }
              >
                DELETAR
              </Link>
            </nav>
          )
        }
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;
