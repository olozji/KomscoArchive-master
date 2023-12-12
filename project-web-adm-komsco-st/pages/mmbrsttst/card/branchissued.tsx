import { useEffect, useState } from 'react';
import PrimaryLayout from '../../../components/layout/primaryLayout/PrimaryLayout';
import styles from './scss/tab.module.css';
import { NextPageWithLayout } from '../../page';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserService from '../../../services/UserService';

const BranchIssued: NextPageWithLayout = () => {
  const [items, setItems] = useState([]);
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

  const fetchBranchPayment = async () => {
    console.log('지점별 발급 조회');
    UserService.CardComPayment({
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
    fetchBranchPayment();
  }, []);

  return (
    <>
      <div className="bl_content_filterWrap">
        <div className="bl_content_filterWrap_top">
          <label htmlFor="" className="el_label el_label__first">
            최근 조회
          </label>
          <a href="#">성남시흥,</a>
          <a href="#">논산,</a>
          <a href="#">태안,</a>
          <a href="#">공주,</a>
        </div>
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
          <select name="" id="" className="el_input_select2 hp_mr-15">
            <option value="" className="item">
              전체
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
          <select name="" id="" className="el_input_select2 el_input_select2_xs">
            <option value="" className="item">
              전체
            </option>
            <option value="" className="item">
              NH농협은행
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
            <button>월</button>
            <button>분기</button>
            <button>반기</button>
            <button>연</button>
            <button>회차</button>
          </div>
          <div className="bl_content_select3">
            <select name="" id="" className="el_input_select2 hp_mr-15">
              <option value="" className="item">
                당해년도
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
                당해년도
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

      <div className="bl_middleWraper">
        <div className="bl_middleWrap_left">
          <span>
            기간 : <span>2022.11.16 ~ 2022.11.16 | </span>
          </span>
          <span>검색결과 : </span>
          <span className="hp_txt-red hp_txt-bold">24</span>
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

      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" component="th" scope="row">
                  조회일자
                </StyledTableCell>
                <StyledTableCell align="center">조회일</StyledTableCell>
                <StyledTableCell align="center">지역서비스</StyledTableCell>
                <StyledTableCell align="center">지점명</StyledTableCell>
                <StyledTableCell align="center">카드사</StyledTableCell>
                <StyledTableCell align="center">누적발행건수</StyledTableCell>
                <StyledTableCell align="center">신규발행건수</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.issDt}</StyledTableCell>
                  <StyledTableCell align="center">{row.issDt}</StyledTableCell>
                  <StyledTableCell align="center">{row.areaSrvcNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.brofNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.crcoNm}</StyledTableCell>
                  <StyledTableCell align="center">{row.acmlIssuCcnt}</StyledTableCell>
                  <StyledTableCell align="center">{row.newIssuCcnt}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

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
        .el_classicBtn {
          margin: 0 0 0 10px;
        }
        .table_wrapper {
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default BranchIssued;

BranchIssued.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'지점별 발급통계'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
