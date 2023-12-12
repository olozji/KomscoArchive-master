import { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';
import { INavbar } from '../components/navbar/Navbar';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (_page: ReactElement, _navItems: INavbar['navItems']) => ReactNode;
  layout?: ComponentType;
};
