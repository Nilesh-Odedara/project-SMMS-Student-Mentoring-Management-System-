// import Navbar from "./Navbar"
import {Outlet} from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"

const AdminLayout=()=>{
    return(
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}
export default AdminLayout
