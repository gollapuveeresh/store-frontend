import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [addedPopup, setAddedPopup] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: product.color,
        selectedSize: selectedSize
      })
    );

    setAddedPopup(true);
    setTimeout(() => setAddedPopup(false), 2000);
  };

  return (
    <div className="product-card-wrapper glass-panel glass-panel-hover">
      {/* Product Image Area */}
      <div className="product-image-box">
        <img src={product.image} alt={product.name} className="product-img" />
        
        {/* Wishlist Button */}
        <button
          className={`wishlist-toggle-btn ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlist}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={16} fill={isWishlisted ? "var(--accent-red)" : "none"} />
        </button>

        {/* Stock status badge */}
        {!product.inStock && (
          <div className="out-of-stock-overlay">
            <span>Sold Out</span>
          </div>
        )}

        {/* Success added popup overlay */}
        {addedPopup && (
          <div className="added-popup-overlay">
            <Check size={20} style={{ marginBottom: '5px' }} />
            <span>Added to Cart</span>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="product-details-box">
        <div className="product-meta-row">
          <span className="product-color-lbl">{product.color}</span>
          <span className="product-rating-lbl">★ {product.rating.toFixed(1)}</span>
        </div>
        
        <h4 className="product-name-title">{product.name}</h4>
        
        <p className="product-price-lbl">₹{product.price.toLocaleString("en-IN")}</p>

        {/* Size Selection Grid */}
        <div className="size-selector-panel">
          <p className={`size-title ${sizeError ? "error" : ""}`}>
            {sizeError ? "Select Size first" : "Select Size"}
          </p>
          <div className="size-tags-grid">
            {product.sizes.map((size) => (
              <button
                key={size}
                disabled={!product.inStock}
                className={`size-tag-btn ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Purchase Action Button */}
        <button
          className="product-purchase-btn glow-btn"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} style={{ marginRight: '8px' }} />
          {product.inStock ? "Add To Cart" : "Out of Stock"}
        </button>
      </div>

      <style>{`
        .product-card-wrapper {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-radius: 14px;
        }
        .product-image-box {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          background: rgba(22, 0, 2, 0.4);
        }
        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }
        .product-card-wrapper:hover .product-img {
          transform: scale(1.05);
        }
        .wishlist-toggle-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(22, 0, 2, 0.6);
          border: 1px solid var(--glass-border);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
          z-index: 5;
        }
        .wishlist-toggle-btn:hover {
          background: rgba(22, 0, 2, 0.8);
          transform: scale(1.1);
        }
        .wishlist-toggle-btn.active {
          color: var(--accent-red);
          border-color: rgba(217, 4, 41, 0.4);
          background: rgba(22, 0, 2, 0.8);
        }
        .out-of-stock-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(22, 0, 2, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
        .out-of-stock-overlay span {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 8px 20px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8rem;
          border-radius: 4px;
        }
        .added-popup-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(46, 213, 115, 0.25);
          backdrop-filter: blur(5px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #2ed573;
          font-weight: 600;
          font-size: 0.95rem;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
          z-index: 10;
          animation: fadeIn 0.3s ease;
        }
        .product-details-box {
          padding: 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .product-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .product-rating-lbl {
          color: var(--accent-gold);
          font-weight: 600;
        }
        .product-name-title {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          color: white;
          margin-bottom: 6px;
          font-weight: 500;
          min-height: 48px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-price-lbl {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--accent-gold);
          margin-bottom: 15px;
        }
        .size-selector-panel {
          margin-bottom: 20px;
        }
        .size-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }
        .size-title.error {
          color: var(--accent-red);
          font-weight: 600;
        }
        .size-tags-grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .size-tag-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .size-tag-btn:hover:not(:disabled) {
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.06);
        }
        .size-tag-btn.selected {
          background: white;
          color: #160002;
          border-color: white;
        }
        .size-tag-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .product-purchase-btn {
          width: 100%;
          padding: 12px;
          font-size: 0.8rem;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-purchase-btn:disabled {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          border: 1px solid var(--glass-border);
          box-shadow: none;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default ProductCard;
