import Nav from "./components/Nav.jsx";
import {Outlet} from "react-router";
import Footer from "./components/Footer.jsx";

function Layout() {
    return (
        <div>
            <header>
                <Nav/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

export default Layout