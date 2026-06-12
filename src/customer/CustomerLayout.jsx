import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LayoutDashboard, ShoppingBag, ShoppingCart, User, LogOut, Sparkles, Store, ChevronRight, ArrowBigLeftIcon } from "lucide-react";
import { logout } from "../features/user/userSlice";
import "../styles/Customer.css";

const navItems = [
  { to: "/customer", icon: LayoutDashboard, label: "My Dashboard", end: true },
  { to: "/customer/orders", icon: ShoppingBag, label: "My Orders" },
  { to: "/customer/cart", icon: ShoppingCart, label: "Cart" },
  { to: "/customer/profile", icon: User, label: "Profile" },
];

const TIER_COLOR = {
  Silver: "#94a3b8", Gold: "#f59e0b", Platinum: "#8b5cf6", "VIP Platinum Elite": "#c5a880",
};

function CustomerLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="cust-shell">
      {/* Sidebar */}
      <aside className="cust-sidebar">
        <div className="cust-sidebar-header">
          <NavLink to="/" className="cust-brand">
            <ArrowBigLeftIcon />
            <Sparkles size={20} />
            <span>StyleHub</span>
          </NavLink>
        </div>

        <div className="cust-profile-card">
          <div className="cust-avatar-wrap">
            {user?.profilePic
              ? <img src={user.profilePic} alt={user.name} className="cust-avatar-img" />
              : <div className="cust-avatar">{user?.name?.[0] || "C"}</div>
            }
          </div>
          <div className="cust-profile-text">
            <p className="cust-profile-name">{user?.name}</p>
            <span className="cust-tier-badge" style={{ color: TIER_COLOR[user?.tier], borderColor: TIER_COLOR[user?.tier] }}>
              ✦ {user?.tier}
            </span>
            {user?.discount > 0 && (
              <p className="cust-discount-note">{user.discount}% loyalty discount active</p>
            )}
          </div>
        </div>

        <nav className="cust-nav">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => `cust-nav-item ${isActive ? "active" : ""}`}>
              <Icon size={18} className="cust-nav-icon" />
              <span>{label}</span>
              <ChevronRight size={14} className="cust-nav-chevron" />
            </NavLink>
          ))}
          <NavLink to="/" className="cust-nav-item store-link">
            <Store size={18} className="cust-nav-icon" />
            <span>Back to Shop</span>
            <ChevronRight size={14} className="cust-nav-chevron" />
          </NavLink>
        </nav>

        <button className="cust-logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main */}
      <main className="cust-main">
        <div className="cust-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default CustomerLayout;
