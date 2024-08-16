
import Layout from '../../components/layout/Layout';
import EditUser from '../../components/sections/user/EditUser';

export default function UserPage({ user, user_id, error }) {
  return (
    <Layout>
      <EditUser user={user} user_id={user_id} error={error} />
    </Layout>
  );
}
