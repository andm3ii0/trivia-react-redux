import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const player01 = {
    player: {
      name: 'Usuário 01',
      assertions: 4,
      score: 300,
      gravatarEmail: 'play01@test.com',
    }
  };
  
  const player02 = {
    player: {
      name: 'Usuário 02',
      assertions: 1,
      score: 50,
      gravatarEmail: 'play02@test.com',
    }
  };

const playerObj= [player01, player02];
const ranking = JSON.stringify(playerObj);

localStorage.setItem('ranking', ranking);

describe('Feedback Page', () => {
 
  it('Should render the header', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const image = screen.getByTestId('header-profile-picture');
    const name = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');

    expect(image).toBeDefined();
    expect(name).toBeDefined();
    expect(score).toBeDefined();
  })

  it('Should render a message, the score and the correct questions', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const message = screen.getByTestId('feedback-text');
    const score = screen.getByTestId('feedback-total-score');
    const correctQuestions = screen.getByTestId('feedback-total-question');

    expect(message).toBeDefined();
    expect(score).toBeDefined();
    expect(correctQuestions).toBeDefined();
  })


  it('Should render two buttons', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const btnPlayAgain = screen.getByRole('button', { name: /Play Again/i });
    const btnRanking = screen.getByRole('button', { name: /Ranking/i });

    expect(btnPlayAgain).toBeDefined();
    expect(btnRanking).toBeDefined();
  })


  it('Should go to the Login page when clicking the Play Again button', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const btnPlayAgain = screen.getByRole('button', { name: /Play Again/i });
    userEvent.click(btnPlayAgain);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeDefined();
  })

  it('Should go to the Ranking page when clicking the Ranking button', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const btnRanking = screen.getByRole('button', { name: /Ranking/i });
    userEvent.click(btnRanking);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/ranking');

    const rankingTitle = screen.getByTestId('ranking-title');
    expect(rankingTitle).toBeDefined();
  })

});