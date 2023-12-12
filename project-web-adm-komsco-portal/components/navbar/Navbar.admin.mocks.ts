import { INavbarAdmin } from './Navbar.admin';

const base: INavbarAdmin = {
  items: [
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
};

export const adminProps = {
  base,
};
