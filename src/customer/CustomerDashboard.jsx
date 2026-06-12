import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Crown, Package } from "lucide-react";
import { getMyOrdersAPI } from "../api";

const TIER_COLOR = {
  Silver: "#94a3b8", Gold: "#f59e0b", Platinum: "#8b5cf6", "VIP Platinum Elite": "#c5a880",
};
const STATUS_COLOR = {
  pending: "#f59e0b", confirmed: "#3b82f6", processing: "#8b5cf6",
  shipped: "#06b6d4", delivered: "#10b981", cancelled: "#ef4444",
};

function CustomerDashboard() {
  const { user } = useSelector((s) => s.user);
  const { cartItems, totalAmount } = useSelector((s) => s.cart);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrdersAPI()
      .then(({ data }) => setOrders(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const totalSpent = orders.filter(o => o.status !== "cancelled")
    .reduce((s, o) => s + o.totalAmount, 0);

  return (
    <div className="cust-dashboard">
      <div className="cust-welcome">
        <h1 className="cust-title">Welcome back, {user?.name?.split(" ")[0]}!</h1>
        <p className="cust-sub">Here's your StyleHub summary.</p>
      </div>

      {/* Stats */}
      <div className="cust-stats-grid">
        <div className="cust-stat glass-panel">
          <ShoppingBag size={20} className="cust-stat-icon" style={{ color: "#d90429" }} />
          <div>
            <p className="cust-stat-label">Total Orders</p>
            <p className="cust-stat-value">{orders.length}</p>
          </div>
        </div>
        <div className="cust-stat glass-panel">
          <Package size={20} className="cust-stat-icon" style={{ color: "#8b5cf6" }} />
          <div>
            <p className="cust-stat-label">Total Spent</p>
            <p className="cust-stat-value">₹{totalSpent.toLocaleString("en-IN")}</p>
          </div>
        </div>
        <div className="cust-stat glass-panel">
          <ShoppingCart size={20} className="cust-stat-icon" style={{ color: "#06b6d4" }} />
          <div>
            <p className="cust-stat-label">Cart Items</p>
            <p className="cust-stat-value">{cartItems.length}</p>
          </div>
        </div>
        <div className="cust-stat glass-panel" style={{ background: `linear-gradient(135deg, rgba(197,168,128,0.1), rgba(217,4,41,0.05))`, borderColor: "rgba(197,168,128,0.25)" }}>
          <Crown size={20} className="cust-stat-icon" style={{ color: TIER_COLOR[user?.tier] }} />
          <div>
            <p className="cust-stat-label">Loyalty Tier</p>
            <p className="cust-stat-value" style={{ fontSize: "0.95rem", color: TIER_COLOR[user?.tier] }}>{user?.tier}</p>
          </div>
        </div>
      </div>

      {/* Discount Banner */}
      {user?.discount > 0 && (
        <div className="cust-discount-banner glass-panel">
          <span className="cust-disc-tag">🎁 Active Discount</span>
          <p>You have a <strong>{user.discount}%</strong> loyalty discount applied to all your orders!</p>
          <Link to="/customer/cart" className="cust-disc-cta glow-btn">Shop Now</Link>
        </div>
      )}

      {/* Recent Orders */}
      <div className="cust-recent-section">
        <div className="cust-section-hdr">
          <h2 className="cust-section-title">Recent Orders</h2>
          <Link to="/customer/orders" className="cust-view-all">View all →</Link>
        </div>
        {loading ? (
          <div className="adm-loading"><span className="auth-spinner" style={{ width: 24, height: 24, borderWidth: 2 }} /></div>
        ) : orders.length === 0 ? (
          <div className="cust-empty glass-panel">
            <ShoppingBag size={40} style={{ color: "var(--text-muted)", marginBottom: 12 }} />
            <p>No orders yet.</p>
            <Link to="/mens-wear" className="glow-btn" style={{ padding: "10px 20px", borderRadius: 8, display: "inline-block", marginTop: 12 }}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cust-order-list">
            {orders.slice(0, 3).map((order) => (
              <div key={order._id} className="cust-order-card glass-panel">
                <div className="cust-order-left">
                  <p className="cust-order-id">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="cust-order-date">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  <p className="cust-order-items">{order.items?.length} item{order.items?.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="cust-order-right">
                  <span className="cust-order-status" style={{ borderColor: STATUS_COLOR[order.status], color: STATUS_COLOR[order.status] }}>
                    {order.status}
                  </span>
                  <p className="cust-order-amount">₹{order.totalAmount?.toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;
