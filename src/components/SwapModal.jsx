import { useState } from 'react';

export const SwapModal = ({ listing, eligibility, onSubmit, onCancel, isLoading }) => {
  const [selectedBookId, setSelectedBookId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBookId) {
      setError('Please select a book to swap');
      return;
    }
    onSubmit(selectedBookId);
  };

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
  };

  const modalStyle = {
    background: 'rgba(13,5,32,0.97)',
    borderRadius: '20px',
    border: '1px solid var(--border)',
    padding: '36px',
    width: '100%',
    maxWidth: '460px',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
  };

  if (!eligibility.eligible) {
    return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--white)',
            marginBottom: '14px',
          }}>Swap Not Available</h2>
          <p style={{ color: 'rgba(196,165,245,0.7)', marginBottom: '24px', lineHeight: 1.65, fontSize: '0.9rem' }}>
            {eligibility.reason}
          </p>
          <button
            onClick={onCancel}
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '100px',
              border: '1px solid rgba(139,92,246,0.4)',
              background: 'transparent',
              color: 'var(--white)',
              fontFamily: 'Syne, sans-serif',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--white)',
          marginBottom: '8px',
        }}>Swap for {listing.title}</h2>
        <p style={{ color: 'rgba(196,165,245,0.7)', marginBottom: '24px', fontSize: '0.85rem' }}>
          {eligibility.message}
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={{
              display: 'block',
              color: 'var(--white)',
              fontWeight: 600,
              marginBottom: '12px',
              fontSize: '0.9rem',
            }}>
              Select a book from your collection:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {eligibility.availableBooks.map(book => (
                <label
                  key={book.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '12px',
                    borderRadius: '10px',
                    border: selectedBookId === book.id
                      ? '1px solid var(--bright)'
                      : '1px solid var(--border)',
                    background: selectedBookId === book.id
                      ? 'rgba(139,92,246,0.1)'
                      : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    name="bookToSwap"
                    value={book.id}
                    checked={selectedBookId === book.id}
                    onChange={(e) => { setSelectedBookId(e.target.value); setError(''); }}
                    style={{ marginTop: '3px', cursor: 'pointer' }}
                  />
                  <div style={{ marginLeft: '12px' }}>
                    <p style={{ color: 'var(--white)', fontWeight: 600, fontSize: '0.9rem' }}>{book.title}</p>
                    <p style={{ color: 'rgba(196,165,245,0.6)', fontSize: '0.8rem' }}>{book.author}</p>
                    <p style={{ color: 'rgba(196,165,245,0.5)', fontSize: '0.75rem', marginTop: '2px' }}>
                      Condition: {book.condition}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            {error && (
              <p style={{ color: '#fca5a5', fontSize: '0.8rem', marginTop: '8px' }}>{error}</p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '100px',
                border: '1px solid rgba(139,92,246,0.4)',
                background: 'transparent',
                color: 'var(--white)',
                fontFamily: 'Syne, sans-serif',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '100px',
                background: 'var(--gold)',
                border: 'none',
                color: 'var(--void)',
                fontWeight: 700,
                fontFamily: 'Syne, sans-serif',
                fontSize: '0.85rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              {isLoading ? 'Processing...' : 'Confirm Swap'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
