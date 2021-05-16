import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      isLoading: false,
      shouldRedirect: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchMovie = this.fetchMovie.bind(this);
  }

  componentDidMount() {
    this.fetchMovie();
  }

  async handleSubmit(updatedMovie) {
    await movieAPI.updateMovie(updatedMovie);
    this.setState({
      shouldRedirect: true,
    });
  }

  async fetchMovie() {
    this.setState({
      isLoading: true,
    },
    async () => {
      const { match: { params: { id } } } = this.props;
      const requestMovie = await movieAPI.getMovie(id);
      this.setState({
        isLoading: false,
        movie: requestMovie,
      });
    });
  }

  render() {
    const { isLoading, shouldRedirect, movie } = this.state;

    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <div data-testid="edit-movie">
        { isLoading ? <Loading />
          : <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />}
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default EditMovie;
