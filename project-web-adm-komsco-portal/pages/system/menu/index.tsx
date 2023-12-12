import MainButton from '@/components/button/Button';
import PrimaryLayout from '@/components/layout/primaryLayout/PrimaryLayout';
import DepsOne from '@/components/menu/list/depsOne';
import MenuForm from '@/components/menu/form/menuForm';
import { useAppDispatch } from '@/lib/store';
import {
  isUpdating,
  menus,
  menuSelected,
  menuUpdateList,
  setIsUpdating,
  setMenuSelectedState,
  isTabChanged,
  setIsTabChanged,
  setMenusState,
} from '@/lib/store/fetures/menuSlice';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ResData } from 'types/ResData';
import MenuService from '@/services/MenuService';
import { NextPageWithLayout } from '../../page';
import styles from './style/menu.module.css';
import tab from './style/tab.module.css';

const Menu: NextPageWithLayout = () => {
  //local state:
  const [res, setRes] = useState([]);
  const [selectedTab, setSelectedTab] = useState('00');
  const [oneDepthsMenuList, setOneDepthsMenuList] = useState([]);
  const [twoDepthsMenuList, setTwoDepthsMenuList] = useState([]);
  const [threeDepthsMenuList, setThreeDepthsMenuList] = useState([]);

  //global state:
  const dispatch = useAppDispatch();
  const _menus = useSelector(menus);
  const _menuUpdateList = useSelector(menuUpdateList);
  const _isUpdating = useSelector(isUpdating);
  const _menuSelected = useSelector(menuSelected);
  const _isTabChanged = useSelector(isTabChanged);

  // 사용여부 라디오버튼 값
  const [value, setValue] = useState('Y');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  //   메뉴등록
  const registerData: any = {
    name: String, //메뉴명
    menulinkcode: String, // 연결사이트코드 (00포탈 , 01모바일관리시스템, 02상품권통합관리시스템,03정산관리시스템,04통계관리시스템,05이상거래탐지시스템 )
    menulevelcode: String, //메뉴레벨코드 (ex : 1 = 1depth )
    menuseq: Number, // 상위 메뉴 순번
    menudesc: String, // 메뉴 설명
    connurl: String, // 메뉴 접속 URl
    uzyn: String, // 메뉴 사용 여부
    xpryn: String, // 메뉴 노출 여부
  };

  useEffect(() => {
    selectPortal();
    setMenuListByLevel();
  }, [_isUpdating, _menuSelected, _menuUpdateList, selectedTab]);

  //function:
  const setMenuListByLevel = () => {
    MenuService.getMenuListByLevel(selectedTab, '1')
      .then((response: any) => {
        const res = response.body;
        setOneDepthsMenuList(res);
      })
      .catch((e: ResData) => {
        console.log(e);
      });
    MenuService.getMenuListByLevel(selectedTab, '2')
      .then((response: any) => {
        const res = response.body;
        setTwoDepthsMenuList(res);
      })
      .catch((e: ResData) => {
        console.log(e);
      });
    MenuService.getMenuListByLevel(selectedTab, '3')
      .then((response: any) => {
        const res = response.body;
        setThreeDepthsMenuList(res);
      })
      .catch((e: ResData) => {
        console.log(e);
      });
  };
  function selectPortal() {
    MenuService.selectmenu({
      lnknSiteCd: selectedTab,
    })
      .then((response: any) => {
        const res = response.body;
        setRes(res);
        dispatch(setMenusState(res));
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  }

  const onSubmit = (data) => {
    if (selectedTab === '00') {
      registerData.menulinkcode = '00';
    }
    MenuService.addmenu({
      menuNm: data.name,
      lnknSiteCd: registerData.menulinkcode,
      menuLevelCd: data.menulevelcode,
      uprnMenuSeq: null,
      menuDesc: data.menudesc,
      menuConnUrl: data.connurl,
      uzYn: value,
      menuXprYn: 'Y',
    })
      .then((response: any) => {
        console.log(response);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log(e.head);
        alert(e.head.resultMsg);
      });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F3F4F5',
      color: 'black',
      fontSize: 15,
      whiteSpace: 'nowrap',
      padding: '1rem',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#ffffff',
      fontSize: 15,
      color: 'black',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const onMenuPositionSaveClick = () => {
    const temp = [];
    _menus.map((v) => {
      temp.push(v);
      if (v.childs.length > 0) {
        v.childs.map((v2) => {
          temp.push(v2);
          if (v2.childs.length > 0) {
            v2.childs.map((v3) => {
              temp.push(v3);
            });
          }
        });
      }
    });

    const _temp = temp.map((v) => {
      return {
        menuSeq: v.menuSeq,
        menuSerNo: v.menuSerNo,
      };
    });
    const data = { lnknSiteCd: selectedTab, list: _temp };
    MenuService.updateMenuList(data)
      .then((response: any) => {
        console.log(response);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log(e.head);
        alert(e.head.resultMsg);
      });
  };

  const handleOnTabListClick = (e, v) => {
    dispatch(setIsUpdating(false));
    dispatch(setIsTabChanged(true));
    setSelectedTab(v);
  };

  return (
    <>
      <section className={styles.commonWrapper}>
        {/* 메뉴관리 */}
        <article className={styles.commonMng}>
          {/* 탭메뉴 */}
          <div className={styles.menuMngWrapper}>
            <section className={tab.tabContainer}>
              <ul className={tab.tabMenu}>
                <li
                  className={`${styles.tabContent} ${
                    selectedTab === '01' ? styles.tabActive : null
                  }`}
                  onClick={(e) => handleOnTabListClick(e, '01')}
                >
                  <div>광역</div>
                </li>
                <li
                  className={`${styles.tabContent} ${
                    selectedTab === '02' ? styles.tabActive : null
                  }`}
                  onClick={(e) => handleOnTabListClick(e, '02')}
                >
                  <div>
                    상품권통합관리
                    <br />
                    시스템
                  </div>
                </li>
                <li
                  className={`${styles.tabContent} ${
                    selectedTab === '03' ? styles.tabActive : null
                  }`}
                  onClick={(e) => handleOnTabListClick(e, '03')}
                >
                  <div>정산</div>
                </li>
                <li
                  className={`${styles.tabContent} ${
                    selectedTab === '04' ? styles.tabActive : null
                  }`}
                  onClick={(e) => handleOnTabListClick(e, '04')}
                >
                  <div>통계</div>
                </li>
                <li
                  className={`${styles.tabContent} ${
                    selectedTab === '00' ? styles.tabActive : null
                  }`}
                  onClick={(e) => handleOnTabListClick(e, '00')}
                >
                  <div>포탈</div>
                </li>
              </ul>
              {/* 메뉴 */}
              <div className={`${styles.menuContent} ${styles.menuContentTitle}`}>
                <span>메뉴</span>
                <MainButton
                  label="위치저장"
                  size="extraSmall"
                  variant="lightGray"
                  onClick={onMenuPositionSaveClick}
                  className="hp_ml-auto"
                />
              </div>
              {res.length > 0 ? (
                <DepsOne data={res} />
              ) : (
                <div style={{ padding: '10px' }}>데이터가 없습니다.</div>
              )}
            </section>
          </div>
        </article>
        {/* 메뉴등록 */}
        <MenuForm
          lnknSiteCd={selectedTab}
          oneDepthsMenuList={oneDepthsMenuList}
          twoDepthsMenuList={twoDepthsMenuList}
          threeDepthsMenuList={threeDepthsMenuList}
        />
      </section>
      <style jsx>{``}</style>
    </>
  );
};

export default Menu;

Menu.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'메뉴 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
