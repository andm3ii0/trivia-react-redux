import { REQUEST_API, REQUEST_SUCSSES } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  requestAPI: true,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, requestAPI: true };
  case REQUEST_SUCSSES:
    return { ...state,
      questions: action.questions,
      requestAPI: false,
      requestState: action.requestState,
    };
  default:
    return state;
  }
};

export default player;
