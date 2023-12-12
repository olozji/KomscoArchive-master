import Link from 'next/link';
import { useRouter } from 'next/router';

export interface ISidebar {
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

const Sidebar: React.FC<ISidebar> = ({ items }) => {
  const router = useRouter();
  const currentRoute = router ? router.pathname : '/local-register';

  return (
    <>
      <nav className="bl_sideNav">
        {items.map((item) => {
          return (
            <>
              <Link href={item.href}>
                <a className={`item ${currentRoute == item.href.pathname ? 'active' : ''}`}>
                  <span>{item.label}</span>
                  <span>+</span>
                </a>
              </Link>
            </>
          );
        })}
      </nav>
      <style jsx>{`
        /* ## bl_sideNav */
        .bl_sideNav {
          background-color: #0040b5;
          width: 230px;
          color: #fff;
          padding: 10px 12px;
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 2rem;
          /* height: 100%; */
        }
        .bl_sideNav > .item {
          color: #fff;
          padding: 16px 0;
          padding-left: 3px;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          border-bottom: 0.5px solid #002f86;
        }
        .bl_sideNav > .item.active {
          color: #fcff79;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
