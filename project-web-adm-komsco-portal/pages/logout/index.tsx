import Link from 'next/link';
import AuthLayout from '../../components/layout/authLayout/AuthLayout';
import { NextPageWithLayout } from '../page';

const Logout: NextPageWithLayout = () => {
  return (
    <div className="main">
      <section className="">
        <article>
          <h1 className="logout_title">자동 로그아웃 되었습니다.</h1>
          <p className="logut_description">
            안전한 고객정보 보호를 위해 로그인 후 <span style={{ color: 'red' }}>60분</span>간 동안
            서비스 이용이 없는 경우 자동으로 로그아웃됩니다.
          </p>
          <p className="logut_description">다시 로그인하시려면 [로그인] 버튼을 클릭해 주세요.</p>
        </article>
        <article>
          <Link href={'../login'}>
            <button type="button" className="route_login_page_button">
              로그인
            </button>
          </Link>
        </article>
      </section>

      <style jsx>{`
        .main {
          position: relative;
          height: 100vh;
        }
        section {
          position: absolute;
          width: 100%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        .logout_title {
          font-size: 36px;
          margin-bottom: 20px;
        }
        .logut_description {
          font-size: 24px;
          margin-bottom: 12px;
        }
        .route_login_page_button {
          margin-top: 40px;
          width: 170px;
          height: 40px;
          background: #0040b5;
          color: white;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Logout;

Logout.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
