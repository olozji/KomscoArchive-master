import PrimaryLayout from '../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../page';
import styles from '../../style/message.module.css';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useEffect, useRef, useState } from 'react';
import Code from '../../../../services/CodeService';
import { codeState } from '../../../../lib/store/fetures/codeSlice';
import { ResData } from '../../../../types/ResData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../lib/store';
import NoticeMng from '../../../../services/NoticeService';
import Mesage from '../../../../services/MesageService';
import temp from '../../push/temp';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import moment from 'moment/moment';
import TableBody from '@mui/material/TableBody';
import axios from 'axios';

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

  const [tmpl, setTmpl] = useState([]);
  const [tmps, setTmps] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [lastPageNumber, setLastPageNumber] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const codeData = useSelector((state: RootState) => state.codeSlice);
  const dispatch = useDispatch();
  const [msgSndDivCd, setMsgSndDivCd] = useState([]);
  const [uzYn, setUzYn] = useState([]);

  useEffect(() => {
    if (totalPage != null) {
      setLastPageNumber(Math.ceil(totalPage / pageSize));
    }
  }, [totalPage, pageSize]);

  const textRef = useRef<any>();

  const textOver = (e) => {
    e.target.style = 'text-decoration: underline; cursor: pointer';
  };

  const textOut = (e) => {
    e.target.style = 'text-decoration: ""';
  };

  function getTempList(tmpltNm = '', uzYn = 'Y') {
    Mesage.selectTempList({
      tmpltNm: '',
      uzYn: 'Y',
      msgSndDivCd: null,
      pageNum: 1,
      pageSize: 999,
    })
      .then((response: any) => {
        const tmp = response.body;
        setTmpl(tmp);
        setTmps(tmp.temps);
      })
      .catch((e: ResData) => {
        console.log(e);
      });
  }

  console.log(tmpl);
  console.log(tmps);

  useEffect(() => {
    getTempList();
  }, []);

  return (
    <>
      <section>
        {/* 검색wrapper */}
        <div className={styles.searchInput}>
          <div className={styles.serchInputRowWrapper}>
            <div className={styles.serchInputRow}>
              <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                <option value="" className="item" disabled selected hidden>
                  발송구분
                </option>
                {msgSndDivCd.map((c, index) => {
                  return (
                    <option value={`${c.dtlCd}`} className="item" key={index}>
                      {`${c.dtlCdNm}`}
                    </option>
                  );
                })}
                {/*<option value="" className="item">*/}
                {/*  알림톡*/}
                {/*</option>*/}
                {/*<option value="" className="item">*/}
                {/*  문자*/}
                {/*</option>*/}
                {/*<option value="" className="item">*/}
                {/*  이메일*/}
                {/*</option>*/}
              </select>
              <input placeholder="검색어를 입력해주세요."></input>
              <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                <option value="" className="item" disabled selected hidden>
                  사용 여부
                </option>
                {/*{uzYn.map((c, index) => {*/}
                {/*  return (*/}
                {/*    <option value={`${c.dtlCd}`} className="item" key={index}>*/}
                {/*      {`${c.uzYn}`}*/}
                {/*    </option>*/}
                {/*  );*/}
                {/*})}*/}
                {/*<option value="" className="item">*/}
                {/*  사용*/}
                {/*</option>*/}
                {/*<option value="" className="item">*/}
                {/*  미사용*/}
                {/*</option>*/}
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
            <a href="./tempapp">
              <button className={styles.cursor}>템플릿 등록</button>
            </a>
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
        {/*{tmps.length > 0 ? (*/}
        {/*  <>*/}
        {/*    <TableContainer component={Paper}>*/}
        {/*      <Table sx={{ minWidth: 700 }} aria-label="customized table">*/}
        {/*        <TableHead>*/}
        {/*          <TableRow>*/}
        {/*            <StyledTableCell align="center">번호</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">템플릿ID</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">템플릿명</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">발송구분</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">발송유형</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">관리시스템</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">업무구분</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">사용여부</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">등록자</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">등록일</StyledTableCell>*/}
        {/*          </TableRow>*/}
        {/*        </TableHead>*/}
        {/*        <TableBody>*/}
        {/*          {tmps.map((data, index) => {*/}
        {/*            return (*/}
        {/*              <>*/}
        {/*                <TopStyledTableRow>*/}
        {/*                  <TopStyledTableCell align="center">{data.cmknSeq}</TopStyledTableCell>*/}
        {/*                  <TopStyledTableCell align="left">*/}
        {/*                    <Link href={`/message/send/temp/id/`}>*/}
        {/*                      <span onMouseOver={textOver} onMouseOut={textOut}>*/}
        {/*                        {data.tmpltId}*/}
        {/*                      </span>*/}
        {/*                    </Link>*/}
        {/*                  </TopStyledTableCell>*/}
        {/*                  <TopStyledTableCell align="center">{data.tmpltNm}</TopStyledTableCell>*/}
        {/*                  <TopStyledTableCell align="center">{data.cmknTrgtCd}</TopStyledTableCell>*/}
        {/*                  <TopStyledTableCell align="center">{data.bltnYn}</TopStyledTableCell>*/}
        {/*                  <TopStyledTableCell align="center">*/}
        {/*                    {data.mgmtSysCd === '00' ? (*/}
        {/*                      <div>어드민포탈</div>*/}
        {/*                    ) : data.mgmtSysCd === '01' ? (*/}
        {/*                      <div>모바일관리시스템</div>*/}
        {/*                    ) : data.mgmtSysCd === '02' ? (*/}
        {/*                      <div>상품권통합관리시스템</div>*/}
        {/*                    ) : data.mgmtSysCd === '03' ? (*/}
        {/*                      <div>정산관리시스템</div>*/}
        {/*                    ) : data.mgmtSysCd === '04' ? (*/}
        {/*                      <div>통계관리시스템</div>*/}
        {/*                    ) : (*/}
        {/*                      <div>이상거래탐지시스템</div>*/}
        {/*                    )}*/}
        {/*                  </TopStyledTableCell>*/}
        {/*                  <TopStyledTableCell align="center">{data.appDivCd}</TopStyledTableCell>*/}
        {/*                  <TopStyledTableCell align="center">*/}
        {/*                    {data.uzYn === 'Y' ? '사용' : '미사용'}*/}
        {/*                  </TopStyledTableCell>*/}
        {/*                  <TopStyledTableCell align="center">{data.frstRgsrNm}</TopStyledTableCell>*/}
        {/*                  <TopStyledTableCell align="center">{data.frstRegDttm}</TopStyledTableCell>*/}
        {/*                </TopStyledTableRow>*/}
        {/*              </>*/}
        {/*            );*/}
        {/*          })}*/}
        {/*        </TableBody>*/}
        {/*      </Table>*/}
        {/*    </TableContainer>*/}
        {/*  </>*/}
        {/*) : (*/}
        {/*  <>*/}
        {/*    <TableContainer component={Paper}>*/}
        {/*      <Table sx={{ minWidth: 700 }} aria-label="customized table">*/}
        {/*        <TableHead>*/}
        {/*          <TableRow>*/}
        {/*            <StyledTableCell align="center">번호</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">템플릿ID</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">템플릿명</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">발송구분</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">발송유형</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">관리시스템</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">업무구분</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">사용여부</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">등록자</StyledTableCell>*/}
        {/*            <StyledTableCell align="center">등록일</StyledTableCell>*/}
        {/*          </TableRow>*/}
        {/*        </TableHead>*/}
        {/*        <TableBody>*/}
        {/*          <TopStyledTableRow>*/}
        {/*            <TopStyledTableCell colSpan={8} align="center">*/}
        {/*              데이터가 존재하지 않습니다.*/}
        {/*            </TopStyledTableCell>*/}
        {/*          </TopStyledTableRow>*/}
        {/*        </TableBody>*/}
        {/*      </Table>*/}
        {/*    </TableContainer>*/}
        {/*  </>*/}
        {/*)}*/}
      </section>
      <style jsx>{``}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'템플릿 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
