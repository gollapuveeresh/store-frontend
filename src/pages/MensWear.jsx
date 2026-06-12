import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryFilter, searchProducts, filterProducts, fetchProductsFromAPI } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

function MensWear() {
  const dispatch = useDispatch();
  const { filteredItems, loading } = useSelector((state) => state.products);
  const [localSearch, setLocalSearch] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // Fetch live products from DB and filter to men's category
  useEffect(() => {
    dispatch(fetchProductsFromAPI()).then(() => {
      dispatch(categoryFilter("men"));
    });
    dispatch(searchProducts(""));
    setLocalSearch("");
    dispatch(filterProducts("default"));
    setSortOption("default");
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setLocalSearch(val);
    dispatch(searchProducts(val));
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortOption(val);
    dispatch(filterProducts(val));
  };

  return (
    <div className="collection-page animate-fade">
      {/* Category Banner Header */}
      <div className="collection-banner men-theme">
        <div className="collection-banner-text">
          <h1>Men's Tailored Luxury</h1>
          <p>Impeccable silhouettes, hand-finished tailoring, and high-performance technical fabrics for the modern gentleman.</p>
        </div>
      </div>

      <div className="section-container">
        {/* Filter / Search Bar controls */}
        <div className="collection-controls-panel glass-panel">
          {/* Search box */}
          <div className="search-box-wrapper">
            <Search size={16} className="search-icon-svg" />
            <input
              type="text"
              placeholder="Search Men's collection..."
              value={localSearch}
              onChange={handleSearchChange}
              className="collection-search-input"
            />
          </div>

          {/* Sort dropdown */}
          <div className="sort-box-wrapper">
            <SlidersHorizontal size={16} className="sort-icon-svg" />
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="collection-sort-select"
            >
              <option value="default">Default Sorting</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <span className="reg-spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="products-grid-list animate-slide-up">
            {filteredItems.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-catalog-fallback glass-panel animate-fade">
            <h3>No garments match your search</h3>
            <p>Try refining your spelling or look for different keywords.</p>
            <button
              className="glow-btn"
              onClick={() => {
                setLocalSearch("");
                dispatch(searchProducts(""));
              }}
              style={{ marginTop: '15px', padding: '10px 20px', borderRadius: '4px', fontSize: '0.8rem' }}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      <style>{`
        .collection-page {
          padding-bottom: 80px;
        }
        .collection-banner {
          height: 250px;
          display: flex;
          align-items: center;
          padding: 0 10%;
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: 40px;
          background: linear-gradient(rgba(22, 0, 2, 0.65), rgba(22, 0, 2, 0.85));
          background-size: cover;
          background-position: center;
        }
        .collection-banner.men-theme {
          background-image: linear-gradient(rgba(22, 0, 2, 0.7), rgba(22, 0, 2, 0.9)), url('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&auto=format&fit=crop&q=80');
        }
        .collection-banner-text h1 {
          font-size: 3rem;
          color: white;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          background: linear-gradient(45deg, #ffffff 60%, var(--accent-gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .collection-banner-text p {
          max-width: 600px;
          font-size: 1rem;
        }
        .collection-controls-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 30px;
          border-radius: 10px;
          margin-bottom: 40px;
          gap: 20px;
        }
        .search-box-wrapper,
        .sort-box-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-box-wrapper {
          flex-grow: 1;
          max-width: 450px;
        }
        .search-icon-svg,
        .sort-icon-svg {
          position: absolute;
          left: 15px;
          color: var(--text-muted);
        }
        .collection-search-input {
          width: 100%;
          padding: 10px 15px 10px 45px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          color: white;
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }
        .collection-search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--accent-red);
        }
        .collection-sort-select {
          padding: 10px 15px 10px 45px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition-fast);
          appearance: none;
          min-width: 200px;
        }
        .collection-sort-select:focus {
          outline: none;
          border-color: var(--accent-red);
        }
        .collection-sort-select option {
          background: #160002;
          color: white;
        }
        .products-grid-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 30px;
        }
        .empty-catalog-fallback {
          text-align: center;
          padding: 60px 40px;
          border-radius: 16px;
        }
        .empty-catalog-fallback h3 {
          font-size: 1.5rem;
          color: var(--accent-gold);
          margin-bottom: 10px;
        }

        @media (max-width: 768px) {
          .collection-banner {
            height: 200px;
            padding: 0 5%;
          }
          .collection-banner-text h1 {
            font-size: 2rem;
          }
          .collection-controls-panel {
            flex-direction: column;
            align-items: stretch;
            padding: 15px;
          }
          .search-box-wrapper {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default MensWear;
