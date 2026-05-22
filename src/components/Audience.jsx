/**
 * Audience Section Component
 * Target audiences and use cases
 */

export const Audience = () => {
  return (
    <section className="section audience-section" id="who">
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <p className="sec-tag reveal" style={{ justifyContent: 'center' }}>
          Who BE Serves
        </p>
        <h2 className="sec-title reveal reveal-delay-1">
          A platform for <em>every reader.</em>
        </h2>
        <p
          className="sec-desc reveal reveal-delay-2"
          style={{ margin: '20px auto 0', textAlign: 'center' }}
        >
          Whether you're a student clearing your shelf after exams or a reader
          who simply wants affordable books, BE was built for you.
        </p>
      </div>
      <div className="audience-grid">
        <div className="audience-card reveal">
          <span className="aud-emoji">🎓</span>
          <h3>Students</h3>
          <p>
            Swap textbooks and novels after each semester instead of letting
            them collect dust or paying full price every year.
          </p>
        </div>
        <div className="audience-card reveal reveal-delay-1">
          <span className="aud-emoji">📚</span>
          <h3>Casual Readers</h3>
          <p>
            Adults who accumulate books faster than they can reread them and
            want a guilt free way to clear their shelves and discover new
            titles.
          </p>
        </div>
        <div className="audience-card reveal reveal-delay-2">
          <span className="aud-emoji">💰</span>
          <h3>Budget Conscious Buyers</h3>
          <p>
            Anyone looking for a cheaper alternative to buying new books,
            whether fiction, nonfiction, or academic titles across all genres.
          </p>
        </div>
        <div className="audience-card reveal reveal-delay-3">
          <span className="aud-emoji">🌿</span>
          <h3>Eco Conscious Readers</h3>
          <p>
            People who care about sustainability and want their reading habits
            to align with reducing paper waste and environmental impact.
          </p>
        </div>
      </div>
    </section>
  );
};
