import { screen } from '@testing-library/dom';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Question from '../components/Question';
import Game from '../pages/Game';
import { storeError, storeLogin, storePlayer } from './helpers/mockStore';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Game page', () => {
  it('should have a header', () => {
    const initialState = storeLogin;
    renderWithRouterAndRedux(<Game />, initialState, ['/game']);
    const name = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');
    const img = screen.getByTestId('header-profile-picture');
    expect(name.innerHTML).toBe('Person Name');
    expect(score.innerHTML).toBe('0');
    expect(img).toHaveAttribute('alt', 'Profile of: Person Name');
  });
  it('should have specific components in the question', () => {
    const { player } = storePlayer;
    const { randomArray, questions } = player;
    renderWithRouterAndRedux(
      <Question
        category={ questions[0].category }
        question={ questions[0].question }
        randomArray={ randomArray[0] }
        correctAnswer={ questions[0].correct_answer }
        incorrectAnswers={ questions[0].incorrect_answers }
        difficulty={ questions[0].difficulty }
        nextQuestion={ questions[1] }
      />,
    );
    const category = screen.getByTestId('question-category');
    const question = screen.getByTestId('question-text');
    const answer1 = screen.getByTestId('wrong-answer-0');
    const answer2 = screen.getByTestId('wrong-answer-1');
    const answer3 = screen.getByTestId('wrong-answer-3');
    const answerCorrect = screen.getByTestId('correct-answer');
    expect(category.innerHTML).toBe('Geography');
    expect(question.innerHTML).toBe(
      'Which European city has the highest mileage of canals in the world?',
    );
    expect(answer1.innerHTML).toBe('Amsterdam');
    expect(answer2.innerHTML).toBe('Venice');
    expect(answer3.innerHTML).toBe('Berlin');
    expect(answerCorrect.innerHTML).toBe('Birmingham');
    userEvent.click(answerCorrect);
    const button = screen.getByTestId('btn-next');
    expect(button).toBeInTheDocument();
    expect(answer1).toBeDisabled();
    expect(answer2).toBeDisabled();
    expect(answer3).toBeDisabled();
    expect(answerCorrect).toBeDisabled();
    expect(button).not.toBeDisabled();
  });
  it('should return to the Login page if the token is invalid.', () => {
    const initialState = storeError;
    const game = renderWithRouterAndRedux(<Game />, initialState);
    const { pathname } = game.history.location;
    expect(pathname).toBe('/');
  });
  it('should redirect to the Feedback page after the last question is answered.', () => {
    renderWithRouterAndRedux(<Game />);
  });
});
