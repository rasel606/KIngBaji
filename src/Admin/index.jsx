import { lazy } from "react";





import AgentDeposit from "./Pages/Dashboard/Agent/AgentDeposit.jsx";
import AgentWidthrow from "./Pages/Dashboard/Agent/AgentWidthrow.jsx";

import AgentList from "./Pages/Dashboard/Agent/AgentList.jsx";
import "./Component/Admin_Style.css";
import Login from "./Pages/Login.jsx";
import Registration from "./Pages/Registration.jsx";
import ContactUs from "./Pages/ContactUs/ContactUs.jsx";

import AgentUser from "./Pages/Dashboard/Agent/AgentUser.jsx";
const AgentLayout = lazy(() => import("./Component/AdminLayout.jsx"));
const AdminHome = lazy(() => import("./Pages/Home/AdminHome.jsx"));

export default (isAuthenticated, setIsAuthenticated) =>
  
  
  [
  {
    path: "/admin",
    element: isAuthenticated ? (
      <AgentLayout  />
    ) : (
      <Login  />
    ),
    errorElement: <div>Loading Agent Error</div>,
    children: [
      {
        path: "/admin",
        element: <AdminHome />,
      },

      {
        path: "agentlist",
        element: <AgentList />,
      },

      {
        path: "agentdeposit",
        element: <AgentDeposit />,
      },
      {
        path: "agentWidthraw",
        element: <AgentWidthrow />,
      },
      {
        path: "agentusers",
        element: <AgentUser />,
      },
      {
        path: "affiliate",
        element: <AgentWidthrow />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "registration",
    element: <Registration />,
  },
  {
    path: "registration/:referralId",
    element: <Registration  />,
  },
];
