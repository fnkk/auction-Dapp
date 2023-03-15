import Header from "./component/header";
import { Outlet } from "react-router-dom";
function Layout(){

    return (
        <>
        <Header></Header>
        <div id="App">
        <Outlet/>
        </div>
        </>
    )
}
export default Layout;