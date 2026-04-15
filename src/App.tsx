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
import ArticlesCatigories from "../pages/articles/ArticlesCatigories";
import Articles from "../pages/articles/Articles";
import Article from "../pages/articles/Article";
import ChatBot from "../pages/ChatBot";
import Depression from "../pages/dep/depression";
import Assessments from "../pages/dep/Assessments";
import AssessmentQuestions from "../pages/dep/AssessmentQuestions";
import AssessmentResult from "../pages/dep/AssessmentResult";
import SkinDiagnoses from "../pages/skin/SkinDiagnosis";
import SkinUpload from "../pages/skin/SkinUpload";
import SkinResult from "../pages/skin/SkinResult";
import AdminGuard from "./guards/AdminGuard";
import AdminLayout from "./components/Admin/AdminLayout";

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
      {
        path: "/ExploreArticles",
        element: <ArticlesCatigories />,
      },
      {
        path: "/Articles/:categoryID",
        element: <Articles />,
      },
      {
        path: "/Article/:articleID",
        element: <Article />,
      },
      {
        path: "/SkinDiagnoses",
        element: <SkinDiagnoses />,
      },
      { path: "/skin-diagnosis/upload", element: <SkinUpload /> },
      { path: "/skin-diagnosis/result", element: <SkinResult /> },
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
    path: "/createNewPassword/:email",
    element: <CreateNewPassword />,
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
  {
    path: "/chatbot",
    element: <ChatBot />,
  },
  {
    path: "/depression",
    element: <Depression />,
  },
  {
    path: "/assessments",
    element: <Assessments />,
  },
  {
    path: "/assessment/:id",
    element: <AssessmentQuestions />,
  },
  {
    path: "//assessment/:id/result",
    element: <AssessmentResult />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/admin",
    element: (
      //<AdminGuard> //هنرجعها لما نظبط ال auth
      <AdminLayout />
      // </AdminGuard>
    ),
    children: [
      {
        index: true,
        element: <div className="p-4">Dashboard — coming soon</div>,
      },
      {
        path: "users",
        element: <div className="p-4">Users — coming soon</div>,
      },
      {
        path: "posts",
        element: <div className="p-4">Posts — coming soon</div>,
      },
      {
        path: "articles",
        element: <div className="p-4">Articles — coming soon</div>,
      },
      {
        path: "moderation",
        element: <div className="p-4">Moderation — coming soon</div>,
      },
      {
        path: "analytics",
        element: <div className="p-4">Analytics — coming soon</div>,
      },
      {
        path: "settings",
        element: <div className="p-4">Settings — coming soon</div>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
