import PrimaryLayout from '../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Manage: NextPageWithLayout = () => {
  return (
    <>
      <style jsx>{``}</style>
    </>
  );
};

export default Manage;

Manage.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'운영 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
