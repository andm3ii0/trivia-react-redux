import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import Ranking from '../pages/Ranking';
// import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

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
    const rankingFirst = screen.getByTestId('player-score-0');
    const rankingSecond = screen.getByTestId('player-score-1');
    expect(rankingTitle).toBeInTheDocument();
    expect(rankingFirst).toBeInTheDocument();
    expect(rankingSecond).toBeInTheDocument();
  });
});
