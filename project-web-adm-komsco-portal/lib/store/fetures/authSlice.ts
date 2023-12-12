import { createSlice } from '@reduxjs/toolkit';
import { setCookie, getCookie, removeCookie } from 'utils/cookie';
import { AuthToken } from '../../../types/AuthToken';

const initialState: AuthToken = {
  isLogin: false,
  accessToken: '',
  refreshToken: '',
  expiresIn: 0,
};

export const authState = createSlice({
  name: 'authState',
  initialState: initialState,
  reducers: {
    setAuthState(state, action) {
      const payload = action.payload;
      state.isLogin = payload.isLogin;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.expiresIn = payload.expiresIn;

      setCookie('isLogin', payload.isLogin);
      setCookie('accessToken', payload.accessToken);
      setCookie('refreshToken', payload.refreshToken);
      setCookie('expiresIn', payload.expiresIn);
    },
    removeAuthState() {
      removeCookie('isLogin');
      removeCookie('accessToken');
      removeCookie('refreshToken');
      removeCookie('expiresIn');
    },
  },
});

export const { setAuthState, removeAuthState } = authState.actions;
export default authState.reducer;
