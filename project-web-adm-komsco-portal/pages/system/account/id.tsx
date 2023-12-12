import PrimaryLayout from '../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../page';
import styles from './style/account.module.css';
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

  return (
    <>
      <section>
        <article>
          <div className="backbutton">
            <button>목록</button>
            <button>계정삭제</button>
            <button>비밀번호 초기화</button>
            <button>수정</button>
          </div>
        </article>
        <article className="tablewrapper">
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* 계정ID */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    *계정ID
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    doom@kakako.com
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 관리자명 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    *관리자명
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <input value={'홍길동'}></input>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 휴대폰번호 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    *휴대폰번호
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    <input value={'010-1111-2222'}></input>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>직장 전화번호</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    042-1111-2222
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 이메일 / 직장전화번호*/}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    이메일
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    <input></input> @ <select></select>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    직장전화번호
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    <input value={'010-1111-2222'}></input>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 부서/팀 / 직책 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    부서/팀
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    <input value={'운영팀'}></input>
                    <input value={'운영팀'}></input>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    직책
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    <input value={'대리'}></input>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 계정유형 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    계정유형
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <input value={'지역서비스관리자'} disabled></input>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 관리자그룹 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    관리자그룹
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <select></select>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 지역서비스 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>지역서비스</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 4' }}
                    align="left"
                  ></TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>지역</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    경기도 성남시
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 사용여부 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    사용여부
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 5' }}
                    align="left"
                  ></TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </article>
        <article className="tablewrapper">
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* 등록일자 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>등록일자</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    2022-08-01
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>등록자(승인자)</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    홍길동
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </article>
        <article>
          <div className={styles.tableTab}>
            <ul>
              <li>
                <div className={styles.tabActive}>접속이력</div>
              </li>
              <li>
                <div>변경이력</div>
              </li>
            </ul>
          </div>
        </article>
        <article className="tablewrapper">
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
                    <div>접속일시</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="center">
                    <div>접속 관리시스템</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    <div>접속IP</div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableHead>
              <TableBody>
                {/* 등록일자 */}
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
                    <div>2022-08-01 15:33:25</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    <div>모바일관리시스템</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    <div>192.16.34.1</div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
      `}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'계정신청 상세'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
