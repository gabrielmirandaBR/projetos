import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MovieList.css';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      movies: [],
    };

    this.fetchMovieList = this.fetchMovieList.bind(this);
  }

  componentDidMount() {
    this.fetchMovieList();
  }

  async fetchMovieList() {
    this.setState({
      isLoading: true,
    },
    async () => {
      const requestMovieList = await movieAPI.getMovies();

      this.setState({
        isLoading: false,
        movies: requestMovieList,
      });
    });
  }

  render() {
    const { movies, isLoading } = this.state;

    return (
      <div data-testid="movie-list" className="movies-container">

        {
          !isLoading
          && (
            <nav>
              <Link
                className="link-create-card"
                to="/movies/new"
              >
                ADICIONAR CARTÃO
              </Link>
            </nav>
          )
        }

        { isLoading ? <Loading /> : movies.map((movie) => (
          <MovieCard
            key={ movie.title }
            movie={ movie }
          />))}
      </div>
    );
  }
}

export default MovieList;
