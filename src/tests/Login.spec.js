import { screen } from '@testing-library/dom';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Login page', () => {
  const inputNameId = 'input-player-name';
  const inputEmailId = 'input-gravatar-email';
  const playButton = 'btn-play';
  const settingsButton = 'btn-settings';

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

  it('should go to the Settings page when clicking the Settings button',
    () => {
      const test = renderWithRouterAndRedux(<App />);

      const button = screen.getByTestId(settingsButton);
      userEvent.click(button);

      const { pathname } = test.history.location;
      expect(pathname).toBe('/settings');

      expect(screen.getByTestId('settings-title')).toBeDefined();
    });

  it('should go to the Game page when clicking the Play button with the correct login',
    async () => {
      const test = renderWithRouterAndRedux(<App />);

      const inputName = screen.getByTestId(inputNameId);
      const inputEmail = screen.getByTestId(inputEmailId);
      const button = screen.getByTestId(playButton);

      userEvent.type(inputName, 'Nome Correto');
      userEvent.type(inputEmail, 'teste@email.com');
      userEvent.click(button);

      await waitFor(() => {
        const { pathname } = test.history.location;
        expect(pathname).toBe('/game');
      });
    });
});
