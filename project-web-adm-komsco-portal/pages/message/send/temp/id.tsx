import PrimaryLayout from '../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../page';
import styles from '../../style/style.module.css';
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
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { auto } from '@popperjs/core';
import Mesage from '../../../../services/MesageService';

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

  function appTmpDetail() {
    Mesage.selectAppTempDetail({
      tmpltId: 'MT-KA-00030',
    })
      .then((response: any) => {
        const aa = response.body;
        console.log(aa);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    appTmpDetail();
  }, []);

  return (
    <>
      <section>
        <article>
          <div className="backbutton">
            <button>목록</button>
            <button>수정</button>
          </div>
        </article>
        <section>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* 발송구분 */}
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
                    <div>발송구분</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    카카오
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 발송유형 */}
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
                    <div>발송유형</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel value="auto" control={<Radio />} label="자동" />
                        <FormControlLabel value="manual" control={<Radio />} label="수동" />
                      </RadioGroup>
                    </FormControl>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 템플릿ID */}
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
                    <div>템플릿ID</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    MT-KA-00001
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
                    align="left"
                  >
                    <div>관리시스템</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <input type="text" value="관리시스템" />
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 업무구분 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    className="multirow"
                    sx={{ bgcolor: '#eee', gridRow: '3', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>업무구분</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '3', gridColumn: 'span 5' }} align="left">
                    <input type="text" value="업무구분" />
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 템플릿명 */}
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
                    <div>템플릿명</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <input type="text" value="템플릿명" />
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 템플릿코드 */}
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
                    <div>템플릿코드</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    Tem00001
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 템플릿내용 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    className="multirow"
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>템플릿내용</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    style={{ height: 200 }}
                    sx={{ gridRow: '1', gridColumn: 'span 5' }}
                    align="left"
                  >
                    <TextField></TextField>
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
                    <div>사용여부</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel value="use" control={<Radio />} label="사용" />
                        <FormControlLabel value="unUse" control={<Radio />} label="미사용" />
                      </RadioGroup>
                    </FormControl>
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </section>
        <section>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* 등록일자 / 등록자 */}
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
                    <div> 등록일자 </div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    2022-08-01
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div> 등록자 </div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    홍길동
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </section>
      <style jsx>{`
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
        .detailsubtitle {
          font-size: 14px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'템플릿 상세'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
