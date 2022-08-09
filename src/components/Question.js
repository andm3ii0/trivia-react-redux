import React from 'react';
import PropTypes from 'prop-types';
import './question.css';
import { connect } from 'react-redux';
import { addPointsAction, countAssertions } from '../redux/actions';

class Question extends React.Component {
  state = {
    avaliable: false,
    timer: 30,
    time: () => {},
    difficultyPoints: [{ level: 'hard', value: 3 }, { level: 'medium', value: 2 },
      { level: 'easy', value: 1 }],
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(_, { timer }) {
    if (timer === 1) this.stopTimer();
  }

  startTimer = () => {
    this.setState(() => ({
      time: setInterval(() => {
        this.setState(({ timer }) => ({ timer: timer - 1 }));
      }, Number('1000')),
    }));
  }

  stopTimer = () => {
    const { time } = this.state;
    if (time) clearInterval(time);
    this.setState({ avaliable: true });
  }

  onHandleClick = (answer, correctAnswer, difficulty) => {
    const { difficultyPoints, timer, assertions } = this.state;
    const { dispatch, score } = this.props;
    const isCorrect = (answer === correctAnswer);
    const points = difficultyPoints.find((item) => item.level === difficulty);
    if (isCorrect) {
      const number = 10;
      const totalPoints = score + (number + (timer * points.value));
      dispatch(addPointsAction(totalPoints));
      dispatch(countAssertions(assertions));
    }
    this.stopTimer();
  }

  newQuestion = () => {
    const { nextQuestion } = this.props;
    this.setState({ avaliable: false, timer: 30 });
    nextQuestion();
    this.startTimer();
  }

  handleClassName = (answer, correctAnswer) => {
    const { avaliable } = this.state;
    if (avaliable) {
      if (answer === correctAnswer) {
        return 'correct-answer';
      }
      return 'wrong-answer';
    }
    return 'button-answer';
  };

  render() {
    const {
      randomArray,
      category,
      correctAnswer,
      question,
      difficulty } = this.props;
    const { avaliable, timer } = this.state;
    return (
      <div>
        <p>{timer}</p>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {randomArray
            .map((answer, index) => (
              <button
                onClick={ () => {
                  this.onHandleClick(answer, correctAnswer, difficulty);
                } }
                disabled={ !!(avaliable || timer === 0) }
                className={ this.handleClassName(answer, correctAnswer) }
                key={ index }
                type="button"
                data-testid={ answer === correctAnswer
                  ? 'correct-answer' : `wrong-answer-${index}` }
              >
                {answer}
              </button>
            ))}
        </div>
        { avaliable
          && (
            <button
              data-testid="btn-next"
              type="button"
              className="button-answer"
              onClick={ this.newQuestion }
            >
              Next
            </button>
          )}
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  score: store.player.score,
});

// const mapDispatchToProps = (dispatch) => ({
//   dispatchAssertions: (assertions) => dispatch(assertionsUp(assertions)),
// });

Question.propTypes = {
  category: PropTypes.string,
  correctAnswer: PropTypes.string,
  question: PropTypes.string,
  difficulty: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,

  nextQuestion: PropTypes.func.isRequired,
  randomArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Question.defaultProps = {
  category: '',
  correctAnswer: '',
  question: '',
  difficulty: '',
};

export default connect(mapStateToProps)(Question);
