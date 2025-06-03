import React, { Suspense, useState } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  Route,
  Router,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";

import Client from "../Client/index";

import { ModalProvider } from "../Client/Component/ModelContext";
import AuthContextProvider, { useAuth } from "../Client/Component/AuthContext";
import GameContextProvider from "../Client/Component/GameContext";
import PaymenyContextProvider from "../Client/PaymentContext/PaymenyContext";
import WidthrawPaymentContext from "../Client/PaymentContext/WidthrawPaymentContext";
import { ChatProvider} from "../Client/Component/ChatContext";

export default () => {
      const token = localStorage.getItem('authSubAdminToken');
  const router = createBrowserRouter([...Client]);

  return (
    <ModalProvider>
      <GameContextProvider>
        <AuthContextProvider>
           {/* <ChatProvider> */}
          <WidthrawPaymentContext>
            <PaymenyContextProvider>
              <Suspense
                fallback={
                  <div
                    style={{
                      background: "#4c086c",
                      height: "100vh",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <p style={{ color: "#fff" }}>Loading...</p>
                  </div>
                }
              >
                <RouterProvider router={router} />
              </Suspense>
            </PaymenyContextProvider>
          </WidthrawPaymentContext>
          {/* </ChatProvider> */}
        </AuthContextProvider>
      </GameContextProvider>
    </ModalProvider>
  );
};
