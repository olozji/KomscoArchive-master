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
  const currentRoute = router ? router.pathname : '/local';

  let items: any = [];
  if (router) {
    navItems.map((item) => {
      if (currentRoute == item.href.pathname) {
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
