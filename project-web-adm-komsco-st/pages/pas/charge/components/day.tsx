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
import GiftPolicyService from '../../../../services/GiftPolicyService';
import { styleTableCell, styleTableRow } from '../../../../utils/muiTable';

const Day = (props: any) => {
  const [items, setItems] = useState([]);
  const StyledTableCell = styleTableCell();

  const StyledTableRow = styleTableRow();

  const fetchChargeDayPayment = async () => {
    console.log('정책수당 지급 통계 요일 조회');
    GiftPolicyService.ChargeDayPayment({
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
    fetchChargeDayPayment();
  }, []);

  return (
    <>
      {/*일별 조회 시*/}
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" rowSpan={2}>
                  조회일
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  지역서비스
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  구분
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  상품권명/수당명
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  건수
                </StyledTableCell>

                <StyledTableCell align="center">월</StyledTableCell>
                <StyledTableCell align="center">화</StyledTableCell>
                <StyledTableCell align="center">수</StyledTableCell>
                <StyledTableCell align="center">목</StyledTableCell>
                <StyledTableCell align="center">금</StyledTableCell>
                <StyledTableCell align="center">토</StyledTableCell>
                <StyledTableCell align="center">일</StyledTableCell>
                <StyledTableCell align="center">합계</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <>
                  <StyledTableRow>
                    <StyledTableCell align="center" rowSpan={2}>
                      {row.execDt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={2}>
                      {row.areaSrvcNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={2}>
                      {row.gdsDivNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={2}>
                      {row.gftcNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      건수
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlMonUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlTueUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlWedUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlThuUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlFriUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlSatUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlSunUserCnt}
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
                      {row.acmlMonCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlTueCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlWedCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlThuCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlFriCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlSatCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlSunCagAmt}
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

      {/*월/분기/반기/연별 조회 시*/}
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" rowSpan={2}>
                  조회일
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  지역서비스
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  구분
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  상품권명/수당명
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  건수
                </StyledTableCell>

                <StyledTableCell align="center">월</StyledTableCell>
                <StyledTableCell align="center">화</StyledTableCell>
                <StyledTableCell align="center">수</StyledTableCell>
                <StyledTableCell align="center">목</StyledTableCell>
                <StyledTableCell align="center">금</StyledTableCell>
                <StyledTableCell align="center">토</StyledTableCell>
                <StyledTableCell align="center">일</StyledTableCell>
                <StyledTableCell align="center">합계</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <>
                  <StyledTableRow>
                    <StyledTableCell align="center" rowSpan={2}>
                      {row.execDt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={2}>
                      {row.areaSrvcNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={2}>
                      {row.gdsDivNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={2}>
                      {row.gftcNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      건수
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlMonUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlTueUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlWedUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlThuUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlFriUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlSatUserCnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlSunUserCnt}
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
                      {row.acmlMonCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlTueCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlWedCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlThuCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlFriCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlSatCagAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.acmlSunCagAmt}
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

export default Day;
