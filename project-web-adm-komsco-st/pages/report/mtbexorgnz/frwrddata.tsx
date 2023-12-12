import PrimaryLayout from '../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../page';

import ChargeService from '../../../services/reportService';

// material-ui table import
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState } from 'react';

import Pagination from '../../../components/pagination/Pagination';

const Frwrddata: NextPageWithLayout = () => {
  const [items, setItems] = useState([]);
  const [sentData, setSentData] = useState({});

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F3F4F5',
      color: 'black',
      fontSize: 15,
      border: 'none',
      padding: 10,
      whiteSpace: 'nowrap',
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

  const divideGroup = [
    { text: '당분기', value: 'all' },
    { text: '1분기', value: 'all' },
    { text: '2분기', value: 'all' },
    { text: '3분기', value: 'all' },
  ];

  const fetchFrwrData = async () => {
    console.log('국세청 전달자료 조회');
    ChargeService.chargeHistory({
      pageNum: 1,
      pageSize: 10,
      schSetlYy: '2022',
      schqtrDivCd: '01',
    }).then((response: any) => {
      const data = response;
      setItems(response.body.list);
      console.log(data);
    });
  };

  return (
    <>
      <div className="bl_content_filterWrap">
        <div className="bl_content_filterWrap_top">
          <label htmlFor="" className="el_label el_label__first">
            지역서비스
          </label>
          <select name="" id="" className="el_input_select2 hp_mr-15">
            <option value="" className="item">
              검색입력 or 선택
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
        </div>

        <div className="bl_content_filterWrap_bottom">
          <label htmlFor="" className="el_label el_label__first">
            조회월
          </label>
          <select name="" id="" className="el_input_select2 hp_mr-15">
            <option value="" className="item">
              2022년
            </option>
            <option value="" className="item">
              2021년
            </option>
          </select>
          <select name="" id="" className="el_input_select2 hp_mr-15">
            <option value="" className="item">
              당분기
            </option>
            <option value="" className="item">
              1분기
            </option>
            <option value="" className="item">
              2분기
            </option>
            <option value="" className="item">
              3분기
            </option>
            <option value="" className="item">
              4분기
            </option>
          </select>
          <button
            className="el_getBtn"
            onClick={() => {
              fetchFrwrData();
            }}
          >
            조회
          </button>
        </div>
      </div>

      <div className="bl_middleWraper">
        <div className="bl_middleWrap_right">
          <div className="bl_middleWrap_right_result">
            <span>총 n건</span>
          </div>
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
          <button className="el_classicBtn btn1">보고서 출력</button>
          <button className="el_classicBtn btn1">엑셀 다운로드</button>
        </div>
      </div>

      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" rowSpan={2}>
                  레코드구분
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  결제연도
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  분기구분
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  제출사업자번호
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  일련번호
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={3}>
                  의뢰업체
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={5}>
                  결제대행
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell align="center">사업자번호</StyledTableCell>
                <StyledTableCell align="center">대표자주민번호</StyledTableCell>
                <StyledTableCell align="center">관리번호</StyledTableCell>

                <StyledTableCell align="center">년월</StyledTableCell>
                <StyledTableCell align="center">구분</StyledTableCell>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">금액</StyledTableCell>
                <StyledTableCell align="center">금액음수표시</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{row.recDivNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.rptvRsdtRegNo}</StyledTableCell>
                  <StyledTableCell align="center">{row.qtrDivNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.psttBisno}</StyledTableCell>
                  <StyledTableCell align="center">{row.seqNo}</StyledTableCell>

                  <StyledTableCell align="center">{row.reqBisno}</StyledTableCell>
                  <StyledTableCell align="center">{row.rptvRsdtRegNo}</StyledTableCell>
                  <StyledTableCell align="center">{row.mgmtNo}</StyledTableCell>

                  <StyledTableCell align="center">{row.setlAgncyYm}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlAgncyDivCd}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlAgncyCcnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlAgncyAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.setlAgncyNegaAmt}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" rowSpan={2}>
                  봉사료금액 음수표시
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  봉사료 제외금액
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={5}>
                  의뢰업체
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={5}>
                  구분코드
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={5}>
                  가맹점명
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell align="center">아이디</StyledTableCell>
                <StyledTableCell align="center">아이디수</StyledTableCell>
                <StyledTableCell align="center">전화번호</StyledTableCell>

                <StyledTableCell align="center">휴대폰번호</StyledTableCell>
                <StyledTableCell align="center">EMAIL주소</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{row.sfeAmt}</StyledTableCell>
                  <StyledTableCell align="center">{row.sfeExcpAmt}</StyledTableCell>

                  <StyledTableCell align="center">{row.reqCoUid}</StyledTableCell>
                  <StyledTableCell align="center">{row.uidCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.tlno}</StyledTableCell>
                  <StyledTableCell align="center">{row.mbpn}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>

                  <StyledTableCell align="center">{row.divCd}</StyledTableCell>
                  <StyledTableCell align="center">{row.mercCd}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <Pagination />

      <style jsx>{`
        .bl_content_filterWrap_top a {
          font-size: 14px;
          margin: 0 10px;
        }
        .el_input_select2_xs {
          width: 150px;
          margin: 0 10px;
        }
        .bl_content_filterWrap_flex {
          width: 600px;
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
        .bl_content_filterWrap_input {
          margin: 0 0 0 80px;
        }
        .bl_content_select3 {
          margin-left: 85px;
          margin-top: 20px;
        }
        .el_input_date {
          margin-top: 10px;
        }
        .el_getBtn {
          width: 110px;
          float: right;
          margin: 0 50px;
        }
        .bl_middleWraper {
          margin-top: 50px;
          font-size: 1.4rem;
          line-height: 1.6rem;
          color: #474d52;
          display: flex;
          justify-content: flex-end;
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
          // border-right: 1px solid #474d52;
          // padding-right: 9.5px;
          // margin-right: 9.5px;
        }
        .bl_middleWrap_left {
          justify-content: left;
        }
        .el_classicBtn {
          margin: 0 0 0 10px;
        }
        .table_wrapper {
          margin-top: 10px;
        }
        section {
          margin-top: 20px;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};

export default Frwrddata;

Frwrddata.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'국세청 전달자료(분기)'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
