import axios from 'axios';
import responseInterceptors from './httpInterceptorsResponse';
import { useRouter } from 'next/router';
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
      const isLogin = window.localStorage.getItem('accessToken') ? true : false;

      if (isLogin) {
        config.headers.common['Authorization'] =
          'Bearer ' + window.localStorage.getItem('accessToken');
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
    if (head.resultCode === 'A00006') {
      window.localStorage.removeItem('accessToken');
      alert('로그인 만료!!!!!!!!');
    }
    return Promise.reject(data);
  }
  return data;
}, responseInterceptors(http));

export default http;
