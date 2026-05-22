/**
 * NavBar Component
 * Main navigation with logo, links, and action buttons
 */

import { NavLink, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  return (
    <nav>
      <NavLink to="/" className="logo">
        BE
      </NavLink>
      <ul className="nav-center">
        <li>
          <button className="nav-link" onClick={() => scrollTo('how')}>
            How it Works
          </button>
        </li>
        <li>
          <button className="nav-link" onClick={() => scrollTo('offers')}>
            What We Offer
          </button>
        </li>
        <li>
          <button className="nav-link" onClick={() => scrollTo('who')}>
            Who We Serve
          </button>
        </li>
      </ul>
      <div className="nav-right">
        <NavLink to="/browse" className="btn-outline">
          Browse
        </NavLink>
        <NavLink to="/list" className="btn-filled">
          List a Book
        </NavLink>
      </div>
    </nav>
  );
};
