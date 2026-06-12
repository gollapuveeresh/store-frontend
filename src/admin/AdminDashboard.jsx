import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, Clock } from "lucide-react";
import { getAdminStatsAPI } from "../api";

const STATUS_COLOR = {
  pending: "#f59e0b",
  confirmed: "#3b82f6",
  processing: "#8b5cf6",
  shipped: "#06b6d4",
  delivered: "#10b981",
  cancelled: "#ef4444",
};

function StatCard({ icon: Icon, label, value, color, suffix }) {
  return (
    <div className="adm-stat-card glass-panel">
      <div className="adm-stat-icon" style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div className="adm-stat-info">
        <p className="adm-stat-label">{label}</p>
        <p className="adm-stat-value">
          {suffix && <span className="adm-stat-suffix">{suffix}</span>}
          {typeof value === "number" ? value.toLocaleString("en-IN") : value}
        </p>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminStatsAPI()
      .then(({ data }) => setStats(data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load stats"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="adm-loading"><span className="auth-spinner" style={{ width: 32, height: 32, borderWidth: 3 }} /></div>;
  if (error) return <div className="adm-err-msg">{error} — <button onClick={() => window.location.reload()}>Retry</button></div>;

  return (
    <div className="adm-dashboard">
      <div className="adm-section-header">
        <h1 className="adm-section-title">Dashboard Overview</h1>
        <p className="adm-section-sub">Welcome back! Here's what's happening.</p>
      </div>

      <div className="adm-stats-grid">
        <StatCard icon={DollarSign} label="Total Revenue" value={stats.totalRevenue} suffix="₹" color="#c5a880" />
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats.totalOrders} color="#d90429" />
        <StatCard icon={Package} label="Total Products" value={stats.totalProducts} color="#8b5cf6" />
        <StatCard icon={Users} label="Customers" value={stats.totalCustomers} color="#06b6d4" />
      </div>

      <div className="adm-dash-grid">
        {/* Quick actions */}
        <div className="adm-quick-actions glass-panel">
          <h3 className="adm-card-title"><TrendingUp size={16} /> Quick Actions</h3>
          <div className="adm-actions-list">
            <Link to="/admin/products" className="adm-action-btn">
              <Package size={16} /> Add New Product
            </Link>
            <Link to="/admin/orders" className="adm-action-btn">
              <ShoppingBag size={16} /> Manage Orders
            </Link>
            <Link to="/admin/customers" className="adm-action-btn">
              <Users size={16} /> Manage Customers
            </Link>
          </div>
        </div>

        {/* Recent orders */}
        {stats.recentOrders?.length > 0 && (
          <div className="adm-recent glass-panel">
            <h3 className="adm-card-title"><Clock size={16} /> Recent Orders</h3>
            <div className="adm-recent-list">
              {stats.recentOrders.map((order) => (
                <div key={order._id} className="adm-recent-item">
                  <div className="adm-recent-info">
                    <p className="adm-recent-name">{order.customer?.name || "Customer"}</p>
                    <p className="adm-recent-email">{order.customer?.email}</p>
                  </div>
                  <div className="adm-recent-right">
                    <span className="adm-order-status" style={{ borderColor: STATUS_COLOR[order.status], color: STATUS_COLOR[order.status] }}>
                      {order.status}
                    </span>
                    <p className="adm-recent-amount">₹{order.totalAmount?.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/admin/orders" className="adm-view-all">View all orders →</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
