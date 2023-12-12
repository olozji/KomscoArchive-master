import styles from './../style/notice.module.css';
import NoticeMng from '../../../services/NoticeService';
import { ResData } from '../../../types/ResData';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import Code from '../../../services/CodeService';
import { useSelector, useDispatch } from 'react-redux';
import { codeState } from '@/lib/store/fetures/codeSlice';
import { RootState } from '@/lib/store';
import Select from '@/components/select';

const addMenual = () => {
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
      display: 'flex',
      alignItems: 'center',
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

  //code
  const codeData = useSelector((state: RootState) => state.codeSlice);
  const [mgmtSysCdData, setMgmtSysCdData] = useState([]);
  const dispatch = useDispatch();
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    getCode();
  }, [codeData]);

  const getCode = () => {
    console.log('codeData', codeData);
    if (codeData != null) {
      if (!codeData?.first) {
        const tempMgmtSysCdData = [];
        for (let i = 0; i < codeData?.code.length; i++) {
          if (codeData?.code[i]?.cdDvcd === '1074') {
            tempMgmtSysCdData.push(codeData?.code[i]);
          }
        }

        setMgmtSysCdData(tempMgmtSysCdData);
        setDelay(false);
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

  //data
  const mgmtRef = useRef<any>();
  const mgmtSysAllRef = useRef<any>();
  const mgmtSysCdRef = useRef<any>([]);
  const paymentAllRef = useRef<any>();
  const paymentCardRef = useRef<any>();
  const paymentQrRef = useRef<any>();
  const salesAllRef = useRef<any>();
  const salesChargeRef = useRef<any>();
  const salesPayRef = useRef<any>();
  const preSalesRef = useRef<any>();
  const bltYRef = useRef<any>();
  const bltNRef = useRef<any>();
  const mnulNmRef = useRef<any>();
  const mnulDescRef = useRef<any>();
  const payDisplayRef = useRef<any>();
  const saleDisplayRef = useRef<any>();

  const addData = () => {
    console.log('mgmtRef', mgmtRef.current.value);
    const mgmtSysCds = [];
    for (let i = 0; i < mgmtSysCdRef?.current?.length; i++) {
      if (mgmtSysCdRef?.current[i]?.checked) {
        mgmtSysCds.push(mgmtSysCdRef?.current[i]?.value);
      }
    }
    console.log('acntTypCds', mgmtSysCds);
    let paymentData = [];
    if (paymentAllRef?.current?.checked) {
      paymentData = ['00', '02'];
    } else {
      if (paymentCardRef?.current?.checked) {
        paymentData.push(paymentCardRef?.current?.value);
      }
      if (paymentQrRef?.current?.checked) {
        paymentData.push(paymentQrRef?.current?.value);
      }
    }

    let salesData = [];
    if (salesAllRef?.current?.checked) {
      salesData = ['00', '01', '02'];
    } else {
      if (salesChargeRef?.current?.checked) {
        salesData.push(salesChargeRef?.current?.value);
      }
      if (salesPayRef?.current?.checked) {
        salesData.push(salesPayRef?.current?.value);
      }
      if (preSalesRef?.current?.checked) {
        salesData.push(preSalesRef?.current?.value);
      }
    }
    console.log('payments', paymentData);
    console.log('sales', salesData);
    console.log('메뉴명', mnulNmRef?.current?.value);
    console.log('메뉴설명', mnulDescRef?.current?.value);
    console.log('fileVersion', '11');
    console.log('게시', bltYRef?.current?.checked ? 'Y' : 'N');

    if (mgmtSysCds.length === 0) {
      alert('계정유형을 선택해주세요');
    }
    if (paymentData.length === 0) {
      alert('결제방식을 선택해주세요');
    }
    if (salesData.length === 0) {
      alert('할인방식을 선택해주세요');
    }
    if (mnulNmRef?.current?.value === '') {
      alert('메뉴명을 입력해주세요');
    }
    if (mnulDescRef?.current?.value === '') {
      alert('메뉴 설명을 입력해주세요');
    }
    NoticeMng.postMenual({
      mgmtSysCd: mgmtRef.current.value,
      acntTypCds: mgmtSysCds,
      payments: paymentData,
      sales: salesData,
      mnulNm: mnulNmRef?.current?.value,
      mnulDesc: mnulDescRef?.current?.value,
      dwldUrl: '11',
      bltnYn: bltYRef?.current?.checked ? 'Y' : 'N',
    }).then((response: any) => {
      console.log('메뉴얼 등록 완료');
      window.close();
    });
  };

  return (
    <div>
      {delay === true ? (
        ''
      ) : (
        <section>
          <article className="popuptitlewrapper">
            <div>메뉴얼 등록</div>
          </article>
          <article>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 230, maxWidth: 600 }} aria-label="customized table">
                <TableBody>
                  {/* 관리시스템 */}
                  <TopStyledTableRow
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    <TopStyledTableCell
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                      align="left"
                    >
                      <div>관리시스템</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 2' }} align="left">
                      <Select
                        title={''}
                        titleShow={false}
                        selectRef={mgmtRef}
                        codeNumber={'3010'}
                      />
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 계정유형 */}
                  <TopStyledTableRow
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    <TopStyledTableCell
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                      align="left"
                    >
                      <div>계정유형</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 2' }} align="left">
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            maxWidth: '500px',
                          }}
                        >
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
                                <div
                                  style={{
                                    marginRight: '10px',
                                  }}
                                >
                                  전체
                                </div>
                              </label>
                            </span>
                          </div>
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
                                      onClick={function () {
                                        let checked = true;
                                        for (let i = 0; i < mgmtSysCdRef?.current?.length; i++) {
                                          if (mgmtSysCdRef?.current[i]?.checked === false) {
                                            checked = false;
                                          }
                                        }
                                        mgmtSysAllRef.current.checked = checked;
                                      }}
                                      onChange={function () {
                                        for (let i = 0; i < mgmtSysCdRef?.current?.length; i++) {
                                          if (mgmtSysCdRef?.current[i]?.value === '01') {
                                            if (mgmtSysCdRef?.current[i]?.checked) {
                                              if (payDisplayRef?.current != null) {
                                                payDisplayRef.current.style.display = 'flex';
                                              }
                                              if (saleDisplayRef?.current != null) {
                                                saleDisplayRef.current.style.display = 'flex';
                                              }
                                            } else {
                                              if (payDisplayRef?.current != null) {
                                                payDisplayRef.current.style.display = 'none';
                                              }
                                              if (saleDisplayRef?.current != null) {
                                                saleDisplayRef.current.style.display = 'none';
                                              }
                                            }
                                          }
                                        }
                                      }}
                                    />
                                    <div>{`${c.cdDtlDesc}`}</div>
                                  </label>
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 노출대상 */}
                  <TopStyledTableRow
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    <TopStyledTableCell
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                      align="left"
                    >
                      <div>노출대상</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 2' }} align="left">
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
                              sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                              align="center"
                            >
                              <div>결제방식:</div>
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 5' }}
                              align="center"
                            >
                              <div
                                ref={payDisplayRef}
                                className="check_list"
                                style={{
                                  display: 'none',
                                }}
                              >
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
                                        type="checkbox"
                                        value={''}
                                        ref={paymentAllRef}
                                        onClick={function () {
                                          console.log(
                                            'paymentAllRef',
                                            paymentAllRef?.current?.checked
                                          );
                                          if (paymentAllRef?.current?.checked) {
                                            paymentCardRef.current.checked = true;
                                            paymentQrRef.current.checked = true;
                                          } else {
                                            paymentCardRef.current.checked = false;
                                            paymentQrRef.current.checked = false;
                                          }
                                        }}
                                      />
                                      <div>전체</div>
                                    </label>
                                  </span>
                                </div>
                                {/*
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  flexWrap: 'wrap',
                                }}
                              >
                                {payment.map((c, index) => {
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
                                          <input type="checkbox" value={`${c.dtlCd}`} />
                                          <div>{`${c.cdDtlDesc}`}</div>
                                        </label>
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                                */}
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                  }}
                                >
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      marginLeft: '10px',
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
                                          type="checkbox"
                                          value={`00`}
                                          ref={paymentCardRef}
                                          onClick={function () {
                                            if (
                                              paymentCardRef.current.checked === false ||
                                              paymentQrRef.current.checked === false
                                            ) {
                                              paymentAllRef.current.checked = false;
                                            } else {
                                              paymentAllRef.current.checked = true;
                                            }
                                          }}
                                        />
                                        <div>{`카드`}</div>
                                      </label>
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      marginLeft: '10px',
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
                                          type="checkbox"
                                          value={`02`}
                                          ref={paymentQrRef}
                                          onClick={function () {
                                            if (
                                              paymentCardRef.current.checked === false ||
                                              paymentQrRef.current.checked === false
                                            ) {
                                              paymentAllRef.current.checked = false;
                                            } else {
                                              paymentAllRef.current.checked = true;
                                            }
                                          }}
                                        />
                                        <div>{`QR`}</div>
                                      </label>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </StyledTableCell>
                          </TopStyledTableRow>
                          <TopStyledTableRow
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(6, 1fr)',
                              gridTemplateRows: 'auto',
                            }}
                          >
                            <StyledTableCell
                              sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                              align="center"
                            >
                              <div>할인방식:</div>
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 5' }}
                              align="center"
                            >
                              <div
                                ref={saleDisplayRef}
                                className="check_list"
                                style={{
                                  display: 'none',
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingRight: '20px',
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
                                        type="checkbox"
                                        value={''}
                                        ref={salesAllRef}
                                        onClick={function () {
                                          console.log('salesAllRef', salesAllRef?.current?.checked);
                                          if (salesAllRef?.current?.checked) {
                                            salesChargeRef.current.checked = true;
                                            salesPayRef.current.checked = true;
                                            preSalesRef.current.checked = true;
                                          } else {
                                            salesChargeRef.current.checked = false;
                                            salesPayRef.current.checked = false;
                                            preSalesRef.current.checked = false;
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
                                    marginRight: '10px',
                                  }}
                                >
                                  <span style={{ marginBottom: '5px' }}>
                                    <label
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '2px',
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        value={`00`}
                                        ref={salesChargeRef}
                                        onClick={function () {
                                          if (
                                            salesChargeRef?.current?.checked === false ||
                                            salesPayRef?.current?.checked === false ||
                                            preSalesRef?.current?.checked === false
                                          ) {
                                            salesAllRef.current.checked = false;
                                          } else {
                                            salesAllRef.current.checked = true;
                                          }
                                        }}
                                      />
                                      <div>{`충전 캐시백`}</div>
                                    </label>
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '10px',
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
                                        type="checkbox"
                                        value={`01`}
                                        ref={salesPayRef}
                                        onClick={function () {
                                          if (
                                            salesChargeRef?.current?.checked === false ||
                                            salesPayRef?.current?.checked === false ||
                                            preSalesRef?.current?.checked === false
                                          ) {
                                            salesAllRef.current.checked = false;
                                          } else {
                                            salesAllRef.current.checked = true;
                                          }
                                        }}
                                      />
                                      <div>{`결제 캐시백`}</div>
                                    </label>
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '10px',
                                    marginRight: '10px',
                                    flexWrap: 'wrap',
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
                                        type="checkbox"
                                        value={`02`}
                                        ref={preSalesRef}
                                        onClick={function () {
                                          if (
                                            salesChargeRef?.current?.checked === false ||
                                            salesPayRef?.current?.checked === false ||
                                            preSalesRef?.current?.checked === false
                                          ) {
                                            salesAllRef.current.checked = false;
                                          } else {
                                            salesAllRef.current.checked = true;
                                          }
                                        }}
                                      />
                                      <div>{`선할인`}</div>
                                    </label>
                                  </span>
                                </div>
                              </div>
                            </StyledTableCell>
                          </TopStyledTableRow>
                        </TableBody>
                      </Table>
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 메뉴얼명 */}
                  <TopStyledTableRow
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    <TopStyledTableCell
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                      align="left"
                    >
                      <div>메뉴얼명</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 2' }} align="left">
                      <div>
                        <input defaultValue={''} ref={mnulNmRef} />
                      </div>
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 설명 */}
                  <TopStyledTableRow
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    <TopStyledTableCell
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                      align="left"
                    >
                      <div>설명</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 2' }} align="left">
                      <div>
                        <input defaultValue={''} ref={mnulDescRef} />
                      </div>
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 파일버전 */}
                  <TopStyledTableRow
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    <TopStyledTableCell
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                      align="left"
                    >
                      <div>파일버전</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 2' }} align="left">
                      <div>
                        <span>{'1.0'}</span>
                      </div>
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 첨부파일 */}
                  <TopStyledTableRow
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    <TopStyledTableCell
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                      align="left"
                    >
                      <div>첨부파일</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell
                      sx={{ gridRow: '1', gridColumn: 'span 2', padding: 'inherit' }}
                      align="left"
                    >
                      <div style={{ width: '100%' }}>
                        <Table sx={{}}>
                          <TableBody>
                            <TopStyledTableRow>
                              <TopStyledTableCell>
                                <div>
                                  <button>파일찾기</button>
                                </div>
                              </TopStyledTableCell>
                            </TopStyledTableRow>
                            <TopStyledTableRow>
                              <TopStyledTableCell>
                                <div className="fileupload_des">
                                  선택한 파일명과 용량이 표시됩니다.(최대 5MB)
                                </div>
                              </TopStyledTableCell>
                            </TopStyledTableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 게시여부 */}
                  <TopStyledTableRow
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    <TopStyledTableCell
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                      align="left"
                    >
                      <div>게시여부</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 1' }} align="left">
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
                              defaultChecked={true}
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
                </TableBody>
              </Table>
            </TableContainer>
            <div className="popup_des">
              <div>※ 매뉴얼명은 사용자+서비스구분+매뉴명+업로드 버전을 표기해주세요.</div>
              <div>(예 :지자체용_관리자웹_가맹점관리_매뉴얼_v1.0)</div>
            </div>
            <div className="button_wrapper">
              <button
                type="button"
                className="canclebutton"
                onClick={() => {
                  window.close();
                }}
              >
                취소
              </button>
              <button type="button" className="submitbutton" onClick={addData}>
                저장
              </button>
            </div>
          </article>
        </section>
      )}
      <style jsx>{`
        .popuptitlewrapper {
          padding: 10px;
          background: black;
          color: white;
          font-size: 14px;
        }
        .popup_des {
          padding: 10px;
          font-size: 14px;
        }
        .fileupload_des {
          font-size: 12px;
          color: #ccc;
        }
        .button_wrapper {
          display: flex;
          margin-top: 10px;
          max-width: 600px;
          justify-content: center;
        }
        .button_wrapper button {
          cursor: pointer;
          width: 80px;
          height: 35px;
          margin-left: 10px;
          margin-right: 10px;
          border: none;
        }
        .submitbutton {
          background: #0040b5;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default addMenual;
