import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  toHome = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ this.toHome }
      >
        Home
      </button>
    );
  }
}

export default Home;
