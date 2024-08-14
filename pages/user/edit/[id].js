import Layout from "../../../components/layout/Layout";
import EditUser from "../../../components/sections/user/EditUser";
import axios from 'axios';

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const res = await axios.get(`http://localhost:3000/api/users/${id}`);
    const data = res.data;

    return {
      props: {
        user: data,
        user_id: id,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      props: {
        error: 'Failed to fetch user data',
      },
    };
  }
}

export default function UserPage({ user, user_id, error }) {
  return (
    <Layout>
      <EditUser user={user} user_id={user_id} error={error} />
    </Layout>
  );
}
