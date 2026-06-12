import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, MessageSquare, ShieldAlert } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Personal Styling Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "Personal Styling Inquiry",
          message: ""
        });
      }, 4000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="contact-page animate-fade">
      {/* Banner */}
      <div className="contact-banner">
        <div className="contact-banner-text">
          <h1>Atelier Client Services</h1>
          <p>We are at your disposal to assist with size consultation, boutique reservations, or order inquiries.</p>
        </div>
      </div>

      <div className="section-container contact-grid">
        {/* Contact details */}
        <div className="contact-info-col animate-slide-up">
          <div className="glass-panel info-card-box">
            <h3>StyleHub Concierge</h3>
            <p className="concierge-desc">
              Our specialists are online to assist with sizing registries, corporate orders, or VIP custom tailoring requests.
            </p>

            <div className="contact-links-list">
              <div className="contact-link-item">
                <Phone size={18} className="contact-icon-svg" />
                <div>
                  <strong>VIP Concierge Helpline</strong>
                  <p><a href="tel:+914067890123">+91 40 6789 0123</a> (Mon-Sat, 9AM - 8PM)</p>
                </div>
              </div>

              <div className="contact-link-item">
                <Mail size={18} className="contact-icon-svg" />
                <div>
                  <strong>Atelier Client Email</strong>
                  <p><a href="mailto:concierge@stylehub.com">concierge@stylehub.com</a></p>
                </div>
              </div>

              <div className="contact-link-item">
                <MapPin size={18} className="contact-icon-svg" />
                <div>
                  <strong>Head Office Address</strong>
                  <p>12, Jubilee Hills Road, Jubilee Hills, Hyderabad, Telangana - 500033</p>
                </div>
              </div>
            </div>

            <div className="info-alert-strip">
              <ShieldAlert size={16} />
              <span>Looking for a boutique store? Browse our <a href="/stores" style={{ textDecoration: 'underline', color: 'var(--accent-gold)' }}>Boutique locator</a>.</span>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="contact-form-col animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass-panel form-card-box glass-panel-gold">
            <h3>Inquiry Form</h3>
            
            {submitted ? (
              <div className="form-success-box">
                <CheckCircle2 size={32} className="success-icon-svg" />
                <h4>Inquiry Logged</h4>
                <p>Your ticket has been logged into our CRM. A VIP customer styling executive will reach out to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-node">
                <div className="contact-input-row">
                  <div className="input-group-field">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="input-group-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@luxury.com"
                    />
                  </div>
                </div>

                <div className="input-group-field">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="Personal Styling Inquiry">Personal Styling Consultation</option>
                    <option value="Order Tracking & Logistics">Order Tracking & Delivery</option>
                    <option value="Bespoke Couture Custom Size">Bespoke Custom Size Fitting</option>
                    <option value="Press & Careers">Press & Careers Inquiry</option>
                  </select>
                </div>

                <div className="input-group-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your inquiry in detail..."
                  ></textarea>
                </div>

                <button type="submit" className="glow-btn submit-form-btn">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-page {
          padding-bottom: 80px;
        }
        .contact-banner {
          height: 250px;
          display: flex;
          align-items: center;
          padding: 0 10%;
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: 40px;
          background: linear-gradient(rgba(22, 0, 2, 0.7), rgba(22, 0, 2, 0.9)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80') center/cover no-repeat;
        }
        .contact-banner-text h1 {
          font-size: 3rem;
          color: white;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          background: linear-gradient(45deg, #ffffff 60%, var(--accent-gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .contact-banner-text p {
          max-width: 600px;
          font-size: 1rem;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
        }
        .info-card-box,
        .form-card-box {
          padding: 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
        }
        .info-card-box h3,
        .form-card-box h3 {
          font-size: 1.8rem;
          color: white;
          margin-bottom: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 12px;
        }
        .concierge-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 30px;
        }
        .contact-links-list {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-bottom: 35px;
        }
        .contact-link-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }
        .contact-icon-svg {
          color: var(--accent-gold);
          flex-shrink: 0;
          margin-top: 4px;
        }
        .contact-link-item strong {
          color: white;
          font-size: 0.95rem;
          display: block;
          margin-bottom: 4px;
        }
        .contact-link-item p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .contact-link-item a:hover {
          color: white;
        }
        .info-alert-strip {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(197, 168, 128, 0.06);
          border: 1px solid rgba(197, 168, 128, 0.15);
          padding: 15px;
          border-radius: 8px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .info-alert-strip svg {
          color: var(--accent-gold);
          flex-shrink: 0;
        }

        /* Form Details */
        .contact-form-node {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .contact-input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .input-group-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .input-group-field label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }
        .input-group-field input,
        .input-group-field select,
        .input-group-field textarea {
          padding: 12px 15px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          color: white;
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }
        .input-group-field input:focus,
        .input-group-field select:focus,
        .input-group-field textarea:focus {
          outline: none;
          border-color: var(--accent-red);
          background: rgba(255, 255, 255, 0.06);
        }
        .input-group-field select option {
          background: #160002;
          color: white;
        }
        .submit-form-btn {
          padding: 14px;
          border-radius: 6px;
          font-size: 0.85rem;
          margin-top: 10px;
        }

        /* Success box */
        .form-success-box {
          text-align: center;
          padding: 50px 20px;
          animation: fadeIn 0.3s ease;
        }
        .success-icon-svg {
          color: #2ed573;
          margin-bottom: 20px;
        }
        .form-success-box h4 {
          font-size: 1.4rem;
          color: white;
          margin-bottom: 10px;
        }
        .form-success-box p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 576px) {
          .contact-input-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .info-card-box,
          .form-card-box {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;
