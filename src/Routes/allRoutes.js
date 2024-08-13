import React from "react";
import { Navigate } from "react-router-dom";

//Tables

import ReactTable from "../pages/Tables/ReactTables";

//QA Management
import HomePage from "../pages/QAManagement/HomePage";
import ModuleList from "../pages/QAManagement/ModuleList";
import TestCase from "../pages/QAManagement/TestCase";
import UserManagement from "../pages/QAManagement/UserManagement";
import TestResult from "../pages/QAManagement/TestResult";

//AuthenticationInner pages
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
import CoverSignIn from "../pages/AuthenticationInner/Login/CoverSignIn";

//pages
import Starter from "../pages/Pages/Starter/Starter";
import SimplePage from "../pages/Pages/Profile/SimplePage/SimplePage";
import Settings from "../pages/Pages/Profile/Settings/Settings";
import Timeline from "../pages/Pages/Timeline/Timeline";

import SiteMap from "../pages/Pages/SiteMap/SiteMap";
import SearchResults from "../pages/Pages/SearchResults/SearchResults";
import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
import CoverLogout from "../pages/AuthenticationInner/Logout/CoverLogout";
import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";
import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ApiKey from "../pages/APIKey/index";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import Test from "../pages/Pages/Profile/SimplePage/Test";
import Municipality from "../pages/DocumentArc/Municipality";
import DocumentSub from "../pages/DocumentArc/DocumentSub";
import DocSubReadOnly from "../pages/DocumentArc/DocSubReadOnly";
import Dashboard from "../pages/DocumentArc/Dashboard";
import ConfirmPswd from "../pages/DocumentArc/confirmpswd";
import ResetPswd from "../pages/DocumentArc/Resetpswd";
// import LoginPage from "../pages/DocumentArc/LoginPage";
import LoginNew from "../pages/DocumentArc/loginnew";
import Province from "../pages/DocumentArc/Province";
import District from "../pages/DocumentArc/District";
import Branch from "../pages/DocumentArc/Branch";
import Department from "../pages/DocumentArc/Department";
import Role from "../pages/DocumentArc/Role";
import Recommander from "../pages/WorkFlow/Recommander";
import Approver from "../pages/WorkFlow/Approver";
import DocumentType from "../pages/DocumentArc/DocumentType";
import DocumentCategory from "../pages/DocumentArc/DocumentCategory";
import Initiator from "../pages/WorkFlow/Initiator";
import NextRecommander from "../pages/WorkFlow/NextRecommander";
import DonePage from "../pages/WorkFlow/DonePage";
import DocumentList from "../pages/WorkFlow/DocumentList";
import Designation from "../pages/DocumentArc/Designation";
import EmployeeLevel from "../pages/DocumentArc/EmployeeLevel";
import FunctionalTitle from "../pages/DocumentArc/FunctionalTitle";
import Employee from "../pages/DocumentArc/Employee";

const authProtectedRoutes = [
  { path: "/home", component: <Navigate to="/project" /> },
  { path: "/recommander", component: <Recommander /> },
  { path: "/next-recommander", component: <NextRecommander /> },
  { path: "/document-list", component: <DocumentList /> },
  { path: "/approver", component: <Approver /> },
  { path: "/initiator", component: <Initiator /> },
  { path: "/complete", component: <DonePage /> },

  //Tables
  { path: "/tables-react", component: <ReactTable /> },

  //Document Archival
  { path: "/project", component: <HomePage /> },
  { path: "/project/:id", component: <ModuleList /> },
  { path: "/project/module/testcase/:id", component: <TestResult /> },
  { path: "/project/module/:id", component: <TestCase /> },
  { path: "/users", component: <UserManagement /> },
  { path: "/municipality", component: <Municipality /> },
  { path: "/province", component: <Province /> },
  { path: "/district", component: <District /> },
  { path: "/branch", component: <Branch /> },
  { path: "/department", component: <Department /> },
  { path: "/designation", component: <Designation /> },
  { path: "/employeelevel", component: <EmployeeLevel /> },
  { path: "/functionaltitle", component: <FunctionalTitle /> },
  { path: "/employee", component: <Employee /> },
  { path: "/role", component: <Role /> },
  { path: "/documenttype", component: <DocumentType /> },
  { path: "/documentcategory", component: <DocumentCategory /> },

  { path: "/documentSubmission", component: <DocumentSub /> },
  { path: "/documentSubmission/read-only", component: <DocSubReadOnly /> },

  //Pages
  { path: "/pages-starter", component: <Starter /> },
  { path: "/pages-profile", component: <SimplePage /> },
  { path: "/pages-profile-settings", component: <Settings /> },
  { path: "/pages-timeline", component: <Timeline /> },

  { path: "/pages-sitemap", component: <SiteMap /> },
  { path: "/pages-search-results", component: <SearchResults /> },

  //APIkey
  { path: "/apps-api-key", component: <ApiKey /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/project" />,
  },
  { path: "*", component: <Navigate to="/auth-404-cover" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },

  { path: "/login", component: <Login /> },
  { path: "/loginnew", component: <LoginNew /> },
  // { path: "/loginpage", component: <LoginPage /> },
  { path: "/reset", component: <ResetPswd /> },
  { path: "/confirm", component: <ConfirmPswd /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
  { path: "/test", component: <Test /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };
