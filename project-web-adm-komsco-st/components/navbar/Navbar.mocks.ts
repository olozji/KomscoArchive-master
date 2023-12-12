import { INavbar } from './Navbar';

const base: INavbar = {
  items: [
    {
      label: '지차체 관리',
      href: {
        pathname: '/local',
        query: {},
      },
      child: [
        {
          label: '지차체 등록관리',
          href: {
            pathname: '/local-register',
            query: {},
          },
        },
        {
          label: '지자체 정보관리',
          href: {
            pathname: '/local-infomation',
            query: {},
          },
        },
        {
          label: '지자체 판매정책관리',
          href: {
            pathname: '/local-sales-policy',
            query: {},
          },
        },
      ],
    },
    {
      label: '모바일 상품권',
      href: {
        pathname: '/mobile',
        query: {},
      },
      child: [],
    },
    {
      label: '이용내역 관리',
      href: {
        pathname: '/usage',
        query: {},
      },
      child: [],
    },
    {
      label: '가맹점관리',
      href: {
        pathname: '/store',
        query: {},
      },
      child: [],
    },
    {
      label: '회원관리',
      href: {
        pathname: '/user',
        query: {},
      },
      child: [],
    },
    {
      label: '통계관리',
      href: {
        pathname: '/statistics',
        query: {},
      },
      child: [],
    },
    {
      label: '운영관리',
      href: {
        pathname: '/manage',
        query: {},
      },
      child: [],
    },
    {
      label: '시스템관리',
      href: {
        pathname: '/system',
        query: {},
      },
      child: [],
    },
  ],
};

export const mockProps = {
  base,
};
