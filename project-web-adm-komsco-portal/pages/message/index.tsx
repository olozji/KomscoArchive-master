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
    <PrimaryLayout title={'메세지관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
