import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgetByEmail from "../pages/auth/ForgetByEmail";
import ForgetByPhone from "../pages/auth/ForgetByPhone";
import CreateNewPassword from "../pages/auth/CreateNewPassword";
import Notfound from "../pages/Notfound";
import Home from "../pages/Home";
import VerifyEmail from "../pages/auth/VerifyEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/forgetByEmail",
    element: <ForgetByEmail />,
  },
  {
    path: "/forgetByPhone",
    element: <ForgetByPhone />,
  },
  {
    path: "/createNewPassword",
    element: <CreateNewPassword />,
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
