import { createBrowserRouter, Navigate } from "react-router";

import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { ProtectedRoute } from "@/app/ProtectedRoute";

import NotFoundPage from "@/pages/errors/NotFoundPage";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

import DashboardPage from "@/pages/app/DashboardPage";
import InboxPage from "@/pages/app/InboxPage";
import CampaignsPage from "@/pages/app/campaigns/CampaignsPage";
import CampaignNewPage from "@/pages/app/campaigns/CampaignNewPage";
import CampaignDetailPage from "@/pages/app/campaigns/CampaignDetailPage";
import AutomationsPage from "@/pages/app/AutomationsPage";
import TemplatesPage from "@/pages/app/TemplatesPage";
import ContactsPage from "@/pages/app/contacts/ContactsPage";
import ContactDetailPage from "@/pages/app/contacts/ContactDetailPage";
import AudiencesPage from "@/pages/app/contacts/AudiencesPage";
import ReportsPage from "@/pages/app/ReportsPage";
import ChannelsPage from "@/pages/app/ChannelsPage";
import BillingPage from "@/pages/app/BillingPage";
import SettingsPage from "@/pages/app/settings/SettingsPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/app" replace /> },
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
          { index: true, element: <DashboardPage /> },
          { path: "caixa-de-entrada", element: <InboxPage /> },
          { path: "campanhas", element: <CampaignsPage /> },
          { path: "campanhas/nova", element: <CampaignNewPage /> },
          { path: "campanhas/:id", element: <CampaignDetailPage /> },
          { path: "automacoes", element: <AutomationsPage /> },
          { path: "templates", element: <TemplatesPage /> },
          { path: "contatos", element: <ContactsPage /> },
          { path: "contatos/:id", element: <ContactDetailPage /> },
          { path: "audiencias", element: <AudiencesPage /> },
          { path: "relatorios", element: <ReportsPage /> },
          { path: "canais", element: <ChannelsPage /> },
          { path: "assinatura", element: <BillingPage /> },
          { path: "configuracoes", element: <SettingsPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
