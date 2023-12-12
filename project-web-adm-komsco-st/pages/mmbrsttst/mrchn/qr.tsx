import PrimaryLayout from '../../../components/layout/primaryLayout/PrimaryLayout';
import Pagination from '../../../components/pagination/Pagination';

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
import { useState, useEffect } from 'react';
import UserService from '../../../services/UserService';
import NewPagination from '../../../components/pagination/NewPagination';

const QrPage: NextPageWithLayout = () => {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [pagingNum, setPagingNum] = useState(0);
  const [totalCnt, setTotalCnt] = useState();

  useEffect(() => {
    fetchQrPayment();
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

  const rows = [];

  const fetchQrPayment = async () => {
    console.log('qr키트 현황 조회');
    UserService.QrKitPayment({
      schSdate: '20220101',
      schEdate: '20230101',
      pageNum: pageNum,
      pageSize: pageSize,
      schMcpCd: '01',
      schCcwCd: '01',
      schTrmSrchDiv: 0,
    }).then((response: any) => {
      const data = response;
      setItems(response.body.list);
      setTotalCnt(data.body.totCnt);
      setPagingNum(Math.ceil(data.body.totCnt / pageSize));
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
            조회기간
          </label>
          <div className="bl_content_filterWrap_flex">
            <button>일</button>
            <button>월</button>
            <button>분기</button>
            <button>반기</button>
            <button>연</button>
            <button>누적</button>
          </div>
          <div className="bl_content_select3">
            <select name="" id="" className="el_input_select2 hp_mr-15">
              <option value="" className="item">
                조회당월
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
                조회당월
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
            <button
              className="el_getBtn"
              onClick={() => {
                fetchQrPayment();
              }}
            >
              조회
            </button>
          </div>
        </div>
      </div>

      <div className="bl_middleWrap_right">
        <div className="bl_middleWrap_right_result">
          <span>총 n건</span>
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
                <StyledTableCell align="center" component="th" scope="row" rowSpan={2}>
                  지역서비스
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  오픈일
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={4}>
                  가맹점
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell align="center">서비스 최초 오픈일 (a)</StyledTableCell>
                <StyledTableCell align="center">QR 오픈일 (b)</StyledTableCell>
                <StyledTableCell align="center">QR전체제작</StyledTableCell>
                <StyledTableCell align="center">QR키트 사용</StyledTableCell>
                <StyledTableCell align="center">QR키트 미사용</StyledTableCell>
                <StyledTableCell align="center">미사용 비율(%)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.areaSrvcNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.frstOpenDt}</StyledTableCell>
                  <StyledTableCell align="center">{row.qrOpenDt}</StyledTableCell>
                  <StyledTableCell align="center">{row.totQrKitMercCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.qrKitMnfcNcnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.qrKitNotsetMercCnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.notsetRate}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <NewPagination
        totCnt={pagingNum}
        pageSize={pageSize}
        changePage={(page) => {
          setPageNum(page);
        }}
      />

      <style jsx>{`
        .bl_content_filterWrap_flex {
          width: 700px;
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
          position: absolute;
          top: 46%;
          left: 78%;
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
        section {
          margin-top: 50px;
        }
      `}</style>
    </>
  );
};

export default QrPage;

QrPage.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'QR키트 현황'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
