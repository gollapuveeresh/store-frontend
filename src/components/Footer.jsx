import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer-panel">
      <div className="section-container footer-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo">StyleHub</Link>
          <p className="footer-brand-tagline">
            Curators of high-end luxury attire. Empowering individual expression through refined elegance and bespoke tailoring.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon-btn" title="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="social-icon-btn" title="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="social-icon-btn" title="Twitter">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>


        {/* Quick Links */}
        <div className="footer-links-col">
          <h4>Collections</h4>
          <ul>
            <li><Link to="/mens-wear">Men's Wear</Link></li>
            <li><Link to="/womens-wear">Women's Wear</Link></li>
            <li><Link to="/">New Arrivals</Link></li>
            <li><Link to="/">Bespoke Tailoring</Link></li>
          </ul>
        </div>



        {/* Newsletter Signup */}
        <div className="footer-newsletter-col">
          <h4>The Style Newsletter</h4>
          <p>Subscribe to receive exclusive access to capsule collection releases, private sales, and store events.</p>
          
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="newsletter-input-box">
              <Mail size={16} className="newsletter-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit" title="Subscribe">
                <Send size={14} />
              </button>
            </div>
          </form>

          {subscribed && (
            <p className="newsletter-success">Welcome to the inner circle.</p>
          )}
        </div>
      </div>

      {/* Info strip */}
      <div className="footer-bottom-strip">
        <div className="section-container footer-bottom-flex">
          <p>© {new Date().getFullYear()} StyleHub Fashion Group. All Rights Reserved.</p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">VIP Program Details</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-panel {
          background: rgba(10, 0, 2, 0.9);
          border-top: 1px solid var(--glass-border);
          padding-top: 60px;
          margin-top: auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.5fr;
          gap: 40px;
          padding-bottom: 50px;
        }
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .footer-logo {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: white;
          letter-spacing: 1px;
        }
        .footer-brand-tagline {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .social-links {
          display: flex;
          gap: 12px;
        }
        .social-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }
        .social-icon-btn:hover {
          background: var(--accent-gold);
          color: #160002;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(197, 168, 128, 0.3);
        }
        .footer-links-col h4,
        .footer-newsletter-col h4 {
          font-family: var(--font-sans);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--accent-gold);
          margin-bottom: 25px;
        }
        .footer-links-col ul {
          list-style: none;
          padding-left: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-links-col ul a {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 300;
        }
        .footer-links-col ul a:hover {
          color: white;
          padding-left: 5px;
        }
        .footer-newsletter-col p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 20px;
        }
        .newsletter-form {
          width: 100%;
        }
        .newsletter-input-box {
          position: relative;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--glass-border-gold);
          padding-bottom: 8px;
        }
        .newsletter-icon {
          color: var(--accent-gold);
          margin-right: 10px;
        }
        .newsletter-input-box input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          font-size: 0.9rem;
          padding: 5px 0;
        }
        .newsletter-input-box input:focus {
          outline: none;
        }
        .newsletter-submit {
          background: transparent;
          border: none;
          color: var(--accent-gold);
          cursor: pointer;
          padding: 5px;
          transition: var(--transition-fast);
        }
        .newsletter-submit:hover {
          color: white;
          transform: scale(1.1);
        }
        .newsletter-success {
          color: #2ed573 !important;
          margin-top: 10px;
          font-weight: bold;
          font-size: 0.8rem;
          animation: fadeIn 0.3s ease;
        }
        .footer-bottom-strip {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 25px 0;
          background: rgba(22, 0, 2, 0.5);
        }
        .footer-bottom-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .footer-legal-links {
          display: flex;
          gap: 20px;
        }
        .footer-legal-links a:hover {
          color: white;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .footer-bottom-flex {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
          .footer-legal-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
