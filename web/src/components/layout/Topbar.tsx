import { Link } from "react-router";
import { Menu, Plus } from "lucide-react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { ROUTES } from "@/config/routes";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <IconButton className="lg:hidden" onClick={onMenuClick} aria-label="Abrir menu">
          <Menu className="size-5" />
        </IconButton>

        <div className="ml-auto flex items-center gap-2">
          <Button component={Link} to={`${ROUTES.inbox}?nova=1`} variant="contained" startIcon={<Plus className="size-4" />}>
            <span className="hidden sm:inline">Nova mensagem</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
