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

const Type = () => {
  const [items, setItems] = useState([]);
  const [dataDivList, setDvList] = useState([]);
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

  const [params, setParams] = useState({
    pageNum: 1,
    pageSize: 50,
    schAreaSrvcUid: '',
    schSdate: '20220101',
    schEdate: '20230101',
    schTrmSrchDiv: 0, // 일,월, 분기 등등 초기는 일자로
    schGftcDivCd: '',
    schGftcCd: '',
    mercTypCd: [],
  });

  const fetchPaymentBranchData = async () => {
    console.log('결제 가맹점 조회');
    console.log(params);
    GiftPolicyService.PaymentBranchData(params)
      .then((response: any) => {
        const data = response;
        const dataList = response.body.list;

        const mercTypeList = [];

        dataList.forEach((list) => {
          if (mercTypeList.length == 0) {
            mercTypeList.push(list.mercTypCd);
          } else {
            if (mercTypeList.indexOf(list.mercTypCd) == -1) {
              mercTypeList.push(list.mercTypCd);
            }
          }
        });

        console.log('-----전체 mercTypeList---');
        console.log(mercTypeList);
        console.log('-----end----');

        setItems(data.body.list);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchPaymentBranchData();
    //fetchBranchTypeData();
  }, [params.pageSize, params.pageNum]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" component="th" scope="row" rowSpan={2}>
                조회일
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                지역서비스
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                구분
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                지역상품권
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                가맹점유형
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                결제완료
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                결제취소
              </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell align="center">건수</StyledTableCell>
              <StyledTableCell align="center">결제 금액</StyledTableCell>
              <StyledTableCell align="center">건수</StyledTableCell>
              <StyledTableCell align="center">결제 금액</StyledTableCell>
            </TableRow>
          </TableHead>
          {items.length === 0 ? (
            <TableBody>
              <TableRow>
                <StyledTableCell align="center" colSpan={15}>
                  조회 내역이 없습니다.
                </StyledTableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {items.map((row) => (
                <>
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setlDt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.areaSrvcNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.gdsDivNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.gdsNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.mercTypNm}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setlFinCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setlFinAmt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setlCancCcnt}
                    </StyledTableCell>
                    <StyledTableCell align="center" rowSpan={1}>
                      {row.setlCancAmt}
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default Type;
