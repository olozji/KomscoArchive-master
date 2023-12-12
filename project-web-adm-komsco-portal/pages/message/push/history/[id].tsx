import PrimaryLayout from '../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../page';
import styles from '../../style/message.module.css';
import { ResData } from 'types/ResData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { flexbox } from '@mui/system';
import { Checkbox, Radio } from '@mui/material';
import NoticeMng from '../../../../services/NoticeService';
import Mesage from '../../../../services/MesageService';
import moment from 'moment/moment';
import CodeService from '../../../../services/CodeService';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FormDate from '@/components/form/formDate/FormDate';
import FormSelect from '@/components/form/formSelect/FormSelect';
import FormControl from '@/components/form/formControl/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as React from 'react';
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
      backgroundColor: '#eee',
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
  }));

  const InsideTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#ffffff',
      color: 'black',
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      whiteSpace: 'nowrap',
      border: 0,
    },
  }));

  const [detail, setDetail] = useState<any>({});
  const [memberHistorys, setMemberHistorys] = useState([]);
  const [memberHistorysCnt, setMemberHistorysCnt] = useState(0);
  const [temp, setTemp] = useState<any>({});
  const [code, setCode] = useState([]);
  const [member, setMember] = useState([
    { label: '전체', value: '' },
    { label: '회원명', value: '00' },
    { label: '회원ID', value: '01' },
    { label: '수신자정보', value: '02' },
  ]);
  const [status, setStatus] = useState([
    { label: '전체', value: '' },
    { label: '대기', value: '00' },
    { label: '성공', value: '01' },
    { label: '실패', value: '02' },
  ]);
  const [searchParams, setSearchParams] = useState({
    searchType: '',
    searchValue: '',
    msgSndStaCd: '',
    pageNum: 1,
    pageSize: 10,
  });

  useEffect(() => {
    getData(searchParams);
    getCode();
  }, []);

  function getData(reqParams: any) {
    const idData = String(window.location.href).split('/');
    console.log(idData);
    if (idData != null) {
      Mesage.selectSendHistoryDetail(idData[6]).then((response: any) => {
        const apsh = response.body.appPushSndHistId;
        const tmpId = response.body.tmpltId;
        if (response != null) {
          setDetail(response.body);
          Mesage.selectSendMemberHistorys(apsh, {
            ...reqParams,
          })
            .then((response: any) => {
              if (response != null) {
                setMemberHistorys(response.body.sendMemberHistorys);
                setMemberHistorysCnt(response.body.totCnt);
              }
            })
            .catch((e: ResData) => {
              console.log(e);
            });
          Mesage.selectAppTempDetail(tmpId).then((response: any) => {
            setTemp(response.body);
          });
        }
      });
    }
  }

  function getCode(cdDvcd = '', dtlCd = '', dtlCdNm = '', uzYn = '', pageNum = 1, pageSize = 10) {
    CodeService.selectcode({
      cdDvcd: cdDvcd,
      dtlCd: dtlCd,
      dtlCdNm: dtlCdNm,
      uzYn: uzYn,
      pageNum: pageNum,
      pageSize: pageSize,
    })
      .then((response: any) => {
        const data = response.body;
        const codeDetail = data.cdList;
        console.log('성공');
        setCode(codeDetail);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleParams = (name: string, _value: any) => {
    setSearchParams({ ...searchParams, [name]: _value });
  };

  return (
    <>
      <section>
        <article>
          <div className="backbutton">
            <button
              onClick={function () {
                window.history.back();
              }}
            >
              목록
            </button>
          </div>
        </article>
        <section>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* 발송내역 ID / 템플릿 ID */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>발송내역 ID</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    {detail.appPushSndHistId}
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>템플릿 ID</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    {detail.tmpltId}
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/*템플릿명  / 링크 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>템플릿명</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    {detail.tmpltNm}
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>링크</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    {detail.linkUrl}
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 요청일시 / 요청자 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>요청일시</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    {moment(detail.frstRegDttm, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>요청자</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    {detail.frstRgsrNm}
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 관리시스템 / APP구분 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>관리시스템</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    {code.map((e) => {
                      if (e.dtlCd == detail.mgmtSysCd) {
                        return <span>{e.dtlCdNm}</span>;
                      }
                    })}
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>APP구분</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                    {detail.appDivCd == '00' ? <div>통합</div> : <div>광역</div>}
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 메시지제목 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>메시지제목</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    {temp.msgSndTitl}
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 메시지내용 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    className="multirow"
                    sx={{ bgcolor: '#eee', gridRow: '3', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>메시지내용</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '3', gridColumn: 'span 5' }} align="left">
                    {temp.msgSndCtnt}
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </section>
        <section>
          <GroupLayout>
            <div className="bl_content_filterWrap">
              <div className="bl_content_filterWrap_top">
                <label htmlFor="" className="el_label el_label__first">
                  검색어
                </label>
                <FormSelect
                  items={member}
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
                <label htmlFor="" className="el_label el_label__first">
                  검색어
                </label>
                <FormSelect
                  items={status}
                  type="type2"
                  size="large"
                  className="hp_mr-15"
                  defaultValue=""
                  onChange={(e) => {
                    handleParams('msgSndStaCd', e.target.value);
                  }}
                />
                <div className="hp_ml-25">
                  <button
                    className="el_getBtn"
                    onClick={() => {
                      getData(searchParams);
                      console.log(searchParams);
                    }}
                  >
                    조회
                  </button>
                </div>
              </div>
            </div>
          </GroupLayout>
          {/*검색wrapper */}

          {/*  */}
        </section>
        <section>
          <div className={styles.tabmenuSearch}>
            <div className={`${styles.bl_middleWrap_left}`}>
              <div className="bl_middleWrap_right_result">
                <span className={styles.resultNum}>검색결과 :</span>
                <span className="hp_txt-red hp_txt-bold">{memberHistorysCnt}</span>
                <span>개</span>
                {/*<span>&nbsp;성공 : 100건, 대기 : 20건, 실패 : 2건</span>*/}
              </div>
            </div>
            <div className={`${styles.bl_middleWrap_right}`}>
              <div className="hp_mr-15"></div>
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(8, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    번호
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    수신정보
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    회원명
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    단말정보
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    회원ID
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    발송일시
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    발송상태
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    실패사유
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableHead>
              {memberHistorys.length > 0 ? (
                memberHistorys.map((data, index) => {
                  return (
                    <>
                      <TableBody>
                        {/* 등록일자 / 등록자 */}
                        <TopStyledTableRow
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(8, 1fr)',
                            gridTemplateRows: 'auto',
                          }}
                        >
                          <TopStyledTableCell
                            sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                            align="center"
                          >
                            {index}
                          </TopStyledTableCell>
                          <TopStyledTableCell
                            sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                            align="center"
                          >
                            {data.rcvInfoVal}
                          </TopStyledTableCell>
                          <TopStyledTableCell
                            sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                            align="center"
                          >
                            {data.membNm}
                          </TopStyledTableCell>
                          <TopStyledTableCell
                            sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                            align="center"
                          >
                            {data.trmnInfoVal}
                          </TopStyledTableCell>
                          <TopStyledTableCell
                            sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                            align="center"
                          >
                            {data.membId}
                          </TopStyledTableCell>
                          <TopStyledTableCell
                            sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                            align="center"
                          >
                            {moment(data.frstRegDttm, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                          </TopStyledTableCell>
                          <TopStyledTableCell
                            sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                            align="center"
                          >
                            {status.map((e) => {
                              if (e.value == data.msgSndStaCd) {
                                return <div>{e.label}</div>;
                              }
                            })}
                          </TopStyledTableCell>
                          <TopStyledTableCell
                            sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                            align="center"
                          >
                            {data.falrRsn}
                          </TopStyledTableCell>
                        </TopStyledTableRow>
                      </TableBody>
                    </>
                  );
                })
              ) : (
                <>
                  <TableBody>
                    {/* 등록일자 / 등록자 */}
                    <TopStyledTableRow>
                      <TopStyledTableCell colSpan={8} align="center">
                        데이터가 존재하지 않습니다.
                      </TopStyledTableCell>
                    </TopStyledTableRow>
                  </TableBody>
                </>
              )}
            </Table>
          </TableContainer>
        </section>
      </section>
      <style jsx>{`
        section {
          margin-bottom: 50px;
        }
        .multirow {
          display: flex;
          align-items: center;
        }
        .backbutton {
          width: 100%;
          text-align: right;
          margin-bottom: 30px;
        }
        .backbutton button {
          border: none;
          background: blue;
          color: white;
          width: 120px;
          height: 35px;
          margin-right: 10px;
        }
        .detailsubtitle {
          font-size: 14px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'발송내역 상세'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
