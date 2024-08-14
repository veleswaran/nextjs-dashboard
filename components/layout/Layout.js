import Head from "next/head"
import Header from "../elements/Header"
import Footer from "../elements/Footer"

const Layout=({children})=>{
    return(
        <div>
            <Header/>
            <main className="main" >
                {children}
            </main>
            <Footer/>
        </div>
    )
}
export default Layout ;