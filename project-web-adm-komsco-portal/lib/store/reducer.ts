import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import authSlice from './fetures/authSlice';
import codeSlice from './fetures/codeSlice';
import menuSlice from './fetures/menuSlice';
import noticeSlice from './fetures/noticeSlice';

const combinedReducer = combineReducers({
  authSlice: authSlice,
  codeSlice: codeSlice,
  menuSlice: menuSlice,
  noticeSlice: noticeSlice,
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
