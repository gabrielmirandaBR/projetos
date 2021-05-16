import React from 'react';
import PropTypes from 'prop-types';
import './MovieForm.css';
import Genre from './Genre';
import Title from './Title';
import Subtitle from './Subtitle';
import ImagePath from './ImagePath';
import Storyline from './Storyline';
import Rating from './Rating';

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.movie };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  updateMovie(field, newValue) {
    this.setState({ [field]: newValue });
  }

  renderTitleInput() {
    const { title } = this.state;

    return (
      <Title
        value={ title }
        onChange={ (event) => this.updateMovie('title', event.target.value) }
      />

    );
  }

  renderSubtitleInput() {
    const { subtitle } = this.state;

    return (
      <Subtitle
        value={ subtitle }
        onChange={ (event) => this.updateMovie('subtitle', event.target.value) }
      />
    );
  }

  renderImagePathInput() {
    const { imagePath } = this.state;

    return (
      <ImagePath
        value={ imagePath }
        onChange={ (event) => this.updateMovie('imagePath', event.target.value) }
      />
    );
  }

  renderStorylineInput() {
    const { storyline } = this.state;

    return (
      <Storyline
        value={ storyline }
        onChange={ (event) => this.updateMovie('storyline', event.target.value) }
      />
    );
  }

  renderGenreSelection() {
    const { genre } = this.state;
    return (
      <Genre
        value={ genre }
        onChange={ (event) => this.updateMovie('genre', event.target.value) }
      />

    );
  }

  renderRatingInput() {
    const { rating } = this.state;
    return (
      <Rating
        value={ rating }
        onChange={ (event) => this.updateMovie('rating', event.target.value) }
      />

    );
  }

  renderSubmitButton() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.handleSubmit }
        >
          Submit
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <form className="form-container">
          <div className="input">
            {this.renderTitleInput()}
          </div>
          <div className="input">
            {this.renderSubtitleInput()}
          </div>
          <div className="input">
            {this.renderImagePathInput()}
          </div>
          <div className="input">
            {this.renderStorylineInput()}
          </div>
          <div className="input">
            {this.renderGenreSelection()}
          </div>
          <div className="input">
            {this.renderRatingInput()}
          </div>
          <div className="input">
            {this.renderSubmitButton()}
          </div>
        </form>
      </div>
    );
  }
}

MovieForm.propTypes = ({
  movie: PropTypes.object,
  onSubmit: PropTypes.func,
}).isRequired;

export default MovieForm;
