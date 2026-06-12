import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Plus, Minus, ShoppingBag, CheckCircle } from "lucide-react";

import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../features/cart/cartSlice";
import { placeOrderAPI } from "../api";

function CustomerCart() {
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((s) => s.cart);
  const { user } = useSelector((s) => s.user);
  const [address, setAddress] = useState(user?.address || "");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const discount = user?.discount || 0;
  const discountAmount = +(totalAmount * (discount / 100)).toFixed(2);
  const finalTotal = +(totalAmount - discountAmount).toFixed(2);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    if (!address.trim()) { setError("Please enter a delivery address"); return; }
    setOrdering(true);
    setError("");
    try {
      const items = cartItems.map((item) => ({
        product: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
      }));
      await placeOrderAPI({ items, shippingAddress: address, paymentMethod });
      dispatch(clearCart());
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Order failed. Please try again.");
    } finally { setOrdering(false); }
  };

  if (success) {
    return (
      <div className="cust-cart-success">
        <CheckCircle size={64} style={{ color: "#10b981" }} />
        <h2>Order Placed Successfully!</h2>
        <p>Your order has been confirmed. You'll receive updates as it progresses.</p>
        <a href="/customer/orders" className="glow-btn" style={{ padding: "12px 28px", borderRadius: 8, display: "inline-block", marginTop: 20 }}>
          View My Orders
        </a>
      </div>
    );
  }

  return (
    <div className="cust-cart">
      <div className="cust-welcome">
        <h1 className="cust-title">My Cart</h1>
        <p className="cust-sub">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cust-empty glass-panel">
          <ShoppingBag size={48} style={{ color: "var(--text-muted)", marginBottom: 14 }} />
          <p>Your cart is empty.</p>
          <a href="/mens-wear" className="glow-btn" style={{ padding: "10px 24px", borderRadius: 8, display: "inline-block", marginTop: 16 }}>
            Browse Collections
          </a>
        </div>
      ) : (
        <div className="cust-cart-layout">
          {/* Cart Items */}
          <div className="cust-cart-items">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="cust-cart-item glass-panel">
                <div className="cust-cart-item-img">
                  {item.image
                    ? <img src={item.image} alt={item.name} />
                    : <div className="cust-cart-item-img-placeholder"><ShoppingBag size={24} /></div>
                  }
                </div>
                <div className="cust-cart-item-info">
                  <p className="cust-cart-item-name">{item.name}</p>
                  {item.selectedSize && <p className="cust-cart-item-size">Size: {item.selectedSize}</p>}
                  <p className="cust-cart-item-price">₹{item.price?.toLocaleString("en-IN")}</p>
                </div>
                <div className="cust-cart-item-actions">
                  <div className="cust-qty-ctrl">
                    <button onClick={() => dispatch(decreaseQuantity({ id: item.id, selectedSize: item.selectedSize }))}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity({ id: item.id, selectedSize: item.selectedSize }))}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="cust-cart-item-subtotal">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  <button className="cust-cart-remove" onClick={() => dispatch(removeFromCart({ id: item.id, selectedSize: item.selectedSize }))}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Panel */}
          <div className="cust-checkout-panel">
            <div className="cust-order-summary-card glass-panel">
              <h3 className="adm-card-title">Order Summary</h3>
              <div className="cust-summary-rows">
                <div className="cust-summary-row"><span>Subtotal</span><span>₹{totalAmount.toLocaleString("en-IN")}</span></div>
                {discount > 0 && (
                  <div className="cust-summary-row green">
                    <span>Loyalty Discount ({discount}%)</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="cust-summary-row total"><span>Total</span><span>₹{finalTotal.toLocaleString("en-IN")}</span></div>
              </div>

              <div className="cust-form-group">
                <label>Delivery Address *</label>
                <textarea rows={3} placeholder="Enter full delivery address..." value={address}
                  onChange={(e) => setAddress(e.target.value)} className="cust-textarea" />
              </div>

              <div className="cust-form-group">
                <label>Payment Method</label>
                <div className="cust-payment-opts">
                  {["COD", "card", "upi"].map((m) => (
                    <button key={m} type="button"
                      className={`cust-pay-opt ${paymentMethod === m ? "selected" : ""}`}
                      onClick={() => setPaymentMethod(m)}>
                      {m === "COD" ? "Cash on Delivery" : m === "card" ? "Card" : "UPI"}
                    </button>
                  ))}
                </div>
              </div>

              {error && <div className="adm-modal-err">{error}</div>}

              <button className="cust-place-order glow-btn" onClick={handleCheckout} disabled={ordering}>
                {ordering ? <span className="auth-spinner" /> : `Place Order · ₹${finalTotal.toLocaleString("en-IN")}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerCart;
