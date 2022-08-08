import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { requestQuestions } from '../redux/actions';
import Question from '../components/Question';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    currentQuestion: 0,
  }

  componentDidMount = () => {
    const { fetchAPI } = this.props;
    fetchAPI(`https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`);
  }

  nextQuestion = () => {
    this.setState((prevState) => ({ currentQuestion: prevState.currentQuestion + 1 }));
  }

  render() {
    const { requestState, questions, requestAPI } = this.props;
    const { currentQuestion } = this.state;
    const questionData = questions[currentQuestion];
    const requestFailed = 3;
    if (requestState === requestFailed) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header />
        {!requestAPI && <Question
          category={ questionData.category }
          question={ questionData.question }
          correctAnswer={ questionData.correct_answer }
          incorrectAnswers={ questionData.incorrect_answers }
          nextQuestion={ this.nextQuestion }
        />}
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  requestState: store.player.requestState,
  questions: store.player.questions,
  requestAPI: store.player.requestAPI,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: (endPoint) => dispatch(requestQuestions(endPoint)),
});

Game.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  requestState: PropTypes.oneOfType([PropTypes.number]),
  questions: PropTypes.arrayOf(PropTypes.object),
  requestAPI: PropTypes.bool.isRequired,
};

Game.defaultProps = {
  requestState: 0,
  questions: [],
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
