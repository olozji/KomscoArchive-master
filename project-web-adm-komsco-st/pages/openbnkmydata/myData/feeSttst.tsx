import { useState, useEffect } from 'react';
import PrimaryLayout from '../../../components/layout/primaryLayout/PrimaryLayout';

import { NextPageWithLayout } from '../../page';

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
import OpenBnkMdataService from '../../../services/OpenBnkMdataService';
import openBnkMdataService from '../../../services/OpenBnkMdataService';

const FeeSttst: NextPageWithLayout = () => {
  const [items, setItems] = useState([]);
  const [boarditems, setBoardItems] = useState([]);

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

  const TopStyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#ffffff',
      color: 'black',
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
  }));

  const TopStyledTableRow = styled(TableRow)(({ theme }) => ({
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

  // const fetchInfoFeePayment = async () => {
  //   console.log('정보제공 수수료 통계 합계 조회');
  //   OpenBnkMdataService.InfoFeeSumService({
  //     schSdate: '20220101',
  //     schEdate: '20250101',
  //     schTrmSrchDiv: 0,
  //   }).then((response: any) => {
  //     const data = response;
  //     setItems(data.body);
  //     console.log(data);
  //   });
  // };

  const fetchFeeBoardPayment = async () => {
    console.log('정보제공 수수료 통계 목록 조회');
    OpenBnkMdataService.InfoFeeStaticService({
      pageNum: 1,
      pageSize: 50,
      schSdate: '20220101',
      schEdate: '20250101',
      schTrmSrchDiv: 0,
    }).then((response: any) => {
      const data = response;
      setItems(data.body.list);
      console.log(data);
    });
  };

  useEffect(() => {
    fetchFeeBoardPayment();
  }, []);

  return (
    <>
      <div className="bl_content_filterWrap">
        <div className="bl_content_filterWrap_bottom">
          <label htmlFor="" className="el_label el_label__first">
            조회기간
          </label>
          <div className="bl_content_filterWrap_flex">
            <button>월</button>
            <button>분기</button>
            <button>연</button>
          </div>
          <div className="bl_content_select3">
            <select name="" id="" className="el_input_select2 hp_mr-15">
              <option value="" className="item">
                전월
              </option>
              <option value="" className="item">
                지류_통합1 사랑상품권
              </option>
              <option value="" className="item">
                휴효기간 0923
              </option>
              <option value="" className="item">
                종로FP테스트 상품권
              </option>
              <option value="" className="item">
                서울 지역상품권
              </option>
            </select>
            <select name="" id="" className="el_input_select2 hp_mr-15">
              <option value="" className="item">
                전월
              </option>
              <option value="" className="item">
                지류_통합1 사랑상품권
              </option>
              <option value="" className="item">
                휴효기간 0923
              </option>
              <option value="" className="item">
                종로FP테스트 상품권
              </option>
              <option value="" className="item">
                서울 지역상품권
              </option>
            </select>
            <button className="el_getBtn">조회</button>
          </div>
        </div>
      </div>

      <div className="usehis_table_wrapper">
        <div className="usehis_table_information">
          <div className="usehis_table_title">조회기간 합계</div>
        </div>

        <div className="usehis_table_container">
          <Table className="usehis_table">
            <TableHead>
              <TableRow>
                <TopStyledTableCell align="center">구분</TopStyledTableCell>
                <TopStyledTableCell align="center">잔액조회</TopStyledTableCell>
                <TopStyledTableCell align="center">거래내역조회</TopStyledTableCell>
                <TopStyledTableCell align="center">합계</TopStyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TopStyledTableRow>
                <TopStyledTableCell align="center">건수</TopStyledTableCell>
                <TopStyledTableCell align="center"></TopStyledTableCell>
                <TopStyledTableCell align="center"></TopStyledTableCell>
                <TopStyledTableCell align="center"></TopStyledTableCell>

                <StyledTableRow>
                  <TopStyledTableCell align="center">수수료합계</TopStyledTableCell>
                  <TopStyledTableCell align="center"></TopStyledTableCell>
                  <TopStyledTableCell align="center"></TopStyledTableCell>
                  <TopStyledTableCell align="center"></TopStyledTableCell>
                </StyledTableRow>
              </TopStyledTableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="bl_middleWrap_right">
        <div className="bl_middleWrap_right_result">
          <span>검색결과</span>
          <span className="hp_txt-red hp_txt-bold">333</span>
          <span>개</span>
        </div>
        <select name="" id="" className="un_pageItemSelect">
          <option value="10" className="item">
            10개씩 보기
          </option>
          <option value="20" className="item">
            20개씩 보기
          </option>
          <option value="30" className="item">
            30개씩 보기
          </option>
        </select>
        <button className="el_classicBtn btn1">엑셀 다운로드</button>
      </div>

      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" rowSpan={2}>
                  조회일
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  잔액조회
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  거래내역조회
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  합계
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">금액</StyledTableCell>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">금액</StyledTableCell>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">금액</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.txDt}</StyledTableCell>

                  <StyledTableCell align="center">{row.balCcnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.balAmt}</StyledTableCell>

                  <StyledTableCell align="center">{row.txCcnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.txAmt}</StyledTableCell>

                  <StyledTableCell align="center">{row.totCcnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.totAmt}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <Pagination />

      <style jsx>{`
        .bl_content_filterWrap_flex {
          width: 420px;
          text-align: center;
          margin-top: -20px;
        }
        .bl_content_filterWrap_flex button {
          width: 70px;
          margin: 0 10px;
          padding: 5px;
          border: 1px solid #333;
          border-radius: 5px;
        }
        .bl_content_select3 {
          margin-left: 85px;
          margin-top: 20px;
        }
        .el_getBtn {
          width: 110px;
          float: right;
          margin: 0 50px;
        }
        .bl_middleWrap_right {
          // margin-top: 50px;
          // font-size: 1.4rem;
          // line-height: 1.6rem;
          // color: #474d52;
          // position:absolute;
          // top:57%;
          // left:78%;
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
        .bl_middleWrap_right_left {
          display: flex;
          align-items: center;
          justify-content: left;
          margin: 10px 0;
          gap: 20px;
        }
        .usehis_table_wrapper {
          margin-top: 20px;
          border: 1px solid #000;
        }
        .usehis_table_title {
          font-size: 20px;
          padding: 20px;
        }
      `}</style>
    </>
  );
};

export default FeeSttst;

FeeSttst.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'정보제공 수수료 통계'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
