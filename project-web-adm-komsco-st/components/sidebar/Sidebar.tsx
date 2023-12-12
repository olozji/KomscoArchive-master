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
  const currentRoute = router ? router.pathname.trim() : '/';

  // console.log('----currentRoute---');
  // console.log(currentRoute);

  // for (let i = 0; i < items.length; i++) {
  //   if (items[i].child?.length > 0) {
  //     for (let j = 0; j < items[i].child?.length; i++) {
  //       if (currentRoute.includes(items[i].child[j].href.pathname)) {
  //         console.log('---매칭되는 메뉴---');
  //         console.log(items[i].child[j].href.pathname);
  //       }
  //     }
  //   } else {
  //     if (currentRoute == items[i].href.pathname) {
  //       console.log('---매칭되는 단일메뉴---');
  //       console.log(items[i].href.pathname);
  //     }
  //   }

  //   console.log('-----그냥 메뉴리스트들...---');
  console.log('-----items-----');
  console.log(items);
  // }

  return (
    <>
      <nav className="bl_sideNav">
        {items.map((item) => {
          return (
            <>
              <Link href={item.child ? item.child[0].href : item.href}>
                <a
                  className={`item ${
                    (
                      item.child
                        ? currentRoute.includes(item.href.pathname)
                        : currentRoute == item.href.pathname
                    )
                      ? 'active'
                      : ''
                  }`}
                >
                  <span>{item.label}</span>
                  {item.child ? <span>+</span> : ''}
                </a>
              </Link>

              {item.child ? ( //&& currentRoute === item.href.pathname ? (
                item.child?.map((c) => {
                  return (
                    <>
                      <Link href={c.href}>
                        <a className={`subItem ${currentRoute == c.href.pathname ? 'active' : ''}`}>
                          <span>{c.label}</span>
                        </a>
                      </Link>
                    </>
                  );
                })
              ) : (
                <></>
              )}
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
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 2rem;
        }
        .bl_sideNav > .item {
          color: #fff;
          padding: 26px 12px;

          display: flex;
          justify-content: space-between;
          cursor: pointer;
          border-bottom: 0.5px solid #002f86;
        }
        .bl_sideNav > .item.active {
          color: #fcff79;
        }

        .bl_sideNav > .subItem {
          color: #fff;
          padding: 26px 12px;
          font-size: 1.5rem;
          background-color: #002f86;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          border-bottom: 0.5px solid #002f86;
        }

        .bl_sideNav > .subItem.active {
          color: #fcff79;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
