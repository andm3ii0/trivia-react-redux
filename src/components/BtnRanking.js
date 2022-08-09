import React from 'react';
import PropTypes from 'prop-types';

class BtnRanking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ () => history.push('/ranking') }
      >
        Ranking
      </button>);
  }
}

BtnRanking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default BtnRanking;
