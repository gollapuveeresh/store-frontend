import { useEffect, useState } from "react";
import { ShoppingBag, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import { getMyOrdersAPI } from "../api";

const STATUS_ICON = {
  pending: Clock, confirmed: Package, processing: Package,
  shipped: Truck, delivered: CheckCircle, cancelled: XCircle,
};
const STATUS_COLOR = {
  pending: "#f59e0b", confirmed: "#3b82f6", processing: "#8b5cf6",
  shipped: "#06b6d4", delivered: "#10b981", cancelled: "#ef4444",
};

const STEPS = ["Placed", "Confirmed", "Processing", "Shipped", "Delivered"];
const STATUS_MAP = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
  cancelled: -1,
};

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    getMyOrdersAPI()
      .then(({ data }) => setOrders(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="adm-loading"><span className="auth-spinner" style={{ width: 32, height: 32, borderWidth: 3 }} /></div>;

  return (
    <div className="cust-orders">
      <div className="cust-welcome">
        <h1 className="cust-title">My Orders</h1>
        <p className="cust-sub">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
      </div>

      {orders.length === 0 ? (
        <div className="cust-empty glass-panel">
          <ShoppingBag size={48} style={{ color: "var(--text-muted)", marginBottom: 14 }} />
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="cust-orders-list">
          {orders.map((order) => {
            const StatusIcon = STATUS_ICON[order.status] || Clock;
            const isOpen = expanded === order._id;
            return (
              <div key={order._id} className={`cust-order-item glass-panel ${isOpen ? "expanded" : ""}`}>
                {/* Order Header */}
                <div className="cust-order-hdr" onClick={() => setExpanded(isOpen ? null : order._id)}>
                  <div className="cust-order-hdr-left">
                    <div className="cust-order-status-icon" style={{ background: `${STATUS_COLOR[order.status]}22` }}>
                      <StatusIcon size={18} style={{ color: STATUS_COLOR[order.status] }} />
                    </div>
                    <div>
                      <p className="cust-order-id-lg">Order #{order._id.slice(-10).toUpperCase()}</p>
                      <p className="cust-order-date">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                  </div>
                  <div className="cust-order-hdr-right">
                    <span className="cust-order-status-pill" style={{ borderColor: STATUS_COLOR[order.status], color: STATUS_COLOR[order.status] }}>
                      {order.status}
                    </span>
                    <p className="cust-order-amount-lg">₹{order.totalAmount?.toLocaleString("en-IN")}</p>
                    <span className="cust-order-expand">{isOpen ? "▲" : "▼"}</span>
                  </div>
                </div>

                {/* Expanded Items */}
                {isOpen && (() => {
                  const currentStep = STATUS_MAP[order.status] ?? 0;
                  return (
                    <div className="cust-order-body">
                      {order.status === "cancelled" ? (
                        <div className="cust-order-cancelled-banner">
                          This order was cancelled.
                        </div>
                      ) : (
                        <div className="cust-order-timeline-container">
                          <div className="cust-order-timeline">
                            <div className="cust-order-timeline-line" />
                            <div
                              className="cust-order-timeline-line-active"
                              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                            />
                            {STEPS.map((step, idx) => {
                              const isCompleted = idx < currentStep;
                              const isActive = idx === currentStep;
                              return (
                                <div key={step} className="cust-timeline-step">
                                  <div className={`cust-timeline-dot ${isActive ? "active" : isCompleted ? "completed" : ""}`}>
                                    {(isCompleted || isActive) && <div className="cust-timeline-dot-inner" />}
                                  </div>
                                  <span className={`cust-timeline-label ${isActive ? "active" : isCompleted ? "completed" : ""}`}>
                                    {step}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="cust-order-details-layout">
                        <div className="cust-order-items-grid">
                          {order.items.map((item, i) => (
                            <div key={i} className="cust-order-product">
                              {item.image && <img src={item.image} alt={item.name} className="cust-order-prod-img" />}
                              <div className="cust-order-prod-info">
                                <p className="cust-order-prod-name">{item.name}</p>
                                <p className="cust-order-prod-meta">
                                  {item.selectedSize && `Size: ${item.selectedSize}`} · Qty: {item.quantity}
                                </p>
                                <p className="cust-order-prod-price">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="cust-order-summary">
                          <div className="cust-order-summary-row">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal?.toLocaleString("en-IN")}</span>
                          </div>
                          {order.discountAmount > 0 && (
                            <div className="cust-order-summary-row green">
                              <span>Discount ({order.discountPercent}%)</span>
                              <span>-₹{order.discountAmount?.toLocaleString("en-IN")}</span>
                            </div>
                          )}
                          <div className="cust-order-summary-row total">
                            <span>Total</span>
                            <span>₹{order.totalAmount?.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="cust-order-addr">
                            <span>📍 {order.shippingAddress}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomerOrders;
