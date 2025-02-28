import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import routes from "./routes.jsx";
import { Login } from "./pages/login/Login.jsx";

export const App = () => {
  const element = useRoutes(routes);
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 from-15% via-sky-800 via-40% to-red-600 to-90%">
      {token?( element):( <Login />)}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
