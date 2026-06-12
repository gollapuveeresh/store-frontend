import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, ShieldCheck, Sparkles, MapPin, Gift } from "lucide-react";

function Home() {
  return (
    <div className="home-page">
      {/* Editorial Hero Banner */}
      <section className="hero-section">
        <div className="hero-content animate-slide-up">
          <span className="hero-sub">StyleHub Atelier</span>
          <h1 className="hero-title">The Art of Pure Elegance</h1>
          <p className="hero-desc">
            Explore the Summer Capsule collection. Fine silk satin evening wear, tailored virgin wool coats, and custom handmade accessories.
          </p>
          <div className="hero-ctas">
            <Link to="/womens-wear" className="glow-btn hero-btn">Explore Women</Link>
            <Link to="/mens-wear" className="gold-outline-btn hero-btn">Explore Men</Link>
          </div>
        </div>
      </section>

      {/* Brand USPs Grid */}
      <section className="section-container usps-section">
        <div className="usp-card glass-panel">
          <Sparkles className="usp-icon" />
          <h3>Bespoke Luxury</h3>
          <p>Hand-tailored apparel crafted by experienced ateliers with premium fabrics.</p>
        </div>
        <div className="usp-card glass-panel">
          <ShieldCheck className="usp-icon" />
          <h3>VIP Experiences</h3>
          <p>Schedule a personal styling consult or private lounge appointment in our boutiques.</p>
        </div>
        <div className="usp-card glass-panel">
          <Gift className="usp-icon" />
          <h3>Elite Loyalty</h3>
          <p>Earn private rewards, trunk show access, and customized sizing registries.</p>
        </div>
      </section>

      {/* Categories Spotlight */}
      <section className="section-container categories-section">
        <h2 className="section-title">Curated Departments</h2>
        <div className="categories-grid">
          {/* Women Category */}
          <div className="category-banner glass-panel">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80" 
              alt="Women" 
              className="category-bg" 
            />
            <div className="category-content">
              <h3>Women's Haute Couture</h3>
              <p>Evening gowns, outerwear, and statement handbags.</p>
              <Link to="/womens-wear" className="category-link">
                Shop Department <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Men Category */}
          <div className="category-banner glass-panel">
            <img 
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80" 
              alt="Men" 
              className="category-bg" 
            />
            <div className="category-content">
              <h3>Men's Tailored Suites</h3>
              <p>Tuxedos, merino polos, cashmere outerwear, and Chelsea boots.</p>
              <Link to="/mens-wear" className="category-link">
                Shop Department <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Store Spotlight banner */}
      <section className="section-container flagship-spotlight-section">
        <h2 className="section-title">Our Boutiques</h2>
        <div className="flagship-spotlight-box glass-panel">
          <div className="flagship-spotlight-info">
            <span className="spotlight-tag">Featured Location</span>
            <h3>Hyderabad Flagship Store</h3>
            <p className="spotlight-quote">
              "A multi-floor luxury atelier in the heart of Jubilee Hills, featuring our private VIP tailoring lounges, bridal suites, and an artisan coffee lounge."
            </p>
            <div className="spotlight-details">
              <p><MapPin size={16} style={{ color: "var(--accent-gold)", marginRight: "8px", verticalAlign: "middle" }} /> 12, Jubilee Hills Road, Hyderabad</p>
            </div>
            <Link to="/stores?id=1" className="glow-btn spotlight-btn">
              Explore Store & Book VIP Session
            </Link>
          </div>
          <div className="flagship-spotlight-image">
            <img src="/images/hyderabad_flagship.png" alt="Hyderabad Flagship Store" />
          </div>
        </div>
      </section>

      <style>{`
        /* Hero Section */
        .hero-section {
          height: calc(100vh - 80px);
          min-height: 550px;
          display: flex;
          align-items: center;
          position: relative;
          padding: 0 10%;
          background: linear-gradient(rgba(22, 0, 2, 0.4), rgba(22, 0, 2, 0.7)), url('/images/fashion_hero.png') center/cover no-repeat;
          border-bottom: 1px solid var(--glass-border);
        }
        .hero-content {
          max-width: 600px;
          color: white;
        }
        .hero-sub {
          font-family: var(--font-sans);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--accent-gold);
          font-size: 0.9rem;
          margin-bottom: 15px;
          display: inline-block;
        }
        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 25px;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }
        .hero-desc {
          font-size: 1.1rem;
          margin-bottom: 35px;
          color: var(--text-secondary);
        }
        .hero-ctas {
          display: flex;
          gap: 20px;
        }
        .hero-btn {
          padding: 14px 30px;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 4px;
        }

        /* USPs Section */
        .usps-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: -50px;
          position: relative;
          z-index: 20;
        }
        .usp-card {
          padding: 30px 20px;
          text-align: center;
          transition: var(--transition-smooth);
        }
        .usp-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent-gold-hover);
        }
        .usp-icon {
          color: var(--accent-gold);
          width: 32px;
          height: 32px;
          margin: 0 auto 15px;
        }
        .usp-card h3 {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 10px;
        }
        .usp-card p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Categories Section */
        .categories-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        .category-banner {
          position: relative;
          height: 420px;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 40px;
        }
        .category-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          transition: var(--transition-smooth);
          filter: brightness(0.65);
        }
        .category-banner:hover .category-bg {
          transform: scale(1.04);
          filter: brightness(0.5);
        }
        .category-content {
          position: relative;
          z-index: 2;
          max-width: 80%;
        }
        .category-content h3 {
          font-size: 2.2rem;
          color: white;
          margin-bottom: 10px;
        }
        .category-content p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
        .category-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: var(--accent-gold);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .category-link:hover {
          color: white;
        }

        /* Flagship Spotlight */
        .flagship-spotlight-box {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          overflow: hidden;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(217, 4, 41, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%);
          border: 1px solid var(--glass-border-gold);
        }
        .flagship-spotlight-info {
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .spotlight-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-gold);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 15px;
          display: inline-block;
          border: 1px solid var(--accent-gold);
          padding: 4px 10px;
          border-radius: 4px;
        }
        .flagship-spotlight-info h3 {
          font-size: 2.6rem;
          margin-bottom: 15px;
          color: white;
        }
        .spotlight-quote {
          font-style: italic;
          color: var(--text-secondary);
          border-left: 2px solid var(--accent-gold);
          padding-left: 15px;
          margin: 15px 0 25px 0;
          font-size: 1rem;
          line-height: 1.6;
        }
        .spotlight-details {
          margin-bottom: 30px;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .spotlight-btn {
          padding: 12px 25px;
          font-size: 0.8rem;
          border-radius: 6px;
        }
        .flagship-spotlight-image {
          height: 100%;
          min-height: 380px;
        }
        .flagship-spotlight-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 992px) {
          .hero-title {
            font-size: 3rem;
          }
          .usps-section {
            grid-template-columns: 1fr;
            margin-top: 20px;
          }
          .categories-grid {
            grid-template-columns: 1fr;
          }
          .category-banner {
            height: 320px;
          }
          .flagship-spotlight-box {
            grid-template-columns: 1fr;
          }
          .flagship-spotlight-image {
            height: 280px;
            min-height: auto;
          }
          .flagship-spotlight-info {
            padding: 30px;
          }
        }
        @media (max-width: 576px) {
          .hero-section {
            padding: 0 5%;
          }
          .hero-title {
            font-size: 2.4rem;
          }
          .hero-ctas {
            flex-direction: column;
            gap: 10px;
          }
          .hero-btn {
            width: 100%;
            text-align: center;
          }
          .category-banner {
            padding: 20px;
          }
          .category-content h3 {
            font-size: 1.8rem;
          }
          .flagship-spotlight-info h3 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
