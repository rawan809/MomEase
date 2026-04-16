import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../pages/auth/AuthContext";
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  Bell,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { label: "Dashboard Overview", icon: LayoutDashboard, path: "/admin" },
  { label: "Manage Accounts", icon: Users, path: "/admin/users" },
  {
    label: "Manage Community Posts",
    icon: MessageSquare,
    path: "/admin/posts",
  },
  { label: "Manage Articles", icon: FileText, path: "/admin/articles" },
  {
    label: "Reports & Moderation",
    icon: ShieldCheck,
    path: "/admin/moderation",
  },
  { label: "Analytics", icon: BarChart2, path: "/admin/analytics" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--color-background)" }}
    >
      {/* Sidebar */}
      <aside
        className="flex flex-col transition-all duration-300 hide-scrollbar"
        style={{
          width: collapsed ? 72 : 248,
          background: "white",
          boxShadow: "var(--shadow-md)",
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-(--space-md) border-b"
          style={{ height: 64, borderColor: "#ffe5ef" }}
        >
          <div
            className="flex items-center justify-center rounded-xl shrink-0"
            style={{
              width: 38,
              height: 38,
              background: "var(--color-primary)",
              boxShadow: "0 2px 8px #ff338140",
            }}
          >
            <span
              className="text-white font-bold"
              style={{ fontFamily: "var(--font-brand)", fontSize: 18 }}
            >
              M
            </span>
          </div>
          {!collapsed && (
            <div>
              <p
                className="font-bold leading-none"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-brand)",
                  fontSize: 18,
                }}
              >
                MomEase
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--color-muted)", fontSize: 11 }}
              >
                Admin Panel
              </p>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-(--space-sm) flex flex-col gap-1 px-(--space-xs) overflow-y-auto hide-scrollbar">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 rounded-xl transition-all text-left w-full"
                style={{
                  padding: "10px 12px",
                  background: active
                    ? "var(--color-background)"
                    : "transparent",
                  color: active ? "var(--color-primary)" : "var(--color-muted)",
                  fontWeight: active ? 600 : 400,
                  borderLeft: active
                    ? "3px solid var(--color-primary)"
                    : "3px solid transparent",
                  fontSize: 13,
                }}
              >
                <item.icon
                  size={17}
                  className="shrink-0"
                  style={{
                    color: active
                      ? "var(--color-primary)"
                      : "var(--color-muted)",
                  }}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          className="p-(--space-xs) border-t"
          style={{ borderColor: "#ffe5ef" }}
        >
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex items-center gap-3 rounded-xl w-full transition-all hover:bg-pink-50"
            style={{
              padding: "10px 12px",
              color: "var(--color-muted)",
              fontSize: 13,
            }}
          >
            <LogOut size={17} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="flex items-center justify-between bg-white border-b"
          style={{
            height: 64,
            padding: "0 var(--space-lg)",
            borderColor: "#ffe5ef",
            boxShadow: "0 1px 4px #ff338110",
          }}
        >
          {/* Left */}
          <div className="flex items-center gap-(--space-md)">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-(--space-sm) rounded-xl hover:bg-pink-50 transition"
            >
              <Menu size={18} style={{ color: "var(--color-muted)" }} />
            </button>
            <div className="relative">
              <input
                placeholder="Search..."
                className="pl-4 pr-4 py-2 rounded-full text-sm outline-none"
                style={{
                  background: "var(--color-background)",
                  border: "1px solid #ffc8dd",
                  width: 240,
                  fontSize: 13,
                  color: "var(--color-muted)",
                }}
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-(--space-md)">
            <button className="p-(--space-sm) rounded-xl hover:bg-pink-50 transition relative">
              <Bell size={18} style={{ color: "var(--color-muted)" }} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "var(--color-primary)" }}
              />
            </button>

            <div
              className="flex items-center gap-(--space-sm) px-(--space-sm) py-1 rounded-full"
              style={{ background: "var(--color-background)" }}
            >
              <div className="text-right">
                <p
                  className="font-semibold leading-none"
                  style={{ fontSize: 13, color: "#1a1a1a" }}
                >
                  {user?.firstName || "Admin User"}
                </p>
                <p style={{ fontSize: 11, color: "var(--color-muted)" }}>
                  System Administrator
                </p>
              </div>
              <div
                className="flex items-center justify-center rounded-full text-white font-bold shrink-0"
                style={{
                  width: 34,
                  height: 34,
                  background: "var(--color-primary)",
                  fontSize: 13,
                  boxShadow: "0 2px 8px #ff338140",
                }}
              >
                {user?.firstName?.[0]?.toUpperCase() || "A"}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto hide-scrollbar"
          style={{ padding: "var(--space-lg)" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
