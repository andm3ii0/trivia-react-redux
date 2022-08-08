import React from 'react';
import PropTypes from 'prop-types';
import './question.css';
import { connect } from 'react-redux';
import { addPointsAction } from '../redux/actions';

class Question extends React.Component {
  state = {
    avaliable: false,
    difficultyPoints: [{ level: 'hard', value: 3 }, { level: 'medium', value: 2 },
      { level: 'easy', value: 1 }],
  }

  onHandleClick = (answer, correctAnswer, difficulty) => {
    const { difficultyPoints, timer } = this.state;
    const { dispatch, score } = this.props;
    const isCorrect = (answer === correctAnswer);
    const points = difficultyPoints.find((item) => item.level === difficulty);
    if (isCorrect) {
      const number = 10;
      const totalPoints = score + (number + (timer * points.value));
      dispatch(addPointsAction(totalPoints));
    }
    this.setState({ avaliable: true,
    });
  }

  newQuestion = () => {
    const { nextQuestion } = this.props;
    this.setState({ avaliable: false });
    nextQuestion();
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
  }

  render() {
    const {
      category,
      correctAnswer,
      question,
      incorrectAnswers, difficulty } = this.props;
    const { avaliable } = this.state;
    const randomNumber = 0.5;
    const randomArray = [...incorrectAnswers, correctAnswer]
      .sort(() => Math.random() - randomNumber);
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {randomArray
            .map((answer, index) => (
              <button
                // className="button-answer"
                onClick={ () => {
                  this.onHandleClick(answer, correctAnswer, difficulty);
                } }
                disabled={ avaliable }
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

Question.propTypes = {
  category: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string),
  question: PropTypes.string,
  difficulty: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,

  nextQuestion: PropTypes.func.isRequired,
};

Question.defaultProps = {
  category: '',
  correctAnswer: '',
  incorrectAnswers: [],
  question: '',
  difficulty: '',
};

export default connect(mapStateToProps)(Question);
