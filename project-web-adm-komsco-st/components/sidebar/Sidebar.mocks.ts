import { ISidebar } from './Sidebar';

const base: ISidebar = {
  items: [
    {
      label: 'Dashboard',
      href: {
        pathname: '/local-register',
        query: {},
      },
      child: [],
    },
    {
      label: '상품권/정책수당',
      href: {
        pathname: '/local-infomation',
        query: {},
      },
      child: [],
    },
    {
      label: '통계현황판',
      href: {
        pathname: '/local-sales-policy',
        query: {},
      },
      child: [],
    },
    {
      label: '충전/지급',
      href: {
        pathname: '/local-register',
        query: {},
      },
      child: [],
    },
    {
      label: '결제',
      href: {
        pathname: '/local-register',
        query: {},
      },
      child: [],
    },
    {
      label: '선물',
      href: {
        pathname: '/local-register',
        query: {},
      },
      child: [],
    },
  ],
};

export const mockProps = {
  base,
};
