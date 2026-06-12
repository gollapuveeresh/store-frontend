import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save, Search, Tag } from "lucide-react";
import {
  getProductsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "../api";

const EMPTY_FORM = {
  name: "", description: "", price: "", category: "mens",
  images: "", sizes: [], stock: "", discount: "0", featured: false,
};

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];
const CATEGORY_OPTIONS = ["mens", "womens", "accessories", "unisex"];

function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(
    product
      ? { ...product, images: product.images?.[0] || "", sizes: product.sizes || [] }
      : EMPTY_FORM
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const toggleSize = (size) => {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter((s) => s !== size) : [...f.sizes, size],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) { setErr("Name and price are required"); return; }
    setSaving(true);
    try {
      const payload = { ...form, images: form.images ? [form.images] : [], price: +form.price, stock: +form.stock, discount: +form.discount };
      const { data } = product ? await updateProductAPI(product._id, payload) : await createProductAPI(payload);
      onSave(data, !!product);
    } catch (ex) {
      setErr(ex.response?.data?.message || "Failed to save");
    } finally { setSaving(false); }
  };

  return (
    <div className="adm-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal glass-panel">
        <div className="adm-modal-header">
          <h2>{product ? "Edit Product" : "Add New Product"}</h2>
          <button className="adm-modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        {err && <div className="adm-modal-err">{err}</div>}
        <form onSubmit={handleSubmit} className="adm-prod-form">
          <div className="adm-form-row">
            <div className="adm-form-group">
              <label>Product Name *</label>
              <input name="name" value={form.name} onChange={handle} placeholder="e.g. Cashmere Blazer" required />
            </div>
            <div className="adm-form-group">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handle}>
                {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div className="adm-form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handle} rows={3} placeholder="Product description..." />
          </div>
          <div className="adm-form-group">
            <label>Image URL</label>
            <input name="images" value={form.images} onChange={handle} placeholder="https://..." />
            {form.images && <img src={form.images} alt="preview" className="adm-img-preview" />}
          </div>
          <div className="adm-form-row">
            <div className="adm-form-group">
              <label>Price (₹) *</label>
              <input type="number" name="price" value={form.price} onChange={handle} min="0" required />
            </div>
            <div className="adm-form-group">
              <label>Stock</label>
              <input type="number" name="stock" value={form.stock} onChange={handle} min="0" />
            </div>
            <div className="adm-form-group">
              <label>Discount (%)</label>
              <input type="number" name="discount" value={form.discount} onChange={handle} min="0" max="100" />
            </div>
          </div>
          <div className="adm-form-group">
            <label>Sizes</label>
            <div className="adm-size-picker">
              {SIZE_OPTIONS.map((s) => (
                <button key={s} type="button"
                  className={`adm-size-chip ${form.sizes.includes(s) ? "selected" : ""}`}
                  onClick={() => toggleSize(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="adm-form-check">
            <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handle} />
            <label htmlFor="featured">Mark as Featured Product</label>
          </div>
          <div className="adm-modal-actions">
            <button type="button" className="adm-btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="adm-btn-primary glow-btn" disabled={saving}>
              <Save size={16} /> {saving ? "Saving..." : product ? "Update" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    const params = {};
    if (catFilter) params.category = catFilter;
    if (search) params.search = search;
    try {
      const { data } = await getProductsAPI(params);
      setProducts(data);
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, [catFilter, search]);

  const handleSave = (savedProduct, isUpdate) => {
    if (isUpdate) setProducts((p) => p.map((x) => x._id === savedProduct._id ? savedProduct : x));
    else setProducts((p) => [savedProduct, ...p]);
    setShowModal(false);
    setEditProduct(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await deleteProductAPI(id);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch { alert("Failed to delete"); }
    finally { setDeleting(null); }
  };

  return (
    <div className="adm-products">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-section-title">Products</h1>
          <p className="adm-section-sub">{products.length} items in inventory</p>
        </div>
        <button className="adm-btn-primary glow-btn" onClick={() => { setEditProduct(null); setShowModal(true); }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="adm-filters glass-panel">
        <div className="adm-search-wrap">
          <Search size={15} className="adm-search-icon" />
          <input className="adm-search" placeholder="Search products..." value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="adm-filter-tabs">
          {["", ...CATEGORY_OPTIONS].map((c) => (
            <button key={c} className={`adm-filter-tab ${catFilter === c ? "active" : ""}`}
              onClick={() => setCatFilter(c)}>
              {c ? c.charAt(0).toUpperCase() + c.slice(1) : "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="adm-loading"><span className="auth-spinner" style={{ width: 32, height: 32, borderWidth: 3 }} /></div>
      ) : products.length === 0 ? (
        <div className="adm-empty">No products found. <button onClick={() => { setEditProduct(null); setShowModal(true); }}>Add one?</button></div>
      ) : (
        <div className="adm-prod-grid">
          {products.map((p) => (
            <div key={p._id} className="adm-prod-card glass-panel">
              <div className="adm-prod-img">
                {p.images?.[0]
                  ? <img src={p.images[0]} alt={p.name} />
                  : <div className="adm-prod-img-placeholder"><Tag size={24} /></div>}
                {p.discount > 0 && <span className="adm-prod-badge">{p.discount}% OFF</span>}
                {p.featured && <span className="adm-prod-featured">★ Featured</span>}
              </div>
              <div className="adm-prod-info">
                <span className="adm-prod-cat">{p.category}</span>
                <h3 className="adm-prod-name">{p.name}</h3>
                <div className="adm-prod-meta">
                  <span className="adm-prod-price">₹{p.price?.toLocaleString("en-IN")}</span>
                  <span className="adm-prod-stock" style={{ color: p.stock > 0 ? "#10b981" : "#ef4444" }}>
                    {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                  </span>
                </div>
                <div className="adm-prod-actions">
                  <button className="adm-btn-icon" onClick={() => { setEditProduct(p); setShowModal(true); }}>
                    <Pencil size={15} /> Edit
                  </button>
                  <button className="adm-btn-icon danger" onClick={() => handleDelete(p._id)} disabled={deleting === p._id}>
                    <Trash2 size={15} /> {deleting === p._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => { setShowModal(false); setEditProduct(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default AdminProducts;
