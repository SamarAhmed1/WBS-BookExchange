/**
 * Footer Component
 * Site footer with links and social buttons
 */

import { NavLink } from 'react-router-dom';

export const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <NavLink to="/" className="logo">
            BE
          </NavLink>
          <p className="footer-tagline">
            Egypt's book exchange platform. Swap, buy, sell, and deliver
            secondhand books across the country.
          </p>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li>
              <button
                className="footer-link"
                onClick={() => scrollTo('how')}
              >
                How it Works
              </button>
            </li>
            <li>
              <NavLink to="/browse">Browse Books</NavLink>
            </li>
            <li>
              <NavLink to="/list">List a Book</NavLink>
            </li>
            <li>
              <button
                className="footer-link"
                onClick={() => scrollTo('offers')}
              >
                Delivery Info
              </button>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <NavLink to="/browse">About BE</NavLink>
            </li>
            <li>
              <NavLink to="/browse">Our Mission</NavLink>
            </li>
            <li>
              <NavLink to="/browse">Partners</NavLink>
            </li>
            <li>
              <NavLink to="/browse">Press</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>
              <NavLink to="/browse">Help Centre</NavLink>
            </li>
            <li>
              <NavLink to="/browse">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/browse">Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to="/browse">Terms of Use</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 BE Book Exchange. Made in Egypt 🇪🇬</span>
        <div className="footer-socials">
          <a href="#" className="social-btn">
            📸
          </a>
          <a href="#" className="social-btn">
            👥
          </a>
          <a href="#" className="social-btn">
            🎵
          </a>
        </div>
      </div>
    </footer>
  );
};
