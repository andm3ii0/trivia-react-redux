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
    const { requestState, questions, requestAPI, randomArray } = this.props;
    const { currentQuestion } = this.state;
    const questionData = questions[currentQuestion];
    const requestFailed = 3;
    const ultimaPergunta = 5;
    if (requestState === requestFailed) {
      return <Redirect to="/" />;
    }
    if (currentQuestion === ultimaPergunta) {
      const { name, email, score } = this.props;
      console.log(localStorage.getItem('ranking'));
      if (localStorage.getItem('ranking') === null) {
        console.log(localStorage.getItem('ranking'));
        localStorage.setItem('ranking', JSON.stringify([{ email, score, name }]));
      } else {
        const prevStorage = JSON.parse(localStorage.getItem('ranking'));
        localStorage.setItem('ranking',
          JSON.stringify([...prevStorage, { email, score, name }]));
      }

      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        <Header />
        {!requestAPI && <Question
          category={ questionData.category }
          question={ questionData.question }
          randomArray={ randomArray[currentQuestion] }
          correctAnswer={ questionData.correct_answer }
          incorrectAnswers={ questionData.incorrect_answers }
          difficulty={ questionData.difficulty }
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

  name: store.loginReducer.name,
  email: store.loginReducer.gravatarEmail,
  score: store.player.score,
  randomArray: store.player.randomArray,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: (endPoint) => dispatch(requestQuestions(endPoint)),
});

Game.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  requestState: PropTypes.oneOfType([PropTypes.number]),
  questions: PropTypes.arrayOf(PropTypes.object),
  requestAPI: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  randomArray: PropTypes.arrayOf(PropTypes.string),
};

Game.defaultProps = {
  requestState: 0,
  questions: [],
  randomArray: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
