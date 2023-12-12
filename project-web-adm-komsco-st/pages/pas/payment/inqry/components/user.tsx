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

const User = () => {
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

  const fetchChargeDayPayment = async () => {
    console.log('결제 사용자별 조회');
    GiftPolicyService.PaymentUserData({
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
      setItems(data.body.list);
      console.log(data);
    });
  };

  useEffect(() => {
    fetchChargeDayPayment();
  }, []);

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" rowSpan={3}>
                  조회일
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={3}>
                  지역서비스
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={3}>
                  구분
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={3}>
                  지역상품권
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={3}>
                  구분
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={3}></StyledTableCell>

                <StyledTableCell align="center">10대</StyledTableCell>
                <StyledTableCell align="center">20대</StyledTableCell>
                <StyledTableCell align="center">30대</StyledTableCell>
                <StyledTableCell align="center">40대</StyledTableCell>
                <StyledTableCell align="center">50대</StyledTableCell>
                <StyledTableCell align="center">60대</StyledTableCell>
                <StyledTableCell align="center">70대</StyledTableCell>
                <StyledTableCell align="center">80대 이상</StyledTableCell>
                <StyledTableCell align="center">합계</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <>
                  <StyledTableRow>
                    <StyledTableCell align="center" rowSpan={6}>
                      {row.setlDt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={6}>
                      {row.areaSrvcNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={6}>
                      {row.gdsDivNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={6}>
                      {row.gdsNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={2}>
                      남성
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      건수
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl10thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl20thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl30thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl40thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl50thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl60thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl70thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl80thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlUserCnt}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="center" rowSpan={1}>
                      금액
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl20thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl30thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl40thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl50thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl60thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl70thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl80thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlCagAmt}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="center" rowSpan={2}>
                      여성
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      건수
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl10thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl20thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl30thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl40thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl50thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl60thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl70thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl80thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlUserCnt}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="center" rowSpan={1}>
                      금액
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl20thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl30thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl40thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl50thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl60thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl70thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl80thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlCagAmt}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="center" rowSpan={2}>
                      전체
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      건수
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl10thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl20thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl30thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl40thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl50thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl60thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl70thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl80thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlUserCnt}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="center" rowSpan={1}>
                      금액
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl20thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl30thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl40thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl50thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl60thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl70thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setl80thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlCagAmt}
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <style jsx>{`
        section {
          margin-top: 10px;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};

export default User;
