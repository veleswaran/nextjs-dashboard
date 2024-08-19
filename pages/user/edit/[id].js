import { useRouter } from "next/router";
import Layout from "../../../components/layout/Layout";
import EditUser from "../../../components/sections/user/EditUser";

export default function UserPage() {
  const router = useRouter();
  const id = router.query.id;

  if(!id) return <div>loading....</div>
  
  return (
    <Layout>
      <EditUser user_id={id} />
    </Layout>
  );
}
