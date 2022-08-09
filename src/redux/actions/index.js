export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_SUCSSES = 'REQUEST_SUCSSES';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const USER_LOGIN = 'USER_LOGIN';
export const ADD_POINTS_SCORE = 'ADD_POINTS_SCORE';
export const COUNT_ASSERTIONS = 'COUNT_ASSERTIONS';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';
const randomNumber = 0.5;

const requestAPI = () => ({
  type: REQUEST_API,
});

const requestSuccess = (obj) => ({
  type: REQUEST_SUCSSES,
  questions: obj.results,
  requestState: obj.response_code,
  randomArray: obj.results.map((question) => [
    question.correct_answer,
    ...question.incorrect_answers].sort(() => Math.random() - randomNumber)),
});

const requestError = () => ({
  type: REQUEST_ERROR,
});

export const requestQuestions = (endPoint) => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const resolve = await fetch(endPoint);
    const data = await resolve.json();
    console.log(data);
    dispatch(requestSuccess(data));
  } catch (error) {
    dispatch(requestError());
  }
};

export const userLoginAction = (state) => ({
  type: USER_LOGIN,
  state,
});

export const addPointsAction = (points) => ({
  type: ADD_POINTS_SCORE,
  points,
});

export const countAssertions = (state) => ({
  type: COUNT_ASSERTIONS,
  state,
});

export const addAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  assertions,
});
