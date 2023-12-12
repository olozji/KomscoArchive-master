import type { AppProps, AppContext } from 'next/app';
import '../styles/globals.css';
import wrapper from '../lib/store';
import { useAppDispatch } from '../lib/store';
import { NextPageWithLayout } from './page';
import { setAuthState } from '../lib/store/fetures/authSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const dispatch = useAppDispatch();
  const router = useRouter();
  let isLogin = false;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      isLogin = window.localStorage.getItem('accessToken') ? true : false;
      const expiresIn = window.localStorage.getItem('expiresIn');
      if (expiresIn === null || expiresIn === 'undefined' || !Number(expiresIn)) {
        isLogin = false;
      }

      dispatch(
        setAuthState({
          isLogin: isLogin,
          accessToken: window.localStorage.getItem('accessToken'),
          refreshToken: window.localStorage.getItem('refreshToken'),
          expiresIn: window.localStorage.getItem('expiresIn'),
        })
      );
    }

    if (!isLogin) {
      router.replace('/login');
      return;
    }
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />, [
    {
      label: '상품권/정책수당',
      href: {
        pathname: '/pas',
        query: {},
      },
      child: [
        {
          label: 'Dashboard',
          key: 'pas',
          href: {
            pathname: '/pas',
            query: {},
          },
        },
        {
          label: '통계현황판',
          key: 'pas/sttst',
          href: {
            pathname: '/pas/sttst',
            query: {},
          },
        },
        {
          label: '충전/지급',
          key: 'pas/charge',
          href: {
            pathname: '/pas/charge',
            query: {},
          },
          child: [
            {
              label: '충전/지급 통계',
              href: {
                pathname: '/pas/charge',
              },
            },

            {
              label: '상품권 발행 통계',
              href: {
                pathname: '/pas/charge/pbmntsttst',
              },
            },

            {
              label: '상품권 환불 통계',
              href: {
                pathname: '/pas/charge/rfnmnsttst',
              },
            },
            {
              label: '상품권 구매취소 통계',
              href: {
                pathname: '/pas/charge/cancelsttst',
              },
            },
            {
              label: '정책수당 지급통계',
              href: {
                pathname: '/pas/charge/policysttst',
              },
            },
            {
              label: '정책수당 회수통계',
              href: {
                pathname: '/pas/charge/rpolicysttst',
              },
            },
          ],
        },
        {
          label: '결제',
          key: 'pas/payment',
          href: {
            pathname: '/pas/payment',
            query: {},
          },
          child: [
            {
              label: '결제 조회',
              href: {
                pathname: '/pas/payment/inqry',
              },
            },
            {
              label: '캐시백 월별조회',
              href: {
                pathname: '/pas/payment/cshmnInqry',
              },
            },
            {
              label: '카드/제휴사 결제내역',
              href: {
                pathname: '/pas/payment/paydetails',
              },
            },
            {
              label: '전통시장 결제내역',
              href: {
                pathname: '/pas/payment/marketdetails',
              },
            },
          ],
        },
        {
          label: '선물',
          key: 'pas/gift',
          href: {
            pathname: '/pas/gift',
            query: {},
          },
        },
      ],
    },

    // 회원 통계 섹션

    {
      label: '회원 통계',
      href: {
        pathname: '/mmbrsttst',
        query: {},
      },
      child: [
        {
          label: '사용자',
          key: '/mmbrsttst',
          href: {
            pathname: '/mmbrsttst',
            query: {},
          },
        },
        {
          label: '가맹점',
          key: 'mmbrsttst/mrchn',
          href: {
            pathname: '/mmbrsttst/mrchn/mrchn',
            query: {},
          },
          child: [
            {
              label: '가맹점 통계',
              href: {
                pathname: '/mmbrsttst/mrchn/mrchn',
              },
            },
            {
              label: 'QR 키트현황',
              href: {
                pathname: '/mmbrsttst/mrchn/qr',
              },
            },
          ],
        },
        {
          label: '카드발급통계',
          key: 'mmbrsttst/mrchn',
          href: {
            pathname: '/mmbrsttst/card/branchissued',
            query: {},
          },
          child: [
            {
              label: '지점별 발급통계',
              href: {
                pathname: '/mmbrsttst/card/branchissued',
              },
            },
            {
              label: '카드사별 발급통계',
              href: {
                pathname: '/mmbrsttst/card/cardcompanyissued',
              },
            },
          ],
        },
      ],
    },

    // 보고서 관리 섹션

    {
      label: '보고서 관리',
      href: {
        pathname: '/report',
        query: {},
      },
      child: [
        {
          label: '지역서비스 상품권 정보제공',
          key: '/report',
          href: {
            pathname: '/report',
            query: {},
          },
        },
        {
          label: '대외기관제출자료',
          key: 'report/mtbexorgnz',
          href: {
            pathname: '/report/mtbexorgnz/reportDocument',
            query: {},
          },
          child: [
            {
              label: '국회 제출자료',
              href: {
                pathname: '/report/mtbexorgnz/reportDocument/congress',
              },
            },
            {
              label: '한국은행 제출자료',
              href: {
                pathname: '/report/mtbexorgnz/reportDocument/koreabank',
              },
            },
            {
              label: '금융감독원 제출자료',
              href: {
                pathname: '/report/mtbexorgnz/reportDocument/financialservice',
              },
            },
          ],
        },
        {
          label: '국세청 전달자료(분기)',
          href: {
            pathname: '/report/mtbexorgnz/frwrddata',
            query: {},
          },
        },
      ],
    },

    // 오픈뱅킹/마이데이터 섹션

    {
      label: '오픈뱅킹/마이데이터',
      href: {
        pathname: '/openbnkmydata',
        query: {},
      },
      child: [
        {
          label: '오픈뱅킹 수수료 현황',
          href: {
            pathname: '/openbnkmydata',
            query: {},
          },
        },
        {
          label: '마이데이터',
          href: {
            pathname: '/openbnkmydata/myData',
            query: {},
          },
          child: [
            {
              label: '정보제공 수수료 통계',
              href: {
                pathname: '/openbnkmydata/myData/feeSttst',
              },
            },
            {
              label: '정보제공내역 통계',
              href: {
                pathname: '/openbnkmydata/myData/InfoFee',
              },
            },
          ],
        },
      ],
    },
  ]);
}

export default wrapper.withRedux(MyApp);
