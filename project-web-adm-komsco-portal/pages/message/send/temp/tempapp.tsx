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
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import Style from '../../style/message.module.css';
import Kakao from './messageType/kakao';
import Message from './messageType/messege';
import Email from './messageType/email';

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

  const [selectIndex, setSelectIndex] = useState(0);
  const [checked, setChecked] = useState(false);

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
              취소
            </button>
            <button>등록</button>
          </div>
        </article>
        <section>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* 메시지 타입 */}
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
                    <div>메시지 타입</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="kakao"
                          control={<Radio />}
                          label="카카오"
                          onClick={() => {
                            setSelectIndex(0);
                            setChecked(true);
                            console.log(selectIndex);
                          }}
                        />
                        <FormControlLabel
                          value="message"
                          control={<Radio />}
                          label="문자"
                          onClick={() => {
                            setSelectIndex(1);
                            console.log(selectIndex);
                          }}
                        />
                        <FormControlLabel
                          value="email"
                          control={<Radio />}
                          label="이메일"
                          onClick={() => {
                            setSelectIndex(2);
                            console.log(selectIndex);
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {selectIndex === 0 ? <Kakao /> : selectIndex === 1 ? <Message /> : <Email />}
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
    <PrimaryLayout title={'템플릿 등록'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
