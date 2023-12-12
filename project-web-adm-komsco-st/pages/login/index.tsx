import AuthLayout from '../../components/layout/authLayout/AuthLayout';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../page';
import { RootState, useAppDispatch } from '../../lib/store';
import { setAuthState } from '../../lib/store/fetures/authSlice';
import { useRouter } from 'next/router';
import AuthService from '../../services/AuthService';
import { ResData } from '../../types/ResData';

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    if (!!window.localStorage.getItem('accessToken')) {
      router.replace('/');
    }
  }

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    AuthService.login({
      id: data.id,
      pwd: data.pwd,
    })
      .then((response: any) => {
        // ===========================================
        // Token 조회
        // [2022년10월26일 16:16:49]
        // ===========================================
        AuthService.token({
          token: response.body.token,
        })
          .then((response: any) => {
            router.replace('/');
            dispatch(
              setAuthState({
                isLogin: true,
                accessToken: response.body.token,
                refreshToken: response.body.refreshToken,
                expiresIn: response.body.expiresIn,
              })
            );
          })
          .catch((e: ResData) => {
            console.log(e + '2222');
            alert(e.head.resultMsg);
          });
      })
      .catch((e: ResData) => {
        console.log(e);
        alert(e.head.resultMsg);
      });
  };

  return (
    <div className="main">
      <article>
        <section className="bl_content_top">
          <img src="/img/logo.png" alt="logo" className="el_logo" />
          <h2>통합관리자 로그인</h2>
        </section>
        <section className="login_container">
          <div>
            <article>
              <section>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="bl_form_input">
                    <div className="bl_form_input_group">
                      <label>아이디</label>
                      <input
                        type="text"
                        {...register('id', { required: true, value: 'khwoo' })}
                        placeholder="아이디를 입력하세요"
                      />
                      <label>비밀번호</label>
                      <input
                        type="text"
                        {...register('pwd', { required: true, value: 'khwoo' })}
                        placeholder="비밀번호를 입력하세요"
                      />
                      <div className="auth_msg">
                        <span>인증 실패시 안내메세지가 노출됩니다.</span>
                      </div>
                    </div>
                  </div>
                  <div className="check_input">
                    {/* <input type="checkbox" defaultChecked={isLogin}/> */}
                    <input type="checkbox" />
                    <label>아이디 저장</label>
                  </div>
                  <button className="bl_form_btn">로그인</button>
                </form>
              </section>
            </article>
          </div>
        </section>
        <div className="admin_form">
          <div className="admin_form_phone">
            <a href="pages/login/login#">휴대폰 번호가 변경되셨나요?</a>
          </div>
          <button className="admin_form_btn">관리자 계정신청</button>
        </div>
      </article>

      <style jsx>
        {`
          .main {
            padding: 50px;
          }

          article {
            width: 690px;
            margin: auto;
          }

          .bl_content_top {
            text-align: center;
          }

          .bl_content_top img {
            width: 317px;
            text-align: center;
          }

          .bl_content_top h2 {
            margin: 10px 0;
            font-family: 'NanumSquare';
            font-style: normal;
            font-weight: 400;
            font-size: 40px;
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

          .login_container {
            margin-top: 50px;
            border: 1px solid #f3f4f5;
          }

          .login_container ul {
            display: flex;
            background-color: #f3f4f5;
          }

          .login_container li {
            text-align: center;
            height: 60px;
            flex: 5;
            cursor: pointer;
          }

          .login_container li span {
            display: inline-block;
            padding: 20px 0px;
            font-size: 20px;
            font-weight: 400;
          }

          .isActive {
            color: #fff;
            background-color: #266ae8;
          }

          .admin_form {
            display: flex;
            justify-content: space-between;
            margin: 30px 0px;
          }

          .admin_form .admin_form_phone {
            width: 202px;
          }

          .admin_form .admin_form_phone a {
            line-height: 50px;
            font-family: 'NanumSquare';
            font-size: 16px;
            text-decoration: underline;
            text-underline-position: under;
          }

          .admin_form .admin_form_btn {
            padding: 10px 0px;
            width: 160px;
            height: 50px;
            background-color: #f3f4f5;
            border-radius: 10px;
            font-family: 'NanumSquare';
            font-style: normal;
            font-weight: 800;
            text-align: center;
            border: none;
          }

          article {
            width: 570px;
            margin: auto;
            padding: 30px 0px;
          }

          .bl_form_input {
            display: flex;
            flex-flow: column;
            margin-top: 32px;
          }

          .bl_form_input .bl_form_input_group input {
            width: 100%;
            margin: 10px 0px;
          }

          .bl_form_input label {
            display: flex;
            font-family: 'NanumSquare';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            margin: 10px 0px;
            color: #282a2e;
          }

          .bl_form_input select {
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

          .bl_form_input input {
            padding: 20px;
            box-sizing: border-box;
            width: 60%;
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
            width: 50px;
            -webkit-appearance: none;
            -moz-appearance: none;
            //background-image: url(../img/icon-downArrow-gray-outlined.png);
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

          .check_input {
            display: inline-block;
            width: 50%;
            margin: 10px 0px;
            font-family: 'NanumSquare';
          }

          input[type='checkbox'] {
            zoom: 1.5;
          }

          .check_input label {
            display: inline-block;
            position: relative;
            top: -5px;
            width: 100px;
            margin: 0 10px;
            font-size: 18px;
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
            font-size: 20px;
            line-height: 27px;
            text-align: center;
            color: #ffffff;
            border: none;
            margin-top: 16px;
          }

          .auth_msg {
            width: 100%;
            margin: 10px 0px;
            padding: 10px;
            font-family: 'NanumSquare';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            // line-height: 27px;
            // text-align: center;
            // background-color: #D5403C;
            background-color: rgb(255, 0, 0, 0.3);
            color: #d5403c;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Login;

Login.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
