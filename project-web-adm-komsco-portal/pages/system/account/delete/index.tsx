import PrimaryLayout from '../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../page';
import styles from './../style/account.module.css';
import Pagination from '../../../../components/pagination/Pagination';
import Account from '../../../../services/AccountService';
import { ResData } from 'types/ResData';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

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

  const [accountapp, setAccountapp] = useState([]);

  useEffect(() => {
    getaccount();
  }, []);

  function getaccount() {
    Account.selectAdminAccount({
      acntTypCd: '',
      mngrGroupSeq: 0,
      lsgbId: '',
      mngrNm: '',
      uzYn: '',
      frstRegDttm: '',
      frstRegDttmTo: '',
      pageNum: 0,
      pageSize: 0,
    })
      .then((response: any) => {
        const accountapp = response.body;
        console.log(accountapp.mngrList);
        setAccountapp(accountapp.mngrList);
      })
      .catch((e: ResData) => {
        console.log(e);

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
              <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                <option value="" className="item" disabled selected hidden>
                  지역서비스
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
                  상태
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
            </div>
            <div className={styles.serchInputRow}>
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
        {accountapp.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">계정ID</StyledTableCell>
                    <StyledTableCell align="center">계정유형</StyledTableCell>
                    <StyledTableCell align="center">관리자그룹</StyledTableCell>
                    <StyledTableCell align="center">지역서비스</StyledTableCell>
                    <StyledTableCell align="center">계정삭제일</StyledTableCell>
                    <StyledTableCell align="center">처리구분</StyledTableCell>
                    <StyledTableCell align="center">처리일자</StyledTableCell>
                    <StyledTableCell align="center">처리자</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountapp.map((ares, index) => {
                    return (
                      <TopStyledTableRow key={index}>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
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
                    <StyledTableCell align="center">계정ID</StyledTableCell>
                    <StyledTableCell align="center">계정유형</StyledTableCell>
                    <StyledTableCell align="center">관리자그룹</StyledTableCell>
                    <StyledTableCell align="center">지역서비스</StyledTableCell>
                    <StyledTableCell align="center">계정삭제일</StyledTableCell>
                    <StyledTableCell align="center">처리구분</StyledTableCell>
                    <StyledTableCell align="center">처리일자</StyledTableCell>
                    <StyledTableCell align="center">처리자</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TopStyledTableRow>
                    <TopStyledTableCell colSpan={9} align="center">
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
    <PrimaryLayout title={'삭제계정관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
