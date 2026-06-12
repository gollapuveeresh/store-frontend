import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";
import { login } from "../features/user/userSlice";
import { loginAPI } from "../api";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await loginAPI(form);
      dispatch(login({ user: data.user, token: data.token }));
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate(redirect);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-logo">
          <Sparkles size={28} className="auth-logo-icon" />
          <span>StyleHub Atelier</span>
        </div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email Address</label>
            <div className="auth-input-wrap">
              <Mail size={16} className="auth-input-icon" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <div className="auth-input-wrap">
              <Lock size={16} className="auth-input-icon" />
              <input
                id="password"
                type={showPass ? "text" : "password"}
                name="password"
                placeholder=""
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-toggle-pass"
                onClick={() => setShowPass(!showPass)}
                aria-label="Toggle password visibility"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit glow-btn" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to={`/register${redirect !== '/' ? '?redirect=' + encodeURIComponent(redirect) : ''}`} className="auth-link">Create one</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: var(--primary-gradient);
        }
        .auth-card {
          width: 100%;
          max-width: 440px;
          padding: 48px 40px;
          border: 1px solid var(--glass-border-gold);
        }
        .auth-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          color: var(--accent-gold);
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 600;
        }
        .auth-logo-icon { color: var(--accent-gold); }
        .auth-title {
          font-size: 2rem;
          color: white;
          margin-bottom: 8px;
        }
        .auth-subtitle {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 28px;
        }
        .auth-error {
          background: rgba(217, 4, 41, 0.15);
          border: 1px solid rgba(217, 4, 41, 0.4);
          border-radius: 8px;
          padding: 12px 16px;
          color: #ff6b6b;
          font-size: 0.88rem;
          margin-bottom: 20px;
        }
        .auth-form { display: flex; flex-direction: column; gap: 20px; }
        .auth-field { display: flex; flex-direction: column; gap: 8px; }
        .auth-field label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .auth-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .auth-input-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .auth-input-wrap input {
          width: 100%;
          padding: 12px 14px 12px 40px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: white;
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }
        .auth-input-wrap input:focus {
          outline: none;
          border-color: var(--accent-gold);
          background: rgba(255,255,255,0.08);
        }
        .auth-input-wrap input::placeholder { color: var(--text-muted); }
        .auth-toggle-pass {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          padding: 0;
          display: flex;
          align-items: center;
        }
        .auth-toggle-pass:hover { color: var(--accent-gold); }
        .auth-submit {
          margin-top: 8px;
          padding: 14px;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .auth-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .auth-switch {
          text-align: center;
          margin-top: 24px;
          font-size: 0.88rem;
          color: var(--text-muted);
        }
        .auth-link { color: var(--accent-gold); font-weight: 600; }
        .auth-link:hover { color: var(--accent-gold-hover); }
      `}</style>
    </div>
  );
}

export default Login;
