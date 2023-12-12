import Head from 'next/head';

export interface IAuthLayout {
  children: any;
}

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>

      <div className="bl_main">{children}</div>
      <style jsx>{`
        .bl_main {
        }
      `}</style>
    </>
  );
};

export default AuthLayout;
