import { Link } from "react-router";
import { Bell, Menu, Plus, Search } from "lucide-react";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { ROUTES } from "@/config/routes";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <IconButton className="lg:hidden" onClick={onMenuClick} aria-label="Abrir menu">
          <Menu className="size-5" />
        </IconButton>

        <TextField
          className="hidden max-w-md flex-1 sm:inline-flex"
          placeholder="Buscar mensagens ou contatos..."
          slotProps={{
            input: {
              className: "bg-zinc-50",
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="size-4 text-zinc-400" />
                </InputAdornment>
              ),
            },
          }}
        />

        <div className="ml-auto flex items-center gap-2">
          <IconButton aria-label="Notificações">
            <Badge variant="dot" color="primary" overlap="circular">
              <Bell className="size-5 text-zinc-600" />
            </Badge>
          </IconButton>
          <Button component={Link} to={`${ROUTES.inbox}?nova=1`} variant="contained" startIcon={<Plus className="size-4" />}>
            <span className="hidden sm:inline">Nova mensagem</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
