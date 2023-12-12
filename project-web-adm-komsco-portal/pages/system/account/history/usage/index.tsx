import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ResData } from 'types/ResData';
import PrimaryLayout from '../../../../../components/layout/primaryLayout/PrimaryLayout';
import Pagination from '../../../../../components/pagination/Pagination';
import Account from '../../../../../services/AccountService';
import { NextPageWithLayout } from '../../../../page';
import styles from './../../style/account.module.css';

const User: NextPageWithLayout = () => {
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
  const [selectIndex, setSelectIndex] = useState(0);
  const [connecthis, setConnecthis] = useState([]);
  const [changehis, setChangehis] = useState([]);

  useEffect(() => {
    getconnecthis();
  }, []);

  function getconnecthis() {
    setSelectIndex(0);
    setChangehis([]);
    Account.selectConnectHistory({
      acntTypCd: '00',
      mngrGroupSeq: 0,
      mngrNm: '',
      lastLoginDttm: '',
      lastLoginDttmTo: '',
      pageNum: 0,
      pageSize: 0,
    })
      .then((response: any) => {
        const connecthis = response.body;
        console.log(connecthis.mngrList);
        setConnecthis(connecthis.mngrList);
      })
      .catch((e: ResData) => {
        console.log(e);
        //
        console.log('터짐');
      });
  }
  function getchangehis() {
    setSelectIndex(1);
    setConnecthis([]);
    Account.selectChangeHistory({
      acntTypCd: '00',
      mngrGroupSeq: 0,
      lsgbId: '',
      mngrNm: '',
      lastChngDttm: '',
      lastChngDttmTo: '',
      pageNum: 0,
      pageSize: 0,
    })
      .then((response: any) => {
        const changehis = response.body;
        console.log(changehis.mngrList);
        setChangehis(changehis.mngrList);
      })
      .catch((e: ResData) => {
        console.log(e);
        //
        console.log('터짐');
      });
  }

  // 기본 날짜 전날기준 처리
  const defaultDate = new Date(moment().subtract(1, 'days').format('YYYY-MM-DD'));
  // 초기화 처리
  let start = defaultDate;
  let end = defaultDate;

  // 시작일자 변경 함수
  const changeStartDate = (date) => {
    start = new Date(moment(date.target.value).format('YYYY-MM-DD'));

    // 시작일자보다 종료일자가 더 뒤로갈수없게 처리 한 것
    document.getElementById('endDateId').setAttribute('min', moment(start).format('YYYY-MM-DD'));
    console.log('시작일 변경: ' + start);
  };

  // 종료일자 변경 함수
  const changeEndDate = (date) => {
    end = new Date(moment(date.target.value).format('YYYY-MM-DD'));
    console.log('종료일 변경: ' + end);
  };

  return (
    <>
      <section>
        {/* 검색wrapper */}
        <div className={styles.searchInput}>
          <div className={styles.serchInputRowWrapper}>
            <div className={styles.serchInputRow}>
              <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                <option value="" className="item" disabled selected hidden>
                  계정유형
                </option>
                <option value="" className="item">
                  지류_통합1 사랑상품권
                </option>
                <option value="" className="item">
                  휴효기간 0923
                </option>
                <option value="" className="item">
                  종로FP테스트 상품권ddddddddd
                </option>
                <option value="" className="item">
                  서울 지역상품권
                </option>
              </select>
              <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                <option value="" className="item" disabled selected hidden>
                  검색어 선택
                </option>
                <option value="" className="item">
                  지류_통합1 사랑상품권
                </option>
                <option value="" className="item">
                  휴효기간 0923
                </option>
                <option value="" className="item">
                  종로FP테스트 상품권ddddddddd
                </option>
                <option value="" className="item">
                  서울 지역상품권
                </option>
              </select>
              <div>
                <input
                  type="date"
                  name=""
                  id="startDateId"
                  defaultValue={moment(start).format('YYYY-MM-DD')}
                  onChange={changeStartDate}
                  max={moment(defaultDate).format('YYYY-MM-DD')}
                  className="el_input_date hp_mr-10"
                />

                <span className="hp_mr-10 un_wave">~</span>
                <input
                  type="date"
                  name=""
                  id="endDateId"
                  defaultValue={moment(end).format('YYYY-MM-DD')}
                  onChange={changeEndDate}
                  max={moment(defaultDate).format('YYYY-MM-DD')}
                  className="el_input_date hp_mr-30"
                />
              </div>
              <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                <option value="" className="item" disabled selected hidden>
                  검색어
                </option>
                <option value="" className="item">
                  지류_통합1 사랑상품권
                </option>
                <option value="" className="item">
                  휴효기간 0923
                </option>
                <option value="" className="item">
                  종로FP테스트 상품권ddddddddd
                </option>
                <option value="" className="item">
                  서울 지역상품권
                </option>
              </select>
              <input placeholder="검색어를 입력하세요."></input>
            </div>
            <div className={styles.serchInputRow}>
              <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                <option value="" className="item" disabled selected hidden>
                  검색어 선택
                </option>
                <option value="" className="item">
                  지류_통합1 사랑상품권
                </option>
                <option value="" className="item">
                  휴효기간 0923
                </option>
                <option value="" className="item">
                  종로FP테스트 상품권ddddddddd
                </option>
                <option value="" className="item">
                  서울 지역상품권
                </option>
              </select>
              <div className={styles.submitButton}>
                <button className="el_getBtn">검색</button>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className={styles.tabmenuSearch}>
          <div className={`${styles.bl_middleWrap_left}`}>
            <button>엑셀다운로드</button>
          </div>
          <div className={`${styles.bl_middleWrap_right}${styles.tabmenuSearchResult}`}>
            <div className="bl_middleWrap_right_result">
              <span className={styles.resultNum}>총</span>
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
        <div>
          <div className={styles.tableTab}>
            <ul>
              <li
                className={`${styles.tabContent} ${selectIndex === 0 ? styles.tabActive : null}`}
                onClick={() => {
                  getconnecthis();
                  console.log(selectIndex);
                }}
              >
                <div>접속이력</div>
              </li>
              <li
                className={`${styles.tabContent} ${selectIndex === 1 ? styles.tabActive : null}`}
                onClick={() => {
                  getchangehis();
                  console.log(selectIndex);
                }}
              >
                <div>변경이력</div>
              </li>
              <li>
                <div>다운로드이력</div>
              </li>
            </ul>
          </div>

          {selectIndex === 0 ? (
            connecthis.length > 0 ? (
              <>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">번호</StyledTableCell>
                        <StyledTableCell align="center">관리자명</StyledTableCell>
                        <StyledTableCell align="center">계정ID</StyledTableCell>
                        <StyledTableCell align="center">계정유형</StyledTableCell>
                        <StyledTableCell align="center">관리자그룹</StyledTableCell>
                        <StyledTableCell align="center">접속일시</StyledTableCell>
                        <StyledTableCell align="center">접속IP</StyledTableCell>
                        <StyledTableCell align="center">관리시스템</StyledTableCell>
                        <StyledTableCell align="center">메뉴</StyledTableCell>
                        <StyledTableCell align="center">메뉴URL</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {connecthis.map((connectres, index) => {
                        return (
                          <TopStyledTableRow key={index}>
                            <TopStyledTableCell align="center">-</TopStyledTableCell>
                            <TopStyledTableCell align="center">
                              {connectres.mngrNm}
                            </TopStyledTableCell>
                            <TopStyledTableCell align="center">
                              {connectres.mngrId}
                            </TopStyledTableCell>
                            <TopStyledTableCell align="center">
                              {connectres.acntTypCd}
                            </TopStyledTableCell>
                            <TopStyledTableCell align="center">
                              {connectres.mngrGroupNm}
                            </TopStyledTableCell>
                            <TopStyledTableCell align="center">
                              {connectres.lastLoginDttm}
                            </TopStyledTableCell>
                            <TopStyledTableCell align="center">-</TopStyledTableCell>
                            <TopStyledTableCell align="center">-</TopStyledTableCell>
                            <TopStyledTableCell align="center">-</TopStyledTableCell>
                            <TopStyledTableCell align="center">-</TopStyledTableCell>
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
                      <StyledTableCell align="center">번호</StyledTableCell>
                      <StyledTableCell align="center">관리자명</StyledTableCell>
                      <StyledTableCell align="center">계정ID</StyledTableCell>
                      <StyledTableCell align="center">계정유형</StyledTableCell>
                      <StyledTableCell align="center">관리자그룹</StyledTableCell>
                      <StyledTableCell align="center">접속일시</StyledTableCell>
                      <StyledTableCell align="center">접속IP</StyledTableCell>
                      <StyledTableCell align="center">관리시스템</StyledTableCell>
                      <StyledTableCell align="center">메뉴</StyledTableCell>
                      <StyledTableCell align="center">메뉴URL</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TopStyledTableRow>
                      <TopStyledTableCell colSpan={10} align="center">
                        데이터가 존재하지 않습니다.
                      </TopStyledTableCell>
                    </TopStyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )
          ) : null}

          {selectIndex === 1 ? (
            changehis.length > 0 ? (
              <>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">번호</StyledTableCell>
                        <StyledTableCell align="center">관리자명</StyledTableCell>
                        <StyledTableCell align="center">계정ID</StyledTableCell>
                        <StyledTableCell align="center">계정유형</StyledTableCell>
                        <StyledTableCell align="center">관리자그룹</StyledTableCell>
                        <StyledTableCell align="center">변경일시</StyledTableCell>
                        <StyledTableCell align="center">관리시스템</StyledTableCell>
                        <StyledTableCell align="center">메뉴</StyledTableCell>
                        <StyledTableCell align="center">변경내용</StyledTableCell>
                        <StyledTableCell align="center">처리자</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {changehis.map((changeres, index) => {
                        return (
                          <TopStyledTableRow key={index}>
                            <TopStyledTableCell align="center">-</TopStyledTableCell>
                            <TopStyledTableCell align="center">
                              {changeres.mngrNm}
                            </TopStyledTableCell>
                            <TopStyledTableCell align="center">
                              {changeres.mngrId}
                            </TopStyledTableCell>
                            <TopStyledTableCell align="center">
                              {changeres.acntTypCd}
                            </TopStyledTableCell>
                            <TopStyledTableCell align="center">
                              {changeres.lastChngDttm}
                            </TopStyledTableCell>
                            <TopStyledTableCell align="center">-</TopStyledTableCell>
                            <TopStyledTableCell align="center">-</TopStyledTableCell>
                            <TopStyledTableCell align="center">-</TopStyledTableCell>
                            <TopStyledTableCell align="center">-</TopStyledTableCell>
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
                      <StyledTableCell align="center">번호</StyledTableCell>
                      <StyledTableCell align="center">관리자명</StyledTableCell>
                      <StyledTableCell align="center">계정ID</StyledTableCell>
                      <StyledTableCell align="center">계정유형</StyledTableCell>
                      <StyledTableCell align="center">관리자그룹</StyledTableCell>
                      <StyledTableCell align="center">변경일시</StyledTableCell>
                      <StyledTableCell align="center">관리시스템</StyledTableCell>
                      <StyledTableCell align="center">메뉴</StyledTableCell>
                      <StyledTableCell align="center">변경내용</StyledTableCell>
                      <StyledTableCell align="center">처리자</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TopStyledTableRow>
                      <TopStyledTableCell colSpan={10} align="center">
                        데이터가 존재하지 않습니다.
                      </TopStyledTableCell>
                    </TopStyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )
          ) : null}

          {/* {selectIndex === 1 ? (
            menual.length > 0 ? (
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
                      {faq.map((fres, index) => {
                        return (
                          <>
                            <TopStyledTableRow>
                              <TopStyledTableCell align="center">
                                {fres.faqDivCd}
                              </TopStyledTableCell>
                              <TopStyledTableCell align="left">
                                {fres.faqQryCtnt}
                              </TopStyledTableCell>
                              <TopStyledTableCell align="center">
                                {fres.frstRegDttm}
                              </TopStyledTableCell>
                            </TopStyledTableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination></Pagination>
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
          ) : null} */}
        </div>
      </section>
      <style jsx>{``}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'삭제계정관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
