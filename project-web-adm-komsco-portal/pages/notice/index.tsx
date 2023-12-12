import PrimaryLayout from '../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../page';
import styles from './style/notice.module.css';
import NoticeMng from '../../services/NoticeService';
import Code from '../../services/CodeService';
import { ResData } from 'types/ResData';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'lib/store';
import Link from 'next/link';
import Select from 'components/select/index';
import Pagination from '../../components/pagination/Pagination';
import { Button } from '@mui/material';

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

  //get Notice, Code
  const [notice, setNotice] = useState([]);
  const [code, setCode] = useState([]);
  const codeData = useSelector((state: RootState) => state.codeSlice);
  const [mgmtSysCdData, setMgmtSysCdData] = useState([]);
  const [cmknTrgtCd, setcmknTrgtCdData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getnotice();
  }, []);

  function getnotice(
    pageNum = 1,
    pageSize = 10,
    cmknTitl = '',
    mgmtSysCd = '',
    cmknMtrTrgt = '',
    mcpCd = '',
    ccwCd = ''
  ) {
    NoticeMng.selectNoticeList({
      pageNum: pageNum,
      pageSize: pageSize,
      cmknTitl: cmknTitl,
      mgmtSysCd: mgmtSysCd,
      cmknMtrTrgt: cmknMtrTrgt,
      mcpCd: mcpCd,
      ccwCd: ccwCd,
    })
      .then((response: any) => {
        const notice = response.body;
        setNotice(notice.cmknList);
        setTotalPage(notice?.totCnt);
        setPageSize(pageSize);
      })
      .catch((e: ResData) => {
        console.log(e);

        console.log('터짐');
      });
  }

  //pagination
  //현제 페이지 번호
  const [page, setPage] = useState(1);
  //전체 페이지 크기
  const [totalPage, setTotalPage] = useState(null);
  //페이지 사이즈
  const [pageSize, setPageSize] = useState(10);
  const pageSizeRef = useRef<any>();
  const searchRef = useRef<any>();

  const callApi = (page = 1) => {
    console.log(pageSizeRef?.current?.value);
    getnotice(
      page,
      pageSizeRef?.current?.value,
      titleRef?.current?.value,
      mgmtSysCdRef?.current?.value,
      cmknTrgtCdRef?.current?.value
    );
  };

  const sizeChange = () => {
    setPage(1);
    setTimeout(() => {
      callApi();
    }, 100);
  };

  //search params
  const mgmtSysCdRef = useRef<any>();
  const cmknTrgtCdRef = useRef<any>();
  const titleRef = useRef<any>();

  const search = (e) => {
    e.preventDefault();
    setPage(1);
    setTimeout(() => {
      callApi();
    }, 100);
  };

  //textOver
  const textRef = useRef<any>();

  const textOver = (e) => {
    e.target.style = 'text-decoration: underline; cursor: pointer';
  };

  const textOut = (e) => {
    e.target.style = 'text-decoration: ""';
  };

  const linkRef = useRef<any>();
  const [linkNumber, setLinkNumber] = useState(null);

  return (
    <>
      <section>
        <div className={styles.searchInput}>
          <form style={{ display: 'flex' }}>
            <Select title={'전체'} codeNumber={'3010'} selectRef={mgmtSysCdRef} />

            <Select title={'공지대상'} codeNumber={'1074'} selectRef={cmknTrgtCdRef} />
            {/*
                <select name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                  <option value="" className="item">
                    시/도
                  </option>
                  {code.map((c, index) => {
                    return (
                      <option value="" className="item" key={index}>
                        {c.cdDtlDesc}
                      </option>
                    );
                  })}
                </select>
                <select name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                  <option value="" className="item">
                    시/군구
                  </option>
                  <option value="" className="item">
                    지류_통합1 사랑상품권
                  </option>
                  <option value="" className="item">
                    휴효기간 0923
                  </option>
                  <option value="" className="item">
                    종로FP테스트 상품권
                  </option>
                  <option value="" className="item">
                    서울 지역상품권
                  </option>
                </select>
              */}
            <input
              type="text"
              className="detail-input"
              placeholder="검색어를 입력하세요"
              ref={titleRef}
            />
            <button className="el_getBtn" onClick={search} ref={searchRef}>
              검색
            </button>
          </form>
        </div>
        <div className={styles.tabmenuSearch}>
          <div className={`${styles.bl_middleWrap_left}`}>
            <Link href={`notice/noticeapp`}>
              <button className={styles.cursor}>공지사항 등록</button>
            </Link>
          </div>
          <div className={`${styles.bl_middleWrap_right}${styles.tabmenuSearchResult}`}>
            <div className="bl_middleWrap_right_result">
              <span className={styles.resultNum}>검색결과</span>
              <span className="hp_txt-red hp_txt-bold">{totalPage}</span>
              <span>개</span>
            </div>

            <select
              name=""
              id=""
              className="un_pageItemSelect"
              ref={pageSizeRef}
              onChange={sizeChange}
            >
              <option value="10" className="item">
                10개씩 보기
              </option>
              <option value="20" className="item">
                20개씩 보기
              </option>
              <option value="30" className="item">
                30개씩 보기
              </option>
              <option value="50" className="item">
                50개씩 보기
              </option>
              <option value="100" className="item">
                100개씩 보기
              </option>
            </select>
          </div>
        </div>
        {notice.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">제목</StyledTableCell>
                    <StyledTableCell align="center">관리시스템</StyledTableCell>
                    <StyledTableCell align="center">공지대상</StyledTableCell>
                    <StyledTableCell align="center">팝업공지여부</StyledTableCell>
                    <StyledTableCell align="center">공지기간</StyledTableCell>
                    <StyledTableCell align="center">등록자</StyledTableCell>
                    <StyledTableCell align="center">등록일</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notice.map((nres, index) => {
                    return (
                      <>
                        <TopStyledTableRow
                          onClick={function () {
                            setLinkNumber(nres.cmknSeq);
                            setTimeout(() => {
                              linkRef?.current?.click();
                            }, 600);
                          }}
                        >
                          <TopStyledTableCell align="center">{nres.cmknSeq}</TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            <Button
                              href={`/notice/${linkNumber}`}
                              ref={linkRef}
                              onMouseOver={textOver}
                              onMouseOut={textOut}
                            >
                              {nres.cmknTitl}
                            </Button>
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">{nres.cmknTrgtCd}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{nres.cmknTrgtCd}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{nres.bltnYn}</TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            {moment(nres.cmknStrtDt).format('YYYY.MM.DD')} ~{' '}
                            {moment(nres.cmknEndDt).format('YYYY.MM.DD')}
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">{nres.lastEdtrNm}</TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            {nres.lastChngDttm}
                          </TopStyledTableCell>
                        </TopStyledTableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/*
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px',
                marginBottom: '30px',
              }}
            >
              <MuiPagination
                callApi={callApi}
                page={page}
                pageChange={pageChange}
                totalPage={totalPage}
                pageSize={pageSize}
              />
            </div>
              */}
            <div
              style={{
                marginBottom: '40px',
              }}
            >
              <Pagination
                total={totalPage}
                limit={pageSizeRef?.current?.value}
                page={page}
                pageClick={(value: number) => {
                  setPage(value);
                  callApi(value);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">제목</StyledTableCell>
                    <StyledTableCell align="center">관리시스템</StyledTableCell>
                    <StyledTableCell align="center">공지대상</StyledTableCell>
                    <StyledTableCell align="center">팝업공지여부</StyledTableCell>
                    <StyledTableCell align="center">공지기간</StyledTableCell>
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
    <PrimaryLayout title={'공지사항관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
