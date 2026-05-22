/**
 * Steps Section Component
 * How it works - 4 step process
 */

export const Steps = () => {
  return (
    <section className="section" id="how">
      <div className="sec-header">
        <div>
          <p className="sec-tag reveal">The Process</p>
          <h2 className="sec-title reveal reveal-delay-1">
            From your shelf
            <br />
            to <em>someone new.</em>
          </h2>
        </div>
        <p className="sec-desc reveal reveal-delay-2">
          List your book once. The platform handles the matching, the
          messaging, and the logistics. You only need to hand it over.
        </p>
      </div>
      <div className="steps-grid">
        <div className="step-card reveal">
          <div className="step-node">01</div>
          <span className="step-icon2">📸</span>
          <h3>List Your Book</h3>
          <p>
            Upload a photo, add the title and condition. Takes under two
            minutes and your listing goes live instantly for the whole
            community to see.
          </p>
        </div>
        <div className="step-card reveal reveal-delay-1">
          <div className="step-node">02</div>
          <span className="step-icon2">🔍</span>
          <h3>Get Matched</h3>
          <p>
            The platform surfaces readers who want your book or have something
            you would love to read next. Smart matching built in.
          </p>
        </div>
        <div className="step-card reveal reveal-delay-2">
          <div className="step-node">03</div>
          <span className="step-icon2">✅</span>
          <h3>Confirm the Deal</h3>
          <p>
            Both parties confirm through the platform. Secure chat, transparent
            terms and full dispute protection built in from the start.
          </p>
        </div>
        <div className="step-card reveal reveal-delay-3">
          <div className="step-node">04</div>
          <span className="step-icon2">📦</span>
          <h3>Deliver or Collect</h3>
          <p>
            Arrange your own pickup or let BE handle it end to end via Bosta or
            Aramex, delivered straight to the door.
          </p>
        </div>
      </div>
    </section>
  );
};
