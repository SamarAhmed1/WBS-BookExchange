/**
 * Offers Section Component
 * Platform features and offerings
 */

import { NavLink } from 'react-router-dom';

export const Offers = () => {
  return (
    <section className="section offers-bg" id="offers">
      <div className="offers-layout">
        <div>
          <p className="sec-tag reveal">What BE Offers</p>
          <h2 className="sec-title reveal reveal-delay-1">
            One platform.
            <br />
            <em>Three powerful</em>
            <br />
            ways to exchange.
          </h2>
          <p className="sec-desc reveal reveal-delay-2" style={{ marginTop: '24px' }}>
            Most platforms force you to choose between donating, selling, or
            buying. BE is the only place where you get all three in one seamless
            experience, with delivery built in from day one.
          </p>
          <div style={{ marginTop: '40px' }} className="reveal reveal-delay-3">
            <NavLink
              to="/browse"
              className="btn-filled"
              style={{ padding: '14px 32px', fontSize: '0.9rem' }}
            >
              Explore the Platform →
            </NavLink>
          </div>
        </div>
        <div className="offers-cards reveal reveal-delay-1">
          <div className="offer-tile featured">
            <div>
              <span className="offer-icon2">🔄</span>
              <h3>Free Book Swapping</h3>
              <p>
                List a book you no longer need and swap it directly with another
                reader. No money involved, just books finding new homes and new
                readers.
              </p>
              <span className="offer-chip">Always Free</span>
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: '24px',
                background: 'rgba(139,92,246,0.08)',
                borderRadius: '12px',
                border: '1px solid rgba(139,92,246,0.2)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🤝</div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: '2.2rem',
                  fontWeight: 700,
                  color: 'var(--bright)'
                }}
              >
                1,200+
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginTop: '6px'
                }}
              >
                Swaps Completed
              </div>
            </div>
          </div>
          <div className="offer-tile">
            <span className="offer-icon2">🏷️</span>
            <h3>Buy and Sell</h3>
            <p>
              Sell books you are done with or find affordable secondhand copies
              at a fraction of what new books cost in stores.
            </p>
            <span className="offer-chip gold-chip">Low Commission</span>
          </div>
          <div className="offer-tile">
            <span className="offer-icon2">🛵</span>
            <h3>Doorstep Delivery</h3>
            <p>
              No meetups required. Request delivery for any swap or purchase and
              get it brought straight to your door.
            </p>
            <span className="offer-chip">Via Bosta and Aramex</span>
          </div>
        </div>
      </div>
    </section>
  );
};
