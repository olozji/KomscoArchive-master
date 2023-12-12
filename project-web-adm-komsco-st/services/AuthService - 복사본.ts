import http from '../lib/http/httpCommon';
import { ILoginRequestData } from '../types/Auth';
import { RequestTokenData } from '../types/Token';

const login = (data: ILoginRequestData) => {
  return http.post<ILoginRequestData>('/portal/v1/login', data);
};

const token = (data: RequestTokenData) => {
  return http.post<RequestTokenData>('/portal/v1/login/token/confirm', data);
};

const menus = () => {
  return http.get('/portal/v1/main/mngr/menu/00');
};

const myInfo = () => {
  return http.get('/portal/v1/main/mngr/info');
};

const AuthService = {
  login,
  token,
  menus,
  myInfo,
};

export default AuthService;
