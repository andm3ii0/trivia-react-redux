import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Login page', () => {
  const inputNameId = 'input-player-name';
  const inputEmailId = 'input-gravatar-email';
  const playButton = 'btn-play';

  it('should render the login form', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId(inputNameId)).toBeDefined();
    expect(screen.getByTestId(inputEmailId)).toBeDefined();
  });

  it('should have the form with empty values', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(inputNameId);
    const inputEmail = screen.getByTestId(inputEmailId);

    expect(inputName).toHaveTextContent('');
    expect(inputEmail).toHaveTextContent('');
  });

  it('should have verification for name and valid e-mail', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(inputNameId);
    const inputEmail = screen.getByTestId(inputEmailId);
    const button = screen.getByTestId(playButton);

    userEvent.type(inputEmail, 'teste@email.com');
    expect(button).toBeDisabled();

    userEvent.type(inputName, 'Nome Correto');
    userEvent.type(inputEmail, 'email-incorreto');
    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'email@incorreto');
    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'email.com');
    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'teste@email.com');
    expect(button).not.toBeDisabled();
  });
});
