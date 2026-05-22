import { useState } from 'react';

export const Checkout = ({ cart, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({ address: '', paymentMethod: 'cash' });
  const [errors, setErrors] = useState({});

  const total = cart.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  const cardStyle = {
    borderRadius: '16px',
    border: '1px solid var(--border)',
    background: 'rgba(13,5,32,0.7)',
    padding: '28px',
    marginBottom: '16px',
  };

  const labelStyle = {
    display: 'block',
    color: 'var(--white)',
    fontWeight: 600,
    marginBottom: '12px',
    fontSize: '0.9rem',
  };

  const radioRowStyle = (checked) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '10px',
    border: checked ? '1px solid var(--bright)' : '1px solid var(--border)',
    background: checked ? 'rgba(139,92,246,0.1)' : 'transparent',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        {/* Order Summary */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)', marginBottom: '16px' }}>
            Order Summary
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {cart.map(item => (
              <div key={item.listingId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(196,165,245,0.7)' }}>
                <span>{item.book.title} × {item.quantity}</span>
                <span>{item.book.price * item.quantity} EGP</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--white)', fontWeight: 700, fontSize: '1rem' }}>Total:</span>
            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.1rem' }}>{total} EGP</span>
          </div>
        </div>

        {/* Delivery Address */}
        <div style={cardStyle}>
          <label style={labelStyle}>Delivery Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full delivery address..."
            rows="4"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(22,10,53,0.6)',
              border: '1px solid rgba(139,92,246,0.3)',
              color: 'var(--white)',
              fontFamily: 'Syne, sans-serif',
              fontSize: '0.9rem',
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
          {errors.address && <p style={{ color: '#fca5a5', fontSize: '0.8rem', marginTop: '8px' }}>{errors.address}</p>}
        </div>

        {/* Payment Method */}
        <div style={cardStyle}>
          <label style={labelStyle}>Payment Method</label>
          <label style={radioRowStyle(formData.paymentMethod === 'cash')}>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={handleChange}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ marginLeft: '12px', color: 'var(--white)', fontSize: '0.9rem' }}>Cash on Delivery</span>
          </label>
          <label style={radioRowStyle(formData.paymentMethod === 'visa')}>
            <input
              type="radio"
              name="paymentMethod"
              value="visa"
              checked={formData.paymentMethod === 'visa'}
              onChange={handleChange}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ marginLeft: '12px', color: 'var(--white)', fontSize: '0.9rem' }}>Visa / Card</span>
          </label>
          {errors.paymentMethod && <p style={{ color: '#fca5a5', fontSize: '0.8rem', marginTop: '8px' }}>{errors.paymentMethod}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '100px',
            background: 'var(--gold)',
            border: 'none',
            color: 'var(--void)',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.5 : 1,
            fontFamily: 'Syne, sans-serif',
          }}
        >
          {isLoading ? 'Processing...' : `Complete Purchase — ${total} EGP`}
        </button>
      </form>
    </div>
  );
};
