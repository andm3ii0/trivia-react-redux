import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestQuestions } from '../redux/actions';

class Game extends React.Component {
  componentDidMount = () => {
    const { fetchAPI } = this.props;
    fetchAPI(`https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`);
  }

  render() {
    return (
      <div><p>pergunta</p></div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: (endPoint) => dispatch(requestQuestions(endPoint)),
});

Game.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
