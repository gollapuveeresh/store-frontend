import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, Ticket, ShoppingBag, BadgeCheck } from "lucide-react";
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} from "./cartSlice";
import { useState } from "react";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [coupon, setCoupon] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.toUpperCase() === "STYLE20") {
      setAppliedDiscount(20);
      setCouponSuccess("STYLE20 Applied! 20% discount subtracted.");
      setCouponError("");
    } else {
      setCouponError("Invalid voucher code. Try 'STYLE20'");
      setCouponSuccess("");
    }
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/customer/cart");
    } else {
      navigate("/login?redirect=/customer/cart");
    }
  };

  const discountAmount = (totalAmount * appliedDiscount) / 100;
  const shippingFee = totalAmount > 10000 ? 0 : 500;
  const grandTotal = totalAmount - discountAmount + shippingFee;

  if (checkoutComplete) {
    return (
      <div className="section-container cart-success-panel animate-fade">
        <div className="success-card glass-panel glass-panel-gold">
          <BadgeCheck size={64} className="success-icon" />
          <h2>Order Placed Successfully</h2>
          <p className="success-desc">
            Your premium order is being prepared by our boutique warehouse. An email confirmation has been sent to your VIP account.
          </p>
          <div className="success-details">
            <p>Order ID: <span>{orderId}</span></p>
            <p>Shipment Class: <span>Express VIP Courier</span></p>
            <p>Estimated Delivery: <span>2 - 3 Business Days</span></p>
          </div>
          <Link to="/" className="glow-btn success-home-btn">Return to Storefront</Link>
        </div>
        <style>{`
          .cart-success-panel {
            padding: 80px 20px;
            display: flex;
            justify-content: center;
          }
          .success-card {
            max-width: 550px;
            padding: 50px 30px;
            text-align: center;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(46, 213, 115, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%);
          }
          .success-icon {
            color: #2ed573;
            margin-bottom: 25px;
          }
          .success-card h2 {
            font-size: 2.2rem;
            color: white;
            margin-bottom: 15px;
          }
          .success-desc {
            font-size: 0.95rem;
            color: var(--text-secondary);
            margin-bottom: 30px;
          }
          .success-details {
            background: rgba(255,255,255,0.02);
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            padding: 20px;
            text-align: left;
            margin-bottom: 35px;
          }
          .success-details p {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
          }
          .success-details p:last-child {
            margin-bottom: 0;
          }
          .success-details span {
            color: white;
            font-weight: 600;
          }
          .success-home-btn {
            display: inline-block;
            padding: 12px 30px;
            border-radius: 4px;
            font-size: 0.85rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="section-container cart-page animate-fade">
      <h2 className="section-title">Your Wardrobe Selection</h2>

      {cartItems.length > 0 ? (
        <div className="cart-grid">
          {/* Items List */}
          <div className="cart-items-column">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="cart-item-card glass-panel">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <h4>{item.name}</h4>
                    <button 
                      onClick={() => dispatch(removeFromCart({ id: item.id, selectedSize: item.selectedSize }))}
                      className="cart-delete-btn"
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="cart-item-spec">Color: <span>{item.color}</span> | Size: <span className="item-size-lbl">{item.selectedSize}</span></p>
                  
                  <div className="cart-item-price-row">
                    <p className="cart-item-price">₹{item.price.toLocaleString("en-IN")}</p>
                    
                    {/* Quantity selectors */}
                    <div className="qty-selectors">
                      <button 
                        onClick={() => dispatch(decreaseQuantity({ id: item.id, selectedSize: item.selectedSize }))}
                        className="qty-btn"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-count">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(increaseQuantity({ id: item.id, selectedSize: item.selectedSize }))}
                        className="qty-btn"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/womens-wear" className="continue-shopping-btn">
              <ArrowLeft size={16} /> Continue Browsing Collections
            </Link>
          </div>

          {/* Checkout Summary panel */}
          <div className="cart-summary-column">
            <div className="summary-card glass-panel glass-panel-gold">
              <h3>Cart Summary</h3>
              
              {/* Calculations breakdown */}
              <div className="summary-row">
                <span>Items Subtotal</span>
                <span>₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
              
              {appliedDiscount > 0 && (
                <div className="summary-row discount">
                  <span>Voucher (20% Off)</span>
                  <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span>VIP Shipment Courier</span>
                <span>{shippingFee === 0 ? "Complimentary" : `₹${shippingFee}`}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row grand-total">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>

              {/* Coupon Form */}
              <form className="coupon-form" onSubmit={handleApplyCoupon}>
                <div className="coupon-input-box">
                  <Ticket size={14} className="coupon-icon" />
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. STYLE20)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button type="submit" className="coupon-btn">Apply</button>
                </div>
              </form>

              {couponError && <p className="coupon-msg error">{couponError}</p>}
              {couponSuccess && <p className="coupon-msg success">{couponSuccess}</p>}

              <button className="glow-btn checkout-btn" onClick={handleCheckout}>
                Secure VIP Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart-panel glass-panel animate-slide-up">
          <ShoppingBag size={48} className="empty-cart-icon" />
          <h3>Your shopping cart is currently empty</h3>
          <p>Browse our curated collections to discover luxury styles.</p>
          <div className="empty-ctas" style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Link to="/womens-wear" className="glow-btn" style={{ padding: '12px 25px', borderRadius: '4px', fontSize: '0.8rem' }}>
              Women's Wear
            </Link>
            <Link to="/mens-wear" className="gold-outline-btn" style={{ padding: '12px 25px', borderRadius: '4px', fontSize: '0.8rem' }}>
              Men's Wear
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .cart-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .cart-items-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cart-item-card {
          display: flex;
          padding: 20px;
          border-radius: 12px;
          gap: 20px;
          overflow: hidden;
        }
        .cart-item-image {
          width: 110px;
          height: 140px;
          object-fit: cover;
          border-radius: 6px;
          flex-shrink: 0;
          border: 1px solid var(--glass-border);
        }
        .cart-item-details {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .cart-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .cart-item-header h4 {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          color: white;
          font-weight: 500;
        }
        .cart-delete-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .cart-delete-btn:hover {
          color: var(--accent-red);
        }
        .cart-item-spec {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 5px;
        }
        .cart-item-spec span {
          color: white;
        }
        .item-size-lbl {
          display: inline-block;
          background: rgba(255,255,255,0.06);
          padding: 2px 6px;
          border-radius: 3px;
          font-weight: 600;
        }
        .cart-item-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
        }
        .cart-item-price {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--accent-gold);
        }
        .qty-selectors {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
          border-radius: 4px;
        }
        .qty-btn {
          background: transparent;
          border: none;
          color: white;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .qty-btn:hover {
          background: rgba(255,255,255,0.05);
          color: var(--accent-gold);
        }
        .qty-count {
          padding: 0 10px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .continue-shopping-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--accent-gold);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 10px;
        }
        .continue-shopping-btn:hover {
          color: white;
        }

        /* Summary panel styling */
        .summary-card {
          padding: 30px;
          border-radius: 16px;
        }
        .summary-card h3 {
          font-size: 1.5rem;
          color: white;
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 10px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 15px;
        }
        .summary-row.discount {
          color: #2ed573;
          font-weight: 500;
        }
        .summary-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 20px 0;
        }
        .summary-row.grand-total {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 25px;
        }
        .summary-row.grand-total span:last-child {
          color: var(--accent-gold);
        }
        .coupon-form {
          margin-bottom: 20px;
        }
        .coupon-input-box {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          padding: 4px 6px;
        }
        .coupon-icon {
          color: var(--accent-gold);
          margin: 0 8px;
        }
        .coupon-input-box input {
          background: transparent;
          border: none;
          color: white;
          font-size: 0.8rem;
          width: 100%;
          padding: 8px 0;
        }
        .coupon-input-box input:focus {
          outline: none;
        }
        .coupon-btn {
          background: var(--accent-gold);
          color: #160002;
          border: none;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .coupon-btn:hover {
          background: var(--accent-gold-hover);
        }
        .coupon-msg {
          font-size: 0.75rem;
          margin-top: -12px;
          margin-bottom: 15px;
          font-weight: 600;
        }
        .coupon-msg.error {
          color: var(--accent-red);
        }
        .coupon-msg.success {
          color: #2ed573;
        }
        .checkout-btn {
          width: 100%;
          padding: 14px;
          border-radius: 6px;
          font-size: 0.85rem;
        }

        /* Empty Cart Panel */
        .empty-cart-panel {
          text-align: center;
          padding: 80px 40px;
          border-radius: 16px;
          max-width: 600px;
          margin: 40px auto 0;
        }
        .empty-cart-icon {
          color: var(--accent-gold);
          margin-bottom: 20px;
        }
        .empty-cart-panel h3 {
          font-size: 1.6rem;
          color: white;
          margin-bottom: 10px;
        }

        @media (max-width: 992px) {
          .cart-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 576px) {
          .cart-item-card {
            flex-direction: column;
            gap: 15px;
          }
          .cart-item-image {
            width: 100%;
            height: 180px;
          }
        }
      `}</style>
    </div>
  );
}

export default Cart;
