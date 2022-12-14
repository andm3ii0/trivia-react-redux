import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addAssertions, requestQuestions } from '../redux/actions';
import Question from '../components/Question';
import Header from '../components/Header';
import './game.css';

class Game extends React.Component {
  state = {
    currentQuestion: 0,
    assertions: 0,
  }

  componentDidMount = () => {
    const { fetchAPI, type, category, diff } = this.props;
    const URL = (`https://opentdb.com/api.php?amount=5${diff !== 'any' ? `&difficulty=${diff}` : ''}${category !== 'any' ? `&category=${category}` : ''}${type !== 'any' ? `&type=${type}` : ''}&token=${localStorage.getItem('token')}`);
    fetchAPI(URL);
    console.log(URL);
  }

  nextQuestion = () => {
    this.setState((prevState) => ({ currentQuestion: prevState.currentQuestion + 1 }));
  }

  addAssertion = () => {
    this.setState((prevState) => ({ assertions: prevState.assertions + 1 }));
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
      const { name, email, score, addAssertionsAction } = this.props;
      const { assertions } = this.state;
      if (localStorage.getItem('ranking') === null) {
        localStorage.setItem('ranking', JSON.stringify([{ email, score, name }]));
      } else {
        const prevStorage = JSON.parse(localStorage.getItem('ranking'));
        localStorage.setItem('ranking',
          JSON.stringify([...prevStorage, { email, score, name }]));
      }
      addAssertionsAction(assertions);
      return <Redirect to="/feedback" />;
    }
    return (
      <div className="game-content">
        <Header />
        {!requestAPI
        && <Question
          category={ questionData.category }
          question={ questionData.question }
          randomArray={ randomArray[currentQuestion] }
          correctAnswer={ questionData.correct_answer }
          incorrectAnswers={ questionData.incorrect_answers }
          difficulty={ questionData.difficulty }
          nextQuestion={ this.nextQuestion }
          addAssertion={ this.addAssertion }
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

  type: store.player.type,
  diff: store.player.diff,
  category: store.player.category,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: (endPoint) => dispatch(requestQuestions(endPoint)),
  addAssertionsAction: (assertions) => dispatch(addAssertions(assertions)),
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
  addAssertionsAction: PropTypes.func.isRequired,
  type: PropTypes.string,
  diff: PropTypes.string,
  category: PropTypes.string,
};

Game.defaultProps = {
  requestState: 0,
  questions: [],
  randomArray: [],
  diff: 'any',
  category: 'any',
  type: 'any',
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
