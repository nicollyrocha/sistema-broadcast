import { NavLink } from "react-router";
import { LogOut } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { Logo } from "./Logo";
import { APP_NAV, APP_NAV_FOOTER, type NavItem } from "@/config/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { initials } from "@/lib/format";
import { signOut } from "@/services/auth";

function Item({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <ListItemButton component={NavLink} to={item.to} onClick={onNavigate} className="nav-item">
      <ListItemIcon className="min-w-0">
        <Icon />
      </ListItemIcon>
      <ListItemText primary={item.label} slotProps={{ primary: { className: "truncate text-sm font-medium" } }} />
    </ListItemButton>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full flex-col border-r border-zinc-200/80 bg-zinc-50">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>

      <List component="nav" disablePadding className="flex-1 space-y-0.5 overflow-y-auto px-3 pt-2 pb-4">
        {APP_NAV.map((item) => (
          <Item key={item.to} item={item} onNavigate={onNavigate} />
        ))}
      </List>

      <div className="space-y-3 border-t border-zinc-200/80 p-3">
        <List disablePadding className="space-y-0.5">
          {APP_NAV_FOOTER.map((item) => (
            <Item key={item.to} item={item} onNavigate={onNavigate} />
          ))}
        </List>

        {/* Usuário */}
        <UserCard />
      </div>
    </aside>
  );
}

function UserCard() {
  const { user } = useAuth();
  const name = user?.displayName || user?.email?.split("@")[0] || "";

  return (
    <Paper variant="outlined" className="flex items-center gap-3 rounded-xl p-2 shadow-card">
      <Avatar
        src={user?.photoURL ?? undefined}
        className="size-8 bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-semibold"
      >
        {initials(name)}
      </Avatar>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-zinc-900">{name}</span>
        <span className="block truncate text-xs text-zinc-500">{user?.email}</span>
      </span>
      <Tooltip title="Sair">
        <IconButton size="small" aria-label="Sair" onClick={() => signOut()}>
          <LogOut className="size-4" />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
