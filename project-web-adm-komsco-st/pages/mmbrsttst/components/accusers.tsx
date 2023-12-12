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
import GiftPolicyService from '../../../services/GiftPolicyService';
import UserService from '../../../services/UserService';

const AccUsers = () => {
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

  const fetchAccUserData = async () => {
    console.log('사용자 통계 조회');
    UserService.UserStaticsPayment({
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
    fetchAccUserData();
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
                  누적사용자수(a)
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  1회이상 충전 사용자수(b)
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  신규
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  재가입
                </StyledTableCell>

                <StyledTableCell align="center" colSpan={3}>
                  활성(로그인 기준)
                </StyledTableCell>

                <StyledTableCell align="center" rowSpan={2}>
                  탈퇴
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  휴먼 사용자(f)
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell align="center">Dau (c)</StyledTableCell>
                <StyledTableCell align="center">Wau (d)</StyledTableCell>
                <StyledTableCell align="center">Mau (e)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.execDt}</StyledTableCell>
                  <StyledTableCell align="center">{row.acmlUserCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.cagUserCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.newUserCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.rntryUserCnt}</StyledTableCell>

                  <StyledTableCell align="center">{row.actvDauUserCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.actvWauUserCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.actvMauUserCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.secssUserCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.dormUserCnt}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default AccUsers;
