import PrimaryLayout from '../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../page';
import styles from './../style/notice.module.css';
import Pagination from '../../../components/pagination/Pagination';
import NoticeMng from '../../../services/NoticeService';
import { ResData } from '../../../types/ResData';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import PopupComponent from 'components/modal/popup';
import { useRef } from 'react';
import Select from '@/components/select';
import MuiPagination from '@/components/muipagination';
import { Button } from '@mui/material';

const User: NextPageWithLayout = () => {
  const [menual, setMenual] = useState([]);
  useEffect(() => {
    getmenual();
  }, []);
  function getmenual(mgmtSysCd = '', mnulNm = '', bltnYn = '', pageNum = 1, pageSize = 10) {
    NoticeMng.selectMenualList({
      mgmtSysCd: mgmtSysCd,
      mnulNm: mnulNm,
      bltnYn: bltnYn,
      pageNum: pageNum,
      pageSize: pageSize,
    })
      .then((response: any) => {
        const menual = response.body;
        console.log(menual.mnulList);
        setMenual(menual.mnulList);
        setTotalPage(menual?.totCnt);
        setPageSize(pageSize);
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

  //pagination
  //현제 페이지 번호
  const [page, setPage] = useState(1);
  //전체 페이지 크기
  const [totalPage, setTotalPage] = useState(null);
  //페이지 사이즈
  const [pageSize, setPageSize] = useState(10);
  const pageSizeRef = useRef<any>();

  const callApi = (page = 1) => {
    console.log(page);
    getmenual(
      mgmtSysCdRef?.current?.value,
      titleRef?.current?.value,
      '',
      page,
      pageSizeRef?.current?.value
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

  const [modalNumber, setModalNumber] = useState(null);
  const modalRef = useRef<any>();

  return (
    <>
      <section>
        <div className={styles.searchInput}>
          <form>
            <Select title={'전체'} codeNumber={'3010'} selectRef={mgmtSysCdRef} />

            <input
              type="text"
              className="detail-input"
              placeholder="검색어를 입력하세요"
              ref={titleRef}
            />
            <button className="el_getBtn" onClick={search}>
              검색
            </button>
          </form>
        </div>
        <div className={styles.tabmenuSearch}>
          <div className={`${styles.bl_middleWrap_left}`}>
            <PopupComponent
              type={'button'}
              url={'./addmenual'}
              width={600}
              height={800}
              name={'메뉴얼 등록'}
              title={'메뉴얼 등록'}
              closebutton={undefined}
              closeState={undefined}
              closeFunction={function () {
                getmenual(
                  mgmtSysCdRef?.current?.value,
                  titleRef?.current?.value,
                  '',
                  page,
                  pageSizeRef?.current?.value
                );
              }}
            ></PopupComponent>
          </div>
          <label
            ref={modalRef}
            style={{
              display: 'none',
            }}
          >
            <PopupComponent
              type={'button'}
              url={`/notice/manual/${modalNumber}`}
              width={600}
              height={800}
              name={''}
              title={''}
              closebutton={undefined}
              closeState={undefined}
              closeFunction={function () {
                getmenual(
                  mgmtSysCdRef?.current?.value,
                  titleRef?.current?.value,
                  '',
                  page,
                  pageSizeRef?.current?.value
                );
              }}
            ></PopupComponent>
          </label>
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

        {menual.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">관리시스템</StyledTableCell>
                    <StyledTableCell align="center">메뉴얼명</StyledTableCell>
                    <StyledTableCell align="center">버전</StyledTableCell>
                    <StyledTableCell align="center">게시여부</StyledTableCell>
                    <StyledTableCell align="center">등록자</StyledTableCell>
                    <StyledTableCell align="center">등록일</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menual.map((mres, index) => {
                    return (
                      <>
                        <TopStyledTableRow
                          onMouseDown={function () {
                            setModalNumber(mres.mnulSeq);
                            setTimeout(() => {
                              modalRef?.current?.click();
                            }, 600);
                          }}
                        >
                          <TopStyledTableCell align="center">{mres.mnulSeq}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{mres.mgmtSysCd}</TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            <Button onMouseOver={textOver} onMouseOut={textOut}>
                              {mres.mnulNm}
                            </Button>
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">{mres.version}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{mres.bltnYn}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{mres.frstRgsrNm}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{mres.frstRegDttm}</TopStyledTableCell>
                        </TopStyledTableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/*<Pagination></Pagination>*/}
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
                    <StyledTableCell align="center">관리시스템</StyledTableCell>
                    <StyledTableCell align="center">메뉴얼명</StyledTableCell>
                    <StyledTableCell align="center">버전</StyledTableCell>
                    <StyledTableCell align="center">게시여부</StyledTableCell>
                    <StyledTableCell align="center">등록자</StyledTableCell>
                    <StyledTableCell align="center">등록일</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TopStyledTableRow>
                    <TopStyledTableCell colSpan={7} align="center">
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
    <PrimaryLayout title={'메뉴얼 등록'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
