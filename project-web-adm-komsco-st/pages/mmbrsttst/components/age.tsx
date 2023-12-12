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
import UserService from '../../../services/UserService';

const Age = () => {
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

  const fetchAgePayment = async () => {
    console.log('사용자 연령 조회');
    UserService.UserAgePayment({
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
    fetchAgePayment();
  }, []);

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" component="th" scope="row">
                  조회일
                </StyledTableCell>
                <StyledTableCell align="center">광역시도</StyledTableCell>
                <StyledTableCell align="center">시군구</StyledTableCell>
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
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.execDt}</StyledTableCell>
                  <StyledTableCell align="center">{row.mcpNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.ccwNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.acmlUser10thCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.acmlUser20thCnt}</StyledTableCell>

                  <StyledTableCell align="center">{row.acmlUser30thCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.acmlUser40thCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.acmlUser50thCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.acmlUser60thCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.acmlUser70thCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.acmlUser80thCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.acmlUserTotCnt}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default Age;
