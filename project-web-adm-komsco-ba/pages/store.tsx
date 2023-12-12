import PrimaryLayout from '../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Store: NextPageWithLayout = () => {
  return (
    <>
      <style jsx>{``}</style>
    </>
  );
};

export default Store;

Store.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'가맹점 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
