import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  ShieldCheck,
} from "lucide-react";
import NotificationDropDown from "../notifications/NotificationDropDown";
import ProfileDropDown from "../ui/ProfileDropDown";

const navItems = [
  { label: "Manage Accounts", icon: LayoutDashboard, path: "/admin" },
  {
    label: "Manage Community Posts",
    icon: MessageSquare,
    path: "/admin/ManageCommunityPosts",
  },
  { label: "Manage Articles", icon: FileText, path: "/admin/ManageArtical" },
  {
    label: "Reports & Moderation",
    icon: ShieldCheck,
    path: "/admin/ReportsModeration",
  },
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
      <aside
        className="flex flex-col transition-all duration-300 hide-scrollbar"
        style={{
          width: collapsed ? 72 : 248,
          background: "white",
          boxShadow: "var(--shadow-md)",
          zIndex: 10,
        }}
      >
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className="flex items-center justify-between bg-white border-b"
          style={{
            height: 64,
            padding: "0 var(--space-lg)",
            borderColor: "#ffe5ef",
            boxShadow: "0 1px 4px #ff338110",
          }}
        >
          <div className="flex items-center gap-(--space-md)">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-(--space-sm) rounded-xl hover:bg-pink-50 transition"
            >
              <Menu size={18} style={{ color: "var(--color-muted)" }} />
            </button>
          </div>

          <div className="flex items-center gap-(--space-md)">
            <div className="text-xl text-primary aspect-square w-7 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer">
              <NotificationDropDown />
            </div>

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
              <div className="hidden text-xl text-primary aspect-square w-7 rounded-full md:flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer">
                <ProfileDropDown />
              </div>
            </div>
          </div>
        </header>

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
