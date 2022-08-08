import React from 'react';
import PropTypes from 'prop-types';
import './question.css';

class Question extends React.Component {
  state = {
    avaliable: false,
  }

  onHandleClick = () => {
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
      randomArray,
      category,
      correctAnswer,
      question } = this.props;
    const { avaliable } = this.state;
    console.log(randomArray);
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {randomArray
            .map((answer, index) => (
              <button
                onClick={ this.onHandleClick }
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

Question.propTypes = {
  category: PropTypes.string,
  correctAnswer: PropTypes.string,
  question: PropTypes.string,
  nextQuestion: PropTypes.func.isRequired,
  randomArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Question.defaultProps = {
  category: '',
  correctAnswer: '',
  question: '',
};

export default Question;
