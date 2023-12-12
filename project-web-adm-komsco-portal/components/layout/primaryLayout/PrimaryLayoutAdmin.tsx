import Head from 'next/head';
import NavbarAdmin, { INavbarAdmin } from '../../navbar/Navbar.admin';
import Sidebar from '../../sidebar/Sidebar';
import { useRouter } from 'next/router';

export interface IPrimaryLayoutAdmin {
  children: any;
  navItems: INavbarAdmin['items'];
  title: string;
}

const PrimaryLayoutAdmin: React.FC<IPrimaryLayoutAdmin> = ({ children, navItems, title }) => {
  const router = useRouter();
  const currentRoute = router ? router.pathname : '/admin';

  let items: any = [];
  if (router) {
    navItems.map((item) => {
      // 원래 코드 currentRoute == item.href.pathname  당연히 pathname이 다르니 안되징....
      if (currentRoute.includes(item.href.pathname)) {
        items = item.child;
      }
    });
  } else {
    items = navItems[0].child;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NavbarAdmin items={navItems}></NavbarAdmin>

      <div className="bl_main ly_base ly_main">
        <Sidebar items={items}></Sidebar>
        <article className="bl_content">
          <h2 className="el_content_title">{title}</h2>
          {children}
        </article>
      </div>
      <style jsx>
        {`
          .bl_main {
            width: 100%;
            height: auto;
            padding: 50px;
          }

          .bl_content {
            width: 570px;
            margin: auto;
          }

          .bl_content_item {
            display: flex;
          }

          .bl_content_item div {
            flex: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 50px;
            border: 1px solid #000;
            border-radius: 10px;
            text-align: center;
            margin: 10px;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
          }

          .bl_content_item div:hover {
            background-color: #889196;
          }

          .board_container {
            padding: 50px;
          }

          .main_board {
            width: 100%;
            margin: 0 auto;
            padding: 0 50px;
            box-sizing: border-box;
          }

          .main_board > .board0 {
            // padding-right:40px;
            width: 100%;
            margin: 50 0px;
            box-sizing: border-box;
          }

          .main_board > .board0 h2 {
            position: relative;
            font-size: 20px;
            line-height: 29px;
            color: #282a2e;
            margin-bottom: 20px;
          }

          .main_board > .board0 h2 a {
            position: absolute;
            font-size: 14px;
            font-weight: 500;
            color: #999;
            right: 0;
          }

          .main_board_sub {
            display: flex;
            margin-top: 30px;
          }

          .main_board_sub > .board1 {
            width: 50%;
            margin: 10px;
            box-sizing: border-box;
          }
          .main_board_sub > .board1 h2 {
            position: relative;
            font-size: 20px;
            line-height: 29px;
            color: #00305b;
            margin-bottom: 20px;
          }

          .main_board_sub > .board1 h2 a {
            position: absolute;
            font-size: 14px;
            font-weight: 500;
            color: #999;
            right: 0;
          }

          .mainboard_list {
            border-top: 2px solid #000;
          }
          .mainboard_list li {
            border-bottom: 0.5px solid #889196;
            line-height: 50px;
          }

          .mainboard_list li a {
            display: block;
            position: relative;
            padding-right: 84px;
            padding-left: 9px;
          }

          .mainboard_list li a strong {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 15px;
            line-height: 58px;
            font-weight: 500;
            color: #333;
            border-right: 0.5px solid #889196;
          }

          .mainboard_list li a span {
            position: absolute;
            right: 3px;
            top: 0;
            font-size: 12px;
            line-height: 58px;
            color: #266ae8;
          }

          .mainboard_list li:hover {
            background: #f1f1f1;
          }
        `}
      </style>
    </>
  );
};

export default PrimaryLayoutAdmin;
