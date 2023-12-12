import AuthLayout from '../../components/layout/authLayout/AuthLayout';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../page';
import { RootState, useAppDispatch } from '../../lib/store';
import { setAuthState, removeAuthState } from '../../lib/store/fetures/authSlice';
import { useRouter } from 'next/router';
import AuthService from '../../services/AuthService';
import { ResData } from '../../types/ResData';
import { getCookie } from '../../utils/cookie';
import { useSelector } from 'react-redux';
import Modal from 'components/modal/modal';
import {
  styleTableCell,
  styleTableRow,
  topStyleTableCell,
  topStyleTableRow,
} from '../../utils/muiTable';
import Code from '../../services/CodeService';
import { codeState } from '@/lib/store/fetures/codeSlice';

const Login: NextPageWithLayout = () => {
  const StyledTableCell = styleTableCell();
  const StyledTableRow = styleTableRow();
  const TopStyledTableCell = topStyleTableCell();
  const TopStyledTableRow = topStyleTableRow();

  const data = useSelector((state: RootState) => state.authSlice);
  const router = useRouter();
  if (typeof window !== 'undefined') {
    if (!!getCookie('accessToken')) {
      router.replace('/');
    }
  }

  const [loginInfo, setLoginInfo] = useState<any>({});
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 첫 로그인시 사용하는 비밀번호들의 상태값
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passConfirmMsg, setPassConfirmMsg] = useState('안내메세지 입니다');

  const newPasswordRef = useRef<any>();
  const confirmPasswordRef = useRef<any>();

  // 모달 열기 상태 관리
  const [openModal, setOpenModal] = useState(false);
  console.log('====openmodal state====');
  console.log(openModal);

  // 모달 닫기버튼 state전달용
  const actionLeftBtn = () => {
    console.log('-----LeftBtn Action----');
    // 왜인지 모르게 removeAuthState 가 안되는중
    dispatch(removeAuthState());
    dispatch(
      setAuthState({
        isLogin: false,
        accessToken: '',
        refreshToken: '',
        expiresIn: '',
      })
    );
    setOpenModal(false);
  };

  const actionRightBtn = (data) => {
    console.log('-----RightBtn Action----');
    checkpass(data);
  };

  //
  const checkpass = (data: any) => {
    if (newPasswordRef?.current?.value === confirmPasswordRef?.current?.value) {
      console.log('비밀번호 매칭됨');
      onSubmitChangePass(data);
    } else {
      console.log('비밀번호 매칭안됨');
    }
  };

  // 최초 비밀번호 변경 함수
  const onSubmitChangePass = (data: any) => {
    AuthService.changePassword({
      id: 'jhhwang',
      pwd: newPasswordRef?.current?.value,
      newPwd: confirmPasswordRef?.current?.value,
    })
      .then((response: any) => {
        console.log('비밀번호가 성공적으로 변경됨');
        console.log(response);
      })
      .catch((e: ResData) => {
        console.log(newPasswordRef?.current?.value);
        console.log(confirmPasswordRef?.current?.value);
        console.log(e);
        console.log(e.head);
        alert(e.head);
      });
  };

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

        //==================
        // appLnknYn	(2) 앱 연결 여부( APP 설치 여부)
        // pswdChngDmanTmcnt	비밀번호 변경 요청 횟수
        // nonUseYn	(3) 장기미사용 여부
        // dormancyYn	(3) 휴면 여부
        // initPwdYn	(1) 최초 로그인 및 비밀번호 초기화여부, Y이면 비밀번호 변경
        //==================
        console.log('계정로그인 시도함');
        console.log(response);
        console.log('===userinfo===');
        const userInfo = response.body;
        console.log(userInfo);
        setLoginInfo(userInfo);
        console.log(loginInfo);
        // 토큰
        AuthService.token({
          token: response.body.token,
        })
          .then((response: any) => {
            // router.replace('/');
            // 로그인시 계정정보를 store에 저장
            dispatch(
              setAuthState({
                isLogin: true,
                accessToken: response.body.token,
                refreshToken: response.body.refreshToken,
                expiresIn: response.body.expiresIn,
              })
            );
            Code.selectcode({
              cdDvcd: '',
              dtlCd: '',
              dtlCdNm: null,
              uzYn: 'Y',
              pageNum: 1,
              pageSize: 9999,
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
          })
          .catch((e: ResData) => {
            alert(e.head.resultMsg);
          });
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log(e.head);
        alert(e.head);
      });
  };

  // 아이디 저장 checkbox
  const handleChange = (e) => {
    console.log(e);
    setIsLogin(e.target.checked);
  };

  console.log('=========로긴');
  console.log(data);

  // 비밀번호 설정 모달 열기
  const actionOpenModal = () => {
    console.log('====modal Open====');
    setOpenModal(true);
    console.log(openModal);
  };

  useEffect(() => {
    // 최초 발급받은 비밀번호를 변경하지 않았다면 N 상태이며
    // N 상태일때 비밀번호를 변경할수있는 모달탕을 띄움
    if (data.isLogin && loginInfo.initPwdYn == 'Y') {
      console.log('-----effect-----');
      console.log(data.isLogin);
      actionOpenModal();
    }
  }, [data.isLogin]);

  // 비밀번호 설정 모달 페이지
  const setPassword = () => {
    return (
      <>
        <section className={'set_pass_wrapper'}>
          <article className={'description_wrapper'}>
            <p>관리자시스템에 처음 로그인 또는 비밀번호 초기화 후 로그인 하셨습니다.</p>
            <p>-정보보호를 위해 비밀번호를 재설정합니다.</p>
            <p>-비밀번호를 변경한 후 다시 로그인해주시기 바랍니다.</p>
          </article>
          <article className={'new_pass_wrapper'}>
            <div className={'new_pass'}>
              <div className={'new_pass_text'}>신규 비밀번호</div>
              <div className={'new_pass_input'}>
                <input type={'password'} ref={newPasswordRef} />
              </div>
            </div>
            <div className={'new_pass_check'}>
              <div className={'new_pass_text'}>신규 비밀번호 확인</div>
              <div className={'new_pass_input'}>
                <input type={'password'} ref={confirmPasswordRef} />
              </div>
            </div>
          </article>
          <article className={'sub_decription'}>
            <p>영대문자, 숫자, 특수문자 포함 9자 이상으로 설정해주세요.</p>
          </article>
          <article className={'pass_guid'}>{passConfirmMsg}</article>
        </section>
        <style jsx>{`
          .description_wrapper {
            line-height: 1.5em;
            margin-bottom: 20px;
          }
          .new_pass_wrapper {
            margin-bottom: 15px;
          }
          .new_pass_wrapper div {
            display: flex;
            gap: 15px;
            padding: 5px 15px;
            height: 40px;
          }
          .new_pass_wrapper div .new_pass_text {
            width: 100%;
            flex: 3;
            justify-content: right;
            align-items: center;
          }
          .new_pass_wrapper div .new_pass_input {
            width: 100%;
            flex: 9;
            justify-content: center;
          }
          .new_pass_wrapper div .new_pass_input input {
            width: 100%;
            padding: 0px 10px;
          }

          .sub_decription {
            font-size: 14px;
            color: gray;
          }
          .pass_guid {
          }
        `}</style>
      </>
    );
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="bl_form_input">
                    <div className="bl_form_input_group">
                      <label>아이디</label>
                      <input
                        type="text"
                        {...register('id', { required: true, value: '' })}
                        placeholder="아이디를 입력하세요"
                      />
                      <label>비밀번호</label>
                      <input
                        type="password"
                        {...register('pwd', { required: true, value: '' })}
                        placeholder="비밀번호를 입력하세요"
                      />
                      <div className="auth_msg">
                        <span>인증 실패시 안내메세지가 노출됩니다.</span>
                      </div>
                    </div>
                  </div>
                  <div className="check_input">
                    <input type="checkbox" checked={isLogin} onChange={handleChange} />
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
          <button type="button" className="admin_form_btn">
            관리자 계정신청
          </button>
        </div>
      </article>
      <Modal
        type={'login'}
        openModal={openModal}
        name={'비밀번호 설정'}
        title={'비밀번호 설정'}
        content={setPassword()}
        lbutton={'취소'}
        rbutton={'확인'}
        lButtonFunction={actionLeftBtn}
        rButtonFunction={actionRightBtn}
        closeEvent={undefined}
      ></Modal>

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
