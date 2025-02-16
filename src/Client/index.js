import React, { lazy, useEffect, useState } from "react";
import HomePage from "./Pages/HomePage.jsx";
import Sliderd from "./Pages/Sliderd.jsx";
import Fands from "./Pages/Fands.jsx";
import DepositModel from "./Pages/DepositModel.jsx";
import WidthrawModel from "./Pages/WidthrawModel.jsx";
import ProfileModel from "./Pages/ProfileModel.jsx";
import MyProfilemodal from "./Pages/MyProfilemodal.jsx";
import LoginModel from "./Pages/LoginModel.jsx";
import PromossionsModel from "./Component/PromossionsModel.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import GameProviderPagebycategory from "./Pages/GameProviderPagebycategory.jsx";




const ClientLeyout = lazy(() => import("./Component/ClientLeyout.jsx"));

export default [
  {
    path: "/",
  element: <ClientLeyout />,
  errorElement: <div >Loading Client Error</div>,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/sl",
      element: <Sliderd />,
    },
    {
      path: "/gamesProvidersPageWithCategory/:category_name/:providercode",
      element: <GameProviderPagebycategory />,
    },
    
    // {
    //   path: "/profile",
    //   element: <MyProfilemodal />,
    // },
    
  ]
}
]





