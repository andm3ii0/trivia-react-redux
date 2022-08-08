import React from 'react';
import md5 from 'crypto-js/md5';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    this.setState({ ranking: JSON.parse(localStorage.getItem('ranking')) });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <ol>
          { ranking.map((item, index) => (
            <li key={ index }>
              <img src={ `https://www.gravatar.com/avatar/${md5(item.email).toString()}` } alt={ item.name } />
              <p data-testid={ `player-name-${index}` }>{item.name}</p>
              <p data-testid={ `player-score-${index}` }>{item.score}</p>
            </li>
          )) }
        </ol>
      </div>
    );
  }
}

export default Ranking;
