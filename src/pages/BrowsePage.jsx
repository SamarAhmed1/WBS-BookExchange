import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from '../utils/backend';
import { SwapModal } from '../components/SwapModal';

export const BrowsePage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [swapCounts, setSwapCounts] = useState({});
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [swapEligibility, setSwapEligibility] = useState(null);
  const [swapLoading, setSwapLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    backend
      .getListings()
      .then(async (listings) => {
        if (!isMounted) return;
        setCards(listings);
        const counts = {};
        for (const listing of listings) {
          counts[listing.id] = await backend.getSwapCount(listing.id);
        }
        if (!isMounted) return;
        setSwapCounts(counts);
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError('Unable to load listings right now. Please try again.');
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const handleBuy = async (book) => {
    try {
      await backend.addToCart(book.id, 1);
      setSuccessMessage(`"${book.title}" added to cart!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
      setError('Failed to add to cart');
    }
  };

  const handleSwap = async (book) => {
    setSelectedBook(book);
    setSwapLoading(true);
    try {
      const eligibility = await backend.getSwapEligibility(book.id);
      setSwapEligibility(eligibility);
      setShowSwapModal(true);
    } catch {
      setError('Failed to check swap eligibility');
    } finally {
      setSwapLoading(false);
    }
  };

  const handleSwapSubmit = async (userBookId) => {
    if (!selectedBook) return;
    setSwapLoading(true);
    try {
      await backend.initiateSwap(selectedBook.id, userBookId);
      setSuccessMessage(`Swap initiated for "${selectedBook.title}"!`);
      setShowSwapModal(false);
      setSelectedBook(null);
      setSwapEligibility(null);
      setTimeout(() => setSuccessMessage(''), 3000);
      const count = await backend.getSwapCount(selectedBook.id);
      setSwapCounts(prev => ({ ...prev, [selectedBook.id]: count }));
    } catch {
      setError('Failed to initiate swap');
    } finally {
      setSwapLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="sec-header">
        <div>
          <p className="sec-tag reveal">Browse</p>
          <h2 className="sec-title reveal reveal-delay-1">
            Featured <em>listings</em> today.
          </h2>
        </div>
        <p className="sec-desc reveal reveal-delay-2">
          Curated books with verified condition and trusted community ratings.
        </p>
      </div>

      {successMessage && (
        <div style={{
          marginBottom: '24px',
          padding: '14px 18px',
          borderRadius: '10px',
          border: '1px solid rgba(74,222,128,0.4)',
          background: 'rgba(74,222,128,0.08)',
          color: '#86efac',
          fontSize: '0.85rem',
        }}>
          ✓ {successMessage}
        </div>
      )}

      {loading && (
        <p style={{ fontSize: '0.85rem', color: 'rgba(196,165,245,0.7)' }}>Loading listings...</p>
      )}
      {error && (
        <p style={{ fontSize: '0.85rem', color: '#fca5a5' }}>{error}</p>
      )}

      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {cards.map((book) => (
            <div
              key={book.id}
              style={{
                borderRadius: '16px',
                border: '1px solid var(--border)',
                background: 'rgba(13,5,32,0.7)',
                padding: '28px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📘</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--white)',
                marginBottom: '4px',
              }}>
                {book.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(196,165,245,0.7)' }}>
                {book.author}
              </p>

              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(196,165,245,0.6)' }}>
                  {book.condition}
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gold)' }}>
                  {book.listingType === 'sell' ? `${book.price} EGP` : 'Swap Available'}
                </span>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
                {book.listingType === 'sell' && (
                  <button
                    onClick={() => handleBuy(book)}
                    style={{
                      width: '100%',
                      borderRadius: '100px',
                      background: 'var(--gold)',
                      border: 'none',
                      color: 'var(--void)',
                      fontWeight: 700,
                      padding: '10px 16px',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      fontFamily: 'Syne, sans-serif',
                      transition: 'background 0.2s',
                    }}
                  >
                    Add to Cart
                  </button>
                )}
                <button
                  onClick={() => handleSwap(book)}
                  disabled={swapLoading}
                  style={{
                    width: '100%',
                    borderRadius: '100px',
                    border: '1px solid rgba(139,92,246,0.4)',
                    background: 'transparent',
                    color: 'var(--white)',
                    padding: '10px 16px',
                    fontSize: '0.85rem',
                    cursor: swapLoading ? 'not-allowed' : 'pointer',
                    opacity: swapLoading ? 0.5 : 1,
                    fontFamily: 'Syne, sans-serif',
                    transition: 'background 0.2s',
                  }}
                >
                  {book.listingType === 'swap' ? 'Request Swap' : 'Swap Instead'}
                  {swapCounts[book.id] ? ` (${swapCounts[book.id]})` : ''}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Button */}
      <button
        onClick={() => navigate('/cart')}
        title="View Cart"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--gold)',
          border: 'none',
          color: 'var(--void)',
          fontSize: '1.3rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(245,200,66,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        🛒
      </button>

      {showSwapModal && selectedBook && swapEligibility && (
        <SwapModal
          listing={selectedBook}
          eligibility={swapEligibility}
          onSubmit={handleSwapSubmit}
          onCancel={() => {
            setShowSwapModal(false);
            setSelectedBook(null);
            setSwapEligibility(null);
          }}
          isLoading={swapLoading}
        />
      )}
    </section>
  );
};
