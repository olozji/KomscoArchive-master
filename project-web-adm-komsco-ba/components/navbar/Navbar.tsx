import Link from 'next/link';
import { useRouter } from 'next/router';

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

const Navbar: React.FC<INavbar> = ({ items }) => {
  const router = useRouter();
  const currentRoute = router ? router.pathname : '/local';

  return (
    <>
      <header className={'bl_header ly_base ly_header'}>
        <div className={'bl_header_top'}>
          <div className={'bl_header_top_left'}>
            <span>최근접속시</span>
            <span>2022.08.07</span>
            <span>12:53:14</span>
          </div>
          <div className="bl_header_top_right">
            <span className="bl_header_top_right_username">홍길동(조폐공사관리자) 님</span>
            <div className="bl_header_top_right_timeWrap">
              <img src="/img/icon-reset.png" alt="reset icon" />
              <span className="hp_txt-blue hp_txt-bold">58:30</span>
            </div>
            <div className="el_btnWrap hp_mr-20">
              <button className="el_btn el_btn__xs">연장</button>
              <button className="el_btn el_btn__xs">로그아웃</button>
            </div>
            <select name="" id="" className="bl_header_top_right_select">
              <option value="">Family Site</option>
              <option value="">b</option>
              <option value="">c</option>
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
