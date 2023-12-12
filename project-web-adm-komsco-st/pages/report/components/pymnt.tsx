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

const GiftPayment = () => {
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

  const fetchGiftRefundBranch = async () => {
    console.log('상품권 결제 조회');
    reportService
      .LocalGiftPayment({
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
    fetchGiftRefundBranch();
  }, []);

  function createData(
    id: number,
    title: string,
    sido: string,
    local: string,
    mainPerson: string,
    subPerson: string,
    vAccount: number,
    autoWithdrawal: number,
    resales: number,
    etc: number
  ) {
    return {
      id,
      title,
      sido,
      local,
      mainPerson,
      subPerson,
      vAccount,
      autoWithdrawal,
      resales,
      etc,
    };
  }

  const rows = [];

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">회원ID</StyledTableCell>
                <StyledTableCell align="center">결제일시</StyledTableCell>
                <StyledTableCell align="center">결제금액</StyledTableCell>
                <StyledTableCell align="center">가맹점ID</StyledTableCell>
                <StyledTableCell align="center">가맹점명</StyledTableCell>
                <StyledTableCell align="center">가맹점사업자번호</StyledTableCell>
                <StyledTableCell align="center">구분</StyledTableCell>
                <StyledTableCell align="center">결제구분</StyledTableCell>
                <StyledTableCell align="center">결제상태구분</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.membNo}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlDttm}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.mercNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.mercBusiNo}</StyledTableCell>
                  <StyledTableCell align="center">{row.gdsPlcyAlowDivNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlDivNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlStaDivNm}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default GiftPayment;
