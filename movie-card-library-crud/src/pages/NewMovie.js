import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRedirect: false,
      isLoading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(newMovie) {
    this.setState({
      isLoading: true,
    },
    async () => {
      await movieAPI.createMovie(newMovie);
      this.setState({
        isLoading: false,
        shouldRedirect: true,
      });
    });
  }

  render() {
    const { shouldRedirect, isLoading } = this.state;

    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <div data-testid="new-movie">
        {
          isLoading ? <Loading /> : <MovieForm onSubmit={ this.handleSubmit } />
        }
      </div>
    );
  }
}
export default NewMovie;
