// material-ui table import
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '../../../../components/pagination/Pagination';
import { useEffect, useState } from 'react';
import ChargeService from '../../../../services/reportService';
import GiftPolicyService from '../../../../services/GiftPolicyService';
import { styleTableCell, styleTableRow } from '../../../../utils/muiTable';
import { numberWithCommas } from '../../../../utils/fommater';

const History = () => {
  const [items, setItems] = useState([]);
  const StyledTableCell = styleTableCell();

  const StyledTableRow = styleTableRow();

  const fetchGiftPayment = async () => {
    console.log('캐시백 월별 조회');
    GiftPolicyService.PaymentGiftData({
      pageNum: 1,
      pageSize: 10,
      schAreaSrvcUid: '',
      schSdate: '20220101',
      schEdate: '20230101',
      schTrmSrchDiv: 0,
      schGftcDivCd: '',
      schGftcCd: '',
      schCsbkDivCd: '',
    }).then((response: any) => {
      const data = response;
      setItems(response.body.list);
      console.log(data);
    });
  };

  useEffect(() => {
    fetchGiftPayment();
  }, []);

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" rowSpan={2}>
                  거래월
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  지역서비스
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  지역상품권
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={4}>
                  보낸선물
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={6}>
                  받은선물
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell align="center">보낸건수</StyledTableCell>
                <StyledTableCell align="center">보낸금액</StyledTableCell>
                <StyledTableCell align="center">취소건수(a)</StyledTableCell>
                <StyledTableCell align="center">취소금액</StyledTableCell>

                <StyledTableCell align="center">받은건수</StyledTableCell>
                <StyledTableCell align="center">받은금액</StyledTableCell>
                <StyledTableCell align="center">거절건수</StyledTableCell>
                <StyledTableCell align="center">거절금액</StyledTableCell>
                <StyledTableCell align="center">기간만료취소(b)</StyledTableCell>
                <StyledTableCell align="center">만료취소금액</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{numberWithCommas(row.execDt)}</StyledTableCell>
                  <StyledTableCell align="center">
                    {numberWithCommas(row.areaSrvcNm)}
                  </StyledTableCell>
                  <StyledTableCell align="center">{numberWithCommas(row.gdsNm)}</StyledTableCell>
                  <StyledTableCell align="center">
                    {numberWithCommas(row.sendGftCcnt)}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {numberWithCommas(row.sendGftAmt)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {numberWithCommas(row.sendGftCancCcnt)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {numberWithCommas(row.sendGftCancAmt)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {numberWithCommas(row.recvGftCcnt)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {numberWithCommas(row.recvGftAmt)}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {numberWithCommas(row.recvGftDenlCcnt)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {numberWithCommas(row.recvGftDenlAmt)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {numberWithCommas(row.recvGftExprnCcnt)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {numberWithCommas(row.recvGftExprnAmt)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <style jsx>
        {`
          .bl_content_filterWrap_top a {
            font-size: 14px;
            margin: 0 10px;
          }
          .el_input_select2_xs {
            width: 150px;
            margin: 0 10px;
          }
          .bl_content_filterWrap_flex {
            width: 600px;
            text-align: center;
            margin-top: -20px;
          }

          .bl_content_right {
            position: relative;
            left: 90%;
            margin-top: -30px;
          }

          .hp_mr_15 {
            width: 100%;
            max-width: 280px;
          }
          .bl_content_filterWrap_flex button {
            width: 70px;
            margin: 0 10px;
            padding: 5px;
            border: 1px solid #333;
            border-radius: 5px;
          }
          .bl_content_filterWrap_input {
            margin: 0 0 0 80px;
          }
          .bl_content_select3 {
            margin-left: 85px;
          }
          .el_input_date {
            margin-top: 10px;
          }
          .el_getBtn {
            width: 110px;
            float: right;
            margin: 0 50px;
          }
          .bl_middleWraper {
            margin-top: 50px;
            font-size: 1.4rem;
            line-height: 1.6rem;
            color: #474d52;
            display: flex;
            justify-content: space-between;
          }
          .bl_middleWrap_right {
            margin-top: 50px;
            // font-size: 1.4rem;
            // line-height: 1.6rem;
            // color: #474d52;
            display: flex;
            align-items: center;
            justify-content: right;
            // gap:20px;
          }
          .bl_middleWrap_right_result {
            border-right: 1px solid #474d52;
            padding-right: 9.5px;
            margin-right: 9.5px;
          }
          .bl_middleWrap_left {
            justify-content: left;
          }
          .el_classicBtn {
            margin: 0 0 0 10px;
          }
          .table_wrapper {
            margin-top: 10px;
          }
          section {
            margin: 10px 30px;
          }
        `}
      </style>
    </>
  );
};

export default History;
