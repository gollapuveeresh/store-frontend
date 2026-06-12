import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard, Package, ShoppingBag, Users, LogOut,
  Menu, X, Sparkles, ChevronRight
} from "lucide-react";
import { logout } from "../features/user/userSlice";
import "../styles/Admin.css";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { to: "/admin/customers", icon: Users, label: "Customers" },
];

function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.user);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="adm-shell">
      {/* Sidebar */}
      <aside className={`adm-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="adm-sidebar-header">
          <div className="adm-brand">
            <Sparkles size={20} className="adm-brand-icon" />
            {sidebarOpen && <span>StyleHub</span>}
          </div>
          <button className="adm-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {sidebarOpen && (
          <div className="adm-profile">
            <div className="adm-avatar">{user?.name?.[0] || "A"}</div>
            <div>
              <p className="adm-profile-name">{user?.name}</p>
              <p className="adm-profile-role">Administrator</p>
            </div>
          </div>
        )}

        <nav className="adm-nav">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `adm-nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={18} className="adm-nav-icon" />
              {sidebarOpen && <span>{label}</span>}
              {sidebarOpen && <ChevronRight size={14} className="adm-nav-chevron" />}
            </NavLink>
          ))}
        </nav>

        <button className="adm-logout" onClick={handleLogout}>
          <LogOut size={18} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* Main content */}
      <main className="adm-main">
        <header className="adm-topbar">
          <h2 className="adm-page-title">Admin Panel</h2>
          <div className="adm-topbar-right">
            <span className="adm-badge">Admin</span>
            <span className="adm-topbar-name">{user?.name}</span>
          </div>
        </header>
        <div className="adm-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
