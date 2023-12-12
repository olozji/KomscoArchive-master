import { useEffect, useState } from 'react';
import PrimaryLayout from '../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../page';
import styles from '../../pas/charge/scss/tab.module.css';

// material-ui table import

import History from './components/history';
import Sent from './components/sent';
import Receive from './components/receive';
import { styleTableCell, styleTableRow } from '../../../utils/muiTable';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CommonService from '../../../services/CommonService';
import GiftPolicyService from '../../../services/GiftPolicyService';
import NewPagination from '../../../components/pagination/NewPagination';
import { changeFullDate } from '../../../utils/fommater';

const Gift: NextPageWithLayout = () => {
  // tabmenu data
  const data = [
    {
      id: 0,
      title: '선물 내역',
      tabs: <History />,
    },
    {
      id: 1,
      title: '보낸선물 사용자별',
      tabs: <Sent />,
    },
    {
      id: 2,
      title: '받은선물 사용자별',
      tabs: <Receive />,
    },
  ];

  const [items, setItems] = useState([]);
  const [localServiceGroup, setLocalServiceGroup] = useState([]);
  const [totalCnt, setTotalCnt] = useState();
  const [paging, setPaging] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [tabindex, settabIndex] = useState(0);

  const StyledTableCell = styleTableCell();
  const StyledTableRow = styleTableRow();

  // 상품권/정책수당 리스트
  const [giftDetailList, setGiftDetailList] = useState([]);

  // 상품권 리스트
  const [listValue, setlistValue] = useState([]);

  // 최근조회
  const [lastSearchList, setLastSearchList] = useState([]);

  const [params, setParams] = useState({
    schAreaSrvcUid: '', // 지역서비스 코드
    schTrmSrchDiv: 0, // 조회기간 코드
    schSdate: moment().subtract(1, 'days').format('YYYYMMDD'), // 시작 일자
    schEdate: moment().subtract(1, 'days').format('YYYYMMDD'), // 종료 일자
    schGftcDivCd: '01', // 상품권/정책수당 선택 코드
    schGftcCd: '', // 상품권/정책수당 콤보 선택값
    pageNum: 1,
    pageSize: 50,
  });

  const [lastSchParams, setLastSchParams] = useState({
    areaSrvcUid: '',
    gftcCd: '',
    srchNm: '',
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

  // 최근 입력 데이터 조회
  const fetchSearchValue = async () => {
    console.log('최근조회 이력');
    GiftPolicyService.RecentlySearchData({}).then((response: any) => {
      const data = response;
      console.log('----최근조회 리스트 ----');
      setLastSearchList(data.body.list);
      console.log(data);
      console.log('----최근조회 END ----');
    });
  };

  // 최근입력 데이터 저장
  const saveSearchValue = async () => {
    console.log('최근입력 저장');
    console.log(lastSchParams);
    GiftPolicyService.RecentlySearchSave(lastSchParams)
      .then((res: any) => {
        console.log('최근입력 저장성공!!');
        console.log(res);
        fetchSearchValue();
      })
      .catch((e: any) => {
        console.log('최근입력 저장 에러 ');
      });
  };

  const fetchGiftValue = async () => {
    CommonService.getCodeList({
      schCdDvcd: '6500',
    })
      .then((response: any) => {
        console.log(response.body.list);

        const dataList = response.body.list;
        dataList.unshift({
          cdDvcd: '',
          dtlCd: '',
          dtlCdNm: '전체',
        });
        setlistValue(response.body.list);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const getGiftCodeData = async () => {
    CommonService.LocalGiftData({
      schAreaSrvcUid: params.schAreaSrvcUid,
      plcyAlowDivCd: params.schGftcDivCd,
    })
      .then((response: any) => {
        console.log(response.body.list);

        response.body.list.unshift({
          value: '',
          text: '전체',
        });
        setGiftDetailList(response.body.list);
      })
      .catch((e: any) => {
        console.log(e);
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
    fetchSearchValue();
    getLocalServiceList();
    getGiftCodeData();
  }, []);

  return (
    <>
      <div className="bl_content_filterWrap">
        <div className="bl_content_filterWrap_top">
          <label htmlFor="" className="el_label el_label__first">
            최근 조회
          </label>
          <div className="bl_content_searchWrap">
            {lastSearchList.map((row) => (
              <div>{row.areaSrvcNm}</div>
            ))}
          </div>
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
                setParams({ ...params, schAreaSrvcUid: '', schGftcCd: '' });
                console.log('전체지역');
              } else {
                //setParams({ ...params, schAreaSrvcUid: value.value });
                setParams({ ...params, schAreaSrvcUid: value.value });
                fetchGiftValue();
                getGiftCodeData();
                console.log('선택지역: ' + value.value);
              }
            }}
            renderInput={(params) => <TextField {...params} label="" />}
          />

          <select
            className="el_input_select2 hp_mr-15"
            disabled={params.schAreaSrvcUid == '' ? true : false}
            onChange={(data) => {
              let equalValue = defaultDate;

              giftDetailList.forEach((list) => {
                if (list.value == data.target.value) {
                  equalValue = moment(list.vldStrtDt).format('YYYYMMDD');
                  return false;
                }
              });

              if (params.schTrmSrchDiv === 6) {
                setParams({
                  ...params,
                  schGftcCd: data.target.value,
                  schSdate: equalValue,
                });

                const sdate = document.getElementById('startAccumId') as HTMLInputElement;
                if (sdate != null) {
                  sdate.value = moment(equalValue).format('YYYY-MM-DD');

                  document
                    .getElementById('endAccumId')
                    .setAttribute('min', moment(equalValue).format('YYYY-MM-DD'));
                }
              }
            }}
          >
            {giftDetailList.map((row, idx) => {
              return <option value={row.value}>{row.text}</option>;
            })}
          </select>
        </div>

        <div className="bl_content_filterWrap_bottom">
          <label htmlFor="" className="el_label el_label__first">
            조회기간
          </label>
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
                  schEdate: moment(moment().format('YYYY') + quarterList[0].end).format('YYYYMMDD'),
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
                  schSdate: moment(moment().format('YYYY') + halfList[0].start).format('YYYYMMDD'),
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
              <select id="startYearId" className="el_input_select2 hp_mr-15" onChange={changeData}>
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

          <button className="el_getBtn">조회</button>
        </div>
      </div>

      <div className="bl_middleWraper">
        <div className="bl_middleWrap_left">
          <span>
            기간 :{' '}
            <span>
              {moment(params.schSdate).format('YYYY.MM.DD')} ~{' '}
              {moment(params.schEdate).format('YYYY-MM-DD')} |{' '}
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
            }}
          >
            <option value="10" className="item">
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

      <section className={styles.tabContainer}>
        <ul className={styles.tabMenu}>
          {data.map((item) => (
            <li
              key={item.id}
              className={tabindex === item.id ? styles.active : null}
              onClick={() => settabIndex(item.id)}
            >
              <div>{item.title}</div>
            </li>
          ))}
        </ul>
        {data
          .filter((item) => tabindex === item.id)
          .map((item) => (
            <div className={styles.tabContent}>{item.tabs}</div>
          ))}
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
          .bl_content_searchWrap {
            display: inline-block;
          }
          .bl_content_searchWrap div {
            display: inline;
            width: 100px;
            margin: 0px 7px;
            font-size: 13px;
            text-decoration: underline;
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
            margin-top: 50px;
            // font-size: 1.4rem;
            // line-height: 1.6rem;
            // color: #474d52;
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

export default Gift;

Gift.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'선물 내역 통계'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
