import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import GiftPolicyService from '../../../../../services/GiftPolicyService';

const Pymntcnclhis = () => {
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

  const fetchCancelData = async () => {
    console.log('상품권 환불 통계목록 조회');
    GiftPolicyService.PaymentCancelData({
      pageNum: 1,
      pageSize: 10,
      schAreaSrvcUid: '',
      schSdate: '20220101',
      schEdate: '20230101',
      schTrmSrchDiv: 0,
      schGftcDivCd: '',
      schGftcCd: '',
    }).then((response: any) => {
      const data = response;
      setItems(response.body.list);
      console.log(data);
    });
  };

  useEffect(() => {
    fetchCancelData();
  }, []);

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" component="th" scope="row" rowSpan={2}>
                  조회일
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  광역시도
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  시군구
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  구분
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  지역상품권
                </StyledTableCell>

                <StyledTableCell align="center" colSpan={4}>
                  결제완료
                </StyledTableCell>

                <StyledTableCell align="center" colSpan={4}>
                  결제취소
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">결제금액</StyledTableCell>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">캐시백</StyledTableCell>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">취소금액</StyledTableCell>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">캐시백</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.setlDt}</StyledTableCell>
                  <StyledTableCell align="center">{row.mcpNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.ccwNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.gdsDivNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.gdsNm}</StyledTableCell>

                  <StyledTableCell align="center">{row.setlFinCcnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlFinAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlFinCcnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.etc}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlFinCcnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlCancAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlCancCcnt}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default Pymntcnclhis;
