import PrimaryLayout from '../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../page';

const User: NextPageWithLayout = () => {
  return (
    <>
      <style jsx>{``}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'공지 사항 관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
