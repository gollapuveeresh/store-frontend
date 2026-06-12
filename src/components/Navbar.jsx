import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingBag, Heart, User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { logout } from "../features/user/userSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { totalQuantity } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user, isLoggedIn } = useSelector((state) => state.user);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const dashboardPath = user?.role === "admin" ? "/admin" : "/customer";

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-header">
      <nav className="navbar-container glass-panel">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          StyleHub
        </Link>

        {/* Desktop Menu Links */}
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
          <Link to="/mens-wear" className={`nav-link ${isActive("/mens-wear") ? "active" : ""}`}>Men's Wear</Link>
          <Link to="/womens-wear" className={`nav-link ${isActive("/womens-wear") ? "active" : ""}`}>Women's Wear</Link>

          <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>Contact</Link>
        </div>

        {/* Icon Action Bar */}
        <div className="navbar-actions">
          {/* Wishlist Link */}
          <Link to="/" className="navbar-action-btn" title="Wishlist">
            <Heart size={22} />
            {wishlistItems.length > 0 && (
              <span className="badge-pulse badge-wishlist">{wishlistItems.length}</span>
            )}
          </Link>

          {/* Cart Link */}
          <Link to="/cart" className="navbar-action-btn" title="Cart">
            <ShoppingBag size={22} />
            {totalQuantity > 0 && (
              <span className="badge-pulse badge-cart">{totalQuantity}</span>
            )}
          </Link>

          {/* User Profile */}
          <div className="navbar-user-section">
            {isLoggedIn ? (
              <div className="user-profile-badge">
                {user?.profilePic
                  ? <img src={user.profilePic} alt="User Profile" className="user-avatar-small" />
                  : <div className="user-avatar-initials">{user?.name?.[0]}</div>}
                <span className="user-name-tooltip">{user?.name} · {user?.tier}</span>
                <Link to={dashboardPath} className="logout-btn-header" title="Dashboard">
                  <LayoutDashboard size={16} />
                </Link>
                <button className="logout-btn-header" onClick={handleLogout} title="Log Out">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-btn-header" title="Sign In">
                <User size={20} />
              </Link>
            )}
          </div>

          {/* Hamburger Icon */}
          <button className="navbar-menu-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="mobile-drawer glass-panel">
          <Link to="/" className={`mobile-nav-link ${isActive("/") ? "active" : ""}`} onClick={closeMenu}>Home</Link>
          <Link to="/mens-wear" className={`mobile-nav-link ${isActive("/mens-wear") ? "active" : ""}`} onClick={closeMenu}>Men's Wear</Link>
          <Link to="/womens-wear" className={`mobile-nav-link ${isActive("/womens-wear") ? "active" : ""}`} onClick={closeMenu}>Women's Wear</Link>

          <Link to="/contact" className={`mobile-nav-link ${isActive("/contact") ? "active" : ""}`} onClick={closeMenu}>Contact</Link>
          <div className="mobile-auth-row">
            {isLoggedIn ? (
              <div className="mobile-user-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div className="user-avatar-initials">{user?.name?.[0]}</div>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', color: '#fff' }}>{user?.name}</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{user?.tier}</p>
                  </div>
                </div>
                <Link to={dashboardPath} className="mobile-login-btn" onClick={closeMenu} style={{ marginBottom: 8, background: 'rgba(197,168,128,0.15)', color: 'var(--accent-gold)', border: '1px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 6, padding: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '0.8rem' }}>
                  <LayoutDashboard size={14} /> My Dashboard
                </Link>
                <button className="mobile-logout-btn" onClick={() => { handleLogout(); closeMenu(); }}>
                  <LogOut size={14} style={{ marginRight: '6px' }} /> Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="mobile-login-btn" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textDecoration: 'none' }}>
                <User size={14} /> Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Embedded CSS styling for Navbar directly to ensure consistency */}
      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 15px 30px;
          display: flex;
          justify-content: center;
        }
        .navbar-container {
          width: 100%;
          max-width: 1200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 30px;
          border-radius: 50px;
          background: rgba(22, 0, 2, 0.6);
          border: 1px solid var(--glass-border);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .navbar-logo {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: #ffffff;
          background: linear-gradient(45deg, #ffffff 60%, var(--accent-gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        .nav-link {
          font-size: 0.9rem;
          font-weight: 400;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-secondary);
          position: relative;
          padding: 5px 0;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent-gold);
          transition: var(--transition-fast);
        }
        .nav-link:hover {
          color: #fff;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-link.active {
          color: var(--accent-gold);
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .navbar-action-btn {
          position: relative;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          transition: var(--transition-fast);
        }
        .navbar-action-btn:hover {
          color: var(--accent-gold);
          transform: scale(1.08);
        }
        .badge-pulse {
          position: absolute;
          top: -3px;
          right: -3px;
          min-width: 16px;
          height: 16px;
          border-radius: 50%;
          font-size: 0.65rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .badge-cart {
          background: var(--accent-red);
          box-shadow: 0 0 8px var(--accent-red);
        }
        .badge-wishlist {
          background: var(--accent-gold);
          color: #160002;
          box-shadow: 0 0 8px var(--accent-gold);
        }
        .navbar-user-section {
          display: flex;
          align-items: center;
        }
        .user-profile-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          cursor: pointer;
        }
        .user-avatar-small {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--accent-gold);
        }
        .user-avatar-initials {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-red), var(--accent-gold));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          font-size: 0.85rem;
          border: 1px solid var(--accent-gold);
        }
        .user-name-tooltip {
          position: absolute;
          top: 40px;
          right: 0;
          background: rgba(22, 0, 2, 0.95);
          border: 1px solid var(--glass-border-gold);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transform: translateY(10px);
          transition: var(--transition-smooth);
          box-shadow: var(--shadow-premium);
        }
        .user-profile-badge:hover .user-name-tooltip {
          opacity: 1;
          transform: translateY(0);
        }
        .logout-btn-header,
        .login-btn-header {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }
        .logout-btn-header:hover {
          color: var(--accent-red);
        }
        .login-btn-header:hover {
          color: var(--accent-gold);
        }
        .navbar-menu-toggle {
          display: none;
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
        }
        .mobile-drawer {
          display: none;
          position: fixed;
          top: 90px;
          left: 5%;
          width: 90%;
          border-radius: 20px;
          padding: 25px 20px;
          z-index: 999;
          flex-direction: column;
          gap: 15px;
          background: rgba(22, 0, 2, 0.95);
          box-shadow: var(--shadow-premium);
          border: 1px solid var(--glass-border-gold);
          animation: slideUp 0.3s ease;
        }
        .mobile-nav-link {
          font-size: 1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: block;
        }
        .mobile-nav-link.active {
          color: var(--accent-gold);
        }
        .mobile-auth-row {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .mobile-login-btn,
        .mobile-logout-btn {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-login-btn {
          background: var(--accent-gold);
          color: #160002;
          border: none;
        }
        .mobile-logout-btn {
          background: transparent;
          color: var(--accent-red);
          border: 1px solid var(--accent-red);
        }

        @media (max-width: 992px) {
          .navbar-links {
            display: none;
          }
          .navbar-menu-toggle {
            display: block;
          }
          .mobile-drawer {
            display: flex;
          }
        }
        @media (max-width: 768px) {
          .navbar-header {
            padding: 10px 15px;
          }
          .navbar-container {
            padding: 10px 20px;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;
