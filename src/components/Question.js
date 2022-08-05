import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { questionData: { category,
      correct_answer: correctAnswer,
      question,
      incorrect_answers: incorrectAnswers } } = this.props;
    console.log(category);
    const randomNumber = 0.5;
    const randomArray = [...incorrectAnswers, correctAnswer]
      .sort(() => Math.random() - randomNumber);
    return (
      <div>
        <p data-testid="question-category">{`${category}`}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {randomArray
            .map((answer, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ answer === correctAnswer
                  ? 'correct-answer' : `wrong-answer-${index}` }
              >
                {answer}
              </button>
            ))}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  questionData: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string }).isRequired,
};

export default Question;
