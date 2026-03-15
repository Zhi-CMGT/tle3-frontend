import Nav from "./components/Nav.jsx";
import {Outlet} from "react-router";

function Layout() {
    return (
        <div>
            <header>
                <Nav/>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout