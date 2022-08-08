import React from 'react';
import PropTypes from 'prop-types';
import './question.css';

class Question extends React.Component {
  state = {
    avaliable: false,
    timer: 30,
  };

      time = setInterval(() => {
        this.setState(({ timer }) => ({ timer: timer - 1 }));
      }, Number('1000'));

      componentDidMount() {
        return this.time;
      }

      componentDidUpdate(_, { timer }) {
        if (timer === 1) clearInterval(this.time);
      }

  onHandleClick = () => {
    this.setState({ avaliable: true }, () => {
      clearInterval(this.tempo);
    });
  };

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
  };

  render() {
    const { category, correctAnswer, question, incorrectAnswers } = this.props;
    console.log(category);
    const { avaliable, timer } = this.state;
    const randomNumber = 0.5;
    const randomArray = [...incorrectAnswers, correctAnswer].sort(
      () => Math.random() - randomNumber,
    );
    return (
      <div>
        <p>{timer}</p>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {randomArray.map((answer, index) => (
            <button
              // className="button-answer"
              onClick={ this.onHandleClick }
              disabled={ !!(avaliable || timer === 0) }
              className={ this.handleClassName(answer, correctAnswer) }
              key={ index }
              type="button"
              data-testid={
                answer === correctAnswer
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
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

Question.propTypes = {
  category: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string),
  question: PropTypes.string,
  nextQuestion: PropTypes.func.isRequired,
};

Question.defaultProps = {
  category: '',
  correctAnswer: '',
  incorrectAnswers: [],
  question: '',
};

export default Question;
