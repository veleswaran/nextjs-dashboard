import Head from "next/head"
import Header from "../elements/Header"
import Footer from "../elements/Footer"

const Layout=({child})=>{
    return(
        <div>
            <Header/>
            <main className="main" >
                {child}
            </main>
            <Footer/>
        </div>
    )
}
export default Layout ;