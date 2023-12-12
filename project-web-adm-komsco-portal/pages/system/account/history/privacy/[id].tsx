import PrimaryLayout from '../../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../../page';
import Pagination from '../../../../../components/pagination/Pagination';
import styles from './../../style/account.module.css';
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
import { flexbox } from '@mui/system';
import { CheckBox } from '@mui/icons-material';
import Account from '@/services/AccountService';
import { useDispatch, useSelector } from 'react-redux';
import { findCodeList, grpSelectFilter, resCodeData } from '@/lib/utils/codeProvider';
import { codeState } from '@/lib/store/fetures/codeSlice';
import { RootState } from '@/lib/store';

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
      backgroundColor: '#eee',
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
  }));

  const InsideTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#ffffff',
      color: 'black',
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      whiteSpace: 'nowrap',
      border: 0,
    },
  }));

  const [grpList, setGrpList] = useState([]);
  const codeData = useSelector((state: RootState) => state.codeSlice);
  const dispatch = useDispatch();
  const getGrpCode = () => {
    if (codeData !== null && !codeData?.first) {
      //최초실행시 아닐시
      const resList = findCodeList('3010', codeData.code); //공통코드 특정코드 필터링
      setGrpList(grpSelectFilter(resList, '3010', 'cdDtlDesc', 'dtlCd', true)); //특정코드 필터링 된 것 Select형식 등 편의 맞게 가공
    } else {
      //최초실행시
      resCodeData(setGrpCode); // codeProvider 함수호출
    }
  };

  const setGrpCode = (res: any) => {
    dispatch(codeState.actions.setCodeState(res)); // 공통코드 store 입력
    setGrpList(grpSelectFilter(res, '3010', 'cdDtlDesc', 'dtlCd', true)); // 커스텀 실행
  };
  console.log(grpList);

  useEffect(() => {
    getGrpCode();
  }, []);

  const [detail, setDetail] = useState<any>({});

  const getData = () => {
    const idData = String(window.location.href).split('/');
    console.log(idData[7]);
    Account.selectPrivacyDetail(idData[7])
      .then((response: any) => {
        if (response != null) {
          setDetail(response.body);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section>
        <article>
          <div className="backbutton">
            <button
              onClick={function () {
                window.history.back();
              }}
            >
              목록
            </button>
          </div>
        </article>
        <article className="tablewrapper">
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* 취급자명 / 계정ID */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="right"
                  >
                    취급자명
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    홍길동
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="right"
                  >
                    계정아이디
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    -
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 접근IP / 조회건수 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="right"
                  >
                    접근IP
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    {detail.connIp}
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="right"
                  >
                    조회건수
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    {detail.viewCount} 건
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 관리시스템 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="right"
                  >
                    관리시스템
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    {grpList.map((e) => {
                      if (e.value == detail.lnknSiteCd) return <>{e.label}</>;
                    })}
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 메뉴/메뉴URL */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="right"
                  >
                    메뉴/메뉴URL
                  </TopStyledTableCell>

                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    {detail.menuNm} / {detail.menuConnUrl}
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 접근성유형(CRUD) */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="right"
                  >
                    접근성유형(CRUD)
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    {/*{detail.idvdInfoApchTypCd == '00'*/}
                    {/*  ? '조회'*/}
                    {/*  : detail.idvdInfoApchTypCd == '01'*/}
                    {/*  ? '수정'*/}
                    {/*  : detail.idvdInfoApchTypCd == '02'*/}
                    {/*  ? '등록'*/}
                    {/*  : '삭제'}*/}
                    {detail.idvdInfoApchTypCd == '00' ? '조회' : ''}
                    {detail.idvdInfoApchTypCd == '01' ? '수정' : ''}
                    {detail.idvdInfoApchTypCd == '02' ? '등록' : '삭제'}
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 처리일시 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="right"
                  >
                    처리일시
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    {detail.frstRegDttm}
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </article>

        <article className="tablewrapper">
          <div className="selectwrapper">
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    <div>NO.</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 8' }} align="center">
                    <div>회원번호</div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableHead>
              <TableBody>
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    <div>-</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 8' }}
                    align="center"
                  >
                    <div>-</div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/*<Pagination></Pagination>*/}
        </article>
      </section>
      <style jsx>{`
        .tablewrapper {
          margin-bottom: 50px;
        }
        section {
          margin-bottom: 50px;
        }
        .multirow {
          display: flex;
          align-items: center;
        }
        .backbutton {
          width: 100%;
          text-align: right;
          margin-bottom: 30px;
        }
        .backbutton button {
          border: none;
          background: blue;
          color: white;
          width: 120px;
          height: 35px;
          margin-right: 10px;
        }
        .savebutton {
          border: none;
          width: 80px;
          height: 100%;
          background: #ddd;
        }
        .selectwrapper {
          width: 100%;
          text-align: right;
        }
      `}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'정보보유주체 상세'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
