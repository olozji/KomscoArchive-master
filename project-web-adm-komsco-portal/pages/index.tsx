import { useEffect, useState } from 'react';
import tabstyles from './style/tab.module.css';
import styles from './style/style.module.css';
import PrimaryLayout from '../components/layout/primaryLayout/PrimaryLayout';
import Pagination from '../components/pagination/Pagination';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NextPageWithLayout } from './page';
import NoticeMng from '../services/NoticeService';
import { ResData } from 'types/ResData';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from 'components/modal/modal';
import Popup from 'components/modal/NoticePopup';
import MenuService from 'services/MenuService';
import { getMenuList } from 'utils/const';
import Code from '../services/CodeService';

const Local: NextPageWithLayout = () => {
  const list = [];
  const [selectIndex, setSelectIndex] = useState(0);
  const [noticeList, setNoticeList] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const [menualList, setMenualList] = useState([]);
  const [popupNotice, setPopupNotice] = useState([]);

  const [popupState, setPopupState] = useState(false);
  const [closeState, setCloseState] = useState(false);

  const [menu, setMenu] = useState([]);

  const ispopup = () => {
    // 팝업이 이미 존재하면 false
    // 팝업이 없어서 띄워야할땐 true
    setPopupState(true);
    console.log('팝업스테이트');
    console.log(popupState);
  };
  const closeEvent = () => {
    setCloseState(!closeState);
  };

  useEffect(() => {
    getnotice();
    fetchMenuList();
    PopupNoticeList();
    ispopup();
  }, []);

  useEffect(() => {
    // getCode();
  }, [menu]);

  //공지사항 리스트 호출
  function getnotice() {
    setSelectIndex(0);
    setFaqList([]);
    setMenualList([]);
    NoticeMng.selectnotice({
      pageNum: 1,
      pageSize: 999,
      searchValue: '',
    })
      .then((response: any) => {
        const notice = response.body;
        console.log(notice.cmknMtrList);
        setNoticeList(notice.cmknMtrList);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  }
  // faq 리스트 호출
  function getfaq() {
    setSelectIndex(1);
    setNoticeList([]);
    setMenualList([]);
    NoticeMng.selectfaq({
      pageNum: 1,
      pageSize: 999,
      searchValue: '',
    })
      .then((response: any) => {
        const faq = response.body;
        console.log(faq.faqList);
        setFaqList(faq.faqList);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  }
  // 메뉴얼 리스트 호출
  function getmenual() {
    setSelectIndex(2);
    setNoticeList([]);
    setFaqList([]);
    NoticeMng.selectmenual({
      pageNum: 1,
      pageSize: 999,
      searchValue: '',
    })
      .then((response: any) => {
        const menual = response.body;
        console.log(menual.mnulList);
        setMenualList(menual.mnulList);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  }

  //   팝업 공지사항 리스트 호출
  function PopupNoticeList() {
    NoticeMng.selectPopupNoticeList()
      .then((res: any) => {
        const popupList = res.body;
        setPopupNotice(popupList);
        console.log(popupList);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F3F4F5',
      color: 'black',
      fontSize: 15,
      whiteSpace: 'nowrap',
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

  const TopStyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#ffffff',
      color: 'black',
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
  }));

  const TopStyledTableRow = styled(TableRow)(({ theme }) => ({
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

  function fetchMenuList() {
    MenuService.getMenuList()
      .then((res: any) => {
        const list = res.body.siteList;
        const menuList = [];
        list.forEach((l) => {
          //console.log(getMenuList(cd.lnknSiteCd));
          //equalList.push(getMenuList(cd.lnknSiteCd));

          menuList.push(l.lnknSiteCd);
        });

        // 관리자의 메뉴 접근 권한중 어드민 포탈이 있을경우 가져오는 메뉴 배열에서 제거
        if (menuList[0] == '00') {
          menuList.shift();
        }
        // 일단 5번째 메뉴 추가 (이상거래탐지시스템 은 외부에서 권한이 내려올 예정)
        menuList.push('05');

        setMenu(menuList);
        console.log(menuList);
        console.log('접속가능 어드민 조회');
      })
      .catch((e) => {
        console.log('menu list fail');
        console.log(e);
      })
      .finally(() => {
        console.log('===');
      });
  }

  const noticeModalContent = () => {
    return (
      <>
        <section>
          <article className="noticetitle">
            <div>제목 : 긴급공지</div>
            <div>등록일 : 2022-07-01</div>
          </article>
          <article>
            <div className="popup_contents">
              <div>공지가 노출되는 영역</div>
            </div>
          </article>
        </section>
        <style jsx>{`
          .noticetitle {
            display: flex;
            justify-content: space-between;
          }
          .button_wrapper {
            display: flex;
            margin-top: 10px;
            justify-content: center;
          }
          .button_wrapper button {
            cursor: pointer;
            width: 80px;
            height: 35px;
            margin-left: 10px;
            margin-right: 10px;
            border: none;
          }
          .submitbutton {
            background: #0040b5;
            color: white;
          }
          .popup_contents {
            min-height: 400px;
            margin-top: 20px;
          }
        `}</style>
      </>
    );
  };

  return (
    <>
      <section>
        <article className={styles.mainMenu}>
          {menu.map((m, index) => {
            return (
              <div key={index}>
                <a href="" target="_blank">
                  <div>
                    {m === '01' ? (
                      <div>모바일관리 시스템</div>
                    ) : m === '02' ? (
                      <div>상품권통합관리 시스템</div>
                    ) : m === '03' ? (
                      <div>통계관리 시스템</div>
                    ) : m === '04' ? (
                      <div>정산관리 시스템</div>
                    ) : m === '05' ? (
                      <div>이상거래탐지 시스템</div>
                    ) : null}
                  </div>
                </a>
              </div>
            );
          })}
        </article>
      </section>

      <section className={tabstyles.tabmenuWrapper}>
        <article className={tabstyles.tabContainer}>
          <section>
            <article>
              <div className={styles.searchWrapper}>
                <div className={styles.searchInput}>
                  <ul className={tabstyles.tabMenu}>
                    <li
                      className={`${tabstyles.tabContent} ${
                        selectIndex === 0 ? tabstyles.active : null
                      }`}
                      onClick={() => {
                        getnotice();
                      }}
                    >
                      <div>공지사항</div>
                    </li>
                    <li
                      className={`${tabstyles.tabContent} ${
                        selectIndex === 1 ? tabstyles.active : null
                      }`}
                      onClick={() => {
                        getfaq();
                      }}
                    >
                      <div>FAQ</div>
                    </li>
                    <li
                      className={`${tabstyles.tabContent} ${
                        selectIndex === 2 ? tabstyles.active : null
                      }`}
                      onClick={() => {
                        getmenual();
                      }}
                    >
                      <div>메뉴얼</div>
                    </li>
                  </ul>
                  <div>
                    <input type="text" className="detail-input" placeholder="검색어를 입력하세요" />
                    <button className="el_getBtn">검색</button>
                  </div>
                </div>
                <div className={tabstyles.tabmenuSearch}>
                  <div
                    className={`${tabstyles.bl_middleWrap_right}${tabstyles.tabmenuSearchResult}`}
                  >
                    <div className="bl_middleWrap_right_result">
                      <span className={tabstyles.resultNum}>총</span>
                      <span className="hp_txt-red hp_txt-bold">333</span>
                      <span>개</span>
                    </div>

                    <select name="" id="" className="un_pageItemSelect">
                      <option value="10" className="item">
                        10개씩 보기
                      </option>
                      <option value="20" className="item">
                        20개씩 보기
                      </option>
                      <option value="30" className="item">
                        30개씩 보기
                      </option>
                      <option value="30" className="item">
                        50개씩 보기
                      </option>
                      <option value="30" className="item">
                        100개씩 보기
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                {selectIndex === 0 ? (
                  noticeList.length > 0 ? (
                    <>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">구분</StyledTableCell>
                              <StyledTableCell align="center">제목</StyledTableCell>
                              <StyledTableCell align="center">내용</StyledTableCell>
                              <StyledTableCell align="center">등록일</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {noticeList.map((nres, index) => {
                              console.log('=========log');
                              const arr = nres.mgmtSysCds;
                              const arrString = arr.toString();
                              const replaceArrEl = arrString
                                .replace('00', '토탈어드민')
                                .replace('01', '모바일관리시스템')
                                .replace('02', '상품권통합관리시스템')
                                .replace('03', '정산관리시스템')
                                .replace('04', '통계관리시스템')
                                .replace('05', '이상거래탐지시스템');
                              console.log('====pack=====');
                              console.log(replaceArrEl);
                              console.log(typeof replaceArrEl);
                              const divisionCode = replaceArrEl.split(',');
                              console.log(divisionCode);
                              return (
                                <TopStyledTableRow key={index}>
                                  <TopStyledTableCell align="center">
                                    {divisionCode}
                                    {/*{nres.mgmtSysCds}*/}
                                  </TopStyledTableCell>
                                  <TopStyledTableCell align="center">
                                    {nres.cmknTitl}
                                  </TopStyledTableCell>
                                  <TopStyledTableCell align="center">
                                    {nres.cmknCtnt}
                                  </TopStyledTableCell>
                                  <TopStyledTableCell align="center">
                                    {nres.frstRegDttm}
                                  </TopStyledTableCell>
                                </TopStyledTableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      {/*<Pagination></Pagination>*/}
                    </>
                  ) : (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">구분</StyledTableCell>
                            <StyledTableCell align="center">제목</StyledTableCell>
                            <StyledTableCell align="center">내용</StyledTableCell>
                            <StyledTableCell align="center">등록일</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TopStyledTableRow>
                            <TopStyledTableCell colSpan={4} align="center">
                              데이터가 존재하지 않습니다.
                            </TopStyledTableCell>
                          </TopStyledTableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                ) : null}

                {selectIndex === 1 ? (
                  faqList.length > 0 ? (
                    <>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">구분</StyledTableCell>
                              <StyledTableCell align="center">FAQ</StyledTableCell>
                              <StyledTableCell align="center">등록일</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {faqList.map((fres, index) => {
                              return (
                                <TopStyledTableRow key={index}>
                                  <TopStyledTableCell align="center">
                                    {fres.mgmtSysCd}
                                  </TopStyledTableCell>
                                  <TopStyledTableCell align="left">
                                    <details>
                                      <summary>{fres.faqQryCtnt}</summary>
                                      <p>{fres.faqReplCtnt}</p>
                                    </details>
                                  </TopStyledTableCell>
                                  <TopStyledTableCell align="center">
                                    {fres.frstRegDttm}
                                  </TopStyledTableCell>
                                </TopStyledTableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      {/*<Pagination></Pagination>*/}
                    </>
                  ) : (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">구분</StyledTableCell>
                            <StyledTableCell align="center">FAQ</StyledTableCell>
                            <StyledTableCell align="center">등록일</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TopStyledTableRow>
                            <TopStyledTableCell colSpan={3} align="center">
                              데이터가 존재하지 않습니다.
                            </TopStyledTableCell>
                          </TopStyledTableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                ) : null}

                {selectIndex === 2 ? (
                  menualList.length > 0 ? (
                    <>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">구분</StyledTableCell>
                              <StyledTableCell align="center">메뉴얼명</StyledTableCell>
                              <StyledTableCell align="center">설명</StyledTableCell>
                              <StyledTableCell align="center">등록일</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {menualList.map((mres, index) => {
                              return (
                                <TopStyledTableRow key={index}>
                                  <TopStyledTableCell align="center">
                                    {mres.mgmtSysCd}
                                  </TopStyledTableCell>
                                  <TopStyledTableCell align="left">
                                    {mres.mnulNm}
                                  </TopStyledTableCell>
                                  <TopStyledTableCell align="center">
                                    {mres.mnulDesc}
                                  </TopStyledTableCell>
                                  <TopStyledTableCell align="center">
                                    {mres.frstRegDttm}
                                  </TopStyledTableCell>
                                </TopStyledTableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      {/*<Pagination></Pagination>*/}
                    </>
                  ) : (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">구분</StyledTableCell>
                            <StyledTableCell align="center">메뉴얼명</StyledTableCell>
                            <StyledTableCell align="center">설명</StyledTableCell>
                            <StyledTableCell align="center">등록일</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TopStyledTableRow>
                            <TopStyledTableCell colSpan={4} align="center">
                              데이터가 존재하지 않습니다.
                            </TopStyledTableCell>
                          </TopStyledTableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                ) : null}
              </div>
            </article>
          </section>
        </article>
      </section>
      {/*  */}

      {/*{popupNotice.map((p, index) => {*/}
      {/*  return (*/}
      {/*    <Popup*/}
      {/*      // popupOpen={ispopup}*/}
      {/*      ispopup={popupState}*/}
      {/*      popupList={p}*/}
      {/*      type={'auto'}*/}
      {/*      title={'_blank'}*/}
      {/*      //   url={'/noticepopup[id]'}*/}
      {/*      url={p.cmknSeq}*/}
      {/*      width={600}*/}
      {/*      height={800}*/}
      {/*      top={100 + index * 10}*/}
      {/*      left={100 + index * 10}*/}
      {/*      closeState={closeState[index]}*/}
      {/*      key={index}*/}
      {/*    ></Popup>*/}
      {/*  );*/}
      {/*})}*/}

      <style jsx>{``}</style>
    </>
  );
};

export default Local;

Local.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={''} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
