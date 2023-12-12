import Head from 'next/head';
import Navbar from '../../navbar/Navbar';
import Sidebar from '../../sidebar/Sidebar';

export interface IAuthLayout {
  children: any;
}

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <header className={'bl_header'}>
        <div className="bl_header_left">
          <a href="#">
            <img src="/img/auth_logo.png" alt="logo" className="el_logo" />
          </a>
        </div>
      </header>

      <div className="bl_main">{children}</div>
      <style jsx>{`
        .bl_header {
          padding: 48px 50px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          border-bottom: 2px solid #dbdfe0;
        }
        .bl_header_left {
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .bl_main {
        }
      `}</style>
    </>
  );
};

export default AuthLayout;
