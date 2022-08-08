import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.state.name,
      gravatarEmail: action.state.email,
    };
  default:
    return state;
  }
};

export default loginReducer;
