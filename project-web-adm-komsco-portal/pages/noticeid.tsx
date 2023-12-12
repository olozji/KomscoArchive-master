import PrimaryLayout from '../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from './page';

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

const NoticeTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#fff',
    color: 'black',
    fontSize: 15,
    whiteSpace: 'nowrap',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    whiteSpace: 'nowrap',
  },
}));

const NoticeTableRow = styled(TableRow)(({ theme }) => ({
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
const Local: NextPageWithLayout = () => {
  return (
    <>
      <section>
        <div className="backbutton">
          <button>목록</button>
        </div>
        <article className="tablewrapper">
          <Table>
            <TableBody>
              <NoticeTableRow
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gridTemplateRows: 'auto',
                }}
              >
                <NoticeTableCell sx={{ gridRow: '3', gridColumn: 'span 1' }}>제목</NoticeTableCell>
                <NoticeTableCell sx={{ gridRow: '3', gridColumn: 'span 5' }}>
                  공지제목입니다
                </NoticeTableCell>
              </NoticeTableRow>
              <NoticeTableRow
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gridTemplateRows: 'auto',
                }}
              >
                <NoticeTableCell sx={{ gridRow: '3', gridColumn: 'span 1' }}>
                  등록일
                </NoticeTableCell>
                <NoticeTableCell sx={{ gridRow: '3', gridColumn: 'span 5' }}>
                  2020-01-02
                </NoticeTableCell>
              </NoticeTableRow>
              <NoticeTableRow
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gridTemplateRows: 'auto',
                }}
              >
                <NoticeTableCell sx={{ gridRow: '3', gridColumn: 'span 1' }}>
                  시스템관리 구분
                </NoticeTableCell>
                <NoticeTableCell sx={{ gridRow: '3', gridColumn: 'span 5' }}>
                  광역앱관리
                </NoticeTableCell>
              </NoticeTableRow>
              <NoticeTableRow
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gridTemplateRows: 'auto',
                }}
              >
                <NoticeTableCell sx={{ gridRow: '3', gridColumn: 'span 1' }}>
                  첨부문서
                </NoticeTableCell>
                <NoticeTableCell sx={{ gridRow: '3', gridColumn: 'span 5' }}>
                  다운로드파일 v0.1
                </NoticeTableCell>
              </NoticeTableRow>
            </TableBody>
          </Table>
        </article>
        <article className="tablewrapper">
          <Table>
            <TableBody>
              <NoticeTableRow
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gridTemplateRows: 'auto',
                }}
              >
                <NoticeTableCell sx={{ gridRow: '3', gridColumn: 'span 1' }}>내용</NoticeTableCell>
                <NoticeTableCell sx={{ gridRow: '3', gridColumn: 'span 5' }}>
                  공지제목입니다
                </NoticeTableCell>
              </NoticeTableRow>
            </TableBody>
          </Table>
        </article>
      </section>

      <style jsx>{`
        .tablewrapper {
          border-top: 1px solid black;
          border-bottom: 1px solid black;
          margin-bottom: 50px;
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
        }
        .noticewrapper {
          width: 100%;
          border-top: 1px solid black;
          border-bottom: 1px solid black;
        }
      `}</style>
    </>
  );
};

export default Local;

Local.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'공지사항'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
