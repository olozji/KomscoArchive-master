import PrimaryLayout from '../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../page';
import styles from '../../style/message.module.css';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useEffect, useRef, useState } from 'react';
import Code from '../../../../services/CodeService';
import { codeState } from '../../../../lib/store/fetures/codeSlice';
import { ResData } from '../../../../types/ResData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../lib/store';
import NoticeMng from '../../../../services/NoticeService';
import Mesage from '../../../../services/MesageService';
import temp from '../../push/temp';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import moment from 'moment/moment';
import TableBody from '@mui/material/TableBody';
import axios from 'axios';
import ID from './[id]';
import { findCodeList, grpSelectFilter, resCodeData } from '@/lib/utils/codeProvider';
import * as React from 'react';
import FormSelect from '@/components/form/formSelect/FormSelect';
import FormControl from '@/components/form/formControl/FormControl';
import styled from 'styled-components';
import Pagination from '@/components/pagination/Pagination';

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

  const [tmps, setTmps] = useState([]);
  const [tmpsCnt, setTmpsCnt] = useState(0);
  const codeData = useSelector((state: RootState) => state.codeSlice);
  const [linknSiteCode, setLinknSiteCode] = useState([]);
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useState({
    searchType: '',
    searchValue: '',
    uzYn: '',
    mgmtSysCd: '',
    appDivCd: '',
    pageNum: 1,
    pageSize: 10,
  });
  const [tempIdNm, setTempIdNm] = useState([
    {
      label: '전체',
      value: '',
    },
    {
      label: '템플릿ID',
      value: '00',
    },
    {
      label: '템플릿명',
      value: '01',
    },
  ]);
  const [useList, setUseList] = useState([
    { label: '전체', value: '' },
    { label: '미사용', value: 'N' },
    { label: '사용', value: 'Y' },
  ]);
  const [appList, setAppList] = useState([
    { label: '전체', value: '' },
    { label: '통합', value: '00' },
    { label: '광역', value: '01' },
  ]);

  function getTempList(reqParams: any) {
    Mesage.selectAppTempList({
      ...reqParams,
    })
      .then((response: any) => {
        const tmp = response.body;
        setTmps(tmp.temps);
        setTmpsCnt(tmp.totCnt);
      })
      .catch((e: ResData) => {
        console.log(e);
      });
  }

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

  const handlePaginationParams = (name: string, _value: any) => {
    setSearchParam({ ...searchParam, [name]: _value });
    (name === 'pageSize' || name === 'pageNum') && handlePaginationApi(name, _value);
  };
  const handlePaginationApi = (name: string, _value: any) => {
    getTempList({ ...searchParam, [name]: _value });
  };

  useEffect(() => {
    getGrpCode();
    getTempList(searchParam);
  }, []);

  return (
    <>
      <section>
        {/* 검색wrapper */}
        <GroupLayout>
          <div className="bl_content_filterWrap">
            <div className="bl_content_filterWrap_top">
              <label htmlFor="" className="el_label el_label__first">
                검색어
              </label>
              <FormSelect
                items={tempIdNm}
                type="type2"
                size="large"
                className="hp_mr-15"
                defaultValue=""
                onChange={(e) => {
                  handlePaginationParams('searchType', e.target.value);
                  console.log(searchParam);
                }}
              />
              <div className="el_input__wrap hp_mr-15">
                <input
                  type="text"
                  className="el_input el_input__lg"
                  style={{ height: '40px' }}
                  placeholder="검색어를 입력하세요."
                  onChange={(e) => handlePaginationParams('searchValue', e.target.value)}
                />
              </div>
              <label htmlFor="" className="el_label">
                관리시스템
              </label>
              <FormSelect
                items={linknSiteCode}
                type="type2"
                size="large"
                className="hp_mr-15"
                defaultValue=""
                onChange={(e) => handlePaginationParams('mgmtSysCd', e.target.value)}
              />
              <label htmlFor="" className="el_label">
                사용여부
              </label>
              <FormSelect
                items={useList}
                type="type2"
                size="large"
                className="hp_mr-15"
                defaultValue=""
                onChange={(e) => handlePaginationParams('uzYn', e.target.value)}
              />
              <label htmlFor="" className="el_label"></label>
            </div>
            <div className="bl_content_filterWrap_bottom">
              <label htmlFor="" className="el_label el_label__first">
                APP구분
              </label>
              <FormSelect
                items={appList}
                type="type2"
                size="large"
                className="hp_mr-15"
                defaultValue=""
                onChange={(e) => {
                  handlePaginationParams('appDivCd', e.target.value);
                }}
              />
              <div className="hp_mr-15">
                <button
                  className="el_getBtn"
                  onClick={() => {
                    getTempList(searchParam);
                    console.log(searchParam);
                  }}
                >
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
              <span className="hp_txt-red hp_txt-bold">{tmpsCnt}</span>
              <span>개</span>
            </div>
          </div>
          <div className={`${styles.bl_middleWrap_right}`}>
            <div className="hp_mr-15">
              <a href="./tempapp">
                <button className="el_getBtn">템플릿 등록</button>
              </a>
            </div>
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
        {tmps.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">템플릿ID</StyledTableCell>
                    <StyledTableCell align="center">템플릿명</StyledTableCell>
                    <StyledTableCell align="center">발송유형</StyledTableCell>
                    <StyledTableCell align="center">관리시스템</StyledTableCell>
                    <StyledTableCell align="center">APP구분</StyledTableCell>
                    <StyledTableCell align="center">사용여부</StyledTableCell>
                    <StyledTableCell align="center">등록자</StyledTableCell>
                    <StyledTableCell align="center">등록일</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tmps.map((data) => {
                    return (
                      <>
                        <TopStyledTableRow>
                          <TopStyledTableCell align="center">{data.cmknSeq}</TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            <Link href={`/message/push/temp/[id]?id=${data.tmpltId}`}>
                              {data.tmpltId}
                            </Link>
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            <Link href={`/message/push/temp/[id]?id=${data.tmpltId}`}>
                              {data.tmpltNm}
                            </Link>
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">{data.bltnYn}</TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            {linknSiteCode.map((e) => {
                              if (e.value == data.mgmtSysCd) return <>{e.label}</>;
                            })}
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            {appList.map((e) => {
                              if (e.value == data.appDivCd) return <>{e.label}</>;
                            })}
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">
                            {useList.map((e) => {
                              if (e.value == data.uzYn) return <>{e.label}</>;
                            })}
                          </TopStyledTableCell>
                          <TopStyledTableCell align="center">{data.frstRgsrNm}</TopStyledTableCell>
                          <TopStyledTableCell align="center">{data.frstRegDttm}</TopStyledTableCell>
                        </TopStyledTableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">템플릿ID</StyledTableCell>
                    <StyledTableCell align="center">템플릿명</StyledTableCell>
                    <StyledTableCell align="center">발송구분</StyledTableCell>
                    <StyledTableCell align="center">발송유형</StyledTableCell>
                    <StyledTableCell align="center">관리시스템</StyledTableCell>
                    <StyledTableCell align="center">업무구분</StyledTableCell>
                    <StyledTableCell align="center">사용여부</StyledTableCell>
                    <StyledTableCell align="center">등록자</StyledTableCell>
                    <StyledTableCell align="center">등록일</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TopStyledTableRow>
                    <TopStyledTableCell colSpan={8} align="center">
                      데이터가 존재하지 않습니다.
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        <Pagination
          total={tmpsCnt ?? 0}
          limit={searchParam.pageSize ?? 10}
          page={searchParam.pageNum ?? 1}
          pageClick={(value: number) => handlePaginationParams('pageNum', value)}
        />
      </section>
      <style jsx>{``}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'템플릿 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
