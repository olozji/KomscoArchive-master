// material-ui table import
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import reportService from '../../../services/reportService';

const GiftBuy = () => {
  const [items, setItems] = useState([]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F3F4F5',
      color: 'black',
      fontSize: 15,
      border: 'none',
      padding: 10,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
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

  const rows = [];

  const fetchGiftDataPayment = async () => {
    console.log('상품권 구매 조회');
    reportService
      .LocalGiftDataList({
        schSdate: '20220101',
        schEdate: '20230101',
        pageNum: 1,
        pageSize: 10,
        schWord: '',
        schTrmSrchDiv: 0,
      })
      .then((response: any) => {
        const data = response;
        setItems(data.body.list);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchGiftDataPayment();
  }, []);

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">사용자구분</StyledTableCell>
                <StyledTableCell align="center">회원ID</StyledTableCell>
                <StyledTableCell align="center">구매일시</StyledTableCell>
                <StyledTableCell align="center">구매금액</StyledTableCell>
                <StyledTableCell align="center">실충전금액</StyledTableCell>
                <StyledTableCell align="center">할인금액</StyledTableCell>
                <StyledTableCell align="center">구분</StyledTableCell>
                <StyledTableCell align="center">충전구분</StyledTableCell>
                <StyledTableCell align="center">구매자</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.userDivNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.membNo}</StyledTableCell>
                  <StyledTableCell align="center">{row.buynDttm}</StyledTableCell>
                  <StyledTableCell align="center">{row.buynAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.rcagAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.dcAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.cagDivNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.rcagAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.dcAmt}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default GiftBuy;
