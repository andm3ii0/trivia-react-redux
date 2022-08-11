import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSettings } from '../redux/actions';
import './settings.css';

class Settings extends React.Component {
state = {
  diff: '',
  category: '',
  type: '',
}

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  onButtonClick = () => {
    const { setSettingsAction, closeSettings } = this.props;
    const { diff, category, type } = this.state;
    setSettingsAction({ diff, category, type });
    closeSettings();
  }

  render() {
    const { diff, type, category } = this.state;
    return (
      <div className="settings-card">
        <h2 data-testid="settings-title">Settings</h2>
        <div className="config-card">
          <label className="input-category" htmlFor="category">
            Category:
            {' '}
            <select
              name="category"
              value={ category }
              id="category"
              onChange={ this.onInputChange }
            >
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </select>
          </label>
          <label className="input-diff" htmlFor="diff">
            Difficult:
            {' '}
            <select id="diff" name="diff" value={ diff } onChange={ this.onInputChange }>
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label className="input-type" htmlFor="type">
            Type:
            {' '}
            <select name="type" value={ type } onChange={ this.onInputChange }>
              <option value="any">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.onButtonClick }
            className="button"
          >
            Aply
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSettingsAction: (state) => dispatch(setSettings(state)),
});

Settings.propTypes = {
  setSettingsAction: PropTypes.func.isRequired,
  closeSettings: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
