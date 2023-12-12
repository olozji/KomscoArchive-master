import PrimaryLayout from '../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../page';

// material-ui table import
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GiftPolicyService from '../../../services/GiftPolicyService';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CommonService from '../../../services/CommonService';
import { styleTableCell, styleTableRow } from '../../../utils/muiTable';
import NewPagination from '../../../components/pagination/NewPagination';
import { changeFullDate, dateFormat, numberWithCommas } from '../../../utils/fommater';

const Paydetails: NextPageWithLayout = () => {
  const [items, setItems] = useState([]);
  const [localServiceGroup, setLocalServiceGroup] = useState([]);
  const [totalCnt, setTotalCnt] = useState();
  const [paging, setPaging] = useState(0);

  // 상품권 코드
  const [giftValue, setGiftValue] = useState([]);
  // 상품권/정책수당 리스트
  const [listValue, setlistValue] = useState([]);

  // 카드사/제휴사 구분 리스트
  const [cardDivList, setCardDivList] = useState([]);
  // 카드사 리스트
  const [cardList, setCardList] = useState([]);
  // 제휴사 리스트
  const [affiliateList, setAffiliateList] = useState([]);

  const [params, setParams] = useState({
    schAreaSrvcUid: '', // 지역서비스 코드
    schTrmSrchDiv: 0, // 조회기간 코드
    schSdate: moment().subtract(1, 'days').format('YYYYMMDD'), // 시작 일자
    schEdate: moment().subtract(1, 'days').format('YYYYMMDD'), // 종료 일자
    schGftcDivCd: '01', // 상품권/정책수당 선택 코드
    schGftcCd: '', ///정책수당 콤보 선택값
    pageNum: 1,
    pageSize: 50,
    schNth: '',
    coDivCd: '',
  });

  // 연도 선택 상태값
  const [selectStartYear, setSelectStartYear] = useState(moment().format('YYYY'));
  const [selectEndYear, setSelectEndYear] = useState(moment().format('YYYY'));

  // default 일
  const defaultDate = moment().subtract(1, 'days').format('YYYYMMDD');

  // default 월
  const defaultMonthDate = moment().subtract('month').format('YYYYMM');

  // 연도 리스트 배열 (5년치)
  const yearList = [
    moment().format('YYYY'),
    moment().subtract(1, 'years').format('YYYY'),
    moment().subtract(2, 'years').format('YYYY'),
    moment().subtract(3, 'years').format('YYYY'),
  ];

  // 4분기 리스트
  const quarterList = [
    {
      start: '0101',
      end: '0331',
    },
    {
      start: '0401',
      end: '0630',
    },
    {
      start: '0701',
      end: '0930',
    },
    {
      start: '1001',
      end: '1231',
    },
  ];

  // 2분기 리스트
  const halfList = [
    {
      start: '0101',
      end: '0630',
    },
    {
      start: '0701',
      end: '1231',
    },
  ];

  /////////////// 조회기간 구분 함수 setting ////////////////////
  const changeData = (id) => {
    ///// 일
    if (id.target.id == 'startDateId') {
      params.schSdate = moment(id.target.value).format('YYYYMMDD');
      document
        .getElementById('endDateId')
        .setAttribute('min', moment(params.schSdate).format('YYYY-MM-DD'));
    } else if (id.target.id == 'endDateId') {
      params.schEdate = moment(id.target.value).format('YYYYMMDD');
      document
        .getElementById('startDateId')
        .setAttribute('max', moment(params.schEdate).format('YYYY-MM-DD'));
    }

    //// 월
    else if (id.target.id == 'startMonthId') {
      params.schSdate = moment(id.target.value).format('YYYYMM01');
      document
        .getElementById('endMonthId')
        .setAttribute('min', moment(params.schSdate).format('YYYY-MM'));
    } else if (id.target.id == 'endMonthId') {
      params.schEdate = changeFullDate(params.schTrmSrchDiv, id.target.value); //moment(id.target.value).format('YYYYMM');
      document
        .getElementById('startMonthId')
        .setAttribute('max', moment(params.schEdate).format('YYYY-MM'));
    }

    ///////분기

    //TODO: 기본선택되어진 쿼터리스트가 있어야함
    else if (id.target.id == 'quarterYearId') {
      setSelectStartYear(id.target.value);
      const quater = document.getElementById('quarterId') as HTMLSelectElement;

      if (quater != null) {
        console.log('----기존 선택된 분기 값 ----');
        console.log(quarterList[parseInt(quater.value)].start);

        setParams({
          ...params,
          schSdate: moment(id.target.value + quarterList[parseInt(quater.value)].start).format(
            'YYYYMMDD'
          ),
          schEdate: moment(id.target.value + quarterList[parseInt(quater.value)].end).format(
            'YYYYMMDD'
          ),
        });
      }
    } else if (id.target.id == 'quarterId') {
      const index = parseInt(id.target.value);

      setParams({
        ...params,
        schSdate: moment(selectStartYear + quarterList[index].start).format('YYYYMMDD'),
        schEdate: moment(selectStartYear + quarterList[index].end).format('YYYYMMDD'),
      });
    }

    // 반기
    else if (id.target.id == 'halfYearId') {
      setSelectStartYear(id.target.value);

      const half = document.getElementById('halfId') as HTMLSelectElement;

      if (half != null) {
        console.log('----기존 선택된 분기 값 ----');
        console.log(halfList[parseInt(half.value)].start);

        setParams({
          ...params,
          schSdate: moment(id.target.value + halfList[parseInt(half.value)].start).format(
            'YYYYMMDD'
          ),
          schEdate: moment(id.target.value + halfList[parseInt(half.value)].end).format('YYYYMMDD'),
        });
      }
    } else if (id.target.id == 'halfId') {
      const index = parseInt(id.target.value);
      setParams({
        ...params,
        schSdate: moment(selectStartYear + halfList[index].start).format('YYYYMMDD'),
        schEdate: moment(selectEndYear + halfList[index].end).format('YYYYMMDD'),
      });
    }

    // 연도
    else if (id.target.id == 'startYearId') {
      setSelectStartYear(id.target.value);

      const endYearId = document.getElementById('endYearId') as HTMLSelectElement;

      if (endYearId != null) {
        setParams({
          ...params,
          schSdate: moment(id.target.value).startOf('year').format('YYYY0101'),
          schEdate: changeFullDate(params.schTrmSrchDiv, endYearId.value), //moment(endYearId.value).endOf('year').format('YYYY'),
        });
      }
    } else if (id.target.id == 'endYearId') {
      setParams({
        ...params,
        schSdate: moment(selectStartYear).format('YYYY0101'),
        schEdate: changeFullDate(params.schTrmSrchDiv, id.target.value), //moment(id.target.value).format('YYYY'),
      });
    }

    //// 누적
    if (id.target.id == 'startAccumId') {
      params.schSdate = moment(id.target.value).format('YYYYMMDD');
      document
        .getElementById('endAccumId')
        .setAttribute('min', moment(params.schSdate).format('YYYY-MM-DD'));
    } else if (id.target.id == 'endAccumId') {
      params.schEdate = moment(id.target.value).format('YYYYMMDD');
      document
        .getElementById('startAccumId')
        .setAttribute('max', moment(params.schEdate).format('YYYY-MM-DD'));
    }
  };

  const StyledTableCell = styleTableCell();
  const StyledTableRow = styleTableRow();

  // 카드사/ 냐 제휴사 냐 구분 리스트 조회
  const getCardListData = async () => {
    console.log('카드사///제휴사 구분');
    CommonService.getCodeList({
      schCdDvcd: '6073',
    }).then((response: any) => {
      console.log('카드사/제휴사');
      const data = response.body.list;
      data.unshift({
        cdDvcd: '6073',
        dtlCdNm: '전체',
      });
      setCardList(data);
      console.log(data);
    });
  };

  // 카드/제휴사 리스트 조회
  const fetchCardList = async () => {
    CommonService.LocalCardData({
      coDivCd: params.coDivCd,
    })
      .then((response: any) => {
        console.log('----카드/제휴사 list----');
        console.log(response.body.list);
        setCardDivList(response.body.list);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  // 지역서비스 상품권 조회
  const getCodeList = async () => {
    console.log('상품권/정책수당');
    CommonService.getCodeList({
      schCdDvcd: '6017',
    }).then((response: any) => {
      console.log('상품권/정책수당');
      const data = response.body.list;
      data.unshift({
        cdDvcd: '6017',
        dtlCdNm: '전체',
      });
      setGiftValue(data);
      console.log(data);
    });
  };

  //상품권/정책수당 list
  const fetchGiftList = async () => {
    CommonService.LocalGiftData({
      schAreaSrvcUid: params.schAreaSrvcUid,
      plcyAlowDivCd: params.schGftcDivCd,
    })
      .then((response: any) => {
        console.log('----상품권/정책수당 list----');
        console.log(response.body.list);
        setlistValue(response.body.list);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  // 카드/제휴사 데이터 조회
  const fetchCardData = async () => {
    console.log('카드 제휴사 이력');
    GiftPolicyService.CardPayment(params).then((response: any) => {
      const data = response;
      setItems(response.body.list);
      setTotalCnt(data.body.totCnt);
      setPaging(Math.ceil(data.body.totCnt / params.pageSize));
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
    getCardListData();
    fetchCardList();
    fetchCardData();
    getLocalServiceList();
  }, [params.pageNum, params.pageSize]);

  return (
    <>
      <div className="bl_content_filterWrap">
        <div className="bl_content_filterWrap_top">
          <label htmlFor="" className="el_label el_label__first">
            카드/제휴사
          </label>
          <select
            className="el_input_select2 hp_mr-15"
            onChange={(data) => {
              params.coDivCd = data.target.value;
              fetchCardList();
            }}
          >
            {cardList.map((row, idx) => {
              return <option value={row.dtlCd}>{row.dtlCdNm}</option>;
            })}
          </select>

          <select
            className="el_input_select2 hp_mr-15"
            disabled={params.coDivCd == '' ? true : false}
            onChange={(data) => {
              params.coDivCd = data.target.value;
            }}
          >
            {cardDivList.map((row, idx) => {
              return <option value={row.value}>{row.text}</option>;
            })}
          </select>
        </div>

        <div className="bl_content_filterWrap_top">
          <label htmlFor="" className="el_label el_label__first">
            지역서비스
          </label>
          <Autocomplete
            onSelect={handleSearch}
            className="autoCompleteStyle el_input_select2 el_input_lg hp_mr-15 "
            getOptionLabel={(option: any) => option.text || ''}
            options={localServiceGroup}
            onChange={(event, value) => {
              if (value == null) {
                params.schAreaSrvcUid = '';
                console.log('전체지역');
              } else {
                setParams({ ...params, schAreaSrvcUid: value.value });
                getCodeList();
                console.log('선택지역: ' + value.value);
              }
            }}
            renderInput={(params) => <TextField {...params} label="" />}
          />

          <select
            className="el_input_select2 hp_mr-15"
            disabled={params.schAreaSrvcUid == '' ? true : false}
            onChange={(data) => {
              params.schGftcDivCd = data.target.value;
              fetchGiftList();
            }}
          >
            {giftValue.map((row, idx) => {
              return <option value={row.dtlCd}>{row.dtlCdNm}</option>;
            })}
          </select>

          <select
            className="el_input_select2 hp_mr-15"
            disabled={params.schAreaSrvcUid == '' ? true : false}
            onChange={(data) => {
              params.schGftcCd = data.target.value;
            }}
          >
            {listValue.map((row, idx) => {
              return <option value={row.value}>{row.text}</option>;
            })}
          </select>
        </div>

        <div className="bl_content_filterWrap_bottom">
          <label htmlFor="" className="el_label el_label__first">
            조회기간
          </label>
          <div className="bl_content_filterWrap_flex">
            <div className="bl_content_filterWrap_flex">
              <button
                className={params.schTrmSrchDiv == 0 ? 'active' : ''}
                onClick={() => {
                  setSelectStartYear(moment().format('YYYY'));
                  setSelectEndYear(moment().format('YYYY'));
                  console.log(params.schTrmSrchDiv);
                  setParams({
                    ...params,
                    schTrmSrchDiv: 0,
                    schSdate: defaultDate,
                    schEdate: defaultDate,
                  });
                }}
              >
                일
              </button>
              <button
                className={params.schTrmSrchDiv == 1 ? 'active' : ''}
                onClick={() => {
                  setSelectStartYear(moment().format('YYYY'));
                  setSelectEndYear(moment().format('YYYY'));
                  console.log(params.schTrmSrchDiv);
                  setParams({
                    ...params,
                    schTrmSrchDiv: 1,
                    schSdate: defaultMonthDate + '01',
                    schEdate: changeFullDate(1, defaultMonthDate),
                  });
                }}
              >
                월
              </button>
              <button
                className={params.schTrmSrchDiv == 2 ? 'active' : ''}
                onClick={() => {
                  console.log(params.schTrmSrchDiv);
                  setSelectStartYear(moment().format('YYYY'));
                  setSelectEndYear(moment().format('YYYY'));

                  setParams({
                    ...params,
                    schTrmSrchDiv: 2,
                    schSdate: moment(moment().format('YYYY') + quarterList[0].start).format(
                      'YYYYMMDD'
                    ),
                    schEdate: moment(moment().format('YYYY') + quarterList[0].end).format(
                      'YYYYMMDD'
                    ),
                  });
                }}
              >
                분기
              </button>
              <button
                className={params.schTrmSrchDiv == 3 ? 'active' : ''}
                onClick={() => {
                  console.log(params.schTrmSrchDiv);
                  setSelectStartYear(moment().format('YYYY'));
                  setSelectEndYear(moment().format('YYYY'));

                  setParams({
                    ...params,
                    schTrmSrchDiv: 3,
                    schSdate: moment(moment().format('YYYY') + halfList[0].start).format(
                      'YYYYMMDD'
                    ),
                    schEdate: moment(moment().format('YYYY') + halfList[0].end).format('YYYYMMDD'),
                  });
                }}
              >
                반기
              </button>
              <button
                className={params.schTrmSrchDiv == 4 ? 'active' : ''}
                onClick={() => {
                  console.log(params.schTrmSrchDiv);

                  setSelectStartYear(moment().format('YYYY'));
                  setSelectEndYear(moment().format('YYYY'));

                  setParams({
                    ...params,
                    schTrmSrchDiv: 4,
                    schSdate: moment().format('YYYY0101'),
                    schEdate: changeFullDate(4, moment().format('YYYY')),
                  });
                }}
              >
                연
              </button>
            </div>
          </div>

          <div className="bl_content_select3">
            {params.schTrmSrchDiv === 0 && (
              <>
                <input
                  type="date"
                  className="el_input_select2 hp_mr-15"
                  defaultValue={moment(params.schSdate).format('YYYY-MM-DD')}
                  max={moment(defaultDate).format('YYYY-MM-DD')}
                  onChange={changeData}
                  id="startDateId"
                />
                <input
                  type="date"
                  className="el_input_select2 hp_mr-15"
                  defaultValue={moment(params.schEdate).format('YYYY-MM-DD')}
                  max={moment(defaultDate).format('YYYY-MM-DD')}
                  onChange={changeData}
                  id="endDateId"
                />
              </>
            )}

            {params.schTrmSrchDiv === 1 && (
              <>
                <input
                  type="month"
                  className="el_input_select2 hp_mr-15"
                  defaultValue={moment(defaultMonthDate).format('YYYY-MM')}
                  max={moment(defaultMonthDate).format('YYYY-MM')}
                  onChange={changeData}
                  id="startMonthId"
                />

                <input
                  type="month"
                  className="el_input_select2 hp_mr-15"
                  defaultValue={moment(defaultMonthDate).format('YYYY-MM')}
                  max={moment(defaultMonthDate).format('YYYY-MM')}
                  onChange={changeData}
                  id="endMonthId"
                />
              </>
            )}

            {params.schTrmSrchDiv === 2 && (
              <>
                <select
                  id="quarterYearId"
                  className="el_input_select2 hp_mr-15"
                  onChange={changeData}
                >
                  {yearList.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>

                <select id="quarterId" className="el_input_select2 hp_mr-15" onChange={changeData}>
                  <option value={0}>1분기</option>
                  <option value={1}>2분기</option>
                  <option value={2}>3분기</option>
                  <option value={3}>4분기</option>
                </select>
              </>
            )}

            {params.schTrmSrchDiv === 3 && (
              <>
                <select id="halfYearId" className="el_input_select2 hp_mr-15" onChange={changeData}>
                  {yearList.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>

                <select id="halfId" className="el_input_select2 hp_mr-15" onChange={changeData}>
                  <option value={0}>상반기</option>
                  <option value={1}>하반기</option>
                </select>
              </>
            )}

            {params.schTrmSrchDiv === 4 && (
              <>
                <select
                  id="startYearId"
                  className="el_input_select2 hp_mr-15"
                  onChange={changeData}
                >
                  {yearList.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>

                <select id="endYearId" className="el_input_select2 hp_mr-15" onChange={changeData}>
                  {yearList.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
              </>
            )}
            <button
              className="el_getBtn"
              onClick={() => {
                fetchCardData();
              }}
            >
              조회
            </button>
          </div>
        </div>
      </div>

      <div className="bl_middleWraper">
        <div className="bl_middleWrap_left">
          <span>
            기간 :{' '}
            <span>
              {dateFormat(params.schTrmSrchDiv, params.schSdate)} ~{' '}
              {dateFormat(params.schTrmSrchDiv, params.schEdate)} |
            </span>
          </span>
          <span>검색결과 : </span>
          <span className="hp_txt-red hp_txt-bold">{totalCnt}</span>
          <span>개</span>
        </div>
        <div className="bl_middleWrap_right">
          <button className="el_classicBtn btn1">엑셀 다운로드</button>
          <select
            className="un_pageItemSelect"
            onChange={(size) => {
              //setPageSize(Number(size.target.value));
              setParams({ ...params, pageSize: Number(size.target.value) });
              fetchCardData();
            }}
          >
            <option value="50" className="item">
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
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" rowSpan={2}>
                  조회일
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  카드/제휴사명
                </StyledTableCell>

                <StyledTableCell align="center" rowSpan={2}>
                  지역서비스
                </StyledTableCell>

                <StyledTableCell align="center" rowSpan={2}>
                  구분
                </StyledTableCell>

                <StyledTableCell align="center" rowSpan={2}>
                  지역상품권
                </StyledTableCell>

                <StyledTableCell align="center" rowSpan={2}>
                  가맹점수
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={5}>
                  결제완료
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={5}>
                  결제취소
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell align="center">상품권</StyledTableCell>
                <StyledTableCell align="center">정책수당</StyledTableCell>
                <StyledTableCell align="center">캐시백</StyledTableCell>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">합계</StyledTableCell>

                <StyledTableCell align="center">상품권</StyledTableCell>
                <StyledTableCell align="center">정책수당</StyledTableCell>
                <StyledTableCell align="center">캐시백</StyledTableCell>
                <StyledTableCell align="center">건수</StyledTableCell>
                <StyledTableCell align="center">합계</StyledTableCell>
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
                    <StyledTableCell align="center">
                      {dateFormat(params.schTrmSrchDiv, row.setlDt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.afcrNm}</StyledTableCell>
                    <StyledTableCell align="center">{row.areaSrvcNm}</StyledTableCell>
                    <StyledTableCell align="center">{row.gdsNm}</StyledTableCell>
                    <StyledTableCell align="center">
                      {numberWithCommas(row.mercNcnt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberWithCommas(row.gftcSetlAmt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberWithCommas(row.alowSetlAmt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberWithCommas(row.csbkAmt)}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {numberWithCommas(row.mercNcnt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberWithCommas(row.setlCcnt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberWithCommas(row.totSetlAmt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberWithCommas(row.gftcSetlCancAmt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberWithCommas(row.alowSetlCancAmt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberWithCommas(row.setlCancCsbkAmt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberWithCommas(row.setlCancCcnt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberWithCommas(row.totSetlCancAmt)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </section>

      <NewPagination
        totCnt={paging}
        pageSize={params.pageSize}
        changePage={(page) => {
          //setSelectPageNum(page);
          setParams({ ...params, pageNum: page });
        }}
      />

      <style jsx>
        {`
          .bl_content_filterWrap_top {
            display: flex;
          }
          .bl_content_filterWrap_top a {
            font-size: 14px;
            margin: 0 10px;
          }
          .el_input_select2_xs {
            width: 150px;
            margin: 0 10px;
          }
          .el_label__first {
            display: inline-block;
            width: 81px;
          }
          .bl_content_filterWrap_flex {
            width: 600px;
            text-align: center;
            margin-top: -20px;
          }

          .bl_content_right {
            position: relative;
            left: 90%;
            margin-top: -30px;
          }

          .hp_mr_15 {
            width: 100%;
            max-width: 280px;
          }
          .bl_content_filterWrap_flex button {
            width: 70px;
            margin: 0 10px;
            padding: 5px;
            border: 1px solid #333;
            border-radius: 5px;
          }
          .active {
            width: 70px;
            margin: 0 10px;
            padding: 5px;
            border: 1px solid #0040b5;
            background: #0040b5;
            color: white;
            border-radius: 5px;
            cursor: pointer;
          }
          .bl_content_filterWrap_input {
            margin: 0 0 0 80px;
          }
          .bl_content_select3 {
            margin-left: 85px;
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
            display: flex;
            align-items: center;
            justify-content: right;
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
          section {
            margin: 10px 30px;
            white-space: nowrap;
          }
        `}
      </style>
    </>
  );
};

export default Paydetails;

Paydetails.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'카드/제휴사 결제내역'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
