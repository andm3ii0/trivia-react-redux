import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Score extends React.Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div className="score">
        <p>
          Placar final:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </p>
        <p>
          Acertos:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
        </p>

      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  score: store.player.score,
  assertions: store.player.assertions,
});

Score.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Score);
