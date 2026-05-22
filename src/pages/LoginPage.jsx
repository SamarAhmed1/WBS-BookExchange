import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from '../utils/backend';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Please enter a valid email address';
    if (!formData.password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      await backend.login(formData.email.trim(), formData.password);
      navigate('/browse');
    } catch (err) {
      setApiError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
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

  const errorStyle = { marginTop: '6px', fontSize: '0.75rem', color: '#f87171', fontWeight: 600 };

  return (
    <section style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg,rgba(13,5,32,0.97) 0%,rgba(30,15,55,0.97) 100%)',
      overflowY: 'auto', padding: '32px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📚</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', fontWeight: 900, color: 'var(--white)', marginBottom: '8px' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'rgba(196,165,245,0.6)', fontSize: '0.95rem' }}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div style={{
          borderRadius: '20px', border: '1px solid rgba(139,92,246,0.3)',
          background: 'rgba(13,5,32,0.85)', backdropFilter: 'blur(12px)',
          padding: '40px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}>
          {apiError && (
            <div style={{ borderRadius: '10px', border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.08)', padding: '14px', marginBottom: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: '#fca5a5' }}>{apiError}</p>
            </div>
          )}

          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleSubmit} noValidate>
            <div>
              <label style={labelStyle}>📧 Email Address</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="you@example.com" />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>

            <div>
              <label style={labelStyle}>🔐 Password</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange} style={inputStyle} placeholder="••••••••" />
              {errors.password && <p style={errorStyle}>{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--royal), var(--bright))',
                border: 'none', padding: '14px',
                fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                fontFamily: 'Syne, sans-serif', boxShadow: '0 8px 30px rgba(139,92,246,0.3)',
              }}
            >
              {loading ? '⏳ Signing In...' : 'Sign In'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(196,165,245,0.6)' }}>
              Don't have an account?{' '}
              <span
                onClick={() => navigate('/signup')}
                style={{ color: 'var(--bright)', fontWeight: 700, cursor: 'pointer' }}
              >
                Create one
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
