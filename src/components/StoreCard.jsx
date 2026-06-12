import { MapPin, Phone, Mail, Clock, User, Compass, ArrowRight, ExternalLink } from "lucide-react";
import "../styles/Stores.css";

function StoreCard({ store, onViewDetails, onFocusMap, isFocused }) {
  // Format phone number for tel: link
  const cleanPhone = store.phone.replace(/[^0-9+]/g, "");

  return (
    <div className={`store-locator-card glass-panel ${isFocused ? "focused" : "glass-panel-hover"}`}>
      {/* Visual Image container */}
      <div className="store-card-image-box">
        <img src={store.image} alt={store.name} className="store-card-img" />
        <span className="store-type-badge">
          {store.id === 1 ? "Flagship Store" : "Boutique"}
        </span>
      </div>

      {/* Info & Text contents */}
      <div className="store-card-info-box">
        <div className="store-card-title-row">
          <h4>{store.name}</h4>
          <span className={`store-status-pill ${store.isOpenNow ? "open" : "closed"}`}>
            {store.isOpenNow ? "Open Now" : "Closed"}
          </span>
        </div>

        <p className="store-address">
          <MapPin size={14} style={{ marginRight: '6px', verticalAlign: 'middle', color: 'var(--accent-gold)' }} />
          {store.address}
        </p>

        {/* Quick Contact & Details grid */}
        <div className="store-quick-contact">
          <div className="store-contact-row">
            <Clock size={14} />
            <span>Hours: {store.hours}</span>
          </div>
          <div className="store-contact-row">
            <User size={14} />
            <span>Manager: {store.manager}</span>
          </div>
          <div className="store-contact-row">
            <Phone size={14} />
            <span>Phone: {store.phone}</span>
          </div>
          <div className="store-contact-row">
            <Mail size={14} />
            <span>Email: {store.email}</span>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="store-card-actions">
          {/* Call Now */}
          <a href={`tel:${cleanPhone}`} className="store-action-btn-primary" title="Call Boutique">
            <Phone size={12} /> Call Now
          </a>

          {/* Directions / Focus Map */}
          <button 
            className="store-action-btn-primary" 
            onClick={() => {
              onFocusMap(store.id);
              // Scroll map container into view on mobile
              const mapEl = document.getElementById("interactive-india-map");
              if (mapEl) {
                mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }} 
            title="Locate on Map"
          >
            <Compass size={12} /> Directions
          </button>

          {/* Google Maps Button */}
          <a 
            href={store.mapsUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="store-action-btn-primary"
            title="Open Google Maps"
          >
            <ExternalLink size={12} /> Google Maps
          </a>

          {/* Explore Details Modal */}
          <button 
            className="store-action-btn-gold" 
            onClick={() => onViewDetails(store)}
            title="Book Styling Session & Info"
          >
            Details <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
