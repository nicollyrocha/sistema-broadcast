import { createBrowserRouter, Navigate } from "react-router";

import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { ProtectedRoute } from "@/app/ProtectedRoute";
import { ROUTES } from "@/config/routes";

import NotFoundPage from "@/pages/errors/NotFoundPage";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

import InboxPage from "@/pages/app/InboxPage";
import ContactsPage from "@/pages/app/contacts/ContactsPage";
import ReportsPage from "@/pages/app/ReportsPage";
import ConnectionsPage from "@/pages/app/ConnectionsPage";
import SettingsPage from "@/pages/app/settings/SettingsPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to={ROUTES.inbox} replace /> },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "cadastro", element: <RegisterPage /> },
      { path: "recuperar-senha", element: <ForgotPasswordPage /> },
    ],
  },
  {
    path: "app",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to={ROUTES.inbox} replace /> },
          { path: "caixa-de-entrada", element: <InboxPage /> },
          { path: "contatos", element: <ContactsPage /> },
          { path: "relatorios", element: <ReportsPage /> },
          { path: "conexoes", element: <ConnectionsPage /> },
          { path: "configuracoes", element: <SettingsPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
