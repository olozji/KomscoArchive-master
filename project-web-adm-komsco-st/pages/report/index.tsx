import { useState } from 'react';
import PrimaryLayout from '../../components/layout/primaryLayout/PrimaryLayout';

import { NextPageWithLayout } from '../page';
import styles from '../pas/charge/scss/tab.module.css';

import Pagination from './../../components/pagination/Pagination';
import GiftBuy from './components/buy';
import Mrchn from './components/mrchn';
import UserData from './components/user';
import GiftPayment from './components/pymnt';
import GiftRefund from './components/rfnmn';
import GiftCancel from './components/cancel';
import ChargeService from '../../services/reportService';

const Report: NextPageWithLayout = () => {
  // tabmenu data
  const data = [
    {
      id: 0,
      title: '사용자 데이터',
      tabs: <UserData />,
    },
    {
      id: 1,
      title: '가맹점 데이터',
      tabs: <Mrchn />,
    },
    {
      id: 2,
      title: '상품권 구매 데이터',
      tabs: <GiftBuy />,
    },
    {
      id: 3,
      title: '상품권 결제 데이터',
      tabs: <GiftPayment />,
    },
    {
      id: 4,
      title: '상품권 환불 데이터',
      tabs: <GiftRefund />,
    },
    {
      id: 5,
      title: '상품권 구매취소 데이터',
      tabs: <GiftCancel />,
    },
  ];

  const [tabindex, settabIndex] = useState(0);

  return (
    <>
      <div className="bl_content_filterWrap">
        <div className="bl_content_filterWrap_top">
          <label htmlFor="" className="el_label el_label__first">
            지역서비스
          </label>
          <select name="" id="" className="el_input_select2 hp_mr-15">
            <option value="" className="item">
              검색입력 or 선택
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
        </div>

        <div className="bl_content_filterWrap_bottom">
          <label htmlFor="" className="el_label el_label__first">
            조회기간
          </label>
          <div className="bl_content_filterWrap_flex">
            <button>월</button>
            <button>연</button>
            <button>누적</button>
          </div>
          <div className="bl_content_select3">
            <select name="" id="" className="el_input_select2 hp_mr-15">
              <option value="" className="item">
                당해년도
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
            <select name="" id="" className="el_input_select2 hp_mr-15">
              <option value="" className="item">
                당월
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
            <button className="el_getBtn">조회</button>
          </div>
        </div>
      </div>

      <div className="bl_middleWrap_right">
        <div className="bl_middleWrap_right_result">
          <span>총 n건</span>
        </div>
        <select name="" id="" className="un_pageItemSelect">
          <option value="10" className="item">
            10개씩 보기
          </option>
          <option value="20" className="item">
            20개씩 보기
          </option>
          <option value="30" className="item">
            30개씩 보기
          </option>
        </select>
        <button className="el_classicBtn btn1">엑셀 다운로드</button>
      </div>

      <section className={`${styles.tabContainer} ${styles.tab_Container_top}`}>
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

      <Pagination />

      <style jsx>{`
        .bl_content_filterWrap_flex {
          width: 420px;
          text-align: center;
          margin-top: -20px;
        }
        .bl_content_filterWrap_flex button {
          width: 70px;
          margin: 0 10px;
          padding: 5px;
          border: 1px solid #333;
          border-radius: 5px;
        }
        .bl_content_select3 {
          margin-left: 85px;
          margin-top: 20px;
        }
        .el_getBtn {
          width: 110px;
          float: right;
          margin: 0 50px;
        }
        .bl_middleWrap_right {
          // margin-top: 50px;
          // font-size: 1.4rem;
          // line-height: 1.6rem;
          // color: #474d52;
          position: absolute;
          top: 57%;
          left: 78%;
          display: flex;
          align-items: center;
          justify-content: right;
          margin: 10px 0;
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
      `}</style>
    </>
  );
};

export default Report;

Report.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'지역서비스 상품권 정보제공'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
