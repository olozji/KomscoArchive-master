import type { AppProps, AppContext } from 'next/app';
import '../styles/globals.css';
import wrapper from '../lib/store';
import { useAppDispatch } from '../lib/store';
import { NextPageWithLayout } from './page';
import { setAuthState } from '../lib/store/fetures/authSlice';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useState } from 'react';
import { getCookie } from '../utils/cookie';
import AuthService from '../services/AuthService';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  let isLogin = false;
  const [menus, setmenu] = useState([]);

  useEffect(() => {
    isLogin = getCookie('accessToken') ? true : false;
    const expiresIn = getCookie('expiresIn');
    if (expiresIn === null || expiresIn === 'undefined' || !Number(expiresIn)) {
      isLogin = false;
    }

    if (!isLogin) {
      //   router.replace('/logout');
      router.replace('/login');
      return;
    }

    AuthService.menus()
      .then((res: any) => {
        console.log('---메뉴 리스트----');
        setmenu(res.body.list);
        console.log('----end----');
      })
      .catch((e: any) => {
        console.log(e);
      });

    router.beforePopState(({ url, as, options }) => {
      console.log(`url: ${url}`);
      console.log(`as: ${as}`);
      console.log(`options: ${options}`);
      console.log('=====');
      return true;
    });

    dispatch(
      setAuthState({
        isLogin: isLogin,
        accessToken: getCookie('accessToken'),
        refreshToken: getCookie('refreshToken'),
        expiresIn: getCookie('expiresIn'),
      })
    );
  }, [getCookie('accessToken')]);

  console.log('=====================APP 2======================');

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />, menus, null);
}

export default wrapper.withRedux(MyApp);
