import { Checkbox } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControlLabel from '@mui/material/FormControlLabel';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ResData } from 'types/ResData';
import PrimaryLayout from '../../../../../components/layout/primaryLayout/PrimaryLayout';
import Pagination from '../../../../../components/pagination/Pagination';
import Account from '../../../../../services/AccountService';
import { NextPageWithLayout } from '../../../../page';
import styles from './../../style/account.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { findCodeList, grpSelectFilter, resCodeData } from '@/lib/utils/codeProvider';
import { codeState } from '@/lib/store/fetures/codeSlice';
import { data } from 'browserslist';
import Link from 'next/link';
import FormDate from '@/components/form/formDate/FormDate';
import FormSelect from '@/components/form/formSelect/FormSelect';
import FormControl from '@/components/form/formControl/FormControl';
import styled from 'styled-components';
import * as React from 'react';
import { fontSize } from '@mui/system';

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
  const [selectIndex, setSelectIndex] = useState(0);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  // 기본 날짜 전날기준 처리
  const defaultDate = new Date(moment().subtract(1, 'days').format('YYYY-MM-DD'));
  // 초기화 처리
  let start = defaultDate;
  let end = defaultDate;

  // 시작일자 변경 함수
  const changeStartDate = (date) => {
    start = new Date(moment(date.target.value).format('YYYY-MM-DD'));

    // 시작일자보다 종료일자가 더 뒤로갈수없게 처리 한 것
    document.getElementById('endDateId').setAttribute('min', moment(start).format('YYYY-MM-DD'));
    console.log('시작일 변경: ' + start);
  };

  // 종료일자 변경 함수
  const changeEndDate = (date) => {
    end = new Date(moment(date.target.value).format('YYYY-MM-DD'));
    console.log('종료일 변경: ' + end);
  };

  const codeData = useSelector((state: RootState) => state.codeSlice);
  const [privacy, setPrivacy] = useState([]);
  const [privacyCnt, setPrivacyCnt] = useState(0);
  const [searchParam, setSearchParam] = useState({
    searchStartDt: '',
    searchStartTm: '',
    searchEndDt: '',
    searchEndTm: '',
    searchType: '',
    searchValue: '',
    lnknSiteCd: '',
    downLoadCount: '',
    outsideWorkTimeYn: '',
    pageNum: 1,
    pageSize: 10,
  });
  const [time, setTime] = useState([
    {
      value: '00',
      label: '00 시',
    },
    {
      value: '01',
      label: '01 시',
    },
    {
      value: '02',
      label: '02 시',
    },
    {
      value: '03',
      label: '03 시',
    },
    {
      value: '04',
      label: '04 시',
    },
    {
      value: '05',
      label: '05 시',
    },
    {
      value: '06',
      label: '06 시',
    },
    {
      value: '07',
      label: '07 시',
    },
    {
      value: '08',
      label: '08 시',
    },
    {
      value: '09',
      label: '09 시',
    },
    {
      value: '10',
      label: '10 시',
    },
    {
      value: '11',
      label: '11 시',
    },
    {
      value: '12',
      label: '12 시',
    },
    {
      value: '13',
      label: '13 시',
    },
    {
      value: '14',
      label: '14 시',
    },
    {
      value: '15',
      label: '15 시',
    },
    {
      value: '16',
      label: '16 시',
    },
    {
      value: '17',
      label: '17 시',
    },
    {
      value: '18',
      label: '18 시',
    },
    {
      value: '19',
      label: '19 시',
    },
    {
      value: '20',
      label: '20 시',
    },
    {
      value: '21',
      label: '21 시',
    },
    {
      value: '22',
      label: '22 시',
    },
    {
      value: '23',
      label: '23 시',
    },
  ]);
  const [idNm, setIdNm] = useState([
    {
      label: '전체',
      value: '',
    },
    {
      label: '취급자 명',
      value: '00',
    },
    {
      label: '계정ID',
      value: '01',
    },
  ]);
  const [idNm2, setIdNm2] = useState([
    {
      label: '전체',
      value: '',
    },
    {
      label: '관리자 명',
      value: '00',
    },
    {
      label: '계정ID',
      value: '01',
    },
  ]);
  const [crud, setCrud] = useState([
    {
      label: '전체',
      value: '',
    },
    {
      label: '조회',
      value: '00',
    },
    {
      label: '수정',
      value: '01',
    },
    {
      label: '등록',
      value: '02',
    },
    {
      label: '삭제',
      value: '03',
    },
  ]);

  const [grpList, setGrpList] = useState([]);
  const [linknSiteCode, setLinknSiteCode] = useState([]);
  const dispatch = useDispatch();
  const getGrpCode = () => {
    if (codeData !== null && !codeData?.first) {
      //최초실행시 아닐시
      const resList1 = findCodeList('1074', codeData.code); //공통코드 특정코드 필터링
      setGrpList(grpSelectFilter(resList1, '1074', 'cdDtlDesc', 'dtlCd', true)); //특정코드 필터링 된 것 Select형식 등 편의 맞게 가공
      const resList2 = findCodeList('3010', codeData.code); //공통코드 특정코드 필터링
      setLinknSiteCode(grpSelectFilter(resList2, '3010', 'cdDtlDesc', 'dtlCd', true));
    } else {
      //최초실행시
      resCodeData(setGrpCode); // codeProvider 함수호출
    }
  };

  const setGrpCode = (res: any) => {
    dispatch(codeState.actions.setCodeState(res)); // 공통코드 store 입력
    setGrpList(grpSelectFilter(res, '1074', 'cdDtlDesc', 'dtlCd', true)); // 커스텀 실행
    setLinknSiteCode(grpSelectFilter(res, '3010', 'cdDtlDesc', 'dtlCd', true)); // 커스텀 실행
  };

  function getPrivacy(reqParams: any) {
    Account.selectPrivacyHistory({
      ...reqParams,
    })
      .then((response: any) => {
        const data = response.body;
        setPrivacy(data.mngrConns);
        setPrivacyCnt(data.totCnt);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  }

  const handlePaginationParams = (name: string, _value: any) => {
    setSearchParam({ ...searchParam, [name]: _value });
    (name === 'pageSize' || name === 'pageNum') && handlePaginationApi(name, _value);
  };
  const handlePaginationApi = (name: string, _value: any) => {
    getPrivacy({ ...searchParam, [name]: _value });
  };

  const [excess, setExcess] = useState([]);
  const [excessCnt, setExcessCnt] = useState(0);

  function getExcess(reqParams: any) {
    Account.selectExcessHistory({
      ...reqParams,
    })
      .then((response: any) => {
        const data = response.body;
        setExcess(data.mngrDtDwlds);
        setExcessCnt(data.totCnt);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  }

  const handlePaginationApi2 = (name: string, _value: any) => {
    getExcess({ ...searchParam, [name]: _value });
  };

  const handlePaginationParams2 = (name: string, _value: any) => {
    setSearchParam({ ...searchParam, [name]: _value });
    (name === 'pageSize' || name === 'pageNum') && handlePaginationApi2(name, _value);
  };

  useEffect(() => {
    getGrpCode();
    getPrivacy(searchParam);
    getExcess(searchParam);
  }, []);

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked == false) {
      handlePaginationParams('outsideWorkTimeYn', 'N');
    } else if (event.target.checked == true) {
      handlePaginationParams('outsideWorkTimeYn', 'Y');
    }
  };

  return (
    <>
      <section>
        <div className={styles.tableTab}>
          <ul>
            <li
              className={`${styles.tabContent} ${selectIndex === 0 ? styles.tabActive : null}`}
              onClick={() => {
                // getconnecthis();
                setSelectIndex(0);
                console.log(selectIndex);
              }}
            >
              <div>접속이력</div>
            </li>
            <li
              className={`${styles.tabContent} ${selectIndex === 1 ? styles.tabActive : null}`}
              onClick={() => {
                // getchangehis();
                setSelectIndex(1);
                console.log(selectIndex);
              }}
            >
              <div>기준초과이력</div>
            </li>
          </ul>
        </div>
        {selectIndex === 0 ? (
          <>
            {' '}
            <article>
              {/* 검색wrapper */}
              <GroupLayout>
                <div className="bl_content_filterWrap">
                  <div className="bl_content_filterWrap_top">
                    <label htmlFor="" className="el_label el_label__first">
                      등록일
                    </label>
                    <FormDate />
                    <FormSelect
                      items={time}
                      type="type2"
                      size="large"
                      className="hp_mr-15"
                      defaultValue=""
                      onChange={(e) => handlePaginationParams('searchStartTm', e.target.value)}
                    />
                    <span className="hp_mr-10 un_wave">~</span>
                    <FormDate />
                    <FormSelect
                      items={time}
                      type="type2"
                      size="large"
                      className="hp_mr-15"
                      defaultValue=""
                      onChange={(e) => handlePaginationParams('searchEndTm', e.target.value)}
                    />
                    <label htmlFor="" className="el_label">
                      관리시스템
                    </label>
                    <FormSelect
                      items={linknSiteCode}
                      type="type2"
                      size="large"
                      className="hp_mr-15"
                      defaultValue=""
                      onChange={(e) => handlePaginationParams('lnknSiteCd', e.target.value)}
                    />
                    <label htmlFor="" className="el_label"></label>
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
                        handlePaginationParams('searchType', e.target.value);
                      }}
                    />
                    <FormControl
                      placeholder="검색어를 입력하세요."
                      size="lg"
                      className=""
                      onChange={(e) => {
                        handlePaginationParams('searchValue', e.target.value);
                      }}
                    />
                    <FormControlLabel
                      label="근무시간 외 접속이령만 조회(휴일포함)"
                      className="hp_ml-25"
                      sx={{ fontSize: 30 }}
                      control={
                        <Checkbox
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                          checked={checked[0]}
                          onChange={handleChange}
                        />
                      }
                    />
                    <div className="hp_ml-25">
                      <button className="el_getBtn" onClick={() => getPrivacy(searchParam)}>
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
                    <span className="hp_txt-red hp_txt-bold">{privacyCnt}</span>
                    <span>개</span>
                  </div>
                </div>
                <div className={`${styles.bl_middleWrap_right}`}>
                  <select
                    name=""
                    id=""
                    className="un_pageItemSelect"
                    value={searchParam.pageSize}
                    onChange={(e) => handlePaginationParams('pageSize', e.target.value)}
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
                {privacy.length > 0 ? (
                  <>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">번호</StyledTableCell>
                            <StyledTableCell align="center">처리일</StyledTableCell>
                            <StyledTableCell align="center">취급자 명</StyledTableCell>
                            <StyledTableCell align="center">계정ID</StyledTableCell>
                            <StyledTableCell align="center">계정유형</StyledTableCell>
                            <StyledTableCell align="center">관리자그룹</StyledTableCell>
                            <StyledTableCell align="center">접근IP</StyledTableCell>
                            <StyledTableCell align="center">관리시스템</StyledTableCell>
                            <StyledTableCell align="center">접근유형(CRUD)</StyledTableCell>
                            <StyledTableCell align="center">조회건수</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {privacy.map((connectres, index) => {
                            return (
                              <TopStyledTableRow key={index}>
                                <TopStyledTableCell align="center">-</TopStyledTableCell>
                                <TopStyledTableCell align="center">-</TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  <Link href={`privacy/[id]?id=${connectres.connSeq}`}>
                                    {connectres.frstRgsrNm}
                                  </Link>
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {connectres.mngrId}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {grpList.map((e) => {
                                    if (e.value == connectres.acntTypCd) return <>{e.label}</>;
                                  })}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {connectres.mngrGroupNm}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {connectres.connIp}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {linknSiteCode.map((e) => {
                                    if (e.value == connectres.lnknSiteCd) return <>{e.label}</>;
                                  })}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {crud.map((e) => {
                                    if (e.value == connectres.lnknSiteCd) return <>{e.label}</>;
                                  })}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {connectres.viewCount}
                                </TopStyledTableCell>
                              </TopStyledTableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Pagination
                      total={privacyCnt ?? 0}
                      limit={searchParam.pageSize ?? 10}
                      page={searchParam.pageNum ?? 1}
                      pageClick={(value: number) => handlePaginationParams('pageNum', value)}
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
            </article>
          </>
        ) : (
          <>
            <article>
              {/* 검색wrapper */}
              <GroupLayout>
                <div className="bl_content_filterWrap">
                  <div className="bl_content_filterWrap_top">
                    <label htmlFor="" className="el_label el_label__first">
                      등록일
                    </label>
                    <FormDate />
                    <span className="hp_mr-10 un_wave">~</span>
                    <FormDate />
                    <label htmlFor="" className="el_label hp_ml-25">
                      관리시스템
                    </label>
                    <FormSelect
                      items={linknSiteCode}
                      type="type2"
                      size="large"
                      className="hp_mr-15"
                      defaultValue=""
                      onChange={(e) => handlePaginationParams2('lnknSiteCd', e.target.value)}
                    />
                    <label htmlFor="" className="el_label hp_ml-25">
                      다운로드횟수
                    </label>
                    <FormControl
                      placeholder="다운로드횟수를 입력하세요."
                      size="lg"
                      className=""
                      onChange={(e) => {
                        handlePaginationParams2('downLoadCount', e.target.value);
                      }}
                    />
                  </div>
                  <div className="bl_content_filterWrap_bottom">
                    <label htmlFor="" className="el_label el_label__first">
                      검색어
                    </label>
                    <FormSelect
                      items={idNm2}
                      type="type2"
                      size="large"
                      className="hp_mr-15"
                      defaultValue=""
                      onChange={(e) => {
                        handlePaginationParams2('searchType', e.target.value);
                      }}
                    />
                    <FormControl
                      placeholder="검색어를 입력하세요."
                      size="lg"
                      className=""
                      onChange={(e) => {
                        handlePaginationParams2('searchValue', e.target.value);
                      }}
                    />
                    <div className="hp_ml-25">
                      <button className="el_getBtn" onClick={() => getExcess(searchParam)}>
                        조회
                      </button>
                    </div>
                  </div>
                </div>
              </GroupLayout>
              {/*  */}
              <div className={styles.tabmenuSearch}>
                <div className={`${styles.bl_middleWrap_right}${styles.tabmenuSearchResult}`}>
                  <div className="bl_middleWrap_right_result">
                    <span className={styles.resultNum}>검색결과 :</span>
                    <span className="hp_txt-red hp_txt-bold">{excessCnt}</span>
                    <span>개</span>
                  </div>
                </div>
                <div className={`${styles.bl_middleWrap_right}`}>
                  <select
                    name=""
                    id=""
                    className="un_pageItemSelect"
                    value={searchParam.pageSize}
                    onChange={(e) => handlePaginationParams2('pageSize', e.target.value)}
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
                    <option value="30" className="item">
                      50개씩 보기
                    </option>
                    <option value="30" className="item">
                      100개씩 보기
                    </option>
                  </select>
                </div>
              </div>
              <div>
                {excess.length > 0 ? (
                  <>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">번호</StyledTableCell>
                            <StyledTableCell align="center">처리일자</StyledTableCell>
                            <StyledTableCell align="center">관리자 명</StyledTableCell>
                            <StyledTableCell align="center">계정ID</StyledTableCell>
                            <StyledTableCell align="center">휴대폰번호</StyledTableCell>
                            <StyledTableCell align="center">계정유형</StyledTableCell>
                            <StyledTableCell align="center">관리자그룹</StyledTableCell>
                            <StyledTableCell align="center">접근IP</StyledTableCell>
                            <StyledTableCell align="center">관리시스템</StyledTableCell>
                            <StyledTableCell align="center">다운로드횟수</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {excess.map((data, index) => {
                            return (
                              <TopStyledTableRow key={index}>
                                <TopStyledTableCell align="center">-</TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {data.dwldDttm}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {data.mngrNm}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {data.mngrId}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">-</TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {grpList.map((e) => {
                                    if (e.value == data.acntTypCd) return <>{e.label}</>;
                                  })}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {data.mngrGroupNm}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">-</TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {linknSiteCode.map((e) => {
                                    if (e.value == data.lnknSiteCd) return <>{e.label}</>;
                                  })}
                                </TopStyledTableCell>
                                <TopStyledTableCell align="center">
                                  {data.dwldCount}
                                </TopStyledTableCell>
                              </TopStyledTableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Pagination
                      total={excessCnt ?? 0}
                      limit={searchParam.pageSize ?? 10}
                      page={searchParam.pageNum ?? 1}
                      pageClick={(value: number) => handlePaginationParams2('pageNum', value)}
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
            </article>
          </>
        )}
      </section>
      <style jsx>{``}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'개인정보접속기록관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
