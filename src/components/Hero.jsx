/**
 * Hero Section Component
 * Main landing hero section with call-to-action
 */

import { NavLink } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-glow"></div>
      <div className="hero-glow2"></div>
      <div className="hero-content">
        <div className="hero-pill">
          <span className="dot"></span> Egypt's First Book Exchange Platform
        </div>
        <h1>
          Give every book
          <br />
          <span className="line2">a second life.</span>
        </h1>
        <p className="hero-sub">
          Swap finished books for free, buy and sell secondhand copies, and get
          doorstep delivery anywhere in Egypt. Reading made smarter and kinder
          to the planet.
        </p>
        <div className="hero-actions">
          <NavLink to="/signup" className="btn-hero">
            Start Swapping <span className="arrow">→</span>
          </NavLink>
          <button
            className="btn-ghost2"
            onClick={() =>
              document
                .getElementById('how')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            How it works
          </button>
        </div>
        <div className="hero-metrics">
          <div className="metric">
            <span className="metric-val">
              <span className="accent">3</span>in1
            </span>
            <span className="metric-label">Swap · Buy · Sell</span>
          </div>
          <div className="metric">
            <span className="metric-val">
              <span className="accent">0</span>EGP
            </span>
            <span className="metric-label">To Swap a Book</span>
          </div>
          <div className="metric">
            <span className="metric-val">🇪🇬</span>
            <span className="metric-label">Local Delivery</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="book-3d-scene">
          <div className="floating-card card-main">
            <div className="book-cover">📖</div>
            <div className="book-title">The Kite Runner</div>
            <div className="book-author">Khaled Hosseini</div>
            <div className="swap-badge">🔄 Available to Swap</div>
          </div>
          <div className="floating-card card-sm1">
            <div className="mini-avatar">👤</div>
            <div>
              <div className="cname">Sara M.</div>
              <div className="action">Listed 3 books</div>
            </div>
          </div>
          <div className="floating-card card-sm2">
            <div className="eco-num">847</div>
            <div className="eco-label">Books Saved</div>
          </div>
        </div>
      </div>
    </section>
  );
};
