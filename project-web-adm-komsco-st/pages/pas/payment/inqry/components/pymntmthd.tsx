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
import GiftPolicyService from '../../../../../services/GiftPolicyService';

const Pymntmthd = () => {
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
    subPerson: string,
    vAccount: number,
    autoWithdrawal: number,
    resales: number,
    etc: number,
    sum: number,
    calculate: number,
    commission: string,
    total: number,
    amount: number,
    subAmount: number,
    subSumA: number,
    subSumB: number,
    balance: number,
    discountBalance: number,
    subSumC: number,
    subSumD: number
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
      sum,
      calculate,
      commission,
      total,
      amount,
      subAmount,
      subSumA,
      subSumB,
      balance,
      discountBalance,
      subSumC,
      subSumD,
    };
  }

  const fetchPaymentWayData = async () => {
    console.log('상품권 환불 통계목록 조회');
    GiftPolicyService.PaymentWayData({
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
    fetchPaymentWayData();
  }, []);

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
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

                <StyledTableCell align="center" colSpan={8}>
                  결제완료
                </StyledTableCell>

                <StyledTableCell align="center" colSpan={8}>
                  결제취소
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell align="center">가맹점 APP QR</StyledTableCell>
                <StyledTableCell align="center">가맹점 STAND QR</StyledTableCell>
                <StyledTableCell align="center">원격</StyledTableCell>
                <StyledTableCell align="center">온라인제휴</StyledTableCell>
                <StyledTableCell align="center">카드</StyledTableCell>
                <StyledTableCell align="center">기부금</StyledTableCell>
                <StyledTableCell align="center">POS 결제</StyledTableCell>
                <StyledTableCell align="center">합계</StyledTableCell>
                <StyledTableCell align="center">가맹점 APP QR</StyledTableCell>
                <StyledTableCell align="center">가맹점 STAND QR</StyledTableCell>
                <StyledTableCell align="center">원격</StyledTableCell>
                <StyledTableCell align="center">온라인제휴</StyledTableCell>
                <StyledTableCell align="center">카드</StyledTableCell>
                <StyledTableCell align="center">기부금</StyledTableCell>
                <StyledTableCell align="center">POS 결제</StyledTableCell>
                <StyledTableCell align="center">합계</StyledTableCell>
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

                  <StyledTableCell align="center">{row.setlMercAppQrFinAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlMercStandQrFinAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlRmotFinAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlOnlnAlncFinAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlCardSetlFinAmt}</StyledTableCell>

                  <StyledTableCell align="center">{row.setlDontFinAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlPosSetlFinAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.totSetlFinAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlMercAppQrCancAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlMercStandQrCancAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlRmotCancAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlOnlnAlncCancAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlCardSetlCancAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlDontCancAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlPosSetlCancAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.totSetlCancAmt}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default Pymntmthd;
