import PrimaryLayout from '../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Mobile: NextPageWithLayout = () => {
  return (
    <>
      <style jsx>{``}</style>
    </>
  );
};

export default Mobile;

Mobile.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'모바일 상품권'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
