import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import Button from "@mui/material/Button";
import { ROUTES } from "@/config/routes";
import { Logo } from "@/components/layout/Logo";

export default function NotFoundPage() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-night-950 px-4 text-center">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative">
        <Logo dark className="justify-center" />
        <p className="text-gradient mt-12 text-8xl font-semibold tracking-tighter">404</p>
        <h1 className="mt-4 text-xl font-semibold text-white">Esta página não existe.</h1>
        <p className="mt-2 text-zinc-400">O link pode estar quebrado ou a página foi removida.</p>
        <Button component={Link} to={ROUTES.app} variant="contained" className="mt-8" startIcon={<ArrowLeft className="size-4" />}>
          Voltar ao painel
        </Button>
      </div>
    </div>
  );
}
