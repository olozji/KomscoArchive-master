import Head from 'next/head';
import Navbar, { INavbar } from '../../navbar/Navbar';
import Sidebar from '../../sidebar/Sidebar';
import { useRouter } from 'next/router';
import { Modal } from '@mui/material';

export interface IPrimaryLayout {
  children: any;
  navItems: INavbar['items'];
  title: string;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, navItems, title }) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  // const currentRoute = router ? router.pathname : '/local';
  console.log('----currentRoute---');
  console.log(currentRoute);
  let items: any = [];
  // if (router) {
  //   navItems.map((item) => {
  //     // 원래 코드 currentRoute == item.href.pathname  당연히 pathname이 다르니 안되징....
  //     if (currentRoute.includes(item.href.pathname)) {
  //       items = item.child;
  //     }
  navItems.map((item) => {
    if (currentRoute.includes(item.href.pathname)) {
      items = item.child;
    } else {
      if (item.child) {
        item.child.map((childItem) => {
          if (currentRoute.includes(childItem.href.pathname)) {
            items = item.child;
          }
        });
      }
    }
  });
  // navItems에 해당하지 않는 path에 있는 경우(예외경우) 처리해둔건데, 나중에 적절하게 수정하는게 좋을듯.
  if (items.length === 0) {
    items = navItems[0].child;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar items={navItems}></Navbar>

      <div className="bl_main ly_base ly_main">
        <Sidebar items={items}></Sidebar>
        <article className="bl_content">
          <h2 className="el_content_title">{title}</h2>
          {children}
        </article>
      </div>
      <style jsx>{``}</style>
    </>
  );
};

export default PrimaryLayout;
