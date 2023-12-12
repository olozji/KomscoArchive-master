import { IPrimaryLayoutAdmin } from './PrimaryLayoutAdmin';

const base: IPrimaryLayoutAdmin = {
  children: null,
  navItems: [
    {
      label: '공지관리',
      href: {
        pathname: '/',
        query: {},
      },
    },
    {
      label: '메시지관리',
      href: {
        pathname: '/',
        query: {},
      },
      child: [],
    },
    {
      label: '시스템관리',
      href: {
        pathname: '/',
        query: {},
      },
      child: [],
    },
  ],
  title: '지차체 관리',
};

export const adminProps = {
  base,
};
