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

const GiftRefund = () => {
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

  function createData(
    id: number,
    title: string,
    sido: string,
    local: string,
    mainPerson: string,
    subPerson: string
  ) {
    return {
      id,
      title,
      sido,
      local,
      mainPerson,
      subPerson,
    };
  }

  const rows = [];

  const fetchCancelBranch = async () => {
    console.log('상품권 환불 데이터 조회');
    reportService
      .LocalGiftCancelDataList({
        schSdate: '20220101',
        schEdate: '20230101',
        pageNum: 1,
        pageSize: 10,
        schWord: '0',
        schTrmSrchDiv: 0,
      })
      .then((response: any) => {
        const data = response;
        setItems(data.body.list);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchCancelBranch();
  }, []);

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">사용자구분(회원번호)</StyledTableCell>
                <StyledTableCell align="center">상태</StyledTableCell>
                <StyledTableCell align="center">환불일시</StyledTableCell>
                <StyledTableCell align="center">환불요청금액</StyledTableCell>
                <StyledTableCell align="center">환불구분</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.membNo}</StyledTableCell>
                  <StyledTableCell align="center">{row.staNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.rfundDttm}</StyledTableCell>
                  <StyledTableCell align="center">{row.rfundDmanAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.rfundDivNm}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default GiftRefund;
