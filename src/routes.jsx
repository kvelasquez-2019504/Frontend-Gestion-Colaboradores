import { Login } from "../src/pages/login";
import { Dashboard } from "./pages/dashboard";

const routes = [
    { path: "/", element: <Login /> },
    { path: "*", element: <Login /> },
    { path: "/principal", element: <Dashboard /> },
]


export default routes;