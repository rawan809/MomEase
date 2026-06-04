import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
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
import ResultHistory from "../pages/dep/ResultHistory";
import Assessments from "../pages/dep/Assessments";
import AssessmentQuestions from "../pages/dep/AssessmentQuestions";
import AssessmentResult from "../pages/dep/AssessmentResult";
import SkinDiagnoses from "../pages/skin/SkinDiagnosis";
import SkinUpload from "../pages/skin/SkinUpload";
import SkinResult from "../pages/skin/SkinResult";
import CryAnalysis from "../pages/Cry/CryAnalysis";
import CryRecording from "../pages/Cry/CryRecording";
import CryAnalyzing from "../pages/Cry/CryAnalyzing";
import CryResult from "../pages/Cry/CryResult";
import AdminLayout from "./components/Admin/AdminLayout";
import { NotificationProvider } from "./contexts/NotificationContext";
import { AuthProvider } from "./contexts/AuthContext";
import Notifications from "../pages/Notifications";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoutes";
import MotherProfile from "../pages/profile/MotherProfile";
import BabyTracking from "../pages/babyTracking/BabyTracking";
import Overview from "./components/babyTracking/overview/Overview";
import Feeding from "./components/babyTracking/feeding/Feeding";
import Growth from "./components/babyTracking/growth/Growth";
import Sleep from "./components/babyTracking/sleep/Sleep";
import Vaccination from "./components/babyTracking/vaccinations/Vaccination";
import ReportDetailsPage from "../pages/babyTracking/ReportDetailsPage";
import Community from "../pages/Community";
import CommunityFeed from "../pages/community/CommunityFeed";
import CommunityMyPosts from "../pages/community/CommunityMyPosts";
import CommunitySaved from "../pages/community/CommunitySaved";
import CommunityPost from "../pages/community/CommunityPost";
import { Toaster } from "sonner";
import ChildrenPage from "../pages/profile/ChildrenPage";

import ManageAccounts from "../pages/admin/ManageAccounts";
import ManageArtical from "../pages/admin/ManageArtical";
import ManageCommunityPosts from "../pages/admin/ManageCommunityPosts";
import ReportsModeration from "../pages/admin/ReportsModeration";
import AdminGuard from "./guards/AdminGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },

      //  protected routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/home", element: <Home /> },
          { path: "/notifications", element: <Notifications /> },
          { path: "/ExploreArticles", element: <ArticlesCatigories /> },
          { path: "/Articles/:categoryID", element: <Articles /> },
          { path: "/Article/:articleID", element: <Article /> },
          { path: "/SkinDiagnoses", element: <SkinDiagnoses /> },
          { path: "/skin-diagnosis/upload", element: <SkinUpload /> },
          { path: "/skin-diagnosis/result", element: <SkinResult /> },
          { path: "/depression", element: <Depression /> },
          { path: "/myprofile", element: <MotherProfile /> },
          { path: "/myprofile/children", element: <ChildrenPage /> },
          { path: "/cryAnalysis", element: <CryAnalysis /> },
          { path: "/cryAnalysis/record", element: <CryRecording /> },
          { path: "/cryAnalysis/analyzing", element: <CryAnalyzing /> },
          { path: "/cryAnalysis/result", element: <CryResult /> },
          { path: "/assessments", element: <Assessments /> },
          { path: "/depression/history", element: <ResultHistory /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/chatbot", element: <ChatBot /> },

      { path: "/assessment/:id", element: <AssessmentQuestions /> },
      { path: "/assessment/:id/result", element: <AssessmentResult /> },
      { path: "/assessment/0/result/:id", element: <AssessmentResult /> },
      {
        path: "/babytracking",
        element: <BabyTracking />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: <Overview /> },
          { path: "feeding", element: <Feeding /> },
          { path: "growth", element: <Growth /> },
          { path: "sleep", element: <Sleep /> },
          { path: "vaccinations", element: <Vaccination /> },
          { path: "report/:reportId", element: <ReportDetailsPage /> },
        ],
      },
      {
        path: "/community",
        element: <Community />,
        children: [
          { index: true, element: <CommunityFeed /> },
          { path: "saved", element: <CommunitySaved /> },
          { path: "my-posts", element: <CommunityMyPosts /> },
          { path: "post/:postId", element: <CommunityPost /> },
        ],
      },
    ],
  },

  //  auth pages
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Register /> },
    ],
  },

  //  public pages (متاحة بدون login)
  { path: "/forgetByEmail", element: <ForgetByEmail /> },
  { path: "/forgetByPhone", element: <ForgetByPhone /> },
  { path: "/createNewPassword/:email", element: <CreateNewPassword /> },
  { path: "/verifyEmail", element: <VerifyEmail /> },

  //  Not Found
  { path: "*", element: <Notfound /> },

  //   زي ما هو
  {
    path: "/admin",

    element: (
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    ),

    children: [
      {
        index: true,
        element: <ManageAccounts />,
      },
      {
        path: "manageArtical",
        element: <ManageArtical />,
      },
      {
        path: "manageCommunityPosts",
        element: <ManageCommunityPosts />,
      },
      {
        path: "ReportsModeration",
        element: <ReportsModeration />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Toaster richColors position="top-right" />
        <RouterProvider router={router} />{" "}
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
