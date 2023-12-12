import AuthLayout from '../components/layout/authLayout/AuthLayout';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from './page';

const Login: NextPageWithLayout = () => {
  return (
    <>
      <article>
        <section className="bl_content_top">
          <h2>관리자 로그인</h2>
          <p>
            서비스 이용을 위해 <span>관리자 App인증</span>이 필요합니다.
          </p>
        </section>
        <section>
          <form>
            <div className="bl_form_input">
              <div className="bl_form_group_label">
                <label>휴대폰 번호</label>
                <div className="bl_form_input_right_time_wrap">
                  <img src="/img/icon-reset-blue.png" alt="reset icon" />
                  <span className="hp_txt-blue hp_txt-bold">58:30</span>
                </div>
              </div>

              <div className="bl_form_group">
                <select>
                  <option>SKT</option>
                  <option>KT</option>
                  <option>LG U Plus</option>
                </select>
                <input type="number" placeholder="휴대폰번호를 입력해주세요." />
              </div>
            </div>
            <button className="bl_form_btn">사용자 APP 인증</button>

            <div className="bl_form_input">
              <label>인증번호</label>
              <input type="number" placeholder="인증번호를 입력해주세요."></input>
            </div>
            <button className="bl_form_btn outline">사용자 APP 인증</button>
          </form>
        </section>
      </article>
      <style jsx>
        {`
          .bl_content_top h2 {
            font-family: 'NanumSquare';
            font-style: normal;
            font-weight: 800;
            font-size: 48px;
            line-height: 54px;
            text-align: center;

            color: #282a2e;
          }
          .bl_content_top p {
            margin-top: 25px;
            font-family: 'NanumSquare';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            text-align: center;
            color: #474d52;
          }

          .bl_content_top p span {
            color: #266ae8;
          }

          article {
            width: 570px;
            margin: auto;
            margin-top: 150px;
          }

          .bl_form_btn {
            display: block;
            width: 100%;
            height: 60px;
            background: #266ae8;
            border-radius: 10px;
            font-family: 'NanumSquare';
            font-style: normal;
            font-weight: 800;
            font-size: 24px;
            line-height: 27px;
            text-align: center;
            color: #ffffff;
            border: none;
            margin-top: 16px;
          }

          .bl_form_btn.outline {
            background: #ffffff;
            border: 2px solid #266ae8;
            color: #266ae8;
          }

          .bl_form_input {
            display: flex;
            flex-flow: column;
            margin-top: 32px;
          }

          .bl_form_input label {
            display: flex;
            font-family: 'NanumSquare';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 27px;
            color: #282a2e;
            margin-bottom: 16px;
          }

          .bl_form_input select,
          .bl_form_input input {
            padding: 20px;
            box-sizing: border-box;
            height: 60px;
            background-color: #ffffff;
            border: 1px solid #c9d0d2;
            border-radius: 10px;
            flex: auto;
            font-size: 18px;
            font-family: 'NanumSquare';
            font-style: normal;
            font-weight: 400;
          }
          .bl_form_input select {
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: url(../img/icon-downArrow-gray-outlined.png);
            background-repeat: no-repeat;
            background-position-x: 93%;
            background-position-y: 50%;
          }

          .bl_form_input .bl_form_group {
            display: flex;
            align-content: space-between;
            gap: 13px;
          }

          .bl_form_input .bl_form_group .bl_form_input select {
            width: 209px;
          }

          .bl_form_input_right_time_wrap {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-right: 20px;
          }

          .bl_form_group_label {
            display: flex;
            justify-content: space-between;
          }

          .bl_form_group_label .bl_form_input_right_time_wrap {
            font-family: 'NanumSquare';
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 23px;
            height: 23px;
            color: #266ae8;
          }
        `}
      </style>
    </>
  );
};

export default Login;

Login.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
