import styles from './../scss/charge.module.css';
const Graph = (props: any) => {
  return (
    <>
      <div className={styles.graph_container}>
        <div className={styles.graph_wrapper}>
          <div>그래프 영역</div>
        </div>
      </div>

      <div className="bl_content_filterWrap">
        <div className="bl_content_filterWrap_top">
          <label htmlFor="" className="el_label el_label__first">
            지자체
          </label>
          <select name="" id="" className="el_input_select2 hp_mr-15">
            <option value="" className="item">
              경기
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
              시흥시
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
              정책수당
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
              시흥정책자금
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
          <div className="bl_content_filter_search">
            <label htmlFor="" className="el_label el_label__first">
              검색어
            </label>
            <input
              type="text"
              placeholder="지역명이나 상품권명 입력"
              className="el_input_date hp_mr-10"
            />
          </div>
        </div>
        <div className="bl_content_filterWrap_top">
          <label htmlFor="" className="el_label el_label__first">
            할인구분
          </label>
          <select name="" id="" className="el_input_select2 hp_mr-15">
            <option value="" className="item">
              선택
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
            <button>반기</button>
            <button>연</button>
            <button>회차</button>
          </div>
          <div className="bl_content_filterWrap_input">
            <input type="date" name="" id="" className="el_input_date hp_mr-10" />
            <span className="hp_mr-10 un_wave">~</span>
            <input type="date" name="" id="" className="el_input_date hp_mr-30" />
            <button className="el_getBtn">조회</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bl_content_filterWrap {
          margin-top: 50px;
          margin-bottom: 50px;
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
        .bl_content_filterWrap_flex button {
          width: 70px;
          margin: 0 10px;
          border: 1px solid #333;
          border-radius: 5px;
        }
        .bl_content_filterWrap_input {
          margin: 0 0 0 80px;
        }
        .el_input_date {
          margin-top: 10px;
        }
        .el_getBtn {
          float: right;
        }
        .bl_middleWrap_right {
          margin-top: 50px;
          font-size: 1.4rem;
          line-height: 1.6rem;
          color: #474d52;
          display: flex;
          align-items: center;
          justify-content: right;
        }
        .bl_middleWrap_right_result {
          border-right: 1px solid #474d52;
          padding-right: 9.5px;
          margin-right: 9.5px;
        }
        .el_classicBtn {
          margin: 0 0 0 10px;
        }
        .table_wrapper {
          margin-top: 10px;
        }
        .bl_content_filter_search {
          width: 400px;
          float: right;
        }
      `}</style>
    </>
  );
};

export default Graph;
