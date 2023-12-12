import axios from 'axios';
import responseInterceptors from './httpInterceptorsResponse';
import { useRouter } from 'next/router';
import { authState } from '../store/fetures/authSlice';
import { getCookie, setCookie } from '../../utils/cookie';
const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 10000, // ms 단위
  headers: {
    'Content-type': 'application/json',
  },
});

http.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = getCookie('accessToken');
      if (token) {
        config.headers.common['Authorization'] = 'Bearer ' + token;
      }
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use((res) => {
  const { data } = res;
  const { head } = data;
  if (head.resultCode !== '0000') {
    console.log(head);
    if (head.resultCode === 'A00006' || head.resultCode === 'C00002') {
      setCookie('isLogin', '');
      setCookie('accessToken', '');
      setCookie('refreshToken', '');
      setCookie('expiresIn', '');
      console.log('로그인 만료!!!!!!!!');
    }
    return Promise.reject(data);
  }
  return data;
}, responseInterceptors(http));

export default http;
