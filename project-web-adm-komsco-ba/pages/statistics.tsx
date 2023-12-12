import PrimaryLayout from '../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Statistics: NextPageWithLayout = () => {
  return (
    <>
      <style jsx>{``}</style>
    </>
  );
};

export default Statistics;

Statistics.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'통계 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
