import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import authSlice from './fetures/authSlice';

const combinedReducer = combineReducers({
  authSlice: authSlice,
});

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
export default rootReducer;
