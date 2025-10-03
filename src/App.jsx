import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ScrollToHashElement from "@/components/ScrollToHashElement";

const Landing = lazy(() => import("@/pages/Landing.jsx"));
const Game = lazy(() => import("@/pages/Game.jsx"));
const Privacy = lazy(() => import("@/pages/Privacy.jsx"));
const Terms = lazy(() => import("@/pages/Terms.jsx"));
const Contact = lazy(() => import("@/pages/Contact.jsx"));
const NotFound = lazy(() => import("@/pages/NotFound.jsx"));

function RootLayout() {
  return (
    <>
      <ScrollToHashElement />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "game", element: <Game /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
