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
import reportService from '../../../services/reportService';

const Mrchn = () => {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [pagingNum, setPagingNum] = useState(0);
  const [totalCnt, setTotalCnt] = useState();

  useEffect(() => {
    fetchLocalBranch();
  }, [pageNum, pageSize]);

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
    calculate: number
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
    };
  }

  const rows = [];

  const fetchLocalBranch = async () => {
    console.log('가맹점 데이터 조회');
    reportService
      .LocalBranchDataList({
        schSdate: '20220101',
        schEdate: '20230101',
        pageNum: pageNum,
        pageSize: pageSize,
        schWord: '',
        schTrmSrchDiv: 0,
      })
      .then((response: any) => {
        const data = response;
        setItems(data.body.list);
        setTotalCnt(data.body.totCnt);
        setPagingNum(Math.ceil(data.body.totCnt / pageSize));
        console.log(data);
      });
  };

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">가맹점ID</StyledTableCell>
                <StyledTableCell align="center">사업자등록번호</StyledTableCell>
                <StyledTableCell align="center">법인여부</StyledTableCell>
                <StyledTableCell align="center">상태</StyledTableCell>
                <StyledTableCell align="center">가맹점주명</StyledTableCell>
                <StyledTableCell align="center">가맹점주 연락처</StyledTableCell>
                <StyledTableCell align="center">주소</StyledTableCell>
                <StyledTableCell align="center">우편번호</StyledTableCell>
                <StyledTableCell align="center">X좌표</StyledTableCell>
                <StyledTableCell align="center">Y좌표</StyledTableCell>
                <StyledTableCell align="center">업종</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.mercId}</StyledTableCell>
                  <StyledTableCell align="center">{row.bisno}</StyledTableCell>
                  <StyledTableCell align="center">{row.crptYn}</StyledTableCell>
                  <StyledTableCell align="center">{row.staNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.mercOwnerNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.mercOwnerCnpl}</StyledTableCell>
                  <StyledTableCell align="center">{row.addr}</StyledTableCell>
                  <StyledTableCell align="center">{row.zpcd}</StyledTableCell>
                  <StyledTableCell align="center">{row.xcdn}</StyledTableCell>
                  <StyledTableCell align="center">{row.ycdn}</StyledTableCell>
                  <StyledTableCell align="center">{row.tpbsNm}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default Mrchn;
