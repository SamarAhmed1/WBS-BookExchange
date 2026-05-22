import { useState } from 'react';
import { backend } from '../utils/backend';

export const ListPage = () => {
  const [values, setValues] = useState({
    title: '',
    author: '',
    condition: '',
    listingType: 'swap',
    price: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.title.trim()) nextErrors.title = 'Title is required.';
    if (!values.author.trim()) nextErrors.author = 'Author is required.';
    if (!values.condition) nextErrors.condition = 'Select a condition.';
    if (values.listingType === 'sell') {
      const priceNum = Number(values.price);
      if (!values.price || Number.isNaN(priceNum) || priceNum <= 0) {
        nextErrors.price = 'Enter a valid price for selling.';
      }
    }
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      const payload = {
        title: values.title.trim(),
        author: values.author.trim(),
        condition: values.condition,
        listingType: values.listingType,
        price: values.listingType === 'sell' ? Number(values.price) : null
      };
      try {
        await backend.createListing(payload);
        setSubmitted(true);
        setApiError('');
        setValues({ title: '', author: '', condition: '', listingType: 'swap', price: '' });
      } catch (err) {
        setApiError(err.message === 'Not authorized, no token'
          ? 'You must be logged in to list a book.'
          : err.message || 'Failed to submit listing.');
      }
    }
  };

  const inputStyle = {
    width: '100%',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    background: 'rgba(6,3,15,0.5)',
    padding: '12px 16px',
    color: 'var(--white)',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'Syne, sans-serif',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'rgba(196,165,245,0.6)',
    marginBottom: '10px',
  };

  const errorStyle = {
    marginTop: '6px',
    fontSize: '0.75rem',
    color: '#f87171',
    fontWeight: 600,
  };

  const conditionBtn = (cond) => ({
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: values.condition === cond
      ? '1px solid var(--bright)'
      : '1px solid var(--border)',
    background: values.condition === cond
      ? 'rgba(139,92,246,0.8)'
      : 'rgba(6,3,15,0.4)',
    color: values.condition === cond ? '#fff' : 'rgba(196,165,245,0.7)',
    fontFamily: 'Syne, sans-serif',
    transition: 'all 0.2s',
  });

  const typeBtn = (id) => ({
    borderRadius: '10px',
    padding: '14px',
    textAlign: 'center',
    cursor: 'pointer',
    border: values.listingType === id
      ? '1px solid var(--bright)'
      : '1px solid var(--border)',
    background: values.listingType === id
      ? 'rgba(139,92,246,0.8)'
      : 'rgba(6,3,15,0.4)',
    color: values.listingType === id ? '#fff' : 'rgba(196,165,245,0.7)',
    fontFamily: 'Syne, sans-serif',
    transition: 'all 0.2s',
  });

  return (
    <section style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg,rgba(13,5,32,0.97) 0%,rgba(30,15,55,0.97) 100%)',
      overflowY: 'auto',
      padding: '32px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: '560px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📚</div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.4rem',
            fontWeight: 900,
            color: 'var(--white)',
            marginBottom: '8px',
          }}>List a Book</h1>
          <p style={{ color: 'rgba(196,165,245,0.6)', fontSize: '0.95rem' }}>Share your next great read</p>
        </div>

        {/* Card */}
        <div style={{
          borderRadius: '20px',
          border: '1px solid rgba(139,92,246,0.3)',
          background: 'rgba(13,5,32,0.85)',
          backdropFilter: 'blur(12px)',
          padding: '40px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}>
          {apiError && (
            <div style={{ borderRadius: '10px', border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.08)', padding: '14px', marginBottom: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: '#fca5a5' }}>{apiError}</p>
            </div>
          )}

          {submitted && (
            <div style={{
              borderRadius: '10px',
              border: '1px solid rgba(74,222,128,0.4)',
              background: 'rgba(74,222,128,0.1)',
              padding: '16px',
              marginBottom: '24px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '0.85rem', color: '#86efac', fontWeight: 600 }}>
                ✅ Listing submitted successfully!
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(134,239,172,0.7)', marginTop: '4px' }}>
                We'll review it shortly
              </p>
            </div>
          )}

          <form style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} onSubmit={handleSubmit} noValidate>
            {/* Title */}
            <div>
              <label style={labelStyle}>📚 Book Title</label>
              <input id="title" name="title" value={values.title} onChange={handleChange} style={inputStyle} placeholder="The Kite Runner" />
              {errors.title && <p style={errorStyle}>{errors.title}</p>}
            </div>

            {/* Author */}
            <div>
              <label style={labelStyle}>✍️ Author</label>
              <input id="author" name="author" value={values.author} onChange={handleChange} style={inputStyle} placeholder="Naguib Mahfouz" />
              {errors.author && <p style={errorStyle}>{errors.author}</p>}
            </div>

            {/* Condition */}
            <div>
              <label style={labelStyle}>⭐ Book Condition</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' }}>
                {['Like New', 'Very Good', 'Good', 'Fair'].map((cond) => (
                  <button key={cond} type="button" onClick={() => setValues({ ...values, condition: cond })} style={conditionBtn(cond)}>
                    {cond}
                  </button>
                ))}
              </div>
              {errors.condition && <p style={errorStyle}>{errors.condition}</p>}
            </div>

            {/* Listing Type */}
            <div>
              <label style={labelStyle}>🔄 Listing Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[{ id: 'swap', label: 'Swap', desc: 'Trade for another book' }, { id: 'sell', label: 'Sell', desc: 'Set your price' }].map((type) => (
                  <button key={type.id} type="button" onClick={() => setValues({ ...values, listingType: type.id })} style={typeBtn(type.id)}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{type.label}</div>
                    <div style={{ fontSize: '0.72rem', marginTop: '4px', opacity: 0.7 }}>{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            {values.listingType === 'sell' && (
              <div>
                <label style={labelStyle}>💵 Price (EGP)</label>
                <input id="price" name="price" type="number" value={values.price} onChange={handleChange} style={inputStyle} placeholder="80" min="1" />
                {errors.price && <p style={errorStyle}>{errors.price}</p>}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitted}
              style={{
                width: '100%',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--royal), var(--bright))',
                border: 'none',
                padding: '14px',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#fff',
                cursor: submitted ? 'not-allowed' : 'pointer',
                opacity: submitted ? 0.6 : 1,
                fontFamily: 'Syne, sans-serif',
                boxShadow: '0 8px 30px rgba(139,92,246,0.3)',
                transition: 'all 0.2s',
              }}
            >
              {submitted ? '✓ Listing Submitted!' : 'Submit Listing'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
