import PrimaryLayout from '../../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../../page';
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
import Style from '../../../style/message.module.css';

const Messege: NextPageWithLayout = () => {
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
          <select name="" id="" className="un_pageItemSelect">
            <option value="aaaa" className="item">
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
          sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
          align="left"
        >
          <div>업무구분</div>
        </TopStyledTableCell>
        <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
          <select name="" id="" className="un_pageItemSelect">
            <option value="aaaa" className="item">
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
        </TopStyledTableCell>
      </TopStyledTableRow>
      {/* 발송구분 */}
      <TopStyledTableRow
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'auto',
        }}
      >
        <TopStyledTableCell
          sx={{ bgcolor: '#eee', gridRow: '3', gridColumn: 'span 1' }}
          align="left"
        >
          <div>발송구분</div>
        </TopStyledTableCell>
        <TopStyledTableCell sx={{ gridRow: '3', gridColumn: 'span 5' }} align="left">
          <select name="" id="" className="un_pageItemSelect">
            <option value="aaaa" className="item">
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
        </TopStyledTableCell>
      </TopStyledTableRow>
      {/* 발송자정보 */}
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
          <div>발송자정보</div>
        </TopStyledTableCell>
        <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
          <TextField></TextField>
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

export default Messege;

Messege.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'템플릿 등록'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
