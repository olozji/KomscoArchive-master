import PrimaryLayout from '../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../page';
import styles from './../style/notice.module.css';
import Pagination from '../../../components/pagination/Pagination';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState, useRef } from 'react';
import Modal from 'components/modal/modal';
import MuiPagination from 'components/muipagination';
import Select from 'components/select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { codeState } from '@/lib/store/fetures/codeSlice';
import Code from '../../../services/CodeService';
import { AnyFramework } from '@storybook/csf';
import { Button } from '@mui/material';

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

  const [faq, setFaq] = useState([]);
  // 모달 닫기버튼 state전달용
  const [closeEvent, setCloseEvent] = useState(false);

  const [params, setParams] = useState({
    systemNm: '',
  });

  const systemNmInput = useRef(null);

  useEffect(() => {
    getfaq();
  }, []);

  function getfaq(pageNum = 1, pageSize = 10, faqQryCtnt = '', mgmtSysCd = '') {
    NoticeMng.selectFaqList({
      faqDivCd: '',
      faqQryCtnt: faqQryCtnt,
      pageNum: pageNum,
      pageSize: pageSize,
      mgmtSysCd: mgmtSysCd,
    })
      .then((response: any) => {
        const faq = response.body;
        console.log(faq.faqList);
        setFaq(faq.faqList);
        setTotalPage(faq?.totCnt);
        setPageSize(pageSize);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  }

  //pagination
  //현제 페이지 번호
  const [page, setPage] = useState(1);
  //전체 페이지 크기
  const [totalPage, setTotalPage] = useState(null);
  //페이지 사이즈
  const [pageSize, setPageSize] = useState(10);
  const pageSizeRef = useRef<any>();

  const callApi = (page = 1) => {
    getfaq(
      page,
      pageSizeRef?.current?.value,
      titleRef?.current?.value,
      mgmtSysCdRef?.current?.value
    );
  };

  const sizeChange = () => {
    setPage(1);
    setTimeout(() => {
      callApi();
    }, 100);
  };

  const search = (e) => {
    e.preventDefault();
    setPage(1);
    setTimeout(() => {
      callApi();
    }, 100);
  };

  //search params
  const mgmtSysCdRef = useRef<any>();
  const titleRef = useRef<any>();

  //textOver
  const textRef = useRef<any>();

  const textOver = (e) => {
    e.target.style = 'text-decoration: underline; cursor: pointer';
  };

  const textOut = (e) => {
    e.target.style = 'text-decoration: ""';
  };

  //code
  const codeData = useSelector((state: RootState) => state.codeSlice);
  const [payment, setPayment] = useState([]);
  const [sales, setSales] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getCode();
  }, [codeData]);

  useEffect(() => {
    console.log('payment', payment);
  }, [payment]);

  useEffect(() => {
    console.log('sales', sales);
  }, [sales]);

  const getCode = () => {
    console.log('codeData', codeData);
    if (codeData != null) {
      if (!codeData?.first) {
        const tempsetPayment = [];
        const tempsetSales = [];
        for (let i = 0; i < codeData?.code.length; i++) {
          if (codeData?.code[i]?.cdDvcd === '3183') {
            tempsetPayment.push(codeData?.code[i]);
          }
          if (codeData?.code[i]?.cdDvcd === '3190') {
            tempsetSales.push(codeData?.code[i]);
          }
        }

        setPayment(tempsetPayment);
        setSales(tempsetSales);
      } else {
        Code.selectcode({
          cdDvcd: '',
          dtlCd: '',
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
  };

  //add faq
  const mgmtRef = useRef<any>();
  const paymentAllRef = useRef<any>();
  const paymentCardRef = useRef<any>();
  const paymentQrRef = useRef<any>();
  const salesAllRef = useRef<any>();
  const salesChargeRef = useRef<any>();
  const salesPayRef = useRef<any>();
  const preSalesRef = useRef<any>();
  const faqQryCtntRef = useRef<any>();
  const faqReplCtntRef = useRef<any>();
  const bltYRef = useRef<any>();
  const bltNRef = useRef<any>();

  const addFaqData = (mgmtSysCd, payments, sales, faqQryCtnt, faqReplCtnt, bltnYn) => {
    console.log('mgmtSysCd', mgmtSysCd);
    if (payments.length === 0) {
      alert('결제 방식을 선택해주세요');
      return;
    }
    if (sales.length === 0) {
      alert('할인 방식을 선택해주세요');
      return;
    }
    if (faqQryCtnt === '') {
      alert('질문을 입력해주세요');
      return;
    }
    if (faqReplCtnt === '') {
      alert('답변을 입력해주세요');
      return;
    }
    NoticeMng.postFaq({
      mgmtSysCd: mgmtSysCd,
      payments: payments,
      sales: sales,
      faqQryCtnt: faqQryCtnt,
      faqReplCtnt: faqReplCtnt,
      bltnYn: bltnYn ? 'Y' : 'N',
    }).then((response: any) => {
      console.log('faq 등록 완료');
      setCloseEvent(!closeEvent);
      getfaq(
        page,
        pageSizeRef?.current?.value,
        titleRef?.current?.value,
        mgmtSysCdRef?.current?.value
      );
    });
  };

  const actionLeftBtn = () => {
    console.log('-----LeftBtn Action----');
    setCloseEvent(!closeEvent);
    console.log(closeEvent);
  };
  const actionRightBtn = (e) => {
    console.log('-----rightBtn Action----');
    console.log('mgmtRef', mgmtRef?.current?.value);
    console.log('faqQryCtntRef', faqQryCtntRef?.current?.value);
    console.log('faqReplCtntRef', faqReplCtntRef?.current?.value);
    console.log('bltYRef', bltYRef?.current?.checked);
    console.log('bltNRef', bltNRef?.current?.checked);

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

    addFaqData(
      mgmtRef?.current?.value,
      paymentData,
      salesData,
      faqQryCtntRef?.current?.value,
      faqReplCtntRef?.current?.value,
      bltYRef?.current?.checked
    );
  };

  const addFqa = ({ mgmtRef, faqQryCtntRef, faqReplCtntRef, bltYRef, bltNRef }) => {
    return (
      <div>
        <section>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* 관리시스템 */}
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
                    <div>관리시스템</div>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    <Select
                      title={'관리 시스템'}
                      codeNumber={'3010'}
                      selectRef={mgmtRef}
                      titleShow={false}
                    />
                  </StyledTableCell>
                </TopStyledTableRow>
                {/* 노출대상 */}
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
                    <div>노출대상</div>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
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
                            <div className="check_list">
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
                              className="check_list"
                              style={{
                                justifyContent: 'space-evenly',
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
                  </StyledTableCell>
                </TopStyledTableRow>
                {/* 질문 */}
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
                    <div>질문</div>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    <div>
                      <input defaultValue={''} ref={faqQryCtntRef} />
                    </div>
                  </StyledTableCell>
                </TopStyledTableRow>
                {/* 답변 */}
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
                    <div>답변</div>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    <div>
                      <input defaultValue={''} ref={faqReplCtntRef} />
                    </div>
                  </StyledTableCell>
                </TopStyledTableRow>
                {/* 게시여부 */}
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
                    <div>게시여부</div>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
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
                  </StyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </section>
        <style jsx>
          {`
            .check_list {
              display: flex;
              flex-wrap: wrap;
            }
          `}
        </style>
      </div>
    );
  };

  //detail faq
  const [detailClose, setDetailClose] = useState(false);
  const [detailDatas, setDetailDatas] = useState(null);
  const modalRef = useRef<any>();
  const detailRef = useRef<any>();
  const testRef = useRef<any>();
  const fresRef = useRef<any>();
  const detailMgmtRef = useRef<any>();
  const detailfaqQryCtntRef = useRef<any>();
  const detailfaqReplCtntRef = useRef<any>();

  useEffect(() => {
    console.log('response', detailDatas);

    if (detailDatas != null) {
      detailRef?.current?.click();

      setTimeout(() => {
        if (testRef?.current != null) {
          testRef.current.value = JSON.stringify(detailDatas);
          detailMgmtRef.current.value = detailDatas?.body?.mgmtSysCd;
          detailfaqQryCtntRef.current.value = detailDatas?.body?.faqQryCtnt;
          detailfaqReplCtntRef.current.value = detailDatas?.body?.faqReplCtnt;
          detailDatas?.body?.bltnYn === 'Y'
            ? (bltYRef.current.checked = true)
            : (bltNRef.current.checked = true);

          //payment
          const payments = detailDatas?.body?.payments;
          if (
            payments.find((value) => value === '00') &&
            payments.find((value) => value === '02')
          ) {
            paymentAllRef.current.checked = true;
          }
          for (let i = 0; i < payments.length; i++) {
            if (payments[i] === '00') {
              paymentCardRef.current.checked = true;
            }
            if (payments[i] === '02') {
              paymentQrRef.current.checked = true;
            }
          }

          //sales
          const sales = detailDatas?.body?.sales;
          if (
            sales.find((value) => value === '00') &&
            sales.find((value) => value === '01') &&
            sales.find((value) => value === '02')
          ) {
            salesAllRef.current.checked = true;
          }
          for (let i = 0; i < sales.length; i++) {
            if (sales[i] === '00') {
              salesChargeRef.current.checked = true;
            }
            if (sales[i] === '01') {
              salesPayRef.current.checked = true;
            }
            if (sales[i] === '02') {
              preSalesRef.current.checked = true;
            }
          }
        }
      }, 100);
    }
  }, [detailDatas]);

  const detailLeft = () => {
    console.log('-----LeftBtn Action----');
    setDetailClose(!detailClose);
    console.log(closeEvent);
  };
  const detailRight = (e) => {
    console.log('-----rightBtn Action----');
    putFaq();
  };

  const detailData = (index: any) => {
    if (index != null) {
      NoticeMng.detailFaq(index).then((response: any) => {
        if (response != null) {
          console.log('response', response);
          setDetailDatas(response);
        }
      });
    }
  };

  const putFaq = () => {
    console.log('detailMgmtRef', detailMgmtRef?.current?.value);
    console.log('detailfaqQryCtntRef', detailfaqQryCtntRef?.current?.value);
    console.log('detailfaqReplCtntRef', detailfaqReplCtntRef?.current?.value);
    console.log('bltYRef', bltYRef?.current?.checked);
    console.log('bltNRef', bltNRef?.current?.checked);
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

    if (paymentData.length === 0) {
      alert('결제방식을 선택해주세요');
      return;
    }
    if (salesData.length === 0) {
      alert('할인방식을 선택해주세요');
      return;
    }
    if (
      detailfaqQryCtntRef?.current?.value === '' ||
      detailfaqQryCtntRef?.current?.value === null
    ) {
      alert('질문을 입력해주세요');
      return;
    }
    if (
      detailfaqReplCtntRef?.current?.value === '' ||
      detailfaqReplCtntRef?.current?.value === null
    ) {
      alert('답변을 입력해주세요');
      return;
    }
    NoticeMng.putFaq(detailDatas?.body?.faqSeq, {
      mgmtSysCd: detailMgmtRef?.current?.value,
      payments: paymentData,
      sales: salesData,
      faqQryCtnt: detailfaqQryCtntRef?.current?.value,
      faqReplCtnt: detailfaqReplCtntRef?.current?.value,
      bltnYn: bltYRef?.current?.checked ? 'Y' : 'N',
    }).then((response: any) => {
      console.log('faq 수정 완료');
      setDetailClose(!detailClose);
      getfaq(
        page,
        pageSizeRef?.current?.value,
        titleRef?.current?.value,
        mgmtSysCdRef?.current?.value
      );
    });
  };

  const detailFqa = ({
    testRef,
    fresRef,
    detailMgmtRef,
    detailfaqQryCtntRef,
    detailfaqReplCtntRef,
  }) => {
    return (
      <div
        style={{
          maxHeight: '800px',
        }}
      >
        <input type="hidden" ref={testRef} />
        <section>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* 관리시스템 */}
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
                    <div>{`관리 시스템`}</div>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    <Select
                      title={''}
                      codeNumber={'3010'}
                      selectRef={detailMgmtRef}
                      titleShow={false}
                    />
                  </StyledTableCell>
                </TopStyledTableRow>
                {/* 노출대상 */}
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
                    <div>노출대상</div>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
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
                              className="check_list"
                              style={{
                                flexWrap: 'nowrap',
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
                              className="check_list"
                              style={{
                                justifyContent: 'space-evenly',
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
                  </StyledTableCell>
                </TopStyledTableRow>
                {/* 질문 */}
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
                    <div>질문</div>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    <div>
                      <input defaultValue={''} ref={detailfaqQryCtntRef} />
                    </div>
                  </StyledTableCell>
                </TopStyledTableRow>
                {/* 답변 */}
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
                    <div>답변</div>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
                    <div>
                      <input defaultValue={''} ref={detailfaqReplCtntRef} />
                    </div>
                  </StyledTableCell>
                </TopStyledTableRow>
                {/* 게시여부 */}
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
                    <div>게시여부</div>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                    align="center"
                  >
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
                  </StyledTableCell>
                </TopStyledTableRow>
                {/* 등록정보 */}
                <TopStyledTableRow>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div
                      style={{
                        marginLeft: '50px',
                      }}
                    >
                      등록정보
                    </div>
                  </TopStyledTableCell>
                </TopStyledTableRow>

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
                <div
                  style={{
                    maxHeight: '50px',
                    paddingBottom: '50px',
                  }}
                >
                  {detailDatas?.body?.hisList.map((history, index) => {
                    return (
                      <TopStyledTableRow
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(6, 1fr)',
                          gridTemplateRows: 'auto',
                        }}
                      >
                        <StyledTableCell sx={{ gridRow: '1', gridColumn: 'span 1' }} align="center">
                          {`${history?.frstRegDttm}`}
                        </StyledTableCell>
                        <StyledTableCell sx={{ gridRow: '1', gridColumn: 'span 1' }} align="center">
                          {`${history?.frstRgsrNm}`}
                        </StyledTableCell>
                        <StyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="center">
                          {`${history?.chngCtnt}`}
                        </StyledTableCell>
                      </TopStyledTableRow>
                    );
                  })}
                </div>
              </TableBody>
            </Table>
          </TableContainer>
        </section>
        <style jsx>
          {`
            .check_list {
              display: flex;
              flex-wrap: wrap;
            }
          `}
        </style>
      </div>
    );
  };

  return (
    <>
      <section>
        <div className={styles.searchInput}>
          <form>
            {/*
            <select name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
              <option value="" className="item">
                관리시스템
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
              */}

            <Select title={'전체'} codeNumber={'3010'} selectRef={mgmtSysCdRef} />

            <input
              ref={titleRef}
              type="text"
              className="detail-input"
              placeholder="검색어를 입력하세요"
            />
            <button className="el_getBtn" onClick={search}>
              검색
            </button>
          </form>
        </div>
        <div className={styles.tabmenuSearch}>
          <div className={`${styles.bl_middleWrap_left}`}>
            <Modal
              type={'button'}
              width={600}
              height={800}
              name={'FAQ 등록'}
              title={'FAQ 등록'}
              content={addFqa({ mgmtRef, faqQryCtntRef, faqReplCtntRef, bltYRef, bltNRef })}
              lbutton={'취소'}
              rbutton={'등록'}
              lButtonFunction={actionLeftBtn}
              rButtonFunction={actionRightBtn}
              closeEvent={closeEvent}
              openModal={undefined}
            ></Modal>
          </div>
          <label
            ref={detailRef}
            style={{
              display: 'none',
            }}
          >
            <Modal
              type={'button'}
              width={600}
              height={800}
              name={''}
              title={'FAQ 수정'}
              content={detailFqa({
                testRef,
                fresRef,
                detailMgmtRef,
                detailfaqQryCtntRef,
                detailfaqReplCtntRef,
              })}
              lbutton={'취소'}
              rbutton={'수정'}
              lButtonFunction={detailLeft}
              rButtonFunction={detailRight}
              closeEvent={detailClose}
              modalRef={modalRef}
              openModal={undefined}
            ></Modal>
          </label>
          <div className={`${styles.bl_middleWrap_right}${styles.tabmenuSearchResult}`}>
            <div className="bl_middleWrap_right_result">
              <span className={styles.resultNum}>검색결과</span>
              <span className="hp_txt-red hp_txt-bold">{totalPage}</span>
              <span>개</span>
            </div>

            <select
              name=""
              id=""
              className="un_pageItemSelect"
              ref={pageSizeRef}
              onChange={sizeChange}
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

        {faq.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">관리시스템</StyledTableCell>
                    <StyledTableCell align="center">질문</StyledTableCell>
                    <StyledTableCell align="center">답변</StyledTableCell>
                    <StyledTableCell align="center">게시여부</StyledTableCell>
                    <StyledTableCell align="center">등록자</StyledTableCell>
                    <StyledTableCell align="center">등록일</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {faq.map((fres, index) => {
                    return (
                      <TopStyledTableRow
                        key={index}
                        onMouseDown={function () {
                          console.log('in>>>>');
                          console.log('modalr', modalRef.current);
                          if (modalRef?.current === undefined || modalRef?.current === null) {
                            console.log('in???');
                            detailData(fres.faqSeq);
                          }
                        }}
                      >
                        <TopStyledTableCell align="center">{fres.faqSeq}</TopStyledTableCell>
                        <TopStyledTableCell align="center">{fres.mgmtSysCd}</TopStyledTableCell>
                        <TopStyledTableCell align="center">
                          <Button onMouseOver={textOver} onMouseOut={textOut}>
                            {fres.faqQryCtnt}
                          </Button>
                        </TopStyledTableCell>
                        <TopStyledTableCell align="center">
                          <Button onMouseOver={textOver} onMouseOut={textOut}>
                            {fres.faqReplCtnt}
                          </Button>
                        </TopStyledTableCell>
                        <TopStyledTableCell align="center">{fres.bltnYn}</TopStyledTableCell>
                        <TopStyledTableCell align="center">{fres.lastEdtrNm}</TopStyledTableCell>
                        <TopStyledTableCell align="center">{fres.frstRegDttm}</TopStyledTableCell>
                      </TopStyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/*
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px',
                marginBottom: '30px',
              }}
            >
              <MuiPagination
                callApi={callApi}
                page={page}
                pageChange={pageChange}
                totalPage={totalPage}
                pageSize={pageSize}
              />
            </div>
              */}
            <div
              style={{
                marginBottom: '40px',
              }}
            >
              <Pagination
                total={totalPage}
                limit={pageSizeRef?.current?.value}
                page={page}
                pageClick={(value: number) => {
                  setPage(value);
                  callApi(value);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">번호</StyledTableCell>
                    <StyledTableCell align="center">관리시스템</StyledTableCell>
                    <StyledTableCell align="center">질문</StyledTableCell>
                    <StyledTableCell align="center">답변</StyledTableCell>
                    <StyledTableCell align="center">게시여부</StyledTableCell>
                    <StyledTableCell align="center">등록자</StyledTableCell>
                    <StyledTableCell align="center">등록일</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TopStyledTableRow>
                    <TopStyledTableCell colSpan={7} align="center">
                      데이터가 존재하지 않습니다.
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
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
    <PrimaryLayout title={'FAQ관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
