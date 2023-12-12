import PrimaryLayout from '../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from './page';

const System: NextPageWithLayout = () => {
  return (
    <>
      <style jsx>{``}</style>
    </>
  );
};

export default System;

System.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'시스템 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
