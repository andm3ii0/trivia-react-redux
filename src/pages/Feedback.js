import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import PlayAgain from '../components/PlayAgain';
import BtnRanking from '../components/BtnRanking';

class Feedback extends React.Component {
  render() {
    const { assertions, history } = this.props;
    const condition = 3;
    const message = (assertions >= condition ? 'Well Done!' : 'Could be better...');

    return (
      <>
        <Header />
        <h3 data-testid="feedback-text">{message}</h3>
        <PlayAgain />
        <BtnRanking history={ history } />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.loginReducer.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
