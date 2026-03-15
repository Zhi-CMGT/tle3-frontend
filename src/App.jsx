import {createBrowserRouter, RouterProvider} from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <LoginPage/>
            },

        ]
    }
])

function App() {

    return <RouterProvider router={router}/>

}

export default App
