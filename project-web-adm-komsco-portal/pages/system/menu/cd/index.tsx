import PrimaryLayout from '../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../page';
import styles from './../style/menu.module.css';
import Pagination from '../../../../components/pagination/Pagination';
import CdService from '../../../../services/MenuService';
import { ResData } from 'types/ResData';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

const User: NextPageWithLayout = () => {
  const [cd, setCd] = useState([]);

  useEffect(() => {
    getcd();
  }, []);

  function getcd() {
    CdService.selectcd({
      cdDvcd: '',
      dtlCdNm: '',
      uzYn: 'Y',
      pageNum: 1,
      pageSize: 1,
    })
      .then((response: any) => {
        const cd2 = response.body;
        console.log(cd2);
        setCd(cd2.cdList);
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
        <form>
          {/* 검색wrapper */}
          <div className={styles.searchInput}>
            <div className={styles.serchInputRowWrapper}>
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
                <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                  <option value="" className="item" disabled selected hidden>
                    공통코드
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
        </form>
        <div className={styles.tabmenuSearch}>
          <div className={`${styles.bl_middleWrap_left}`}>
            <button>공통코드등록</button>

            <button className={styles.subButton}>엑셀다운로드</button>
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
        {cd.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">공통그룹ID</StyledTableCell>
                    <StyledTableCell align="center">공통코드그룹명</StyledTableCell>
                    <StyledTableCell align="center">공통코드ID</StyledTableCell>
                    <StyledTableCell align="center">공통코드명</StyledTableCell>
                    <StyledTableCell align="center">우선순위</StyledTableCell>
                    <StyledTableCell align="center">사용여부</StyledTableCell>
                    <StyledTableCell align="center">등록자</StyledTableCell>
                    <StyledTableCell align="center">등록일</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cd.map((cres, index) => {
                    return (
                      <>
                        <TopStyledTableRow>
                          <TopStyledTableCell align="center">-</TopStyledTableCell>
                          <TopStyledTableCell align="left">{cres.cmknTitl}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{cres.cmknTrgtCd}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{cres.cmknTrgtCd}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{cres.bltnYn}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{cres.frstRgsrId}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{cres.frstRegDttm}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{cres.frstRegDttm}</TopStyledTableCell>
                        </TopStyledTableRow>
                      </>
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
                    <StyledTableCell align="center">공통코드ID</StyledTableCell>
                    <StyledTableCell align="center">공통코드명</StyledTableCell>
                    <StyledTableCell align="center">우선순위</StyledTableCell>
                    <StyledTableCell align="center">사용여부</StyledTableCell>
                    <StyledTableCell align="center">등록자</StyledTableCell>
                    <StyledTableCell align="center">등록일</StyledTableCell>
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
    <PrimaryLayout title={'공통코드관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
