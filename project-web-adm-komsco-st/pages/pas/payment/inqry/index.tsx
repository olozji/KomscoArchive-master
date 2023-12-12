import { useState } from 'react';
import PrimaryLayout from '../../../../components/layout/primaryLayout/PrimaryLayout';
import Pagination from '../../../../components/pagination/Pagination';
import { NextPageWithLayout } from '../../../page';
import Pymntcnclhis from './components/pymntcnclhis';
import Pymntmthd from './components/pymntmthd';
import User from './components/user';
import Type from './components/type';
import Partner from './components/partner';

const Payment: NextPageWithLayout = () => {
  // 넘겨줘야하는 데이터 : pageSize,schAreaSrvcUid,schSdate,schEdate,schTrmSrchDiv

  // tabmenu data
  const data = [
    {
      id: 0,
      title: '결제/취소 내역',
      tabs: <Pymntcnclhis />,
    },
    {
      id: 1,
      title: '결제수단',
      tabs: <Pymntmthd />,
    },
    {
      id: 2,
      title: '사용자',
      tabs: <User />,
    },
    {
      id: 3,
      title: '가맹점유형',
      tabs: <Type />,
    },
    {
      id: 4,
      title: '온라인제휴사',
      tabs: <Partner />,
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
          <select name="" id="" className="el_input_select2 hp_mr-15">
            <option value="" className="item">
              전체
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
          <select name="" id="" className="el_input_select2 el_input_select2_xs">
            <option value="" className="item">
              전체
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
            <button>일</button>
            <button>월</button>
            <button>분기</button>
            <button>반기</button>
            <button>연</button>
            <button>회차</button>
          </div>
        </div>
        <div className="bl_content_select3">
          <select name="" id="" className="el_input_select2 hp_mr-15">
            <option value="" className="item">
              조회당월
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
              조회당월
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

      <div className="bl_middleWraper">
        <div className="bl_middleWrap_left">
          <span>
            기간 : <span>2022.11.16 ~ 2022.11.16 | </span>
          </span>
          <span>검색결과 : </span>
          <span className="hp_txt-red hp_txt-bold">24</span>
          <span>개</span>
        </div>
        <div className="bl_middleWrap_right">
          <button className="el_classicBtn btn1">엑셀 다운로드</button>
          <select name="" id="" className="un_pageItemSelect">
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
      <section className="tabContainer">
        <ul className="tabMenu">
          {data.map((item) => (
            <li
              key={item.id}
              className={tabindex === item.id ? 'active' : null}
              onClick={() => settabIndex(item.id)}
            >
              <div>{item.title}</div>
            </li>
          ))}
        </ul>
        {data
          .filter((item) => tabindex === item.id)
          .map((item) => (
            <div className="tabContent">{item.tabs}</div>
          ))}
      </section>

      <Pagination />

      <style jsx>
        {`
          .bl_content_filterWrap_top a {
            font-size: 14px;
            margin: 0 10px;
          }
          .el_input_select2_xs {
            width: 150px;
            margin: 0 10px;
          }
          .bl_content_filterWrap_flex {
            width: 700px;
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
            // margin-top: 50px;
            // font-size: 1.4rem;
            // line-height: 1.6rem;
            // color: #474d52;
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
          .el_classicBtn {
            margin: 0 0 0 10px;
          }
          .table_wrapper {
            margin-top: 10px;
          }
          section {
            margin: 50px 30px;
            white-space: nowrap;
          }
          .tabContainer {
          }
          .tabMenu {
            width: 100%;
            margin-bottom: 20px;
            display: flex;
          }

          .tabMenu li {
            display: flex;
            width: 200px;
            height: 50px;
            justify-content: center;
            border: 1px solid black;
            font-size: 14px;
          }

          .tabMenu li div {
            display: flex;
            align-self: center;
          }
          .active {
            background: rgba(0, 0, 1, 0.5);
          }
        `}
      </style>
    </>
  );
};

export default Payment;

Payment.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'결제 조회'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
