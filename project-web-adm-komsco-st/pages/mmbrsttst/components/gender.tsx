// material-ui table import
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '../../../components/pagination/Pagination';
import { useEffect, useState } from 'react';
import UserService from '../../../services/UserService';

const Gender = () => {
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

  const fetchGenderPayment = async () => {
    console.log('사용자 성별 조회');
    UserService.UserGenderPayment({
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
    fetchGenderPayment();
  }, []);

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" component="th" scope="row" rowSpan={2}>
                  구분일시
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  광역시도
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  지역명
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  조회기간별 사용자
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  활성 사용자
                </StyledTableCell>

                <StyledTableCell align="center" colSpan={3}>
                  휴먼 사용자
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell align="center">남성</StyledTableCell>
                <StyledTableCell align="center">여성</StyledTableCell>
                <StyledTableCell align="center">남성</StyledTableCell>
                <StyledTableCell align="center">여성</StyledTableCell>
                <StyledTableCell align="center">남성</StyledTableCell>
                <StyledTableCell align="center">여성</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.execDt}</StyledTableCell>
                  <StyledTableCell align="center">{row.mcpNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.ccwNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.acmlUserCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.femlAcmlUserCnt}</StyledTableCell>

                  <StyledTableCell align="center">{row.actvUserCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.femlActvUserCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.dormUserCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.femlDormUserCnt}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default Gender;
