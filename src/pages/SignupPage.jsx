import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from '../utils/backend';

export const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const getPasswordStrength = (password) => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (password.length >= 12) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return Math.min(s, 4);
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) e.firstName = 'First name must be at least 2 characters';
    if (!formData.lastName.trim() || formData.lastName.trim().length < 2) e.lastName = 'Last name must be at least 2 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Please enter a valid email address';
    if (!formData.password || formData.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!formData.agreeTerms) e.agreeTerms = 'You must agree to the terms to continue';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const name = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      await backend.register(name, formData.email.trim(), formData.password);
      setSubmitted(true);
      setTimeout(() => navigate('/list'), 1500);
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
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
      <div style={{ width: '100%', maxWidth: '480px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📚</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', fontWeight: 900, color: 'var(--white)', marginBottom: '8px' }}>
            Create Account
          </h1>
          <p style={{ color: 'rgba(196,165,245,0.6)', fontSize: '0.95rem' }}>Join thousands swapping great books</p>
        </div>

        {/* Card */}
        <div style={{
          borderRadius: '20px', border: '1px solid rgba(139,92,246,0.3)',
          background: 'rgba(13,5,32,0.85)', backdropFilter: 'blur(12px)',
          padding: '40px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}>
          {submitted && (
            <div style={{ borderRadius: '10px', border: '1px solid rgba(74,222,128,0.4)', background: 'rgba(74,222,128,0.1)', padding: '16px', marginBottom: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: '#86efac', fontWeight: 600 }}>✅ Account created successfully!</p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(134,239,172,0.7)', marginTop: '4px' }}>Redirecting...</p>
            </div>
          )}

          {apiError && (
            <div style={{ borderRadius: '10px', border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.08)', padding: '14px', marginBottom: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: '#fca5a5' }}>{apiError}</p>
            </div>
          )}

          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleSubmit} noValidate>
            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} style={inputStyle} placeholder="Ahmed" />
                {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} style={inputStyle} placeholder="Hassan" />
                {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>📧 Email Address</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="you@example.com" />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>🔐 Password</label>
                {formData.password && (
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: strengthColors[passwordStrength] }}>
                    {strengthLabels[passwordStrength]}
                  </span>
                )}
              </div>
              <input name="password" type="password" value={formData.password} onChange={handleChange} style={inputStyle} placeholder="••••••••" />
              {formData.password && (
                <div style={{ marginTop: '10px', height: '4px', background: 'rgba(139,92,246,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '4px', background: strengthColors[passwordStrength], width: `${(passwordStrength / 4) * 100}%`, transition: 'width 0.3s' }} />
                </div>
              )}
              {errors.password && <p style={errorStyle}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={labelStyle}>✓ Confirm Password</label>
              <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} style={inputStyle} placeholder="••••••••" />
              {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', borderRadius: '10px', background: 'rgba(139,92,246,0.08)', border: '1px solid var(--border)' }}>
              <input id="agreeTerms" name="agreeTerms" type="checkbox" checked={formData.agreeTerms} onChange={handleChange} style={{ marginTop: '2px', cursor: 'pointer', accentColor: 'var(--bright)', width: '16px', height: '16px' }} />
              <label htmlFor="agreeTerms" style={{ fontSize: '0.8rem', color: 'rgba(196,165,245,0.8)', cursor: 'pointer', lineHeight: 1.6 }}>
                I agree to the <span style={{ color: 'var(--bright)', fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: 'var(--bright)', fontWeight: 600 }}>Privacy Policy</span>
              </label>
            </div>
            {errors.agreeTerms && <p style={{ ...errorStyle, marginTop: '-16px' }}>{errors.agreeTerms}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || submitted}
              style={{
                width: '100%', borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--royal), var(--bright))',
                border: 'none', padding: '14px',
                fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#fff', cursor: (loading || submitted) ? 'not-allowed' : 'pointer',
                opacity: (loading || submitted) ? 0.6 : 1,
                fontFamily: 'Syne, sans-serif', boxShadow: '0 8px 30px rgba(139,92,246,0.3)',
              }}
            >
              {loading ? '⏳ Creating Account...' : submitted ? '✓ Account Created!' : 'Create Free Account'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(196,165,245,0.6)' }}>
              Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                style={{ color: 'var(--bright)', fontWeight: 700, cursor: 'pointer' }}
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
