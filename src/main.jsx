import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './App.css'

import HomePage from './pages/HomePage'
import MainPage from './pages/MainPage'
import SettingsPage from './pages/SettingsPage'
import InitPage from './pages/InitPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <InitPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
