import React from 'react';
import { Redirect } from 'react-router-dom';

class PlayAgain extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  playAgain = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <button
        className="button-play-again"
        type="button"
        data-testid="btn-play-again"
        onClick={ this.playAgain }
      >
        Play Again
      </button>
    );
  }
}

export default PlayAgain;
