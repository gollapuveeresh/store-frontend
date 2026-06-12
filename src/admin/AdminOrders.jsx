import { useEffect, useState } from "react";
import { ChevronDown, Search, ShoppingBag } from "lucide-react";
import { getAllOrdersAPI, updateOrderStatusAPI } from "../api";

const STATUS_OPTIONS = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
const STATUS_COLOR = {
  pending: "#f59e0b", confirmed: "#3b82f6", processing: "#8b5cf6",
  shipped: "#06b6d4", delivered: "#10b981", cancelled: "#ef4444",
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    getAllOrdersAPI()
      .then(({ data }) => setOrders(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      const { data } = await updateOrderStatusAPI(orderId, newStatus);
      setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status: data.status } : o));
    } catch { alert("Failed to update status"); }
    finally { setUpdating(null); }
  };

  const filtered = orders.filter((o) => {
    const matchSearch = !search ||
      o.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.email?.toLowerCase().includes(search.toLowerCase()) ||
      o._id.includes(search);
    const matchStatus = !statusFilter || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="adm-orders">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-section-title">Orders</h1>
          <p className="adm-section-sub">{orders.length} total orders</p>
        </div>
      </div>

      <div className="adm-filters glass-panel">
        <div className="adm-search-wrap">
          <Search size={15} className="adm-search-icon" />
          <input className="adm-search" placeholder="Search by customer, email or order ID..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="adm-filter-tabs">
          {["", ...STATUS_OPTIONS].map((s) => (
            <button key={s} className={`adm-filter-tab ${statusFilter === s ? "active" : ""}`}
              onClick={() => setStatusFilter(s)}>
              {s || "All"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="adm-loading"><span className="auth-spinner" style={{ width: 32, height: 32, borderWidth: 3 }} /></div>
      ) : filtered.length === 0 ? (
        <div className="adm-empty">No orders found.</div>
      ) : (
        <div className="adm-orders-table glass-panel">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order._id}>
                  <td><span className="adm-order-id">#{order._id.slice(-8).toUpperCase()}</span></td>
                  <td>
                    <p className="adm-order-cust-name">{order.customer?.name || "—"}</p>
                    <p className="adm-order-cust-email">{order.customer?.email}</p>
                  </td>
                  <td>
                    <div className="adm-order-items-list">
                      {order.items?.map((item, i) => (
                        <div key={i} className="adm-order-item-row">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="adm-order-item-img" />
                          ) : (
                            <div className="adm-order-item-img-placeholder">
                              <ShoppingBag size={14} style={{ color: "var(--text-muted)" }} />
                            </div>
                          )}
                          <div className="adm-order-item-details">
                            <p className="adm-order-item-name" title={item.name}>{item.name}</p>
                            <p className="adm-order-item-meta">
                              {item.selectedSize ? `${item.selectedSize} · ` : ""}Qty: {item.quantity} · ₹{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="adm-order-total">₹{order.totalAmount?.toLocaleString("en-IN")}</span>
                    {order.discountPercent > 0 && (
                      <span className="adm-order-disc">-{order.discountPercent}%</span>
                    )}
                  </td>
                  <td><span className="adm-order-date">{new Date(order.createdAt).toLocaleDateString("en-IN")}</span></td>
                  <td>
                    <div className="adm-status-select-wrap" style={{ borderColor: STATUS_COLOR[order.status] }}>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        disabled={updating === order._id}
                        className="adm-status-select"
                        style={{ color: STATUS_COLOR[order.status] }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} style={{ color: STATUS_COLOR[s] }}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={12} style={{ color: STATUS_COLOR[order.status] }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
