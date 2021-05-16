import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import NewMovie from './pages/NewMovie';
import EditMovie from './pages/EditMovie';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <h1 className="main-title">Movie Card Library CRUD</h1>

        <Switch>
          <Route exact path="/" component={ MovieList } />
          <Route exact path="/movies/new" component={ NewMovie } />
          <Route
            exact
            path="/movies/:id/edit"
            render={ (props) => <EditMovie { ...props } /> }
          />
          <Route path="/movies/:id" render={ (props) => <MovieDetails { ...props } /> } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
