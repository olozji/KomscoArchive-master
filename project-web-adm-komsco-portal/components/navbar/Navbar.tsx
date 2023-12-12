import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import AuthService from '../../services/AuthService';
import { authState, removeAuthState } from '../../lib/store/fetures/authSlice';
import { useAppDispatch } from '../../lib/store';
import { getCookie } from '../../utils/cookie';

export interface INavbar {
  items: Array<IItem>;
}

export interface IItem {
  label: string;
  href: {
    pathname: string;
    query: any;
  };
  child?: Array<IItem>;
}
type Fnc = (body: any) => void;

interface MyInfo {
  acntTypNm: string;
  mngrNm: string;
  lastLoginDttm: string;
  loginTime: string | null;
}

const Navbar: React.FC<INavbar> = ({ items }) => {
  const router = useRouter();
  const currentRoute = router ? router.pathname : '/';
  const dispatch = useAppDispatch();
  const data: MyInfo = {
    acntTypNm: '',
    mngrNm: '',
    lastLoginDttm: '',
    loginTime: '',
  };

  const tickRef = useRef<Fnc>((body: any) => {
    //
  });

  const [myInfo, setMyInfo] = useState<MyInfo>(data);

  const timerList = [];
  let interval = null;

  function logout() {
    clearInterval(interval);
    dispatch(removeAuthState());
    router.replace('/login');
  }

  const loginNaviInfo = (body: any) => {
    // 현재
    const expiresIn = getCookie('expiresIn');
    const accessToken = getCookie('accessToken');
    if (!expiresIn || !accessToken) {
      logout();
    }

    // 만료
    const expTimeStamp = body.lastLoginDttm / 1000 + Number(expiresIn);
    const nowDate: any = new Date();
    const nowTimeStamp = Date.parse(nowDate) / 1000;
    if (expTimeStamp - nowTimeStamp <= 0) {
      logout();
      router.replace('/logout');
    } else {
      const timeStamp = expTimeStamp - nowTimeStamp;
      const minute = Math.floor((timeStamp / 60) % 60);
      const second = Math.floor(timeStamp % 60);
      myInfo.loginTime = ('0' + minute).slice(-2) + ':' + ('0' + second).slice(-2);
      setMyInfo(JSON.parse(JSON.stringify(myInfo)));
    }
  };

  useEffect(() => {
    tickRef.current = loginNaviInfo;
  });

  useEffect(() => {
    AuthService.myInfo()
      .then((res: any) => {
        const { body } = res;
        myInfo.acntTypNm = body.acntTypNm;
        myInfo.mngrNm = body.mngrNm;

        const date = new Date(body.lastLoginDttm);
        const dates = [];
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minu = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        dates.push(year + '.');
        dates.push(month + '.');
        dates.push(day + ' ');
        dates.push(hour + ':');
        dates.push(minu + ':');
        dates.push(second);

        myInfo.lastLoginDttm = dates.join('');
        myInfo.loginTime = '';
        console.log('==============NavBar!!!!!!!!!!');
        console.log('1');
        console.log(
          `authState.getInitialState().expiresIn: ${authState.getInitialState().expiresIn}`
        );

        interval = setInterval(() => {
          loginNaviInfo(body);
        }, 1000);
        loginNaviInfo(body);
      })
      .catch((e: any) => {
        console.log(e);
      });

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <>
      <header className={'bl_header ly_base ly_header'}>
        <div className={'bl_header_top'}>
          <div className={'bl_header_top_left'}>
            <span>최근접속시</span>
            <span>{myInfo.lastLoginDttm}</span>
          </div>
          <div className="bl_header_top_right">
            <span
              className="bl_header_top_right_username"
              onClick={() => {
                router.push({
                  pathname: '/mypage',
                });
              }}
            >
              {myInfo.mngrNm}({myInfo.acntTypNm}) 님
            </span>
            {/* <div className="bl_header_top_right_usericon"></div> */}
            <div className="bl_header_top_right_timeWrap">
              <img src="/img/icon-reset.png" alt="reset icon" />
              <span className="hp_txt-blue hp_txt-bold">{myInfo.loginTime}</span>
            </div>
            <div className="el_btnWrap hp_mr-20">
              <button className="el_btn el_btn__xs">연장</button>
              <button className="el_btn el_btn__xs" onClick={logout}>
                로그아웃
              </button>
            </div>
          </div>
        </div>
        <div className="bl_header_bottom">
          <div className="bl_header_bottom_left">
            <a href="/">
              <img src="/img/logo.png" alt="logo" className="el_logo" />
            </a>
          </div>
          <div className="bl_header_bottom_right">
            <ul className="bl_header_bottom_right_list">
              {/* 반복문에서 일어나는 key에러 잡아야함 */}
              {items.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <li key={item.label}>
                      <Link href={item.href}>
                        <a
                          className={`item ${
                            currentRoute == item.href.pathname ||
                            currentRoute.indexOf(
                              item.href.pathname.substring(
                                item.href.pathname.indexOf('/'),
                                item.href.pathname.lastIndexOf('/') === 0
                                  ? item.href.pathname.length
                                  : item.href.pathname.lastIndexOf('/')
                              )
                            ) >= 0
                              ? 'active'
                              : ''
                          }`}
                        >
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
      <style jsx>{`
        .bl_header {
          border-bottom: 1px solid #a1a1a1;
        }
        .bl_header_top {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .bl_header_top_left {
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .bl_header_top_right {
          font-size: 1.6rem;
          display: flex;
          align-items: center;
        }
        .bl_header_top_right_username {
          margin-right: 20px;
          cursor: pointer;
        }
        .bl_header_top_right_usericon {
          width: 40px;
          height: 40px;
          background-image: url('https://cdn-icons-png.flaticon.com/512/149/149071.png');
          background-size: cover;
        }
        .bl_header_top_right_timeWrap {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-right: 20px;
        }
        .bl_header_top_right_select {
          width: 280px;
          height: 30px;
          border: 1px solid #efefef;
          color: #9c9c9c;
        }
        .bl_header_bottom {
          display: flex;
          gap: 40px;
        }
        .bl_header_bottom_left {
        }
        .bl_header_bottom_right {
          display: flex;
          align-items: center;
        }
        .bl_header_bottom_right_list {
          font-size: 2rem;
          line-height: 2.2rem;
          display: flex;
        }
        .bl_header_bottom_right_list .item {
          padding: 0 22.5px;
        }
        .bl_header_bottom_right_list .item.active {
          color: #266ae8;
          font-weight: bold;
        }

        .bl_header_bottom_right_list .item.active::after {
          content: '';
          position: absolute;
          width: 100%;
          //background-color: #266ae8;
          height: 4px;
          bottom: -23px;
          left: 0;
        }
      `}</style>
    </>
  );
};

export default Navbar;
