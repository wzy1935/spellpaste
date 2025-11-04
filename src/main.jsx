import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './App.css'

import OnboardingPage from './pages/OnboardingPage'
import SpellPage from './pages/SpellPage'
import SettingPage from './pages/SettingPage'
import InitPage from './pages/InitPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <InitPage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },
  {
    path: "/spells",
    element: <SpellPage />,
  },
  {
    path: "/settings",
    element: <SettingPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
