import Link from 'next/link';
import { useRouter } from 'next/router';

export interface INavbarAdmin {
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

const NavbarAdmin: React.FC<INavbarAdmin> = ({ items }) => {
  const router = useRouter();
  const currentRoute = router ? router.pathname : '/admin';

  return (
    <>
      <header className={'bl_header ly_base ly_header'}>
        <div className={'bl_header_top_left'}>
          <span>최근접속시</span>
          <span>2022.08.07</span>
          <span>12:53:14</span>
        </div>
        <div className="bl_header_bottom">
          <div className="bl_header_bottom_left">
            <a href="#">
              <img src="/img/logo.png" alt="logo" className="el_logo" />
              <span>통합관리자</span>
            </a>
          </div>
          <div className="bl_header_bottom_right">
            <ul className="bl_header_bottom_right_list">
              {items.map((item) => {
                return (
                  <>
                    <li>
                      <Link href={item.href}>
                        <a className={`item ${currentRoute == item.href.pathname ? 'active' : ''}`}>
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
        <div className={'bl_header_top'}>
          <div className="bl_header_top_right">
            <span className="bl_header_top_right_username">홍길동(조폐공사관리자) 님</span>
            <div className="bl_header_top_right_timeWrap">
              <img src="/img/icon-reset.png" alt="reset icon" />
              <span className="hp_txt-blue hp_txt-bold">58:30</span>
              <div className="el_btnWrap hp_mr-20">
                <button className="el_btn el_btn__xs">연장</button>
                <button className="el_btn el_btn__xs">로그아웃</button>
                <button className="el_btn el_btn__xs">마이페이지</button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <style jsx>{`
        .bl_header {
          border-bottom: 1px solid #a1a1a1;
        }

        .bl_header_top {
          display: flex;
          position: absolute;
          top: 10%;
          left: 68%;
        }

        .bl_header_top_left {
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .bl_header_top_right {
          display: flex;
          font-size: 1.6rem;
          align-items: center;
        }

        .bl_header_top_right_username {
          margin-right: 20px;
        }

        .bl_header_top_right_timeWrap {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .bl_header_bottom {
          display: flex;
          gap: 40px;
          align-items: baseline;
        }

        .bl_header_bottom_left span {
          font-size: 3rem;
          font-weight: bold;
          margin: 0px 10px;
        }

        .bl_header_bottom_right {
          display: flex;
        }

        .bl_header_bottom_right_list {
          font-size: 2rem;
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

export default NavbarAdmin;
