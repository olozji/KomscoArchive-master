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

const Partner = () => {
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

  const fetchPaymentPartnerData = async () => {
    console.log('상품권 환불 통계목록 조회');
    GiftPolicyService.PaymentPartnerData({
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
    fetchPaymentPartnerData();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" component="th" scope="row" rowSpan={3}>
                조회일
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={3}>
                광역시도
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={3}>
                시군구
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={3}>
                구분
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={3}>
                지역상품권
              </StyledTableCell>

              <StyledTableCell align="center" colSpan={6}>
                결제완료
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={14}>
                결제취소
              </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell align="center" colSpan={2}>
                앱투앱
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                webview
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                웹브릿지
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                결제 모듈
              </StyledTableCell>

              <StyledTableCell align="center" rowSpan={2}>
                총 건수
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                총 금액
              </StyledTableCell>

              <StyledTableCell align="center" colSpan={2}>
                앱투앱
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                webview
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                웹브릿지
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                결제 모듈
              </StyledTableCell>

              <StyledTableCell align="center" rowSpan={2}>
                총 건수
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                총 금액
              </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell align="center">건수</StyledTableCell>
              <StyledTableCell align="center">금액</StyledTableCell>
              <StyledTableCell align="center">건수</StyledTableCell>
              <StyledTableCell align="center">금액</StyledTableCell>
              <StyledTableCell align="center">건수</StyledTableCell>
              <StyledTableCell align="center">금액</StyledTableCell>
              <StyledTableCell align="center">건수</StyledTableCell>
              <StyledTableCell align="center">금액</StyledTableCell>
              <StyledTableCell align="center">건수</StyledTableCell>
              <StyledTableCell align="center">금액</StyledTableCell>
              <StyledTableCell align="center">건수</StyledTableCell>
              <StyledTableCell align="center">금액</StyledTableCell>
              <StyledTableCell align="center">건수</StyledTableCell>
              <StyledTableCell align="center">금액</StyledTableCell>
              <StyledTableCell align="center">건수</StyledTableCell>
              <StyledTableCell align="center">금액</StyledTableCell>
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

                <StyledTableCell align="center">{row.setlWtowFinCcnt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlWtowFinAmt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlWebviewFinCcnt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlWebviewFinAmt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlWebrgFinCcnt}</StyledTableCell>

                <StyledTableCell align="center">{row.setlWebrgFinAmt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlMdlFinCcnt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlMdlFinAmt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlWtowCancAmt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlWebviewCancAmt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlWebrgCancAmt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlMdlCancAmt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlWtowCancCcnt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlWebviewCancCcnt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlWebrgCancCcnt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlMdlCancCcnt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlMdlFinCcnt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlMdlFinAmt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlMdlFinAmt}</StyledTableCell>
                <StyledTableCell align="center">{row.setlMdlFinAmt}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Partner;
