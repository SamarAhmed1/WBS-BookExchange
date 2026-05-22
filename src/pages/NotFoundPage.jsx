/**
 * Not Found Page Component
 * 404 page for invalid routes
 */

export const NotFoundPage = () => {
  return (
    <section className="section">
      <div className="sec-header">
        <div>
          <p className="sec-tag">Not Found</p>
          <h2 className="sec-title">Page not found.</h2>
        </div>
        <p className="sec-desc">The page you are looking for does not exist.</p>
      </div>
    </section>
  );
};
