import Header from "./component/header";
import Footer from "./component/footer";
import { Outlet } from "react-router-dom";
function Layout(){

    return (
        <>
        <Header />
        <div id="App">
        <Outlet/>
        </div>
        <Footer />
        </>
    )
}
export default Layout;