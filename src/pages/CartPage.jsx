import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart } from '../components/Cart';
import { Checkout } from '../components/Checkout';
import { backend } from '../utils/backend';

export const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [step, setStep] = useState('review');
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartItems = await backend.getCart();
        setCart(cartItems);
        setLoading(false);
      } catch {
        setError('Failed to load cart');
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const handleRemoveFromCart = async (listingId) => {
    try {
      const updated = await backend.removeFromCart(listingId);
      setCart(updated);
    } catch {
      setError('Failed to remove item');
    }
  };

  const handleQuantityChange = (listingId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.listingId === listingId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleCheckout = async (billingInfo) => {
    setSubmitting(true);
    try {
      const order = await backend.createOrder(cart, billingInfo);
      setOrderSuccess(order);
      setStep('success');
      setCart([]);
    } catch (err) {
      setError('Failed to create order: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const cardStyle = {
    borderRadius: '16px',
    border: '1px solid var(--border)',
    background: 'rgba(13,5,32,0.7)',
    padding: '36px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
  };

  const btnGold = {
    borderRadius: '100px',
    background: 'var(--gold)',
    border: 'none',
    color: 'var(--void)',
    fontWeight: 700,
    padding: '12px 28px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    fontFamily: 'Syne, sans-serif',
  };

  const btnOutline = {
    borderRadius: '100px',
    border: '1px solid rgba(139,92,246,0.4)',
    background: 'transparent',
    color: 'var(--white)',
    padding: '12px 28px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    fontFamily: 'Syne, sans-serif',
  };

  if (orderSuccess) {
    return (
      <section className="section">
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>✓</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--white)', marginBottom: '8px' }}>
              Order Confirmed!
            </h2>
            <p style={{ color: 'rgba(196,165,245,0.7)', marginBottom: '24px' }}>
              Thank you for your order. Order ID: <span style={{ fontFamily: 'monospace' }}>{orderSuccess.id}</span>
            </p>
            <div style={{ background: 'rgba(22,10,53,0.6)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ color: 'var(--white)', marginBottom: '8px' }}>
                <strong>Delivery Address:</strong> {orderSuccess.deliveryAddress}
              </p>
              <p style={{ color: 'var(--white)', marginBottom: '8px' }}>
                <strong>Payment Method:</strong> {orderSuccess.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Visa/Card'}
              </p>
              <p style={{ color: 'var(--gold)', fontWeight: 700 }}>
                <strong>Total:</strong> {orderSuccess.total} EGP
              </p>
            </div>
            <button onClick={() => navigate('/browse')} style={btnGold}>
              Continue Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="sec-header">
        <div>
          <p className="sec-tag reveal">Shopping</p>
          <h2 className="sec-title reveal reveal-delay-1">Your <em>cart</em></h2>
        </div>
      </div>

      {loading && <p style={{ fontSize: '0.85rem', color: 'rgba(196,165,245,0.7)' }}>Loading cart...</p>}
      {error && <p style={{ fontSize: '0.85rem', color: '#fca5a5' }}>{error}</p>}

      {!loading && !error && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {cart.length === 0 ? (
            <div style={{ ...cardStyle, textAlign: 'center' }}>
              <p style={{ color: 'rgba(196,165,245,0.7)', marginBottom: '24px', fontSize: '1rem' }}>Your cart is empty</p>
              <button onClick={() => navigate('/browse')} style={btnOutline}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {step === 'review' && (
                <>
                  <Cart items={cart} onRemove={handleRemoveFromCart} onQuantityChange={handleQuantityChange} />
                  <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
                    <button onClick={() => navigate('/browse')} style={{ ...btnOutline, flex: 1 }}>
                      Continue Shopping
                    </button>
                    <button onClick={() => setStep('checkout')} style={{ ...btnGold, flex: 1 }}>
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}

              {step === 'checkout' && (
                <>
                  <Checkout cart={cart} onSubmit={handleCheckout} isLoading={submitting} />
                  <div style={{ marginTop: '16px' }}>
                    <button onClick={() => setStep('review')} style={{ ...btnOutline, width: '100%' }}>
                      Back to Cart
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
};
