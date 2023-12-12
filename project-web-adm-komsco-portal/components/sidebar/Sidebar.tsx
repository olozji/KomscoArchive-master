import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

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
  const currentRoute = router ? router.pathname : '/';

  const [isOpen, setIsOpen] = useState(-1);

  console.log(`data.isOpen: ${isOpen}`);

  useEffect(() => {
    // ===========================================
    // 메뉴 Index 조회
    // [2022년11월12일 16:50:01]
    // ===========================================
    const getCurrentMenuIndexAction = (index: number, item: any) => {
      if (item.href.pathname === currentRoute) {
        return index;
      }

      for (let i = 0; i < item.child.length; i++) {
        const itemChild = item.child[i];
        const result = getCurrentMenuIndexAction(index, itemChild);
        if (result >= 0) {
          return result;
        }
      }
    };
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const index = getCurrentMenuIndexAction(i, item);
      if (index === i) {
        setIsOpen(index);
        break;
      }
    }
    // setIsOpen(1);
  }, [items]);
  const onChildNavShow = (e, data: any, index: number) => {
    e.preventDefault();
    console.log(data);

    if (isOpen === index) {
      setIsOpen(-1);
    } else {
      setIsOpen(index);
    }
    data.isOpen = !data.isOpen;
  };

  {
    if (currentRoute === '/' || currentRoute === '/mypage') {
      return <>{console.log(' 커렌트 라우터가 / 면 아무것도 랜더링 하지 않음')}</>;
    }
  }
  return (
    <>
      <nav className="bl_sideNav">
        {items.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.href.pathname?.length == 0 ? (
                <Link href={'/'}>
                  <a
                    onClick={(e) => onChildNavShow(e, item, index)}
                    className={`item ${currentRoute == item.href.pathname ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                    <span>+</span>
                  </a>
                </Link>
              ) : (
                <Link href={item.href}>
                  <a className={`item ${currentRoute == item.href.pathname ? 'active' : ''}`}>
                    <span>{item.label}</span>
                  </a>
                </Link>
              )}

              {item.child?.length && index == isOpen ? (
                <div className="bl_sideNav_child">
                  {item.child?.map((childItem, childIndex) => {
                    return (
                      <React.Fragment key={childIndex}>
                        <Link href={childItem.href}>
                          <a
                            className={`child-item ${
                              currentRoute == childItem.href.pathname ? 'active' : ''
                            }`}
                          >
                            <span>{childItem.label}</span>
                          </a>
                        </Link>
                      </React.Fragment>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </React.Fragment>
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

        .bl_sideNav > .bl_sideNav_child .active {
          color: #fcff79;
        }

        .bl_sideNav_child .child-item {
          display: flex;
          justify-content: space-between;
          margin: 16px 0;
          padding-left: 19px;
          font-family: 'NanumSquare';
          font-style: normal;
          font-weight: 800;
          font-size: 18px;
          line-height: 20px;
          color: #a0a9b0;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
