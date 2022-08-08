import { combineReducers } from 'redux';
import player from './player';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  player,
  loginReducer,
});

export default rootReducer;
