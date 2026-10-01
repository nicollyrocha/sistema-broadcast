import { useState } from "react";
import { Outlet } from "react-router";
import Drawer from "@mui/material/Drawer";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-100/60">
      {/* Sidebar desktop */}
      <div className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        <Sidebar />
      </div>

      {/* Sidebar mobile */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} className="lg:hidden" slotProps={{ paper: { className: "w-72" } }}>
        <Sidebar onNavigate={() => setMobileOpen(false)} />
      </Drawer>

      <div className="lg:pl-64">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
