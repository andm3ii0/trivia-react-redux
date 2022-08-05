import React from 'react';

class Login extends React.Component {
    state = {
      email: '',
      name: '',
      disabled: true,
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

    render() {
      const { name, email, disabled } = this.state;
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
            >
              Play
            </button>
          </form>
        </div>
      );
    }
}

export default Login;
