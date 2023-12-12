import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: any) => {
  if (!option) option = {};
  option.path = '/';
  return cookies.set(name, value, option);
};

export const getCookie = (name: string) => {
  const option: any = {};
  option.path = '/';
  return cookies.get(name, option);
};

export const removeCookie = (name: string) => {
  const option: any = {};
  option.path = '/';
  return cookies.remove(name, option);
};
