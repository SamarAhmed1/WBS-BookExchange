export const Cart = ({ items, onRemove, onQuantityChange }) => {
  if (!items || items.length === 0) {
    return (
      <div style={{
        borderRadius: '16px',
        border: '1px solid var(--border)',
        background: 'rgba(13,5,32,0.7)',
        padding: '36px',
        textAlign: 'center',
      }}>
        <p style={{ color: 'rgba(196,165,245,0.7)' }}>Your cart is empty</p>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);

  const qtyBtnStyle = {
    padding: '4px 10px',
    borderRadius: '6px',
    border: '1px solid rgba(139,92,246,0.3)',
    background: 'transparent',
    color: 'var(--white)',
    cursor: 'pointer',
    fontFamily: 'Syne, sans-serif',
    fontSize: '0.9rem',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {items.map((item) => (
        <div
          key={item.listingId}
          style={{
            borderRadius: '16px',
            border: '1px solid var(--border)',
            background: 'rgba(13,5,32,0.7)',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)', marginBottom: '4px' }}>
              {item.book.title}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'rgba(196,165,245,0.7)' }}>{item.book.author}</p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(196,165,245,0.5)', marginTop: '4px' }}>
              {item.book.price} EGP each
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => onQuantityChange(item.listingId, item.quantity - 1)}
                disabled={item.quantity <= 1}
                style={{ ...qtyBtnStyle, opacity: item.quantity <= 1 ? 0.4 : 1 }}
              >
                −
              </button>
              <span style={{ width: '28px', textAlign: 'center', color: 'var(--white)', fontSize: '0.9rem' }}>
                {item.quantity}
              </span>
              <button onClick={() => onQuantityChange(item.listingId, item.quantity + 1)} style={qtyBtnStyle}>
                +
              </button>
            </div>

            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold)', minWidth: '80px', textAlign: 'right' }}>
              {item.book.price * item.quantity} EGP
            </p>

            <button
              onClick={() => onRemove(item.listingId)}
              style={{
                padding: '6px 14px',
                borderRadius: '100px',
                border: '1px solid rgba(239,68,68,0.5)',
                background: 'transparent',
                color: '#fca5a5',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div style={{
        borderRadius: '16px',
        border: '1px solid rgba(139,92,246,0.3)',
        background: 'rgba(13,5,32,0.5)',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '1rem', color: 'var(--white)', fontWeight: 600 }}>Total:</span>
        <span style={{ fontSize: '1.5rem', color: 'var(--gold)', fontWeight: 700 }}>{total} EGP</span>
      </div>
    </div>
  );
};
