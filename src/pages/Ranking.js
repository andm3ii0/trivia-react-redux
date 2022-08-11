import React from 'react';
import md5 from 'crypto-js/md5';
import Home from '../components/Home';
import './ranking.css';

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
      <div className="ranking">
        <p className="ranking-title" data-testid="ranking-title">Ranking</p>
        <ol className="ranking-list">
          { ranking.sort((a, b) => b.score - a.score).map((item, index) => (
            <li className="ranking-list-item" key={ index }>
              <div className="list-perfil">
                <img src={ `https://www.gravatar.com/avatar/${md5(item.email).toString()}` } alt={ item.name } />
                <p data-testid={ `player-name-${index}` }>{item.name}</p>
              </div>
              <p data-testid={ `player-score-${index}` }>
                {' '}
                Pontos:
                {' '}
                {item.score}
              </p>
            </li>
          )) }
        </ol>
        <Home />
      </div>
    );
  }
}

export default Ranking;
