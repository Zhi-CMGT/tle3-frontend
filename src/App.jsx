import {createBrowserRouter, RouterProvider} from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import WMOHelp from "./pages/WMOHelp.jsx";
import WMOForm from "./pages/WMOForm.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PersonalPage from "./pages/PersonalPage.jsx";


const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/WMO-formulieren",
                element: <WMOForm/>
            },
            {
                path: "/WMO-help",
                element: <WMOHelp/>
            },
            {
                path: "/Registreren",
                element: <RegisterPage/>
            },
            {
                path: "/Persoonlijke-pagina",
                element: <PersonalPage/>
            },

        ]
    }
])

function App() {

    return <RouterProvider router={router}/>

}

export default App
