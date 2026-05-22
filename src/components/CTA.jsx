/**
 * CTA Section Component
 * Call to action section
 */

import { NavLink } from 'react-router-dom';

export const CTA = () => {
  return (
    <section className="cta-wrapper" id="join">
      <div className="cta-block">
        <div className="cta-eyebrow">✦ Join BE Today</div>
        <h2>
          Your next favourite book is
          <br />
          <em>already on someone's shelf.</em>
        </h2>
        <p>
          Sign up free, list your first book in minutes, and start connecting
          with readers across Egypt today. No credit card required.
        </p>
        <div className="cta-buttons">
          <NavLink to="/signup" className="btn-cta-main">
            Create Free Account →
          </NavLink>
          <NavLink to="/browse" className="btn-cta-sec">
            Browse Books
          </NavLink>
        </div>
      </div>
    </section>
  );
};
