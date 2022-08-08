import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, score, email } = this.props;
    const hash = md5(email).toString();

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt={ `Profile of: ${name}` }
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">{ score }</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.gravatarEmail,
  name: state.loginReducer.name,
  score: state.loginReducer.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
