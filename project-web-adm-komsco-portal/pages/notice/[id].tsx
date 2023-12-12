import PrimaryLayout from '../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../page';
import styles from './style/notice.module.css';
import NoticeMng from '../../services/NoticeService';
import { ResData } from 'types/ResData';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState, useRef } from 'react';
import { flexbox } from '@mui/system';
import { useRouter } from 'next/router';
import moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'lib/store';
import Code from '../../services/CodeService';
import { codeState } from 'lib/store/fetures/codeSlice';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Modal from 'components/modal/modal';
import { noticeDetail } from 'types/Notice';

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

  const NoticeTargetModal = ({ cmknTrgtCd }) => {
    //   공지대상 리스트 가져오기
    const [NoticeTartget, setNoticeTarget] = useState([]);
    // 모달 닫기버튼 state전달용
    const [closeEvent, setCloseEvent] = useState(false);
    //   체크박스 이벤트
    const [checkboxEvent, setCheckboxEvent] = useState(false);

    const actionRightBtn = (e) => {
      console.log('-----rightBtn Action----');
    };
    const actionLeftBtn = () => {
      console.log('-----LeftBtn Action----');
      setCloseEvent(!closeEvent);
      console.log(closeEvent);
    };

    const mngsystem = () => {
      return (
        <>
          <section>
            <article className="notice_target_setting_wrapper">
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TopStyledTableRow
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'auto',
                      }}
                    >
                      <StyledTableCell
                        sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                        align="center"
                      >
                        공지대상
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                        align="center"
                      ></StyledTableCell>
                    </TopStyledTableRow>
                    <TopStyledTableRow
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'auto',
                      }}
                    >
                      <StyledTableCell
                        sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                        align="center"
                      >
                        구분
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                        align="center"
                      ></StyledTableCell>
                    </TopStyledTableRow>
                    <TopStyledTableRow
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'auto',
                      }}
                    >
                      <StyledTableCell
                        sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                        align="center"
                      >
                        <div>지역서비스</div>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                        align="center"
                      >
                        <div style={{ display: 'flex' }}>
                          <div>
                            <input />
                          </div>
                          <div>
                            <select></select>
                          </div>
                          <div>
                            <button type="button">검색</button>
                          </div>
                        </div>
                      </StyledTableCell>
                    </TopStyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </article>
            <article className="notice_target_setting_wrapper">
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TopStyledTableRow
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'auto',
                      }}
                    >
                      <StyledTableCell
                        sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 5' }}
                        align="center"
                      >
                        <div className="area_service_wrapper">
                          <div className="area_service">
                            <div>성남사랑</div>
                            <div>X</div>
                          </div>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                        align="center"
                      >
                        <div>
                          <button type="button">전체삭제</button>
                        </div>
                      </StyledTableCell>
                    </TopStyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </article>
            <article className="notice_target_setting_wrapper">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TopStyledTableRow
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'auto',
                      }}
                    >
                      <StyledTableCell
                        sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                        align="center"
                      >
                        <FormControlLabel
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                          value="top"
                          control={<Checkbox />}
                          label="전체선택"
                          labelPlacement="top"
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                        align="center"
                      >
                        <div>구분</div>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 3' }}
                        align="center"
                      >
                        <div>지역서비스</div>
                      </StyledTableCell>
                    </TopStyledTableRow>
                  </TableHead>
                  <TableBody>
                    {NoticeTartget.map((nt, index) => {
                      return (
                        <TopStyledTableRow
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(6, 1fr)',
                            gridTemplateRows: 'auto',
                          }}
                          key={index}
                        >
                          <StyledTableCell
                            sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                            align="center"
                          >
                            <FormControlLabel
                              value=""
                              control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
                              label=""
                              labelPlacement="top"
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 2' }}
                            align="center"
                          >
                            <div>
                              {nt.payType === '00'
                                ? '카드'
                                : nt.payType === '01'
                                ? 'QR'
                                  : nt.payType === '02'
                                    ? '카드 + QR'
                                : '결제 구분 없음'}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 3' }}
                            align="center"
                          >
                            <div>{nt.areaSrvcNm}</div>
                          </StyledTableCell>
                        </TopStyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </article>
          </section>
          <style jsx>
            {`
              .notice_target_setting_wrapper {
                margin-bottom: 15px;
              }
              .area_service_wrapper {
                display: flex;
                flex-wrap: wrap;
              }
              .area_service {
                display: flex;
                border: 1px solid black;
                padding: 5px;
              }
            `}
          </style>
        </>
      );
    };

    return (
      <>
        {cmknTrgtCd?.map((c, index) => {
          return (
            <Modal
              type={'checkbox'}
              name={c.dtlCdNm}
              title={'관리시스템 설정'}
              content={mngsystem()}
              width={600}
              height={800}
              lbutton={'취소'}
              rbutton={'저장'}
              lButtonFunction={actionLeftBtn}
              rButtonFunction={actionRightBtn}
              closeEvent={closeEvent}
              checkboxValue={c.dtlCd}
              checkboxEvent={checkboxEvent}
              key={index}
              openModal={undefined}
            ></Modal>
          );
        })}
      </>
    );
  };

  //date
  const date = [
    {
      value: '00',
      title: '00 시',
    },
    {
      value: '01',
      title: '01 시',
    },
    {
      value: '02',
      title: '02 시',
    },
    {
      value: '03',
      title: '03 시',
    },
    {
      value: '04',
      title: '04 시',
    },
    {
      value: '05',
      title: '05 시',
    },
    {
      value: '06',
      title: '06 시',
    },
    {
      value: '07',
      title: '07 시',
    },
    {
      value: '08',
      title: '08 시',
    },
    {
      value: '09',
      title: '09 시',
    },
    {
      value: '10',
      title: '10 시',
    },
    {
      value: '11',
      title: '11 시',
    },
    {
      value: '12',
      title: '12 시',
    },
    {
      value: '13',
      title: '13 시',
    },
    {
      value: '14',
      title: '14 시',
    },
    {
      value: '15',
      title: '15 시',
    },
    {
      value: '16',
      title: '16 시',
    },
    {
      value: '17',
      title: '17 시',
    },
    {
      value: '18',
      title: '18 시',
    },
    {
      value: '19',
      title: '19 시',
    },
    {
      value: '20',
      title: '20 시',
    },
    {
      value: '21',
      title: '21 시',
    },
    {
      value: '22',
      title: '22 시',
    },
    {
      value: '23',
      title: '23 시',
    },
  ];

  // 시작일자 변경 함수
  const changeStartDate = (date) => {
    startDtRef.current.value = date.target.value;
    endDtRef.current.min = date.target.value;

    if (startDtRef?.current?.value === endDtRef?.current?.value) {
      if (Number(startTimeRef?.current?.value) > Number(endTimeRef?.current?.value)) {
        startTimeRef.current.value = startTimeRef.current[0].value;
      }
    }
  };

  // 종료일자 변경 함수
  const changeEndDate = (date) => {
    endDtRef.current.value = date.target.value;
    startDtRef.current.max = date.target.value;

    if (startDtRef?.current?.value === endDtRef?.current?.value) {
      if (Number(endTimeRef?.current?.value) < Number(startTimeRef?.current?.value)) {
        endTimeRef.current.value = endTimeRef.current[0].value;
      }
    }
  };

  //code
  const codeData = useSelector((state: RootState) => state.codeSlice);
  const [mgmtSysCdData, setMgmtSysCdData] = useState([]);
  const [cmknTrgtCd, setcmknTrgtCdData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getCode();
  }, [codeData]);

  const getCode = () => {
    console.log('codeData', codeData);
    if (codeData != null) {
      if (!codeData?.first) {
        const tempMgmtSysCdData = [];
        const tempcmknTrgtCdData = [];
        for (let i = 0; i < codeData?.code.length; i++) {
          if (codeData?.code[i]?.cdDvcd === '3010') {
            tempMgmtSysCdData.push(codeData?.code[i]);
          }
          if (codeData?.code[i]?.cdDvcd === '1074') {
            tempcmknTrgtCdData.push(codeData?.code[i]);
          }
        }

        setMgmtSysCdData(tempMgmtSysCdData);
        setcmknTrgtCdData(tempcmknTrgtCdData);
        getData();
      } else {
        Code.selectcode({
          cdDvcd: '',
          dtlCd: '',
          dtlCdNm: null,
          uzYn: 'Y',
          pageNum: 1,
          pageSize: 9999,
        })
          .then((response: any) => {
            const code = response.body;
            console.log(code.cdList);
            dispatch(codeState.actions.setCodeState(code.cdList));
          })
          .catch((e: ResData) => {
            console.log(e);

            console.log('터짐');
          });
      }
    }
  };

  /*
  console.log('codeData', codeData);
  if (codeData != null) {
    if (!codeData?.first) {
      const tempMgmtSysCdData = [];
      const tempcmknTrgtCdData = [];
      for (let i = 0; i < codeData?.code.length; i++) {
        if (codeData?.code[i]?.cdDvcd === '3010') {
          tempMgmtSysCdData.push(codeData?.code[i]);
        }
        if (codeData?.code[i]?.cdDvcd === '1074') {
          tempcmknTrgtCdData.push(codeData?.code[i]);
        }
      }

      setMgmtSysCdData(tempMgmtSysCdData);
      setcmknTrgtCdData(tempcmknTrgtCdData);
    } else {
      Code.selectcode({
        cdDvcd: '', //TODO: 이건 어디서 나온겨??
        dtlCdNm: null,
        uzYn: 'Y',
        pageNum: 1,
        pageSize: 999,
      })
        .then((response: any) => {
          const code = response.body;
          console.log(code.cdList);
          dispatch(codeState.actions.setCodeState(code.cdList));
        })
        .catch((e: ResData) => {
          console.log(e);

          console.log('터짐');
        });
    }
  }
  */

  //data
  const [idParam, setIdParam] = useState(null);
  const [idData, setIdData] = useState<noticeDetail>(null);
  const titleRef = useRef<any>();
  const startDtRef = useRef<any>();
  const startTimeRef = useRef<any>();
  const endDtRef = useRef<any>();
  const endTimeRef = useRef<any>();
  const topFixedYnRef = useRef<any>();
  const popoupNoticeYnRef = useRef<any>();
  const mgmtSysAllRef = useRef<any>();
  const mgmtSysCdRef = useRef<any>([]);
  const anctTypCdRef = useRef<any>();
  const bltYRef = useRef<any>();
  const bltNRef = useRef<any>();
  const cmknCtntRef = useRef<any>();

  useEffect(() => {
    console.log('idData', idData);
    setTimeout(() => {
      if (idData != null) {
        let checked = true;
        for (let i = 0; i < mgmtSysCdRef?.current?.length; i++) {
          if (!mgmtSysCdRef?.current[i]?.checked) {
            checked = false;
          }
        }
        mgmtSysAllRef.current.checked = checked;

        idData?.bltnYn === 'Y'
          ? (bltYRef.current.checked = true)
          : (bltNRef.current.checked = true);
        startDtRef.current.max = endDtRef?.current?.value;
        endDtRef.current.min = startDtRef?.current?.value;

        titleRef.current.value = idData?.cmknTitl;
        cmknCtntRef.current.value = idData?.cmknCtnt;
      }
    }, 50);
  }, [idData]);

  //data get
  const getData = () => {
    const idData = String(window.location.href).split('/');
    if (idData != null) {
      setIdParam(idData[idData.length - 2]);
      NoticeMng.getNoticeDetail(idData[idData.length - 2]).then((response: any) => {
        console.log('response', response);
        if (response != null) {
          setIdData(response?.body);
        }
      });
    }
  };

  //data put
  const newData = () => {
    if (titleRef?.current?.value === '') {
      alert('제목을 입력해주세요');
      return;
    }
    const mgmtSysCds = [];
    for (let i = 0; i < mgmtSysCdRef?.current?.length; i++) {
      if (mgmtSysCdRef?.current[i]?.checked) {
        console.log(mgmtSysCdRef.current[i]);
        mgmtSysCds.push(mgmtSysCdRef?.current[i]?.value);
      }
    }
    console.log('mgmtSys', mgmtSysCds);
    if (mgmtSysCds.length === 0) {
      alert('관리시스템을 선택해주세요');
      return;
    }
    NoticeMng.putModifyNotice(idParam, {
      cmknTitl: titleRef?.current?.value,
      cmknStrtDt: String(startDtRef.current.value).replace(/-/gi, ''),
      cmknStrtTktm: startTimeRef?.current?.value,
      cmknEndDt: String(endDtRef.current.value).replace(/-/gi, ''),
      cmknEndTktm: endTimeRef?.current?.value,
      topFixedYn: topFixedYnRef?.current?.checked === true ? 'Y' : 'N',
      popupNoticeYn: popoupNoticeYnRef?.current?.checked === true ? 'Y' : 'N',
      mgmtSysCds: mgmtSysCds,
      cmknTargets: [
        {
          cmknTrgtIds: [],
          acntTypCd: '00',
        },
      ],
      bltnYn: bltYRef?.current?.checked ? 'Y' : 'N',
      cmknCtnt: '공지 내용',
      atflUrls: [
        {
          fileNm: '첨부파일 명',
          fileUrl: 'https://www.12cm.co.kr',
        },
      ],
    }).then((response: any) => {
      //console.log('response', response);
      //getData();
      window.history.back();
    });
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
            <button
              onClick={function () {
                newData();
              }}
            >
              수정
            </button>
          </div>
        </article>
        <article>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* 공지제목 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="right"
                  >
                    <div>공지제목</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 5', padding: '10px' }}
                    align="left"
                  >
                    <div style={{ height: '100%' }}>
                      <input
                        id="test"
                        ref={titleRef}
                        type="text"
                        className="detail-input"
                        style={{
                          width: '50%',
                          height: '100%',
                        }}
                      />
                    </div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 공지기간 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="right"
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      공지기간
                    </div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <div className="bl_content_filterWrap_bottom bl_content_filterWrap_top_right">
                      <input
                        ref={startDtRef}
                        type="date"
                        name=""
                        id="startDateId"
                        defaultValue={moment(idData?.cmknStrtDt).format('YYYY-MM-DD')}
                        onChange={changeStartDate}
                        max={moment(endDtRef?.current?.value).format('YYYY-MM-DD')}
                        className="el_input_date hp_mr-10"
                      />

                      <select
                        ref={startTimeRef}
                        name=""
                        id=""
                        className="un_pageItemSelect"
                        defaultValue={idData?.cmknStrtTktm}
                        style={{
                          marginRight: '10px',
                        }}
                        onClick={function () {
                          if (startDtRef?.current?.value === endDtRef?.current?.value) {
                            console.log('endTimeRef', endTimeRef);
                            for (let i = 0; i <= Number(endTimeRef?.current?.value); i++) {
                              startTimeRef.current[i].disabled = false;
                            }
                            for (
                              let i = Number(endTimeRef?.current?.value) + 1;
                              i < endTimeRef?.current?.length;
                              i++
                            ) {
                              startTimeRef.current[i].disabled = true;
                            }
                          } else {
                            for (let i = 0; i < endTimeRef?.current?.length; i++) {
                              startTimeRef.current[i].disabled = false;
                            }
                          }
                        }}
                      >
                        {date.map((c, index) => {
                          return (
                            <option value={`${c.value}`} className="item" key={index}>
                              {`${c.title}`}
                            </option>
                          );
                        })}
                      </select>

                      <span className="hp_mr-10 un_wave">~</span>

                      <input
                        ref={endDtRef}
                        type="date"
                        name=""
                        id="endDateId"
                        defaultValue={moment(idData?.cmknEndDt).format('YYYY-MM-DD')}
                        onChange={changeEndDate}
                        min={moment(startDtRef?.current?.value).format('YYYY-MM-DD')}
                        className="el_input_date hp_mr-10"
                      />

                      <select
                        ref={endTimeRef}
                        name=""
                        id=""
                        className="un_pageItemSelect"
                        defaultValue={idData?.cmknEndTktm}
                        style={{
                          marginRight: '10px',
                        }}
                        onClick={function () {
                          if (startDtRef?.current?.value === endDtRef?.current?.value) {
                            console.log('startTimeRef', startTimeRef.current.value);
                            for (let i = 0; i < Number(startTimeRef?.current?.value); i++) {
                              endTimeRef.current[i].disabled = true;
                            }
                            for (
                              let i = Number(startTimeRef?.current?.value);
                              i < endTimeRef?.current?.length;
                              i++
                            ) {
                              endTimeRef.current[i].disabled = false;
                            }
                          } else {
                            for (let i = 0; i < endTimeRef?.current?.length; i++) {
                              endTimeRef.current[i].disabled = false;
                            }
                          }
                        }}
                      >
                        {date.map((c, index) => {
                          return (
                            <option value={`${c.value}`} className="item" key={index}>
                              {`${c.title}`}
                            </option>
                          );
                        })}
                      </select>

                      <span
                        style={{
                          marginRight: '10px',
                        }}
                      >
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <input
                            type="checkbox"
                            ref={topFixedYnRef}
                            defaultChecked={idData?.topFixedYn === 'Y' ? true : false}
                          />
                          <span>{'상단고정'}</span>
                        </label>
                      </span>

                      <span>
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <input
                            type="checkbox"
                            ref={popoupNoticeYnRef}
                            defaultChecked={idData?.popupNoticeYn === 'Y' ? true : false}
                          />
                          <span>{'팝업공지'}</span>
                        </label>
                      </span>
                    </div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 관리시스템 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="right"
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      관리시스템
                    </div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ marginBottom: '5px' }}>
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <input
                            ref={mgmtSysAllRef}
                            type="checkbox"
                            value={''}
                            onClick={function () {
                              console.log('mgmtAllRef', mgmtSysAllRef.current.checked);
                              console.log('mgmtRef', mgmtSysCdRef);
                              if (mgmtSysAllRef?.current?.checked) {
                                for (let i = 0; i < mgmtSysCdRef?.current?.length; i++) {
                                  mgmtSysCdRef.current[i].checked = true;
                                }
                              } else {
                                for (let i = 0; i < mgmtSysCdRef?.current?.length; i++) {
                                  mgmtSysCdRef.current[i].checked = false;
                                }
                              }
                            }}
                          />
                          <div>전체</div>
                        </label>
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      {mgmtSysCdData.map((c, index) => {
                        return (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginRight: '10px',
                            }}
                          >
                            <span style={{ marginBottom: '5px' }}>
                              <label
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                }}
                              >
                                <input
                                  ref={(el) => (mgmtSysCdRef.current[index] = el)}
                                  type="checkbox"
                                  value={`${c.dtlCd}`}
                                  defaultChecked={idData?.mgmtSysCds.find(
                                    (value) => value === c.dtlCd
                                  )}
                                  onClick={function () {
                                    let checked = true;
                                    for (let i = 0; i < mgmtSysCdRef?.current?.length; i++) {
                                      if (mgmtSysCdRef?.current[i]?.checked === false) {
                                        checked = false;
                                      }
                                    }
                                    mgmtSysAllRef.current.checked = checked;
                                  }}
                                />
                                <div>{`${c.cdDtlDesc}`}</div>
                              </label>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 공지대상 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="right"
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      공지대상
                    </div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ marginBottom: '5px' }}>
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <input type="checkbox" value={''} />
                          <div>전체</div>
                        </label>
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        width: '100%',
                      }}
                    >
                      <NoticeTargetModal cmknTrgtCd={cmknTrgtCd} />
                    </div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 공지대상목록 */}
                {/* 게시여부 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="right"
                  >
                    <div>게시여부</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <div
                        style={{
                          marginRight: '10px',
                        }}
                      >
                        <label>
                          <input
                            ref={bltYRef}
                            type={'radio'}
                            value={'Y'}
                            style={{
                              marginRight: '5px',
                            }}
                            onClick={function () {
                              if (bltYRef?.current?.checked) {
                                bltNRef.current.checked = false;
                              } else {
                                bltNRef.current.checked = true;
                              }
                            }}
                          />
                          <span>{'게시'}</span>
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            ref={bltNRef}
                            type={'radio'}
                            value={'N'}
                            style={{
                              marginRight: '5px',
                            }}
                            onClick={function () {
                              if (bltNRef?.current?.checked) {
                                bltYRef.current.checked = false;
                              } else {
                                bltYRef.current.checked = true;
                              }
                            }}
                          />
                          <span>{'미게시'}</span>
                        </label>
                      </div>
                    </div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 공지내용 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    className="multirow"
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="right"
                  >
                    <div>공지내용</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    style={{ height: 400 }}
                    sx={{ gridRow: '1', gridColumn: 'span 5' }}
                    align="left"
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <textarea
                        ref={cmknCtntRef}
                        cols={100}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      ></textarea>
                    </div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 첨부파일 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="right"
                  >
                    <div>첨부파일</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 5' }}
                    align="left"
                  ></TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
              <TableBody>
                {/* 등록정보 */}
                <TopStyledTableRow>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>등록정보</div>
                  </TopStyledTableCell>
                </TopStyledTableRow>

                {/* 일자/등록자/변경내용 */}
                {/* 일자/등록자/변경내용 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <StyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    일자
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    등록자
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    변경내용
                  </StyledTableCell>
                </TopStyledTableRow>
                <>
                  {idData != null ? (
                    <>
                      {idData?.hisList?.map((history, index) => {
                        return (
                          <TopStyledTableRow
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(6, 1fr)',
                              gridTemplateRows: 'auto',
                            }}
                          >
                            <StyledTableCell
                              sx={{ gridRow: '1', gridColumn: 'span 1' }}
                              align="center"
                            >
                              {`${history?.frstRegDttm}`}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ gridRow: '1', gridColumn: 'span 1' }}
                              align="center"
                            >
                              {`${history?.frstRgsrNm}`}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ gridRow: '1', gridColumn: 'span 4' }}
                              align="center"
                            >
                              {`${history?.chngCtnt}`}
                            </StyledTableCell>
                          </TopStyledTableRow>
                        );
                      })}
                    </>
                  ) : (
                    ''
                  )}
                </>
              </TableBody>
            </Table>
          </TableContainer>
        </article>
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
      `}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'공지사항 상세'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
