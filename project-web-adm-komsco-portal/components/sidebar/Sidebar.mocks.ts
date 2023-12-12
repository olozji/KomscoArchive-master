import { ISidebar } from './Sidebar';

const base: ISidebar = {
  items: [
    {
      label: '지차체 등록관리',
      href: {
        pathname: '',
        query: {},
      },
      child: [
        {
          label: '지차체 등록관리 - 서브1',
          href: {
            pathname: '/local-register-sub1',
            query: {},
          },
        },
        {
          label: '지차체 등록관리 - 서브2',
          href: {
            pathname: '/local-register-sub2',
            query: {},
          },
        },
      ],
    },
    {
      label: '지자체 정보관리',
      href: {
        pathname: '/local-infomation',
        query: {},
      },
      child: [],
    },
    {
      label: '지차체 등록관리',
      href: {
        pathname: '',
        query: {},
      },
      child: [
        {
          label: '지차체 등록관리 - 서브1',
          href: {
            pathname: '/local-register-sub1',
            query: {},
          },
        },
        {
          label: '지차체 등록관리 - 서브2',
          href: {
            pathname: '/local-register-sub2',
            query: {},
          },
        },
      ],
    },
    {
      label: '지자체 판매정책관리',
      href: {
        pathname: '/local-sales-policy',
        query: {},
      },
      child: [],
    },
  ],
};

export const mockProps = {
  base,
};
