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
import { useEffect, useState } from 'react';
import OpenBnkMdataService from '../../../services/OpenBnkMdataService';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import GiftPolicyService from '../../../services/GiftPolicyService';
import CommonService from '../../../services/CommonService';
import moment from 'moment';

const InfoFee: NextPageWithLayout = () => {
  const [items, setItems] = useState([]);
  const [localServiceGroup, setLocalServiceGroup] = useState([]);
  const [totalCnt, setTotalCnt] = useState();
  const [pagingNum, setPagingNum] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);

  // 기관 전체 코드
  const [agency, setAgency] = useState([]);

  // 기관 코드
  const [agencyDiv, setAgencyDiv] = useState([]);

  const [params, setParams] = useState({
    schAreaSrvcUid: '', // 지역서비스 코드
    schTrmSrchDiv: 0, // 조회기간 코드
    schSdate: moment().subtract(1, 'days').format('YYYYMMDD'), // 시작 일자
    schEdate: moment().subtract(1, 'days').format('YYYYMMDD'), // 종료 일자
    schGftcDivCd: '', // 상품권/정책수당 선택 코드
    schGftcCd: '', // 상품권/정책수당 콤보 선택값
    pageNum: 1,
    pageSize: 50,
  });

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

  const rows = [];

  const fetchInDatafoService = async () => {
    console.log('정보제공 수수료 통계 목록 조회');
    OpenBnkMdataService.InfoDataService({}).then((response: any) => {
      const data = response;
      setItems(data.body.list);
      console.log(data);
    });
  };

  const fetchGiftCardData = async () => {
    console.log('상품권 발행 통계 조회');
    console.log(params);
    GiftPolicyService.GiftCardPayment(params).then((response: any) => {
      const data = response;
      setItems(response.body.list);
      setTotalCnt(data.body.totCnt);
      setPagingNum(Math.ceil(data.body.totCnt / pageSize));
      console.log(data);
    });
  };

  const getLocalServiceList = async () => {
    CommonService.LocalServiceData({}).then((res: any) => {
      const localServiceList = [];
      res.body.list.forEach((item) => {
        localServiceList.push({ text: item.text, value: item.value });
      });
      setLocalServiceGroup(localServiceList);
      console.log(localServiceList);
    });
  };

  const handleSearch = (e) => {
    localServiceGroup.some((obj) => {
      if (obj.text === e.target.value) {
        return true;
      } else {
        return false;
      }
    });
  };

  useEffect(() => {
    getLocalServiceList();
    fetchGiftCardData();
  }, []);

  return (
    <>
      <div className="bl_content_filterWrap">
        <div className="bl_content_filterWrap_top">
          <label htmlFor="" className="el_label el_label__first">
            기관선택
          </label>
          <select name="" id="" className="el_input_select2 hp_mr-15">
            <option value="" className="item">
              네이버페이
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
          <div className="el_input_search">
            <label htmlFor="" className="el_label el_label__first">
              검색어
            </label>
            <input type="text" placeholder="기관명 입력" />
          </div>
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
          </div>
        </div>
        <div className="bl_content_select3">
          <select name="" id="" className="el_input_select2 hp_mr-15"></select>
          <select name="" id="" className="el_input_select2 hp_mr-15"></select>
          <button className="el_getBtn">조회</button>
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
                <TopStyledTableCell align="center">은행</TopStyledTableCell>
                <TopStyledTableCell align="center">페이</TopStyledTableCell>
                <TopStyledTableCell align="center">증권</TopStyledTableCell>
                <TopStyledTableCell align="center">카드</TopStyledTableCell>
                <TopStyledTableCell align="center">보험</TopStyledTableCell>
                <TopStyledTableCell align="center">저축은행</TopStyledTableCell>
                <TopStyledTableCell align="center">할부금융</TopStyledTableCell>
                <TopStyledTableCell align="center">보증보험</TopStyledTableCell>
                <TopStyledTableCell align="center">P2P</TopStyledTableCell>
                <TopStyledTableCell align="center">인수채권</TopStyledTableCell>
                <TopStyledTableCell align="center">대부</TopStyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TopStyledTableRow>
                <TopStyledTableCell align="center">전송건수</TopStyledTableCell>
                <TopStyledTableCell align="center">{33}</TopStyledTableCell>
                <TopStyledTableCell align="center">-</TopStyledTableCell>
                <TopStyledTableCell align="center">-</TopStyledTableCell>
              </TopStyledTableRow>
            </TableBody>

            <TableBody>
              <StyledTableRow>
                <TopStyledTableCell align="center">성공/오류</TopStyledTableCell>
                <TopStyledTableCell align="center">{30 / 3}</TopStyledTableCell>
                <TopStyledTableCell align="center">-</TopStyledTableCell>
                <TopStyledTableCell align="center">-</TopStyledTableCell>
              </StyledTableRow>
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
                <StyledTableCell align="center">전송제공일시</StyledTableCell>
                <StyledTableCell align="center">기관구분</StyledTableCell>
                <StyledTableCell align="center">기관명</StyledTableCell>
                <StyledTableCell align="center">정기전송</StyledTableCell>
                <StyledTableCell align="center">비정기전송</StyledTableCell>
                <StyledTableCell align="center">오류</StyledTableCell>
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
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{row.trnmOfrDt}</StyledTableCell>
                    <StyledTableCell align="center">{row.instDivCd}</StyledTableCell>
                    <StyledTableCell align="center">{row.instDivNm}</StyledTableCell>
                    <StyledTableCell align="center">{row.prdcTrnmCcnt}</StyledTableCell>
                    <StyledTableCell align="center">{row.nprdcTrnmCcnt}</StyledTableCell>
                    <StyledTableCell align="center">{row.errCcnt}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </section>

      <Pagination />

      <style jsx>{`
        .bl_content_filterWrap_top {
          display: flex;
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
      `}</style>
    </>
  );
};

export default InfoFee;

InfoFee.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'정보제공내역 통계'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
