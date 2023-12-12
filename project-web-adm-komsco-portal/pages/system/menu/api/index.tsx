import PrimaryLayout from '../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../page';
import styles from './../style/menu.module.css';
import CdService from '../../../../services/MenuService';
import { ResData } from 'types/ResData';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

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

const User: NextPageWithLayout = () => {
  const [cdg, setCdg] = useState([]);

  useEffect(() => {
    getcdg;
  }, []);

  function getcdg() {
    CdService.selectcdgroup({
      cdDvcdNm: '',
      uzYn: 'N',
      pageNum: 1,
      pageSize: 1,
    })
      .then((response: any) => {
        const cdg = response.body;
        console.log(cdg);
        setCdg(cdg);
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

  return (
    <>
      <section>
        <div className={styles.tableTab}>
          <ul>
            <li>
              <div className={styles.tabActive}>오픈뱅킹</div>
            </li>
            <li>
              <div>마이데이터</div>
            </li>
          </ul>
        </div>

        {/* 검색wrapper */}
        <div className={styles.searchInput}>
          <div className={styles.serchInputRowWrapper}>
            <div className={styles.serchInputRow}>
              <div>
                <label htmlFor="" className="el_label el_label__first">
                  조회기간
                </label>
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
              <button>당일</button>
              <button>어제</button>
              <button>1주일</button>
              <button>1개월</button>
              <button>이번달</button>
              <button>지난달</button>
              <button>직접입력</button>
            </div>
            <div className={styles.serchInputRow}>
              <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                <option value="" className="item" disabled selected hidden>
                  공통코드그룹
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
              <input placeholder="검색어를 입력하세요." />
              <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                <option value="" className="item" disabled selected hidden>
                  사용여부
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

        {cdg.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">공통그룹ID</StyledTableCell>
                    <StyledTableCell align="center">공통코드그룹명</StyledTableCell>
                    <StyledTableCell align="center">특정 지자체 설정여부</StyledTableCell>
                    <StyledTableCell align="center">지역</StyledTableCell>
                    <StyledTableCell align="center">사용여부</StyledTableCell>
                    <StyledTableCell align="center">등록자</StyledTableCell>
                    <StyledTableCell align="center">등록일</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cdg.map((cres, index) => {
                    return (
                      <TopStyledTableRow key={index}>
                        <TopStyledTableCell align="center">-</TopStyledTableCell>
                        <TopStyledTableCell align="center">{cres.cdDvcd}</TopStyledTableCell>
                        <TopStyledTableCell align="center">{cres.cdDvcdNm}</TopStyledTableCell>
                        <TopStyledTableCell align="center">{cres.cmknTrgtCd}</TopStyledTableCell>
                        <TopStyledTableCell align="center">-</TopStyledTableCell>
                        <TopStyledTableCell align="center">{cres.uzYn}</TopStyledTableCell>
                        <TopStyledTableCell align="center">{cres.frstRgsrId}</TopStyledTableCell>
                        <TopStyledTableCell align="center">{cres.frstRegDttm}</TopStyledTableCell>
                      </TopStyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/*<Pagination></Pagination>*/}
          </>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">공통그룹ID</StyledTableCell>
                    <StyledTableCell align="center">공통코드그룹명</StyledTableCell>
                    <StyledTableCell align="center">특정 지자체 설정여부</StyledTableCell>
                    <StyledTableCell align="center">지역</StyledTableCell>
                    <StyledTableCell align="center">사용여부</StyledTableCell>
                    <StyledTableCell align="center">등록자</StyledTableCell>
                    <StyledTableCell align="center">등록일</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TopStyledTableRow>
                    <TopStyledTableCell colSpan={8} align="center">
                      데이터가 존재하지 않습니다.
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </section>
      <style jsx>{``}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'API 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
