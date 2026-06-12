import { useState } from "react";
import { X, Calendar, Clock, Sparkles, MapPin, Phone, Mail, Award, CheckCircle2 } from "lucide-react";
import "../styles/Stores.css";

function StoreDetails({ store, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    service: "Personal Styling"
  });
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.date && formData.time) {
      setIsBooked(true);
      // Reset form after a small timeout
      setTimeout(() => {
        setIsBooked(false);
        setFormData({
          name: "",
          phone: "",
          date: "",
          time: "",
          service: "Personal Styling"
        });
        onClose();
      }, 3500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="store-details-modal-overlay" onClick={onClose}>
      <div className="store-details-modal glass-panel glass-panel-gold" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-scrollable-body">
          {/* Title Banner */}
          <div className="modal-header-banner">
            <h2>{store.name}</h2>
            <p className="modal-subtitle">{store.city} Flagship Boutique</p>
          </div>

          <div className="modal-layout-grid">
            {/* Gallery and Details Column */}
            <div className="modal-info-column">
              {/* Gallery Image */}
              <div className="modal-gallery-row">
                <img src={store.image} alt={store.name} className="modal-gallery-main" />
              </div>

              {/* About description */}
              <div className="modal-details-section">
                <h5>About The Boutique</h5>
                <p>{store.description || "An immersive luxury space displaying our finest seasonal collections. Experience bespoke tailoring, private shopping lounges, and custom fashion styling consulting."}</p>
              </div>

              {/* Services Offered */}
              <div className="modal-details-section">
                <h5>Boutique Services</h5>
                <ul className="modal-services-list">
                  {store.services ? (
                    store.services.map((svc, i) => <li key={i}>{svc}</li>)
                  ) : (
                    <>
                      <li>Personal Styling</li>
                      <li>Bespoke Tailoring</li>
                      <li>VIP Fittings Lounge</li>
                      <li>In-Store Collection</li>
                      <li>Beverage Bar</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Manager Spotlight */}
              <div className="modal-details-section">
                <h5>Boutique Manager</h5>
                <div className="modal-manager-card">
                  <img 
                    src={store.managerPic || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"} 
                    alt={store.manager} 
                    className="modal-manager-avatar" 
                  />
                  <div className="modal-manager-info">
                    <h6>{store.manager}</h6>
                    <p>Boutique Director, {store.city}</p>
                    <p style={{ fontStyle: "italic", marginTop: "4px", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                      "We look forward to welcoming you and curating your perfect style profile."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Booking Column */}
            <div className="modal-info-column">
              {/* Location details */}
              <div className="modal-details-section">
                <h5>Location Details</h5>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                  <p style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <MapPin size={16} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                    <span>{store.address}</span>
                  </p>
                  <p style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <Clock size={16} style={{ color: "var(--accent-gold)" }} />
                    <span>Open Hours: {store.hours}</span>
                  </p>
                  <p style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <Phone size={16} style={{ color: "var(--accent-gold)" }} />
                    <span>Call: {store.phone}</span>
                  </p>
                  <p style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <Mail size={16} style={{ color: "var(--accent-gold)" }} />
                    <span>Email: {store.email}</span>
                  </p>
                </div>
              </div>

              {/* VIP Booking Form */}
              <div className="modal-details-section">
                <h5 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Sparkles size={16} style={{ color: "var(--accent-gold)" }} />
                  Schedule VIP Session
                </h5>
                
                {isBooked ? (
                  <div className="booking-success-message">
                    <CheckCircle2 size={24} style={{ margin: "0 auto 8px" }} />
                    <h4>Reservation Confirmed!</h4>
                    <p style={{ fontSize: "0.75rem", marginTop: "4px", color: "#b3f5c7" }}>
                      A VIP stylist will contact you at {formData.phone} shortly.
                    </p>
                  </div>
                ) : (
                  <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="booking-input-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="booking-input-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div className="booking-form-row">
                      <div className="booking-input-group">
                        <label htmlFor="date">Date</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="booking-input-group">
                        <label htmlFor="time">Time</label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="booking-input-group">
                      <label htmlFor="service">Styling Service</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                      >
                        <option value="Personal Styling">Personal Styling (1hr)</option>
                        <option value="Bespoke Tailoring">Bespoke Tailoring & Fitting</option>
                        <option value="VIP Bridal Consultation">VIP Bridal Consultation (2hr)</option>
                        <option value="Private Trunk Show">Access Private Collection</option>
                      </select>
                    </div>

                    <button type="submit" className="glow-btn" style={{ padding: "12px", width: "100%", borderRadius: "6px", marginTop: "10px", fontSize: "0.85rem" }}>
                      Book Private Appointment
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreDetails;
