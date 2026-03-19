import {createBrowserRouter, RouterProvider, Navigate} from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import WMOHelp from "./pages/WMOHelp.jsx";
import WMOForm from "./pages/WMOForm.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PersonalPage from "./pages/PersonalPage.jsx";
import NotFound from "./components/NotFound.jsx";
import EditPersonalPage from "./pages/EditPersonalPage.jsx";
import {AuthProvider, useAuth} from './contexts/AuthContext.jsx';

function ProtectedRoute({children}) {
    const {isAuthenticated} = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }
    return <>{children}</>;
}

function PublicRoute({children}) {
    const {isAuthenticated} = useAuth();
    if (isAuthenticated) {
        return <Navigate to="/" replace/>;
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
                element: (
                    <PublicRoute>
                        <LoginPage/>
                    </PublicRoute>
                )
            },
            {
                path: "/registreren",
                element: (
                    <PublicRoute>
                        <RegisterPage/>
                    </PublicRoute>
                )
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
                element: (
                        <WMOHelp/>
                )
            },
            {
                path: "/Registreren",
                element: (
                    <PublicRoute>
                        <RegisterPage/>
                    </PublicRoute>
                )
            },
            {
                path: "/Persoonlijke-pagina",
                element: (
                    <ProtectedRoute>
                        <PersonalPage/>
                    </ProtectedRoute>
                )
            },
            {
                path: "/Bewerken-Persoonlijke-pagina",
                element: <ProtectedRoute>
                    <EditPersonalPage/>
                </ProtectedRoute>
            },
            {
                path: "*",
                element: <NotFound/>
            },

        ]
    }
])

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    );
}

export default App
