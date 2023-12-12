import PrimaryLayout from '../../components/layout/primaryLayout/PrimaryLayout';

import { NextPageWithLayout } from '../page';

// material-ui table import
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from './../../components/pagination/Pagination';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import openBnkMdataService from '../../services/OpenBnkMdataService';

const OpenBanking: NextPageWithLayout = () => {
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

  const rows = [];

  const fetchBnkFeePayment = async () => {
    console.log('오픈뱅킹 수수료 현황 조회');
    openBnkMdataService
      .BnkFeeService({
        schSdate: '20220101',
        schEdate: '20230101',
        schTrmSrchDiv: 0,
      })
      .then((response: any) => {
        const data = response;
        setItems(response.body.list);
        setItems(response.body.gftcMtacList);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchBnkFeePayment();
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

      <div className="bl_middleWrap_right_left"></div>
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
      </div>

      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" rowSpan={2}>
                  구분
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  입금정산
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  계룡사랑상품권
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  군산사랑상품권
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  시흥사랑상품권
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  ...
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  태안사랑상품권
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  홍성사랑상품권
                </StyledTableCell>
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
                      <StyledTableCell align="center" rowSpan={8}>
                        {row.iomnDivNm}
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={4}>
                        입금건
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        가상계좌
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        30
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        150
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        238
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        10
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                      <StyledTableCell align="center" rowSpan={1}>
                        당행(자동출금)
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        7,500,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        75,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        119,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        5,000,000
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                      <StyledTableCell align="center" rowSpan={1}>
                        타행(재판매)
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        7,500,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        75,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        119,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        5,000,000
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                      <StyledTableCell align="center" rowSpan={1}>
                        합계
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        7,500,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        75,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        119,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        5,000,000
                      </StyledTableCell>
                    </StyledTableRow>

                    {/* 여성 row */}
                    <StyledTableRow>
                      <StyledTableCell align="center" rowSpan={4}>
                        수수료
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        가상계좌
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        30
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        150
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        238
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        10
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                      <StyledTableCell align="center" rowSpan={1}>
                        당행(자동출금)
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        7,500,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        75,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        119,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        5,000,000
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                      <StyledTableCell align="center" rowSpan={1}>
                        타행(재판매)
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        7,500,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        75,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        119,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        5,000,000
                      </StyledTableCell>
                    </StyledTableRow>

                    {/* 전체 row*/}
                    <StyledTableRow>
                      <StyledTableCell align="center" rowSpan={1}>
                        합계
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        건수
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        30
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        150
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        238
                      </StyledTableCell>
                    </StyledTableRow>

                    {/* 한 테이블 */}
                    <StyledTableRow>
                      {/* 남성 row*/}
                      <StyledTableCell align="center" rowSpan={5}>
                        출금정산
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={5}>
                        정산내용
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        모계좌
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        농협(222...)
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        우체국(222...)
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        농협(222...)
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        우리
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        농협
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                      <StyledTableCell align="center" rowSpan={1}>
                        출금금액
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        7,500,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        75,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        119,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        5,000,000
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                      <StyledTableCell align="center" rowSpan={1}>
                        출금건수
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        7,500,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        75,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        119,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        5,000,000
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                      <StyledTableCell align="center" rowSpan={1}>
                        수수료
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        7,500,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        75,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        119,000,000
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        5,000,000
                      </StyledTableCell>
                    </StyledTableRow>

                    {/* 여성 row */}
                    <StyledTableRow>
                      <StyledTableCell align="center" rowSpan={1}>
                        총수수료
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        15
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        30
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        150
                      </StyledTableCell>
                      <StyledTableCell align="center" rowSpan={1}>
                        238
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                ))}
                {/* 한 테이블 */}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </section>

      <style jsx>
        {`
          .bl_content_filterWrap_flex {
            width: 450px;
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
          .el_input_search {
            position: absolute;
            top: 10%;
            left: 50%;
          }
          .el_input_search input {
            width: 180px;
            height: 30px;
            border: 1px solid #f1f1f1;
            border-radius: 3px;
            padding: 0 13px;
            cursor: pointer;
            color: #474d52;
          }
          section {
            white-space: nowrap;
          }
        `}
      </style>
    </>
  );
};

export default OpenBanking;

OpenBanking.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'오픈뱅킹 수수료 현황'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
