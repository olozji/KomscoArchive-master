// <상품권/정책수당 - Dashboard>
// Layout
import PrimaryLayout from 'components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from 'pages/page';
// Custom Services
import DashBoardService from 'services/DashboardService';
import CommonService from 'services/CommonService';
// Libraries
import { Chart, ReactGoogleChartEvent } from 'react-google-charts';
import { background } from '@storybook/theming';
import { useState, useEffect } from 'react';
import moment from 'moment';

// commonParams
const commonDateParams = {
  schSdate: moment().startOf('year').format('YYYYMMDD'),
  schEdate: moment().endOf('year').format('YYYYMMDD'),
};
// defaultParams
const defaultParams: any[] = [{ ...commonDateParams }];
for (let i = 0; i < 10; i++) {
  defaultParams.push({ ...commonDateParams, schAreaSrvcUid: '' });
}
// google-chart 차트 옵션(공통)
const commonOption = {
  legend: { position: 'top', alignment: 'end' },
};
// google-chart 차트 옵션
const option = [
  {},
  { ...commonOption, seriesType: 'bars' },
  { ...commonOption, seriesType: 'bars' },
  { ...commonOption, seriesType: 'lines' },
  { ...commonOption, seriesType: 'lines' },
  { ...commonOption, seriesType: 'bars' },
  { ...commonOption, seriesType: 'bars' },
  { ...commonOption, seriesType: 'lines' },
  { ...commonOption, seriesType: 'lines' },
  {
    ...commonOption,
    pieHole: 0.4,
    pieSliceText: 'none',
  },
  { ...commonOption, seriesType: 'bars' },
];

const Local: NextPageWithLayout = () => {
  // API로 받아온 차트 데이터
  const [data, setData] = useState<any>([]);
  // 차트 데이터 조회에 사용하는 파라미터
  const [params, setParams] = useState<any>(defaultParams);
  // 지역 서비스(공통 데이터) 목록
  const [localServiceGroup, setLocalServiceGroup] = useState([]);
  // 조회 가능 년도 목록
  const [yearGroup, setYearGroup] = useState([]);
  // 차트 데이터 조회 보조용 state
  const [idx, setIdx] = useState(null);

  // 특정 차트의 데이터만 조회하도록 하기위한 코드
  // (data를 한 개의 state로 관리하고 있기 때문에 생긴 코드..)
  useEffect(() => {
    if (idx) {
      getChartData(Number(idx));
      setIdx(null);
    }
  }, [idx]);

  // 조회 가능 년도 설정 이후 당해 년도로 설정
  useEffect(() => {
    const thisYear = moment().format('YYYY');
    const $selects = document.querySelectorAll('#selectDate');
    Array.from($selects).forEach((select, idx1) => {
      Array.from(select as any).forEach((option: any, idx2) => {
        option.value === thisYear && $selects[idx1][idx2].setAttribute('selected', 'selected');
      });
    });
  }, [yearGroup]);

  // 컴포넌트가 최초로 mount될 때, select문들(조회 가능 년도, 지역서비스) 설정 후, 각 차트 데이터 조회해서 render
  useEffect(() => {
    const init = async () => {
      await getYearList();
      await getLocalServicesList();
      for (let i = 1; i <= 10; i++) {
        await getChartData(i);
      }
    };
    init();
  }, []);

  // 조회 가능 년도 설정
  const getYearList = async () => {
    const diff = Math.ceil(Math.abs(moment.duration(moment('2019').diff(moment())).asYears()));
    const tempGroup = [];
    for (let i = 0; i < diff; i++) {
      const elem = moment('2019').add(i, 'years').format('YYYY');
      tempGroup.push({
        text: elem + '년',
        value: elem,
      });
    }
    await setYearGroup(tempGroup);
  };

  // 지역 서비스(공통 데이터) 조회
  const getLocalServicesList = async () => {
    CommonService.LocalServiceData({}).then((res: any) => {
      const localServiceList = [];
      res.body.list.forEach((item) => {
        localServiceList.push({ text: item.text, value: item.value });
      });
      localServiceList.unshift({ text: '전국', value: '' });
      setLocalServiceGroup(localServiceList);
    });
  };

  // 차트 API 데이터 조회
  const getChartData = async (order) => {
    // setLoading(true);
    switch (order) {
      // case 0:
      //   await DashBoardService.gftc_use(params[0])
      //     .then((res: any) => {
      //       setData(res.body);
      //     }).catch((err:any)=>{
      //       console.log(err)
      //     }).finally(()=>{
      //       // setLoading(false);
      //     })
      //   break;
      case 1:
        await DashBoardService.gftc_wdl(params[1])
          .then((res: any) => {
            const tempData = { ...data };
            tempData[order] = [['날짜', '모바일', '지류', '카드']];
            res.body.list.forEach((e) =>
              tempData[order].push([
                e.sttsYm,
                e.qrGftcSetlAmt,
                e.paperGftcSetlAmt,
                e.cardGftcSetlAmt,
              ])
            );
            setData(tempData);
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
      case 2:
        await DashBoardService.user_real(params[2])
          .then((res: any) => {
            const tempData = { ...data };
            tempData[order] = [['날짜', '누적가입자', '활성가입자']];
            res.body.list.forEach((e) =>
              tempData[order].push([e.execYm, e.acmlUserCnt, e.actvUserCnt])
            );
            setData(tempData);
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
      case 3:
        await DashBoardService.rfund_cag(params[3])
          .then((res: any) => {
            const tempData = { ...data };
            tempData[order] = [['날짜', '충전금액', '환불금액', '구매취소']];
            res.body.list.forEach((e) =>
              tempData[order].push([e.sttsYm, e.cagAmt, e.rfundAmt, e.buynCancAmt])
            );
            setData(tempData);
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
      case 4:
        await DashBoardService.rfund_setl(params[4])
          .then((res: any) => {
            const tempData = { ...data };
            tempData[order] = [['날짜', '결제금액', '환불금액']];
            res.body.list.forEach((e) => tempData[order].push([e.sttsYm, e.setlAmt, e.rfundAmt]));
            setData(tempData);
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
      case 5:
        await DashBoardService.plcy_use(params[5])
          .then((res: any) => {
            const tempData = { ...data };
            tempData[order] = [['날짜', '지급금액', '사용금액']];
            res.body.list.forEach((e) => tempData[order].push([e.sttsYm, e.prvsAmt, e.useAmt]));
            setData(tempData);
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
      case 6:
        await DashBoardService.plcy_rtrv(params[6])
          .then((res: any) => {
            const tempData = { ...data };
            tempData[order] = [['날짜', '지급금액', '회수금액']];
            res.body.list.forEach((e) => tempData[order].push([e.sttsYm, e.prvsAmt, e.rtrvAmt]));
            setData(tempData);
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
      case 7:
        await DashBoardService.merc_joing(params[7])
          .then((res: any) => {
            const tempData = { ...data };
            tempData[order] = [['날짜', '누적가맹점', '활성가맹점']];
            res.body.list.forEach((e) =>
              tempData[order].push([e.sttsYm, e.acmlMercCcnt, e.actvMercCcnt])
            );
            setData(tempData);
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
      case 8:
        await DashBoardService.merc_setl(params[8])
          .then((res: any) => {
            const tempData = { ...data };
            tempData[order] = [['날짜', '총 가맹점', '카드가맹', 'QR가맹', '지류가맹']];
            res.body.list.forEach((e) =>
              tempData[order].push([
                e.sttsYm,
                e.totMercSetlAmt,
                e.cardMercSetlAmt,
                e.qrMercSetlAmt,
                e.paperMercSetlAmt,
              ])
            );
            setData(tempData);
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
      case 9:
        await DashBoardService.fee_use(params[9])
          .then((res: any) => {
            const tempData = { ...data };
            tempData[order] = [
              ['type', 'proportion'],
              ['출금수수료', res.body.list[0].wdlFeeAmt],
              ['입금수수료', res.body.list[0].mnrcFeeAmt],
              ['본인인증', res.body.list[0].selfAthnFeeAmt],
              ['점유인증', res.body.list[0].psnAthnFeeAmt],
              ['마이데이터', res.body.list[0].mydFeeAmt],
            ];
            setData(tempData);
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
      case 10:
        await DashBoardService.fee_trsi(params[10])
          .then((res: any) => {
            const tempData = { ...data };
            tempData[order] = [['날짜', '총수수료', '금융수수료', '인증수수료']];
            res.body.list.forEach((e) =>
              tempData[order].push([e.sttsYm, e.totFeeAmt, e.fnncFeeAmt, e.athnFeeAmt])
            );
            setData(tempData);
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
    }
  };

  // 조회 파라미터 변경 이벤트 리스너
  const handleParams = (change) => {
    const param = { ...params };
    const targetIdx = change.target.parentElement.id;
    switch (change.target.id) {
      case 'selectArea':
        param[targetIdx].schAreaSrvcUid = change.target.value;
        setParams(param);
        setIdx(targetIdx);
        break;
      case 'selectDate':
        param[targetIdx].schSdate = moment(change.target.value).startOf('year').format('YYYYMMDD');
        param[targetIdx].schEdate = moment(change.target.value).endOf('year').format('YYYYMMDD');
        setParams(param);
        setIdx(targetIdx);
        break;
    }
  };

  // 최초 렌더링시 데이터가 없으면 에러메시지 뜨고, 리렌더링 돼도 사라지지 않음
  // 에러 메세지 창 삭제 코드
  const chartEvents: ReactGoogleChartEvent = {
    eventName: 'ready',
    callback: ({ chartWrapper, google }) => {
      const chart = chartWrapper.getChart();
      (google.visualization.events as any).addListener(chart, 'error', (e: any) => {
        google.visualization.errors.removeError(e.id);
      });
    },
  };

  return (
    <>
      <div className="statistics_container">
        <div id="0" className="chart_container">
          <h1>시군별 CHAK 상품권 사용 현황</h1>
          <select onChange={handleParams} name="" id="selectDate" className="un_pageItemSelect">
            {yearGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <div></div>
        </div>

        <div className="chart_container_wrapper">
          <div id="1" className="chart_container">
            <h1>QR vs 지류 vs 카드 상품권 사용 금액</h1>
            <select
              onChange={handleParams}
              name=""
              id="selectArea"
              className="un_pageItemSelect selectArea"
            >
              {localServiceGroup.map((item, index) => {
                return (
                  <>
                    <option value={item.value} className="item">
                      {item.text}
                    </option>
                  </>
                );
              })}
            </select>
            <select onChange={handleParams} name="" id="selectDate" className="un_pageItemSelect">
              {yearGroup.map((item, index) => {
                return (
                  <>
                    <option value={item.value} className="item">
                      {item.text}
                    </option>
                  </>
                );
              })}
            </select>
            <Chart
              chartType="ComboChart"
              width="100%"
              height="300px"
              data={data[1]}
              options={option[1]}
              graph_id="chart1"
              style={background}
              chartEvents={[chartEvents]}
            />
          </div>
          <div id="2" className="chart_container">
            <h1>CHAK 누적 가입자 대비 실사용자수</h1>
            <select
              onChange={handleParams}
              name=""
              id="selectArea"
              className="un_pageItemSelect selectArea"
            >
              {localServiceGroup.map((item, index) => {
                return (
                  <>
                    <option value={item.value} className="item">
                      {item.text}
                    </option>
                  </>
                );
              })}
            </select>
            <select onChange={handleParams} name="" id="selectDate" className="un_pageItemSelect">
              {yearGroup.map((item, index) => {
                return (
                  <>
                    <option value={item.value} className="item">
                      {item.text}
                    </option>
                  </>
                );
              })}
            </select>
            <Chart
              chartType="ComboChart"
              width="100%"
              height="300px"
              data={data[2]}
              options={option[2]}
              graph_id="chart2"
              style={background}
              chartEvents={[chartEvents]}
            />
          </div>
        </div>

        <div id="3" className="chart_container">
          <h1>CHAK 상품권 충전금액 대비 환불/구매취소</h1>
          <select
            onChange={handleParams}
            name=""
            id="selectArea"
            className="un_pageItemSelect selectArea"
          >
            {localServiceGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <select onChange={handleParams} name="" id="selectDate" className="un_pageItemSelect">
            {yearGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <Chart
            chartType="ComboChart"
            width="100%"
            height="300px"
            data={data[3]}
            options={option[3]}
            graph_id="chart3"
            style={background}
            chartEvents={[chartEvents]}
          />
        </div>
        <div id="4" className="chart_container">
          <h1>CHAK 결제금액 대비 환불금액</h1>
          <select
            onChange={handleParams}
            name=""
            id="selectArea"
            className="un_pageItemSelect selectArea"
          >
            {localServiceGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <select onChange={handleParams} name="" id="selectDate" className="un_pageItemSelect">
            {yearGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <Chart
            chartType="ComboChart"
            width="100%"
            height="300px"
            data={data[4]}
            options={option[4]}
            graph_id="chart4"
            style={background}
            chartEvents={[chartEvents]}
          />
        </div>

        <div id="5" className="chart_container">
          <h1>CHAK 정책수당 지급 대비 사용금액</h1>
          <select
            onChange={handleParams}
            name=""
            id="selectArea"
            className="un_pageItemSelect selectArea"
          >
            {localServiceGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <select onChange={handleParams} name="" id="selectDate" className="un_pageItemSelect">
            {yearGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <Chart
            chartType="ComboChart"
            width="100%"
            height="300px"
            data={data[5]}
            options={option[5]}
            graph_id="chart5"
            style={background}
            chartEvents={[chartEvents]}
          />
        </div>
        <div id="6" className="chart_container">
          <h1>CHAK 정책수당 지급 대비 회수금액</h1>
          <select
            onChange={handleParams}
            name=""
            id="selectArea"
            className="un_pageItemSelect selectArea"
          >
            {localServiceGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <select onChange={handleParams} name="" id="selectDate" className="un_pageItemSelect">
            {yearGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <Chart
            chartType="ComboChart"
            width="100%"
            height="300px"
            data={data[6]}
            options={option[6]}
            graph_id="chart6"
            style={background}
            chartEvents={[chartEvents]}
          />
        </div>
        <div id="7" className="chart_container">
          <h1>CHAK 누적 가맹점 가입 추이</h1>
          <select
            onChange={handleParams}
            name=""
            id="selectArea"
            className="un_pageItemSelect selectArea"
          >
            {localServiceGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <select onChange={handleParams} name="" id="selectDate" className="un_pageItemSelect">
            {yearGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <Chart
            chartType="ComboChart"
            width="100%"
            height="300px"
            data={data[7]}
            options={option[7]}
            graph_id="chart7"
            style={background}
            chartEvents={[chartEvents]}
          />
        </div>
        <div id="8" className="chart_container">
          <h1>CHAK 가맹점 결제추이</h1>
          <select
            onChange={handleParams}
            name=""
            id="selectArea"
            className="un_pageItemSelect selectArea"
          >
            {localServiceGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <select onChange={handleParams} name="" id="selectDate" className="un_pageItemSelect">
            {yearGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <Chart
            chartType="ComboChart"
            width="100%"
            height="300px"
            data={data[8]}
            options={option[8]}
            graph_id="chart8"
            style={background}
            chartEvents={[chartEvents]}
          />
        </div>

        <div id="9" className="chart_container">
          <h1>CHAK 항목별 수수료 사용금액</h1>
          <select
            onChange={handleParams}
            name=""
            id="selectArea"
            className="un_pageItemSelect selectArea"
          >
            {localServiceGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <select onChange={handleParams} name="" id="selectDate" className="un_pageItemSelect">
            {yearGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={data[9]}
            options={option[9]}
            graph_id="chart9"
            style={background}
            chartEvents={[chartEvents]}
          />
        </div>
        <div id="10" className="chart_container">
          <h1>CHAK 수수료 추이금액</h1>
          <select
            onChange={handleParams}
            name=""
            id="selectArea"
            className="un_pageItemSelect selectArea"
          >
            {localServiceGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <select onChange={handleParams} name="" id="selectDate" className="un_pageItemSelect">
            {yearGroup.map((item, index) => {
              return (
                <>
                  <option value={item.value} className="item">
                    {item.text}
                  </option>
                </>
              );
            })}
          </select>
          <Chart
            chartType="ComboChart"
            width="100%"
            height="300px"
            data={data[10]}
            options={option[10]}
            graph_id="chart10"
            style={background}
            chartEvents={[chartEvents]}
          />
        </div>
      </div>

      <style jsx>{`
        .statistics_container {
          display: grid;
          grid-template-rows: 2fr 1fr 1fr 1fr 1fr;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .un_pageItemSelect {
          margin: 10px 10px;
        }
        .chart_container {
          border: 1px solid #000;
          min-height: 400px;
          max-width: 45vw;
        }
        .chart_container h1 {
          width: 100%;
          font-size: 20px;
          border-bottom: 1px solid #000;
          background-color: #ddd;
          text-align: center;
          padding: 10px 0px;
        }
        .chart_container_wrapper .chart_container:first-child {
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  );
};

export default Local;

Local.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'Dashboard'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
