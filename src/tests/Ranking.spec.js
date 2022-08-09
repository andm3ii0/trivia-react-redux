import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const object1 = {email: 'user@test.com', score: 134, name: 'UserTest'};
const object2 = {email: "test@user.com", score: 56, name: "TestUser"};
const ArrayObj = [object1, object2];
const ranking = JSON.stringify(ArrayObj);
const token = '27eaeac7e800109f379bd94dff4937e29b29147abf276e07727e91dec874d4af';

localStorage.setItem('token', token);
localStorage.setItem('ranking', ranking);

describe('Ranking page', () => {
  it('ranking to be on the screen', async () => {
    render(<Ranking />);
    const rankingTitle = screen.getByTestId('ranking-title');    
    expect(rankingTitle).toBeInTheDocument();
  });
  it('first place to be higher then second', async () => {
    render(<Ranking />);
    const rankingFirst = screen.getByTestId('player-score-0');
    const rankingSecond = screen.getByTestId('player-score-1');
    const first = JSON.parse(rankingFirst.innerHTML);
    const second = JSON.parse(rankingSecond.innerHTML);
    const higher = first > second;
    expect(rankingFirst).toBeInTheDocument();
    expect(rankingSecond).toBeInTheDocument();
    expect(higher).toBe(true);
  });
  it('to have a button to Home', async () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);
    const { pathname } = history.location;
    const button = screen.getByTestId('btn-go-home');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(pathname).toBe('/');
  });
});
