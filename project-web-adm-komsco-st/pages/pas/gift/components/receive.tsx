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
import GiftPolicyService from 'services/GiftPolicyService';

const Receive = () => {
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

  const fetchGiftReceiveData = async () => {
    console.log('보낸 선물 사용자별 조회');
    GiftPolicyService.PaymentGiftReceive({
      pageNum: 1,
      pageSize: 50,
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
    fetchGiftReceiveData();
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
                  지역상품권
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={3}>
                  구분
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={3}></StyledTableCell>

                <StyledTableCell align="center"></StyledTableCell>
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
                      {row.execDt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={6}>
                      {row.areaSrvcNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={6}>
                      {row.gdsDivNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={6}>
                      {row.gftcNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={2}>
                      남성
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      건수
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft10thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft20thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft30thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft40thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft50thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft60thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft70thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft80thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft10thCcnt}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="center" rowSpan={1}>
                      금액
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft20thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft30thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft40thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft50thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft60thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft70thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft80thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.recvGft10thAmt}
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
                      {row.sendGft10thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft20thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft30thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft40thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft50thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft60thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft70thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft80thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGftTotCcnt}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="center" rowSpan={1}>
                      금액
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGftTotAmt}
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
                      {row.sendGft10thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft20thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft30thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft40thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft50thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft60thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft70thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft80thCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGftTotCcnt}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="center" rowSpan={1}>
                      금액
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGft10thAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.sendGftTotAmt}
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

export default Receive;
