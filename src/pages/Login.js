import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import fetchToken from '../components/fetchToken';

class Login extends React.Component {
    state = {
      email: '',
      name: '',
      disabled: true,
      redirect: false,
    }

    validEmail = (email) => /[a-z0-9.]+@[a-z0-9]+\.[a-z]/.test(email);

    setOnChange = ({ target: { name, value } }) => {
      this.setState({
        [name]: value,
      }, () => {
        const { email, name: validName } = this.state;
        if (this.validEmail(email) && validName.length >= 1) {
          this.setState({ disabled: false });
        } else {
          this.setState({ disabled: true });
        }
      });
    }

    toSettings = () => {
      this.setState({ redirect: true });
    }

    setOnclick = async () => {
      const { history } = this.props;
      const require = await fetchToken();
      const { token } = require;
      await localStorage.setItem('token', token);
      history.push('/game');
    }

    render() {
      const { name, email, disabled, redirect } = this.state;
      if (redirect) {
        return <Redirect to="/settings" />;
      }
      return (
        <div>
          <form>
            <label htmlFor="name">
              player name:
              <input
                name="name"
                value={ name }
                data-testid="input-player-name"
                type="text"
                id="name"
                onChange={ this.setOnChange }
              />
            </label>
            <label htmlFor="email">
              gravadar email:
              <input
                name="email"
                value={ email }
                data-testid="input-gravatar-email"
                type="email"
                id="email"
                onChange={ this.setOnChange }
              />
            </label>
            <button
              data-testid="btn-play"
              type="button"
              disabled={ disabled }
              onClick={ this.setOnclick }
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              type="button"
              onClick={ this.toSettings }
            >
              Settings
            </button>
          </form>
        </div>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
