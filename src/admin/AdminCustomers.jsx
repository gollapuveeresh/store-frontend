import { useEffect, useState } from "react";
import { Search, Tag, Trash2, Crown } from "lucide-react";
import { getAllCustomersAPI, updateCustomerDiscountAPI, deleteCustomerAPI } from "../api";

const TIER_OPTIONS = ["Silver", "Gold", "Platinum", "VIP Platinum Elite"];
const TIER_COLOR = {
  Silver: "#94a3b8", Gold: "#f59e0b", Platinum: "#8b5cf6", "VIP Platinum Elite": "#c5a880",
};

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null); // customer being edited
  const [discountForm, setDiscountForm] = useState({ discount: 0, tier: "Silver" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    getAllCustomersAPI()
      .then(({ data }) => setCustomers(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const openDiscount = (customer) => {
    setSelected(customer);
    setDiscountForm({ discount: customer.discount || 0, tier: customer.tier || "Silver" });
  };

  const saveDiscount = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const { data } = await updateCustomerDiscountAPI(selected._id, discountForm);
      setCustomers((prev) => prev.map((c) => c._id === selected._id ? data.user : c));
      setSelected(null);
    } catch { alert("Failed to update"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this customer? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await deleteCustomerAPI(id);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch { alert("Failed to delete"); }
    finally { setDeleting(null); }
  };

  const filtered = customers.filter((c) =>
    !search ||
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adm-customers">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-section-title">Customers</h1>
          <p className="adm-section-sub">{customers.length} registered customers</p>
        </div>
      </div>

      <div className="adm-filters glass-panel">
        <div className="adm-search-wrap">
          <Search size={15} className="adm-search-icon" />
          <input className="adm-search" placeholder="Search by name or email..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="adm-loading"><span className="auth-spinner" style={{ width: 32, height: 32, borderWidth: 3 }} /></div>
      ) : filtered.length === 0 ? (
        <div className="adm-empty">No customers found.</div>
      ) : (
        <div className="adm-cust-table glass-panel">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Tier</th>
                <th>Discount</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c._id}>
                  <td>
                    <div className="adm-cust-profile">
                      <div className="adm-cust-avatar">{c.name?.[0] || "?"}</div>
                      <div>
                        <p className="adm-order-cust-name">{c.name}</p>
                        <p className="adm-order-cust-email">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="adm-order-date">{c.phone || "—"}</span></td>
                  <td>
                    <span className="adm-tier-badge" style={{ borderColor: TIER_COLOR[c.tier], color: TIER_COLOR[c.tier] }}>
                      <Crown size={11} /> {c.tier}
                    </span>
                  </td>
                  <td>
                    <span className="adm-discount-val">{c.discount || 0}%</span>
                  </td>
                  <td><span className="adm-order-date">{new Date(c.createdAt).toLocaleDateString("en-IN")}</span></td>
                  <td>
                    <div className="adm-cust-actions">
                      <button className="adm-btn-icon" onClick={() => openDiscount(c)}>
                        <Tag size={14} /> Discount
                      </button>
                      <button className="adm-btn-icon danger" onClick={() => handleDelete(c._id)} disabled={deleting === c._id}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Discount Modal */}
      {selected && (
        <div className="adm-modal-overlay" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          <div className="adm-modal glass-panel" style={{ maxWidth: 420 }}>
            <div className="adm-modal-header">
              <h2>Manage Customer</h2>
              <button className="adm-modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="adm-cust-modal-info">
              <div className="adm-cust-avatar large">{selected.name?.[0]}</div>
              <div>
                <p style={{ color: "white", fontWeight: 600 }}>{selected.name}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{selected.email}</p>
              </div>
            </div>
            <div className="adm-prod-form">
              <div className="adm-form-group">
                <label>Loyalty Tier</label>
                <select value={discountForm.tier} onChange={(e) => setDiscountForm((f) => ({ ...f, tier: e.target.value }))}>
                  {TIER_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="adm-form-group">
                <label>Discount % (0–100)</label>
                <input type="number" min="0" max="100" value={discountForm.discount}
                  onChange={(e) => setDiscountForm((f) => ({ ...f, discount: +e.target.value }))} />
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
                  This discount will be automatically applied at checkout.
                </p>
              </div>
              <div className="adm-modal-actions">
                <button className="adm-btn-outline" onClick={() => setSelected(null)}>Cancel</button>
                <button className="adm-btn-primary glow-btn" onClick={saveDiscount} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCustomers;
