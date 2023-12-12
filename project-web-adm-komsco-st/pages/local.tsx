import PrimaryLayout from '../components/layout/primaryLayout/PrimaryLayout';
import Pagination from '../components/pagination/Pagination';
import { NextPageWithLayout } from './page';

const Local: NextPageWithLayout = () => {
  return (
    <>
      <div className="bl_content_filterWrap">
        <div className="bl_content_filterWrap_top">
          <label htmlFor="" className="el_label el_label__first">
            지역상품권
          </label>
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
          <select name="" id="" className="el_input_select2 hp_mr-15" disabled>
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
          <select name="" id="" className="el_input_select2 el_input_select2__lg" disabled>
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
          <input type="date" name="" id="" className="el_input_date hp_mr-10" />
          <span className="hp_mr-10 un_wave">~</span>
          <input type="date" name="" id="" className="el_input_date hp_mr-30" />
          <label htmlFor="" className="el_label">
            상태
          </label>
          <select name="" id="" className="el_input_select2 hp_mr-30">
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
          <label htmlFor="" className="el_label">
            담당자
          </label>
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
          <button className="el_getBtn">조회</button>
        </div>
      </div>
      <div className="bl_middleWrap">
        <div className="bl_middleWrap_left">
          <button className="el_classicBtn">지자체등록</button>
          <button className="el_classicBtn img">
            <img src="/img/icon-excel.png" alt="excel icon" />
            <span>내역 다운로드</span>
          </button>
        </div>
        <div className="bl_middleWrap_right">
          <div className="bl_middleWrap_right_result">
            <span>검색결과</span>
            <span className="hp_txt-red hp_txt-bold">333</span>
            <span>개</span>
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
        </div>
      </div>
      <Pagination></Pagination>

      <style jsx>{`
        .un_wave {
          font-weight: 600;
          font-size: 1.8rem;
          line-height: 2.1rem;
        }
        .bl_middleWrap {
          display: flex;
          justify-content: space-between;
        }
        .bl_middleWrap_left {
          display: flex;
          gap: 8px;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        .bl_middleWrap_right {
          font-size: 1.4rem;
          line-height: 1.6rem;
          color: #474d52;
          display: flex;
          align-items: center;
        }
        .bl_middleWrap_right_result {
          border-right: 1px solid #474d52;
          padding-right: 9.5px;
          margin-right: 9.5px;
        }
        .un_pageItemSelect {
          color: #474d52;
          border: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: transparent;
          background-image: url(../img/icon-downArrow-gray.png);
          background-repeat: no-repeat;
          background-position-x: 93%;
          background-position-y: 50%;
          background-color: #ffffff;
          padding-right: 20px;
        }
      `}</style>
    </>
  );
};

export default Local;

Local.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'지자체 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
