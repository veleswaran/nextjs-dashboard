import Image from "next/image"
import Layout from "../components/layout/Layout"

const Error = () =>{
    return(
        <Layout>
            <Image src="/images/401.jpg" fill style={{marginTop:"56px"}}/>
        </Layout>
    )
}
export default Error;