import Head from 'next/head';
import Navbar, { INavbar } from '../../navbar/Navbar';
import Sidebar from '../../sidebar/Sidebar';
import { useRouter } from 'next/router';

export interface IPrimaryLayout {
  children: any;
  navItems: INavbar['items'];
  title: string;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, navItems, title }) => {
  const router = useRouter();
  const currentRoute = router ? router.pathname : '/';

  let items: any = [];

  if (router) {
    const paths: any = [];
    for (let i = 0; i < currentRoute.length; i++) {
      if (currentRoute[i].indexOf('/') >= 0) {
        paths.push(i);
      }
    }
    navItems.map((item) => {
      if (
        item.href.pathname.indexOf(
          currentRoute.substring(
            currentRoute.indexOf('/'),
            currentRoute.lastIndexOf('/') === 0
              ? currentRoute.length
              : currentRoute.substring(0, paths[1]).length
          )
        ) >= 0
      ) {
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
