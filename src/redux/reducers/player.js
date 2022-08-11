import {
  REQUEST_API,
  REQUEST_SUCSSES,
  ADD_POINTS_SCORE,
  ADD_ASSERTIONS,
  SET_SETTINGS,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  requestAPI: true,
  type: 'any',
  diff: 'any',
  category: 'any',
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
  case ADD_ASSERTIONS:
    return {
      ...state,
      assertions: action.assertions,
    };
  case SET_SETTINGS:
    return {
      ...state,
      type: action.obj.type,
      diff: action.obj.diff,
      category: action.obj.category,
    };
  default:
    return state;
  }
};

export default player;
