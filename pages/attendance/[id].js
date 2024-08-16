import EditUser from "../../components/sections/EditUser";
import Layout from '../../components/layout/Layout';

export default function UserPage({ user, user_id, error }) {
  return (
    <Layout>
      <EditUser user={user} user_id={user_id} error={error} />
    </Layout>
  );
}
