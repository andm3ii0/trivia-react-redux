import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import PlayAgain from '../components/PlayAgain';
import BtnRanking from '../components/BtnRanking';
import Score from '../components/Score';
import image0 from '../images/feedback0.gif';
import image1 from '../images/couldBeBetter.gif';
import image2 from '../images/win3.gif';
import image3 from '../images/win4.gif';
import image4 from '../images/superWin.gif';
import './feedback.css';

class Feedback extends React.Component {
  render() {
    const { assertions, history } = this.props;
    const condition = 3;
    const message = (assertions >= condition ? 'Well Done!' : 'Could be better...');
    const imagesFeedback = [image0, image1, image1, image2, image3, image4];
    console.log(imagesFeedback);
    console.log(assertions);
    return (
      <div className="feedback-content">
        <Header />
        <div className="feedback-card">
          <h3 className="feedback-text" data-testid="feedback-text">{message}</h3>
          <img
            className="feedback-image"
            src={ imagesFeedback[assertions] }
            alt="Feedback"
          />
          <Score />
          <div className="buttons">
            <PlayAgain />
            <BtnRanking history={ history } />
          </div>
        </div>
      </div>
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
