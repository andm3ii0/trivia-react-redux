import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import './header.css';
import logo from '../images/16.png';

class Header extends React.Component {
  render() {
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    return (
      <header className="header-game">
        <div className="logo-header">
          <img src={ logo } className="logo-2" alt="Logo" />
        </div>
        <h2 className="score-header" data-testid="header-score">
          Pontos:
          {' '}
          { score }
        </h2>
        <div className="perfil-header">
          <div className="perfil-info">
            <img
              className="img-header"
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${hash}` }
              alt={ `Profile of: ${name}` }
            />
            <h2 className="name-header" data-testid="header-player-name">{ name }</h2>
          </div>

        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.gravatarEmail,
  name: state.loginReducer.name,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
