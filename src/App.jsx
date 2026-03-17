import {createBrowserRouter, RouterProvider, Navigate} from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import WMOHelp from "./pages/WMOHelp.jsx";
import WMOForm from "./pages/WMOForm.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PersonalPage from "./pages/PersonalPage.jsx";
import NotFound from "./components/NotFound.jsx";

function ProtectedRoute({children}) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
        return <Navigate to="/login" replace/>;
    }
    return <>{children}</>;
}

const router = createBrowserRouter([
    {
        element: <Layout/>,
        errorElement: <NotFound/>,
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
                element: (
                    <ProtectedRoute>
                        <WMOForm/>
                    </ProtectedRoute>
                )
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
