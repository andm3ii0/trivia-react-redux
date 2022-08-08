import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const condition = 3;
    const message = (assertions > condition ? 'Well Done!' : 'Could be better...');

    return (
      <>
        <Header />
        <h3 data-testid="feedback-text">{message}</h3>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.loginReducer.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
