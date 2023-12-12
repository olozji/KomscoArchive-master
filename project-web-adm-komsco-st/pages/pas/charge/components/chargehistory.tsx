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

const Chargehistory = () => {
  const [items, setItems] = useState([]);
  const [totCnt, setTotCnt] = useState(0);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F3F4F5',
      color: 'black',
      fontSize: 15,
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

  const fetchChargeData = async () => {
    console.log('상품권 발행 통계 조회');
    GiftPolicyService.ChargePayment({
      pageNum: 1,
      pageSize: 10,
      schAreaSrvcUid: '',
      schSdate: '20220101',
      schEdate: '20230101',
      schTrmSrchDiv: 0,
      schGftcDivCd: '',
      schGftcCd: '',
    }).then((response: any) => {
      const data = response.body;
      setItems(data.list);
      setTotCnt(data.totCnt);
      console.log(data);
    });
  };

  useEffect(() => {
    fetchChargeData();
  }, []);

  return (
    <>
      <section>
        <div className="bl_middleWraper">
          <div className="bl_middleWrap_left">
            <span>
              기간 : <span>2022.11.16 ~ 2022.11.16 | </span>
            </span>
            <span>검색결과 : </span>
            <span className="hp_txt-red hp_txt-bold">{totCnt}</span>
            <span>개</span>
          </div>
          <div className="bl_middleWrap_right">
            <button className="el_classicBtn btn1">엑셀 다운로드</button>
            <select name="" id="" className="un_pageItemSelect">
              <option value="10" className="item">
                50개씩 보기
              </option>
              <option value="20" className="item">
                20개씩 보기
              </option>
              <option value="30" className="item">
                30개씩 보기
              </option>
            </select>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
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
                  상품권명/수당명
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  모바일상품권
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  지류상품권
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">결제금액</StyledTableCell>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">캐시백</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow>
                  <StyledTableCell align="center">{row.execDt}</StyledTableCell>
                  <StyledTableCell align="center">{row.areaSrvcNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.gdsDivNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.gftcNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.mblCagCcnt}</StyledTableCell>

                  <StyledTableCell align="center">{row.mblCagAmt}</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      {/*<section>*/}
      {/*  <TableContainer component={Paper}>*/}
      {/*    <Table sx={{ minWidth: 800 }} aria-label="customized table">*/}
      {/*      <TableHead>*/}
      {/*        <TableRow>*/}
      {/*          <StyledTableCell align="center" component="th" scope="row" rowSpan={2}>*/}
      {/*            조회일*/}
      {/*          </StyledTableCell>*/}
      {/*          <StyledTableCell align="center" rowSpan={2}>*/}
      {/*            지역서비스*/}
      {/*          </StyledTableCell>*/}
      {/*          <StyledTableCell align="center" rowSpan={2}>*/}
      {/*            구분*/}
      {/*          </StyledTableCell>*/}
      {/*          <StyledTableCell align="center" rowSpan={2}>*/}
      {/*            상품권명/수당명*/}
      {/*          </StyledTableCell>*/}
      {/*          <StyledTableCell align="center" colSpan={2}>*/}
      {/*            모바일상품권*/}
      {/*          </StyledTableCell>*/}
      {/*          <StyledTableCell align="center" colSpan={2}>*/}
      {/*            지류상품권*/}
      {/*          </StyledTableCell>*/}
      {/*        </TableRow>*/}

      {/*        <TableRow>*/}
      {/*          <StyledTableCell align="center">건수</StyledTableCell>*/}
      {/*          <StyledTableCell align="center">결제금액</StyledTableCell>*/}
      {/*          <StyledTableCell align="center">건수</StyledTableCell>*/}
      {/*          <StyledTableCell align="center">캐시백</StyledTableCell>*/}
      {/*        </TableRow>*/}
      {/*      </TableHead>*/}
      {/*      <TableBody>*/}
      {/*        {items.map((row) => (*/}
      {/*          <StyledTableRow>*/}
      {/*            <StyledTableCell align="center">{row.execDt}</StyledTableCell>*/}
      {/*            <StyledTableCell align="center">{row.areaSrvcNm}</StyledTableCell>*/}
      {/*            <StyledTableCell align="center">{row.gdsDivNm}</StyledTableCell>*/}
      {/*            <StyledTableCell align="center">{row.gftcNm}</StyledTableCell>*/}
      {/*            <StyledTableCell align="center">{row.mblCagCcnt}</StyledTableCell>*/}

      {/*            <StyledTableCell align="center">{row.mblCagAmt}</StyledTableCell>*/}
      {/*            <StyledTableCell align="center"></StyledTableCell>*/}
      {/*            <StyledTableCell align="center"></StyledTableCell>*/}
      {/*          </StyledTableRow>*/}
      {/*        ))}*/}
      {/*      </TableBody>*/}
      {/*    </Table>*/}
      {/*  </TableContainer>*/}
      {/*</section>*/}

      {/*<section>*/}
      {/*  <TableContainer component={Paper}>*/}
      {/*    <Table sx={{ minWidth: 800 }} aria-label="customized table">*/}
      {/*      <TableHead>*/}
      {/*        <TableRow>*/}
      {/*          <StyledTableCell align="center" component="th" scope="row" rowSpan={2}>*/}
      {/*            조회일*/}
      {/*          </StyledTableCell>*/}
      {/*          <StyledTableCell align="center" rowSpan={2}>*/}
      {/*            지역서비스*/}
      {/*          </StyledTableCell>*/}
      {/*          <StyledTableCell align="center" rowSpan={2}>*/}
      {/*            구분*/}
      {/*          </StyledTableCell>*/}
      {/*          <StyledTableCell align="center" rowSpan={2}>*/}
      {/*            상품권명/수당명*/}
      {/*          </StyledTableCell>*/}
      {/*          <StyledTableCell align="center" colSpan={2}>*/}
      {/*            모바일상품권*/}
      {/*          </StyledTableCell>*/}
      {/*          <StyledTableCell align="center" colSpan={2}>*/}
      {/*            지류상품권*/}
      {/*          </StyledTableCell>*/}
      {/*        </TableRow>*/}

      {/*        <TableRow>*/}
      {/*          <StyledTableCell align="center">건수</StyledTableCell>*/}
      {/*          <StyledTableCell align="center">결제금액</StyledTableCell>*/}
      {/*          <StyledTableCell align="center">건수</StyledTableCell>*/}
      {/*          <StyledTableCell align="center">캐시백</StyledTableCell>*/}
      {/*        </TableRow>*/}
      {/*      </TableHead>*/}
      {/*      <TableBody>*/}
      {/*        {items.map((row) => (*/}
      {/*          <StyledTableRow>*/}
      {/*            <StyledTableCell align="center">{row.execDt}</StyledTableCell>*/}
      {/*            <StyledTableCell align="center">{row.areaSrvcNm}</StyledTableCell>*/}
      {/*            <StyledTableCell align="center">{row.gdsDivNm}</StyledTableCell>*/}
      {/*            <StyledTableCell align="center">{row.gftcNm}</StyledTableCell>*/}
      {/*            <StyledTableCell align="center">{row.mblCagCcnt}</StyledTableCell>*/}

      {/*            <StyledTableCell align="center">{row.mblCagAmt}</StyledTableCell>*/}
      {/*            <StyledTableCell align="center"></StyledTableCell>*/}
      {/*            <StyledTableCell align="center"></StyledTableCell>*/}
      {/*          </StyledTableRow>*/}
      {/*        ))}*/}
      {/*      </TableBody>*/}
      {/*    </Table>*/}
      {/*  </TableContainer>*/}
      {/*</section>*/}
      <style jsx>{`
        section {
          margin: 20px 0;
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
          // margin-top: 50px;
          // font-size: 1.4rem;
          // line-height: 1.6rem;
          // color: #474d52;
          display: flex;
          align-items: center;
          justify-content: right;
          margin: 10px 0;
          gap: 20px;
        }
        .bl_middleWrap_right_result {
          border-right: 1px solid #474d52;
          padding-right: 9.5px;
          margin-right: 9.5px;
        }
        .bl_middleWrap_left {
          justify-content: left;
        }
      `}</style>
    </>
  );
};

export default Chargehistory;
