import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Sparkles } from "lucide-react";
import { login } from "../features/user/userSlice";
import { registerAPI } from "../api";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const { data } = await registerAPI(form);
      dispatch(login({ user: data.user, token: data.token }));
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-page">
      {/* Decorative background orbs */}
      <div className="reg-bg-orb reg-orb-1" />
      <div className="reg-bg-orb reg-orb-2" />
      <div className="reg-bg-orb reg-orb-3" />

      <div className="reg-card">
        {/* Header */}
        <div className="reg-header">
          <div className="reg-logo-wrap">
            <Sparkles size={22} className="reg-sparkle" />
          </div>
          <h1 className="reg-title">Create Account</h1>
          <p className="reg-subtitle">Join the luxury fashion experience</p>
        </div>

        {error && (
          <div className="reg-error">
            <span>⚠</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="reg-form">
          {/* Row: Name + Phone */}
          <div className="reg-row">
            <div className="reg-field">
              <label className="reg-label" htmlFor="name">Full Name <span className="req">*</span></label>
              <div className="reg-input-wrap">
                <User size={15} className="reg-icon" />
                <input
                  id="name" type="text" name="name"
                  placeholder="Your full name"
                  value={form.name} onChange={handleChange} required
                  className="reg-input"
                />
              </div>
            </div>
            <div className="reg-field">
              <label className="reg-label" htmlFor="phone">Phone</label>
              <div className="reg-input-wrap">
                <Phone size={15} className="reg-icon" />
                <input
                  id="phone" type="tel" name="phone"
                  placeholder="+91 98765 43210"
                  value={form.phone} onChange={handleChange}
                  className="reg-input"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="reg-field">
            <label className="reg-label" htmlFor="reg-email">Email Address <span className="req">*</span></label>
            <div className="reg-input-wrap">
              <Mail size={15} className="reg-icon" />
              <input
                id="reg-email" type="email" name="email"
                placeholder="your@email.com"
                value={form.email} onChange={handleChange}
                required autoComplete="email"
                className="reg-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="reg-field">
            <label className="reg-label" htmlFor="reg-password">Password <span className="req">*</span></label>
            <div className="reg-input-wrap">
              <Lock size={15} className="reg-icon" />
              <input
                id="reg-password"
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Min. 6 characters"
                value={form.password} onChange={handleChange}
                required autoComplete="new-password"
                className="reg-input"
              />
              <button type="button" className="reg-toggle-pass" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="reg-field">
            <label className="reg-label" htmlFor="address">Delivery Address</label>
            <div className="reg-input-wrap">
              <MapPin size={15} className="reg-icon" />
              <input
                id="address" type="text" name="address"
                placeholder="Your delivery address"
                value={form.address} onChange={handleChange}
                className="reg-input"
              />
            </div>
          </div>

          <button type="submit" className="reg-submit" disabled={loading}>
            {loading ? <span className="reg-spinner" /> : (
              <>
                <Sparkles size={16} style={{ marginRight: '8px' }} />
                Create Account
              </>
            )}
          </button>
        </form>

        <p className="reg-switch">
          Already have an account?{" "}
          <Link to={`/login${redirect !== '/' ? '?redirect=' + encodeURIComponent(redirect) : ''}`} className="reg-link">Sign in</Link>
        </p>
      </div>

      <style>{`
        /* ─── Page Shell ─────────────────────────────── */
        .reg-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 20px 60px;
          position: relative;
          overflow: hidden;
        }

        /* ─── Decorative Orbs ────────────────────────── */
        .reg-bg-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .reg-orb-1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(217,4,41,0.18) 0%, transparent 70%);
          top: -100px; left: -120px;
          animation: orbFloat1 9s ease-in-out infinite alternate;
        }
        .reg-orb-2 {
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(197,168,128,0.14) 0%, transparent 70%);
          bottom: -60px; right: -80px;
          animation: orbFloat2 11s ease-in-out infinite alternate;
        }
        .reg-orb-3 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(76,3,13,0.3) 0%, transparent 70%);
          top: 50%; left: 60%;
          animation: orbFloat1 7s ease-in-out infinite alternate;
        }
        @keyframes orbFloat1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }
        @keyframes orbFloat2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-25px, -15px) scale(1.05); }
        }

        /* ─── Card ───────────────────────────────────── */
        .reg-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 580px;
          background: rgba(22, 0, 2, 0.65);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(197,168,128,0.18);
          border-radius: 24px;
          padding: 44px 44px 36px;
          box-shadow:
            0 30px 80px rgba(0,0,0,0.55),
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 1px 0 rgba(255,255,255,0.08) inset;
          animation: cardEntrance 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ─── Header ─────────────────────────────────── */
        .reg-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .reg-logo-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px; height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(217,4,41,0.25), rgba(197,168,128,0.2));
          border: 1px solid rgba(197,168,128,0.3);
          margin-bottom: 16px;
          box-shadow: 0 0 20px rgba(217,4,41,0.2);
        }
        .reg-sparkle {
          color: var(--accent-gold);
          filter: drop-shadow(0 0 6px rgba(197,168,128,0.5));
        }
        .reg-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          background: linear-gradient(135deg, #fff 40%, var(--accent-gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 6px;
        }
        .reg-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
          letter-spacing: 0.5px;
          font-weight: 300;
        }

        /* ─── Error Banner ───────────────────────────── */
        .reg-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(217,4,41,0.12);
          border: 1px solid rgba(217,4,41,0.35);
          border-radius: 10px;
          color: #ff6b81;
          font-size: 0.85rem;
          padding: 10px 14px;
          margin-bottom: 22px;
          animation: fadeIn 0.3s ease;
        }

        /* ─── Form Layout ────────────────────────────── */
        .reg-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .reg-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 520px) {
          .reg-row { grid-template-columns: 1fr; }
          .reg-card { padding: 32px 22px 28px; }
        }

        /* ─── Fields ─────────────────────────────────── */
        .reg-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .reg-label {
          font-size: 0.78rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
        }
        .req { color: var(--accent-red); }

        /* ─── Input Wrappers ─────────────────────────── */
        .reg-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .reg-icon {
          position: absolute;
          left: 13px;
          color: var(--accent-gold);
          opacity: 0.7;
          pointer-events: none;
          transition: opacity 0.2s;
        }
        .reg-input-wrap:focus-within .reg-icon {
          opacity: 1;
        }
        .reg-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 0.9rem;
          padding: 11px 14px 11px 38px;
          transition: all 0.25s ease;
          outline: none;
        }
        .reg-input::placeholder {
          color: rgba(255,255,255,0.3);
          font-weight: 300;
        }
        .reg-input:hover {
          border-color: rgba(197,168,128,0.25);
          background: rgba(255,255,255,0.06);
        }
        .reg-input:focus {
          border-color: rgba(217,4,41,0.55);
          background: rgba(217,4,41,0.06);
          box-shadow: 0 0 0 3px rgba(217,4,41,0.12), 0 0 12px rgba(217,4,41,0.1);
        }

        /* ─── Password toggle ────────────────────────── */
        .reg-toggle-pass {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .reg-toggle-pass:hover { color: var(--accent-gold); }

        /* ─── Submit Button ──────────────────────────── */
        .reg-submit {
          margin-top: 6px;
          width: 100%;
          padding: 13px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #d90429, #9d0208);
          color: #fff;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(217,4,41,0.35), 0 4px 15px rgba(0,0,0,0.3);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
        }
        .reg-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .reg-submit:hover::before { opacity: 1; }
        .reg-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(217,4,41,0.55), 0 8px 25px rgba(0,0,0,0.4);
        }
        .reg-submit:active { transform: translateY(0); }
        .reg-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        /* ─── Spinner ────────────────────────────────── */
        .reg-spinner {
          display: inline-block;
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ─── Switch row ─────────────────────────────── */
        .reg-switch {
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 24px;
        }
        .reg-link {
          color: var(--accent-gold);
          font-weight: 600;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .reg-link:hover {
          border-bottom-color: var(--accent-gold);
        }
      `}</style>
    </div>
  );
}

export default Register;
