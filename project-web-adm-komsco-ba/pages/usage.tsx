import PrimaryLayout from '../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Usage: NextPageWithLayout = () => {
  return (
    <>
      <style jsx>{``}</style>
    </>
  );
};

export default Usage;

Usage.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'이용내역 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
