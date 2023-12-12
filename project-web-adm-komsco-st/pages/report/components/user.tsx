// material-ui table import
import { styled } from '@mui/material/styles';

import ChargeService from '../../../services/reportService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import report from '../index';
import reportService from '../../../services/reportService';

const UserData = () => {
  const [items, setItems] = useState([]);
  const [sentData, setSentData] = useState({});

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

  const fetchUserData = async () => {
    console.log('사용자 데이터 조회');
    reportService
      .LocalUserDataList({
        schSdate: '20220101',
        schEdate: '20230101',
        pageNum: 1,
        pageSize: 10,
        schWord: '',
        schTrmSrchDiv: 0,
      })
      .then((response: any) => {
        const data = response;
        setItems(response.body.list);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">사용자구분ID</StyledTableCell>
                <StyledTableCell align="center">성별</StyledTableCell>
                <StyledTableCell align="center">나이대</StyledTableCell>
                <StyledTableCell align="center">생년월일</StyledTableCell>
                <StyledTableCell align="center">휴대전화</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.membNo}</StyledTableCell>
                  <StyledTableCell align="center">{row.sexDivNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.agrn}</StyledTableCell>
                  <StyledTableCell align="center">{row.brdd}</StyledTableCell>
                  <StyledTableCell align="center">{row.cpno}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default UserData;
