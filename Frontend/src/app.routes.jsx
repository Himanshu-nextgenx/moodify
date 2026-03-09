import { createBrowserRouter} from "react-router"
import Register from "./features/auth/pages/register";
import Login from "./features/auth/pages/login";
import Protected from "./features/auth/components/Protected";
import Home from "./features/Home/pages/home";


const router = createBrowserRouter([
    {
        path :"/",
        element: <Protected> <Home/> </Protected>
    },
    {
        path:"/register",
        element : <Register/>
    },
    {
        path:"/login",
        element:<Login/>
    }
])

export default router;