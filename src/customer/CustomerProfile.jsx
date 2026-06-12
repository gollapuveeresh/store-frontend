import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, Mail, Phone, MapPin, Save, Camera } from "lucide-react";

import { updateProfile } from "../features/user/userSlice";
import { updateProfileAPI } from "../api";

const TIER_COLOR = {
  Silver: "#94a3b8", Gold: "#f59e0b", Platinum: "#8b5cf6", "VIP Platinum Elite": "#c5a880",
};

function CustomerProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.user);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    profilePic: user?.profilePic || "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handle = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const { data } = await updateProfileAPI(form);
      dispatch(updateProfile(data));
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally { setSaving(false); }
  };

  return (
    <div className="cust-profile">
      <div className="cust-welcome">
        <h1 className="cust-title">My Profile</h1>
        <p className="cust-sub">Manage your personal details</p>
      </div>

      <div className="cust-profile-layout">
        {/* Profile Card */}
        <div className="cust-profile-display glass-panel">
          <div className="cust-profile-display-avatar">
            {form.profilePic
              ? <img src={form.profilePic} alt={user?.name} />
              : <div className="cust-avatar" style={{ width: 80, height: 80, fontSize: "1.8rem" }}>{user?.name?.[0]}</div>
            }
            <div className="cust-avatar-overlay"><Camera size={18} /></div>
          </div>
          <h3 className="cust-pdisp-name">{user?.name}</h3>
          <p className="cust-pdisp-email">{user?.email}</p>
          <span className="cust-tier-badge" style={{ color: TIER_COLOR[user?.tier], borderColor: TIER_COLOR[user?.tier], fontSize: "0.75rem", padding: "4px 14px" }}>
            ✦ {user?.tier}
          </span>
          {user?.discount > 0 && (
            <div className="cust-pdisp-discount">
              <span>🎁 {user.discount}% Loyalty Discount</span>
            </div>
          )}
          <div className="cust-pdisp-info">
            {user?.phone && <p><Phone size={13} /> {user.phone}</p>}
            {user?.address && <p><MapPin size={13} /> {user.address}</p>}
          </div>
        </div>

        {/* Edit Form */}
        <div className="cust-edit-card glass-panel">
          <h3 className="adm-card-title" style={{ marginBottom: 20 }}>Edit Details</h3>
          {success && <div className="cust-success-msg">✓ Profile updated successfully!</div>}
          {error && <div className="adm-modal-err">{error}</div>}
          <form onSubmit={handleSubmit} className="cust-profile-form">
            <div className="adm-form-group">
              <label>Full Name</label>
              <div className="auth-input-wrap">
                <User size={16} className="auth-input-icon" />
                <input name="name" value={form.name} onChange={handle} placeholder="Your name" style={{ paddingLeft: 40 }} />
              </div>
            </div>
            <div className="adm-form-group">
              <label>Email Address</label>
              <div className="auth-input-wrap">
                <Mail size={16} className="auth-input-icon" />
                <input value={user?.email} disabled placeholder="Email" style={{ paddingLeft: 40, opacity: 0.5, cursor: "not-allowed" }} />
              </div>
            </div>
            <div className="adm-form-group">
              <label>Phone</label>
              <div className="auth-input-wrap">
                <Phone size={16} className="auth-input-icon" />
                <input name="phone" value={form.phone} onChange={handle} placeholder="+91 98765 43210" style={{ paddingLeft: 40 }} />
              </div>
            </div>
            <div className="adm-form-group">
              <label>Delivery Address</label>
              <div className="auth-input-wrap">
                <MapPin size={16} className="auth-input-icon" />
                <input name="address" value={form.address} onChange={handle} placeholder="Your address" style={{ paddingLeft: 40 }} />
              </div>
            </div>
            <div className="adm-form-group">
              <label>Profile Picture URL</label>
              <input name="profilePic" value={form.profilePic} onChange={handle} placeholder="https://..." style={{ padding: "10px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", borderRadius: 8, color: "white", fontSize: "0.9rem" }} />
            </div>
            <button type="submit" className="adm-btn-primary glow-btn" disabled={saving} style={{ marginTop: 8 }}>
              <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
