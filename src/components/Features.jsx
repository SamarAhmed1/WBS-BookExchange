/**
 * Features Section Component
 * Key features and reasons to choose BE
 */

export const Features = () => {
  return (
    <section className="section features-section">
      <div className="sec-header">
        <div>
          <p className="sec-tag reveal">Why Choose BE</p>
          <h2 className="sec-title reveal reveal-delay-1">
            Built different.
            <br />
            For <em>Egyptian</em> readers.
          </h2>
        </div>
        <p className="sec-desc reveal reveal-delay-2">
          Every feature is designed around what Egyptian readers actually need,
          from local logistics partners to community trust tools that protect
          every transaction.
        </p>
      </div>
      <div className="features-grid">
        <div className="feature-cell reveal">
          <div className="feature-num">01</div>
          <div className="feat-icon">📚</div>
          <h3>3 in 1 Platform</h3>
          <p>
            Swap, buy and sell, and on demand delivery all in one seamless
            experience. No other platform in Egypt offers all three together.
          </p>
        </div>
        <div className="feature-cell reveal reveal-delay-1">
          <div className="feature-num">02</div>
          <div className="feat-icon">🌿</div>
          <h3>Eco First Brand</h3>
          <p>
            Every exchange extends a book's life and keeps paper out of
            landfill. Reading that aligns with your values, not against them.
          </p>
        </div>
        <div className="feature-cell reveal reveal-delay-2">
          <div className="feature-num">03</div>
          <div className="feat-icon">📍</div>
          <h3>Local First Community</h3>
          <p>
            Built around Egyptian readers with local logistics partners and a
            growing community of people who love books and sharing them.
          </p>
        </div>
        <div className="feature-cell reveal">
          <div className="feature-num">04</div>
          <div className="feat-icon">🔒</div>
          <h3>Trust and Safety</h3>
          <p>
            Reviews, ratings, verified listings and dispute resolution built in.
            Every transaction is protected from listing all the way to delivery.
          </p>
        </div>
        <div className="feature-cell reveal reveal-delay-1">
          <div className="feature-num">05</div>
          <div className="feat-icon">⚡</div>
          <h3>Instant Matching</h3>
          <p>
            The smart matching engine surfaces the right books and the right
            readers in seconds, not days. Fast, relevant, and accurate.
          </p>
        </div>
        <div className="feature-cell reveal reveal-delay-2">
          <div className="feature-num">06</div>
          <div className="feat-icon">💜</div>
          <h3>Premium Listings</h3>
          <p>
            Sellers who want faster results can boost their visibility with
            premium listings and reach more readers across the platform.
          </p>
        </div>
      </div>
    </section>
  );
};
