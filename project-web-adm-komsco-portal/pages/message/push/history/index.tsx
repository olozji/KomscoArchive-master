import PrimaryLayout from '../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../page';
import styles from '../../style/message.module.css';
import Pagination from '../../../../components/pagination/Pagination';
import CdService from '../../../../services/MenuService';
import { ResData } from 'types/ResData';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Mesage from '../../../../services/MesageService';
import { Checkbox } from '@mui/material';
import Link from 'next/link';
import FormDate from '@/components/form/formDate/FormDate';
import FormSelect from '@/components/form/formSelect/FormSelect';
import FormControl from '@/components/form/formControl/FormControl';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { findCodeList, grpSelectFilter, resCodeData } from '@/lib/utils/codeProvider';
import { codeState } from '@/lib/store/fetures/codeSlice';
import styled from 'styled-components';

const GroupLayout = styled.div`
  .bl_content_filterWrap_top {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .bl_content_filterWrap_middle {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .bl_content_filterWrap_bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .un_wave {
    font-family: Inter;
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
  }

  .bl_middleWrap {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 15px;
  }
  .bl_middleWrap_left {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }
  .bl_middleWrap_right {
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: #474d52;
    display: flex;
    flex-direction: column;
  }
  .bl_middleWrap_right__top {
    display: flex;
    gap: 10px;
  }
  .bl_middleWrap_right__bottom {
    display: flex;
    justify-content: flex-end;
  }
  .bl_middleWrap_right_result {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-right: 1px solid #474d52;
    padding-right: 9.5px;
    margin-right: 9.5px;
  }
  .resent-item {
    font-size: 15px;
  }
  .un_pageItemSelect {
    color: #474d52;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    //background-image: url(../img/icon-downArrow-gray.png);
    background-repeat: no-repeat;
    background-position-x: 93%;
    background-position-y: 50%;
    background-color: #ffffff;
    padding-right: 20px;
  }
`;

const User: NextPageWithLayout = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F3F4F5',
      color: 'black',
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      whiteSpace: 'nowrap',
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

  const [searchParams, setSearchParams] = useState({
    searchType: '',
    searchValue: '',
    msgSndStaCd: '',
    searchStartDt: '',
    searchEndDt: '',
    pageNum: 1,
    pageSize: 10,
  });
  const [his, setHis] = useState([]);
  const [hisCnt, setHisCnt] = useState(0);

  function getSendHistory(reqParams: any) {
    Mesage.selectSendHistory({
      ...reqParams,
    })
      .then((response: any) => {
        const sndHis = response.body;
        setHis(sndHis.sendHistorys);
        setHisCnt(sndHis.totCnt);
      })
      .catch((e: ResData) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getSendHistory(searchParams);
    getGrpCode();
  }, []);

  const [idNm, setIdNm] = useState([
    {
      label: '전체',
      value: '',
    },
    {
      label: '템플릿명',
      value: '00',
    },
    {
      label: '템플릿ID',
      value: '01',
    },
  ]);
  const [status, setStatus] = useState([
    {
      label: '전체',
      value: '',
    },
    {
      label: '성공',
      value: '01',
    },
    {
      label: '대기',
      value: '00',
    },
    {
      label: '실패',
      value: '02',
    },
  ]);

  const codeData = useSelector((state: RootState) => state.codeSlice);
  const [linknSiteCode, setLinknSiteCode] = useState([]);
  const dispatch = useDispatch();

  const getGrpCode = () => {
    if (codeData !== null && !codeData?.first) {
      const resList2 = findCodeList('3010', codeData.code); //공통코드 특정코드 필터링
      setLinknSiteCode(grpSelectFilter(resList2, '3010', 'cdDtlDesc', 'dtlCd', true));
    } else {
      resCodeData(setGrpCode); // codeProvider 함수호출
    }
  };

  const setGrpCode = (res: any) => {
    dispatch(codeState.actions.setCodeState(res)); // 공통코드 store 입력
    setLinknSiteCode(grpSelectFilter(res, '3010', 'cdDtlDesc', 'dtlCd', true)); // 커스텀 실행
  };

  const handleParams = (name: string, _value: any) => {
    setSearchParams({ ...searchParams, [name]: _value });
    (name === 'pageSize' || name === 'pageNum') && handlePaginationApi(name, _value);
  };

  const handlePaginationApi = (name: string, _value: any) => {
    getSendHistory({ ...searchParams, [name]: _value });
  };

  return (
    <>
      <section>
        <GroupLayout>
          <div className="bl_content_filterWrap">
            <div className="bl_content_filterWrap_top">
              <label htmlFor="" className="el_label el_label__first">
                조회기간
              </label>
              <FormDate />
              <span className="hp_mr-10 un_wave">~</span>
              <FormDate />
              <label htmlFor="" className="el_label hp_ml-25">
                발송상태
              </label>
              <FormSelect
                items={status}
                type="type2"
                size="large"
                className="hp_mr-15"
                defaultValue=""
                onChange={(e) => handleParams('msgSndStaCd', e.target.value)}
              />
            </div>
            <div className="bl_content_filterWrap_bottom">
              <label htmlFor="" className="el_label el_label__first">
                검색어
              </label>
              <FormSelect
                items={idNm}
                type="type2"
                size="large"
                className="hp_mr-15"
                defaultValue=""
                onChange={(e) => {
                  handleParams('searchType', e.target.value);
                }}
              />
              <div className="el_input__wrap">
                <input
                  type="text"
                  className="el_input el_input__lg"
                  style={{ height: '40px' }}
                  placeholder="검색어를 입력하세요."
                  onChange={(e) => handleParams('searchValue', e.target.value)}
                />
              </div>
              <div className="hp_ml-25">
                <button className="el_getBtn" onClick={() => getSendHistory(searchParams)}>
                  조회
                </button>
              </div>
            </div>
          </div>
        </GroupLayout>
        {/*  */}
        <div className={styles.tabmenuSearch}>
          <div className={`${styles.bl_middleWrap_left}`}>
            <div className="bl_middleWrap_right_result">
              <span className={styles.resultNum}>검색결과 :</span>
              <span className="hp_txt-red hp_txt-bold">{hisCnt}</span>
              <span>개</span>
            </div>
          </div>
          <div className={`${styles.bl_middleWrap_right}`}>
            <select
              name=""
              id=""
              className="un_pageItemSelect"
              value={searchParams.pageSize}
              onChange={(e) => handleParams('pageSize', e.target.value)}
            >
              <option value="10" className="item">
                10개씩 보기
              </option>
              <option value="20" className="item">
                20개씩 보기
              </option>
              <option value="30" className="item">
                30개씩 보기
              </option>
              <option value="50" className="item">
                50개씩 보기
              </option>
              <option value="100" className="item">
                100개씩 보기
              </option>
            </select>
          </div>
        </div>
        <div>
          {his.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center">번호</StyledTableCell>
                      <StyledTableCell align="center">발송내역ID</StyledTableCell>
                      <StyledTableCell align="center">템플릿ID</StyledTableCell>
                      <StyledTableCell align="center">템플릿명</StyledTableCell>
                      <StyledTableCell align="center">요청시스템</StyledTableCell>
                      <StyledTableCell align="center">관리자명</StyledTableCell>
                      <StyledTableCell align="center">요청일시</StyledTableCell>
                      <StyledTableCell align="center">발송일시</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {his.map((data, index) => {
                      return (
                        <TopStyledTableRow key={index}>
                          <TopStyledTableCell align="center">
                            <Checkbox></Checkbox>
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">-</TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            <Link href={`/message/push/history/[id]?id=${data.appPushSndSeq}`}>
                              {data.appPushSndHistId}
                            </Link>
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">{data.tmpltId}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{data.tmpltNm}</TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            {linknSiteCode.map((e) => {
                              if (e.value == data.mgmtSysCd) return <>{e.label}</>;
                            })}
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">-</TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            {moment(data.frstRegDttm, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            {moment(data.lastChngDttm, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                          </TopStyledTableCell>
                        </TopStyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                total={hisCnt ?? 0}
                limit={searchParams.pageSize ?? 10}
                page={searchParams.pageNum ?? 1}
                pageClick={(value: number) => handleParams('pageNum', value)}
              />
            </>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">관리자명</StyledTableCell>
                    <StyledTableCell align="center">계정ID</StyledTableCell>
                    <StyledTableCell align="center">계정유형</StyledTableCell>
                    <StyledTableCell align="center">관리자그룹</StyledTableCell>
                    <StyledTableCell align="center">접속일시</StyledTableCell>
                    <StyledTableCell align="center">접속IP</StyledTableCell>
                    <StyledTableCell align="center">관리시스템</StyledTableCell>
                    <StyledTableCell align="center">메뉴</StyledTableCell>
                    <StyledTableCell align="center">메뉴URL</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TopStyledTableRow>
                    <TopStyledTableCell colSpan={10} align="center">
                      데이터가 존재하지 않습니다.
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        {/*<Pagination*/}
        {/*  total={privacyCnt ?? 0}*/}
        {/*  limit={searchParam.pageSize ?? 10}*/}
        {/*  page={searchParam.pageNum ?? 1}*/}
        {/*  pageClick={(value: number) => handlePaginationParams('pageNum', value)}*/}
        {/*/>*/}
      </section>
      <style jsx>{``}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'발송내역 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
