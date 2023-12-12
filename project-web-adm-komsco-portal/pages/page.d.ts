import { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';
import { INavbar } from '../components/navbar/Navbar';
import { AuthToken } from '../types/AuthToken';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (
    _page: ReactElement,
    _navItems: INavbar['navItems'],
    _authInfo: AuthToken
  ) => ReactNode;
  layout?: ComponentType;
};
