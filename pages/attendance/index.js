import Layout from "../../components/layout/Layout"
import ListAttendance from "../../components/sections/attendance/ListAttendance"
import Batches from "../../components/sections/attendance/Batches"

const home = ()=>{
    return(
        <Layout>
            {/* <ListAttendance/> */}
            <Batches/>
        </Layout>
    )
}
export default home;