import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, Phone, Mail, Clock, ShieldCheck, Compass, Heart, Award, ArrowRight } from "lucide-react";
import StoreCard from "../components/StoreCard";
import StoreDetails from "../components/StoreDetails";
import "../styles/Stores.css";

const storeLocations = [
  {
    id: 1,
    name: "Hyderabad Flagship Store",
    city: "Hyderabad",
    image: "/images/hyderabad_flagship.png",
    address: "12, Jubilee Hills Road, Jubilee Hills, Hyderabad, Telangana - 500033",
    phone: "+91 40 6789 0123",
    email: "hyderabad.flagship@stylehub.com",
    hours: "10:00 AM - 10:00 PM (Daily)",
    isOpenNow: true,
    manager: "Sanjana Roy",
    managerPic: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    mapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
    x: 44, // Coordinates representing city location on our custom styled SVG map
    y: 65,
    services: ["Personal Styling Lounge", "Bespoke Tailoring", "Private Fitting Salon", "In-Store Cafe", "Click & Collect"],
    description: "Our crown jewel. A gorgeous multi-story designer boutique in Jubilee Hills featuring dedicated floors for haute couture, custom formal tailoring, and an exclusive beverage lounge."
  },
  {
    id: 2,
    name: "Bangalore Boutique Store",
    city: "Bangalore",
    image: "/images/bangalore_store.png",
    address: "Level 1, The Collection UB City, Vittal Mallya Rd, Bengaluru, Karnataka - 560001",
    phone: "+91 80 5432 1098",
    email: "bangalore.boutique@stylehub.com",
    hours: "11:00 AM - 9:30 PM (Daily)",
    isOpenNow: true,
    manager: "Karan Malhotra",
    managerPic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    mapsUrl: "https://maps.google.com/?q=UB+City+Bangalore",
    x: 43,
    y: 77,
    services: ["Personal Shopper Sessions", "Custom Fittings", "Shoe Restoration Care", "Click & Collect"],
    description: "Nestled inside Bangalore's premier luxury hub, UB City. Offering a highly curated collection of our latest runway items and tailored footwear."
  },
  {
    id: 3,
    name: "Chennai Atelier",
    city: "Chennai",
    image: "/images/chennai_store.png",
    address: "24, Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu - 600006",
    phone: "+91 44 2468 1357",
    email: "chennai.house@stylehub.com",
    hours: "10:30 AM - 9:00 PM (Daily)",
    isOpenNow: true,
    manager: "Ananya Iyer",
    managerPic: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    mapsUrl: "https://maps.google.com/?q=Khader+Nawaz+Khan+Road+Chennai",
    x: 50,
    y: 76,
    services: ["VIP Silk Registry", "Bespoke Styling", "Traditional Custom Draping", "Click & Collect"],
    description: "An elegant, peaceful luxury retreat located on Khader Nawaz Khan Road. Specializing in high-end silks, bespoke styling consultants, and our premium women's collection."
  },
  {
    id: 4,
    name: "Mumbai Luxury Studio",
    city: "Mumbai",
    image: "/images/mumbai_store.png",
    address: "Ground Floor, Palladium Mall, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra - 400013",
    phone: "+91 22 9876 5432",
    email: "mumbai.studio@stylehub.com",
    hours: "11:00 AM - 10:00 PM (Daily)",
    isOpenNow: true,
    manager: "Vikram Mehta",
    managerPic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    mapsUrl: "https://maps.google.com/?q=Palladium+Mall+Mumbai",
    x: 23,
    y: 58,
    services: ["Personal Stylist Team", "Runway Fitting Suites", "VIP Lounge Bar", "Click & Collect", "Personal Delivery"],
    description: "A bold, sleek industrial showroom inside Palladium Mall. Catering to Mumbai's finest fashion enthusiasts with exclusive designer collaborations and styling suites."
  },
  {
    id: 5,
    name: "Delhi Atelier",
    city: "Delhi",
    image: "/images/delhi_store.png",
    address: "Shop No. 15-18, DLF Emporio, Vasant Kunj, New Delhi, Delhi - 110070",
    phone: "+91 11 3579 2468",
    email: "delhi.atelier@stylehub.com",
    hours: "10:00 AM - 9:30 PM (Daily)",
    isOpenNow: true,
    manager: "Priya Sharma",
    managerPic: "https://images.unsplash.com/photo-1534751516642-a131ffd107fd?w=150&auto=format&fit=crop&q=80",
    mapsUrl: "https://maps.google.com/?q=DLF+Emporio+Delhi",
    x: 37,
    y: 28,
    services: ["VIP Couture Suite", "Custom Groom Styling", "Private Bridal Lounge", "Home Wardrobe Audits", "Click & Collect"],
    description: "Our signature capital store inside DLF Emporio. Featuring high-ceiling architecture, gold metal displays, and private consulting rooms for VIP couture events."
  }
];

function Stores() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedType, setSelectedType] = useState("All"); // 'All', 'Flagship', 'Boutique'
  const [focusedStoreId, setFocusedStoreId] = useState(null);
  const [activeDetailsStore, setActiveDetailsStore] = useState(null);

  // Check URL parameters for search focus on mount
  useEffect(() => {
    const cityParam = searchParams.get("city");
    const idParam = searchParams.get("id");
    
    if (cityParam) {
      setSelectedCity(cityParam);
    }
    if (idParam) {
      const storeId = parseInt(idParam);
      setFocusedStoreId(storeId);
      const matched = storeLocations.find((s) => s.id === storeId);
      if (matched) {
        setActiveDetailsStore(matched);
      }
    }
  }, [searchParams]);

  // Apply filters
  const filteredStores = storeLocations.filter((store) => {
    const matchesSearch = 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCity = selectedCity === "All" || store.city === selectedCity;
    
    const matchesType = 
      selectedType === "All" ||
      (selectedType === "Flagship" && store.id === 1) ||
      (selectedType === "Boutique" && store.id !== 1);

    return matchesSearch && matchesCity && matchesType;
  });

  const handleFocusStore = (id) => {
    setFocusedStoreId(id);
  };

  const handleViewDetails = (store) => {
    setActiveDetailsStore(store);
  };

  const activeStore = storeLocations.find((s) => s.id === focusedStoreId) || storeLocations[0];

  return (
    <div className="stores-page animate-fade">
      {/* Hero Cover */}
      <section className="stores-hero">
        <h1 className="glow-text animate-slide-up">Our Boutiques</h1>
        <p className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Experience the StyleHub universe in person. Discover tailored fits, private styling consultants, and seasonal collections.
        </p>
      </section>

      {/* Featured Flagship Store Showcase */}
      <section className="section-container featured-flagship-section animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="section-title">Flagship Experience</h2>
        <div className="flagship-container glass-panel">
          <div className="flagship-image-wrapper">
            <img src="/images/hyderabad_flagship.png" alt="Hyderabad Flagship Store" className="flagship-image" />
            <span className="flagship-tag">Jubilee Hills, Hyd</span>
          </div>
          <div className="flagship-details">
            <h3>Hyderabad Flagship Store</h3>
            <span style={{ color: "var(--accent-gold)", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase" }}>The Pinnacle of Luxury Retail</span>
            <p className="flagship-quote">
              "We have engineered a sanctuary for fashion lovers. Every floor tells a story of craftsmanship, from the raw fabrics room to our private collection lounges."
            </p>
            <div className="flagship-info-grid">
              <div className="flagship-info-item">
                <Clock size={16} />
                <div>
                  <strong>Hours</strong>
                  <p>10:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flagship-info-item">
                <ShieldCheck size={16} />
                <div>
                  <strong>Services</strong>
                  <p>Bespoke tailoring, Personal styling bar</p>
                </div>
              </div>
            </div>
            <div className="flagship-actions">
              <button className="glow-btn" onClick={() => handleViewDetails(storeLocations[0])}>
                Book Styling Visit
              </button>
              <button className="gold-outline-btn" onClick={() => handleFocusStore(1)}>
                Show on Map
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main interactive map and cards section */}
      <section className="section-container">
        <h2 className="section-title">Store Locator</h2>
        
        {/* Search & Filters */}
        <div className="stores-filter-container glass-panel animate-slide-up">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search boutique name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="stores-search-input"
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
            {/* City Selector */}
            <div className="filter-chips">
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", alignSelf: "center", marginRight: "10px", textTransform: "uppercase" }}>City:</span>
              {["All", "Hyderabad", "Bangalore", "Mumbai", "Delhi", "Chennai"].map((city) => (
                <button
                  key={city}
                  className={`filter-chip ${selectedCity === city ? "active" : ""}`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Type selector */}
            <div className="filter-chips">
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", alignSelf: "center", marginRight: "10px", textTransform: "uppercase" }}>Tier:</span>
              {["All", "Flagship", "Boutique"].map((type) => (
                <button
                  key={type}
                  className={`filter-chip ${selectedType === type ? "active" : ""}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Split Layout */}
        <div className="store-locator-grid">
          {/* Left Column: Interactive Map */}
          <div className="map-container-panel" id="interactive-india-map">
            <div className="map-header">
              <h3>StyleHub Boutique Radar</h3>
              <div className="map-status-indicator">
                <span className="map-pulse"></span>
                <span>Active Channels</span>
              </div>
            </div>

            <div className="map-visual-wrapper">
              {/* Custom outline representing map of India */}
              <svg viewBox="0 0 350 420" className="map-svg-india">
                {/* Styled Indian Territory Map Shape */}
                <path d="M165 40 C175 42, 185 45, 190 50 C200 48, 205 38, 210 40 C215 45, 208 55, 212 62 C220 65, 235 60, 240 70 C242 75, 232 80, 230 85 C235 90, 245 92, 252 98 C265 95, 275 88, 285 92 C295 90, 305 95, 310 105 C305 110, 290 108, 282 112 C285 118, 295 120, 298 128 C285 132, 272 130, 268 138 C265 145, 272 152, 268 158 C262 155, 255 148, 248 150 C240 152, 238 165, 232 168 C225 160, 218 162, 210 158 C202 165, 200 178, 195 185 C198 195, 208 200, 210 210 C215 215, 225 210, 232 215 C240 212, 245 202, 252 205 C260 210, 255 225, 262 230 C270 228, 275 220, 282 222 C290 225, 288 238, 298 242 C302 248, 308 252, 310 260 C295 265, 280 260, 268 268 C255 272, 248 285, 235 290 C222 295, 218 308, 210 315 C195 328, 190 348, 185 365 C180 380, 182 395, 178 410 C175 412, 170 412, 168 408 C165 390, 168 372, 162 355 C155 338, 142 328, 135 312 C128 300, 125 285, 115 278 C102 272, 88 272, 75 265 C68 260, 65 248, 58 245 C50 240, 38 242, 30 235 C28 230, 35 225, 38 220 C42 222, 45 228, 50 225 C52 218, 48 208, 50 200 C52 188, 62 182, 68 172 C70 160, 68 145, 75 135 C82 138, 85 148, 92 145 C98 140, 95 128, 102 122 C110 125, 112 135, 120 132 C125 125, 122 112, 128 105 C132 110, 135 118, 142 115 C148 110, 145 98, 152 92 C158 95, 162 105, 170 102 C172 90, 168 78, 172 68 C175 58, 162 48, 165 40 Z" />
              </svg>

              {/* Pulsing Hotspots positioned overlay */}
              {storeLocations.map((store) => (
                <div
                  key={store.id}
                  className={`map-pin ${focusedStoreId === store.id ? "active" : ""}`}
                  style={{
                    position: "absolute",
                    left: `${store.x}%`,
                    top: `${store.y}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  onClick={() => handleFocusStore(store.id)}
                >
                  <svg width="30" height="30" style={{ overflow: 'visible' }}>
                    <circle className="pin-pulse" cx="15" cy="15" r="8" />
                    <circle className="pin-dot" cx="15" cy="15" r="5" />
                  </svg>
                  <span className="map-pin-label">{store.city}</span>
                </div>
              ))}
            </div>

            <div className="map-tooltip-banner">
              Currently Viewing: <span>{activeStore.name} ({activeStore.city})</span>
            </div>
          </div>

          {/* Right Column: Cards List */}
          <div className="stores-cards-list">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onViewDetails={handleViewDetails}
                  onFocusMap={handleFocusStore}
                  isFocused={focusedStoreId === store.id}
                />
              ))
            ) : (
              <div className="glass-panel" style={{ padding: "40px", textAlign: "center" }}>
                <p>No boutiques matching filters could be resolved.</p>
              </div>
            )}
          </div>
        </div>

        {/* Boutique General FAQ & Information Section */}
        <div className="stores-faq-container">
          <div className="stores-faq-column">
            <h3>VIP Shopping Amenities</h3>
            <div className="stores-faq-list">
              <div className="stores-faq-item">
                <h4>Private Fittings Bar</h4>
                <p>Enjoy vintage tea, espresso, or champagne in our private lounges while our senior tailors adjust garments to your specifications.</p>
              </div>
              <div className="stores-faq-item">
                <h4>Home Wardrobe Auditing</h4>
                <p>Our top stylists can visit your estate to audit your wardrobe, recommend custom pieces, and arrange professional tailor consultations.</p>
              </div>
              <div className="stores-faq-item">
                <h4>Corporate VIP Accounts</h4>
                <p>StyleHub partners with leading corporate entities to provide concierge style fittings and seasonal corporate gifts coordination.</p>
              </div>
            </div>
          </div>

          <div className="stores-faq-column">
            <h3>Locator FAQ</h3>
            <div className="stores-faq-list">
              <div className="stores-faq-item">
                <h4>Do I need an appointment to visit?</h4>
                <p>No, walk-ins are highly welcome during standard hours. However, scheduling in advance ensures a dedicated personal stylist and access to private rooms.</p>
              </div>
              <div className="stores-faq-item">
                <h4>Can I pick up online orders in-store?</h4>
                <p>Yes. Simply select "Click & Collect" at checkout, choose your preferred boutique location, and collect your item ready in a luxury box.</p>
              </div>
              <div className="stores-faq-item">
                <h4>How do I custom-order a specific size?</h4>
                <p>If a product is sold out online, you can call any of our boutiques or book an appointment. We can retrieve materials from other warehouses or arrange customized sizing tailors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Detailed View overlay */}
      {activeDetailsStore && (
        <StoreDetails
          store={activeDetailsStore}
          onClose={() => setActiveDetailsStore(null)}
        />
      )}
    </div>
  );
}

export default Stores;
