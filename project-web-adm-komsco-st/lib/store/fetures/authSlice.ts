import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLogin: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

const initialState: AuthState = {
  isLogin: false,
  accessToken: '',
  refreshToken: '',
  expiresIn: 0,
};

export const authState = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setAuthState(state, action) {
      const payload = action.payload;
      state.isLogin = payload.isLogin;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.expiresIn = payload.expiresIn;

      if (typeof window !== 'undefined') {
        if (payload.isLogin) {
          window.localStorage.setItem('accessToken', payload.accessToken);
          window.localStorage.setItem('refreshToken', payload.refreshToken);
          window.localStorage.setItem('expiresIn', payload.expiresIn);
        } else {
          window.localStorage.removeItem('accessToken');
          window.localStorage.removeItem('refreshToken');
          window.localStorage.removeItem('expiresIn');
        }
      }
    },
  },
});

export const { setAuthState } = authState.actions;
export default authState.reducer;
