import {
  REQUEST_API,
  REQUEST_SUCSSES,
  ADD_POINTS_SCORE,
  COUNT_ASSERTIONS,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
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
      score: 0,
      randomArray: action.randomArray,
      requestAPI: false,
      requestState: action.requestState,
    };
  case ADD_POINTS_SCORE:
    return {
      ...state,
      score: action.points,
    };
  case COUNT_ASSERTIONS:
    return {
      ...state,
      assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default player;
