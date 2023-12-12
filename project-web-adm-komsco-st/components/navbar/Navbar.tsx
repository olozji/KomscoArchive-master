import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import AuthService from '../../services/AuthService';
import moment from 'moment';

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

interface MyInfo {
  acntTypNm: string;
  mngrNm: string;
  lastLoginDttm: string;
  loginTime: string | null;
}

const Navbar: React.FC<INavbar> = ({ items }) => {
  const router = useRouter();
  const currentRoute = router ? router.pathname : '/usehis';
  const data: MyInfo = {
    acntTypNm: '',
    mngrNm: '',
    lastLoginDttm: '',
    loginTime: '',
  };
  const [myInfo, setMyInfo] = useState<MyInfo>(data);

  function logout() {
    console.log('로그아웃 처리');
    router.replace('/login').then(() => {
      clearInterval(interval);
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      window.localStorage.removeItem('expiresIn');
    });
  }

  let interval: NodeJS.Timer;

  useEffect(() => {
    console.log('----네비바 랜더링되는것임----');
    AuthService.myInfo()
      .then((res: any) => {
        const { body } = res;
        myInfo.acntTypNm = body.acntTypNm;
        myInfo.mngrNm = body.mngrNm;

        console.log('-------myInfo-----');
        console.log(body);

        const date = new Date(body.lastLoginDttm);
        const dates = [];

        dates.push(moment(new Date(body.lastLoginDttm)).format('YYYY.MM.DD HH:mm:ss'));
        myInfo.lastLoginDttm = dates.join('');
        myInfo.loginTime = '';

        if (interval) {
          return;
        }

        interval = setInterval(
          () => {
            // 현재
            const expiresIn = window.localStorage.getItem('expiresIn');
            // console.log('---로컬에 저장된 만료시간---');
            // console.log(expiresIn);

            // 만료
            const expTimeStamp = body.lastLoginDttm / 1000 + Number(expiresIn); //Number(expiresIn);
            const nowDate: any = new Date();
            const nowTimeStamp = Date.parse(nowDate) / 1000;

            // console.log('만료 타임스탬프-' + expTimeStamp);
            // console.log('현재 타임스탬프-' + nowTimeStamp);
            //console.log('만료 시간:' + (expTimeStamp - nowTimeStamp));

            // 음수면 바로 로그아웃 및 사용 금지 처리
            if (expTimeStamp - nowTimeStamp <= 0) {
              //clearInterval(interval);
              //alert('토큰 만료!');
              logout();
            } else {
              // 만료가 아니라면 loginTime 값 주입 후, 1초마다 ui 에 카운트되도록 처리
              const timeStamp = expTimeStamp - nowTimeStamp;
              const minute = Math.floor((timeStamp / 60) % 60);
              const second = Math.floor(timeStamp % 60);
              myInfo.loginTime = ('0' + minute).slice(-2) + ':' + ('0' + second).slice(-2);
              // console.log(myInfo.loginTime);
              setMyInfo(JSON.parse(JSON.stringify(myInfo)));
            }
          },

          myInfo.loginTime ? 1000 : 0
        );
      })
      .catch((e: any) => {
        console.log(e);
      });
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
            <span className="bl_header_top_right_username">
              {myInfo.mngrNm}({myInfo.acntTypNm}) 님
            </span>
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
            <select name="" id="" className="bl_header_top_right_select">
              <option value="">Family Site</option>
              <option value="">포탈</option>
              <option value="">통계</option>
            </select>
          </div>
        </div>
        <div className="bl_header_bottom">
          <div className="bl_header_bottom_left">
            <a href="#">
              <img src="/img/logo.png" alt="logo" className="el_logo" />
            </a>
          </div>
          <div className="bl_header_bottom_right">
            <ul className="bl_header_bottom_right_list">
              {items.map((item) => {
                return (
                  <>
                    <li>
                      <Link href={item.href}>
                        <a
                          className={`item ${
                            currentRoute.includes(item.href.pathname) ? 'active' : ''
                          }`}
                        >
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  </>
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
          padding-right: 5px;
          padding-left: 5px;
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
          background-color: #266ae8;
          height: 4px;
          bottom: -23px;
          left: 0;
        }
      `}</style>
    </>
  );
};

export default Navbar;
