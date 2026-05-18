import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import config from '../config.json';

const { colors, brand, navbar, footer } = config;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:5173';

const loginNavConfig = navbar;

const baseInput = {
  width: '100%',
  padding: '8px 12px',
  fontSize: '14px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.10)',
  background: 'rgba(255,255,255,0.06)',
  color: colors.heroText,
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};

function useInputFocus() {
  const [focused, setFocused] = useState(false);
  return {
    style: {
      ...baseInput,
      borderColor: focused ? '#6c63ff' : 'rgba(255,255,255,0.10)',
      boxShadow: focused ? '0 0 0 3px rgba(108,99,255,0.2)' : 'none',
    },
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
  };
}

export default function LoginPage() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [errors,   setErrors]   = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading,  setLoading]  = useState(false);


  const em = useInputFocus();
  const pw = useInputFocus();

  function validate() {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email address';
    if (!password) e.password = 'Password is required';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setApiError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 401) { setApiError('Invalid email or password.'); setLoading(false); return; }
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Sign in failed'); }

      const { access_token, refresh_token } = await res.json();
      const params = new URLSearchParams({ access_token, refresh_token: refresh_token || '', redirect: '/dashboard' });
      window.location.href = `${APP_URL}/auth/callback?${params}`;
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: colors.heroBg, color: colors.heroText }}>
      <Navbar config={loginNavConfig} colors={colors} brand={brand} alwaysOpaque />

      <div className="flex flex-1 items-center justify-center px-6 pt-16">
        <div className="w-full max-w-sm py-12">

          <div className="flex items-center justify-center gap-2.5 mb-8">
            <img src={brand.logo} alt={brand.name} className="w-9 h-9 rounded-xl object-contain" />
            <span className="font-neue font-bold text-xl tracking-tight" style={{ color: '#9aa0ff' }}>{brand.name}</span>
          </div>

          <div className="mb-7 text-center">
            <h2 className="text-2xl font-semibold" style={{ color: colors.heroText }}>Welcome back</h2>
            <p className="text-sm mt-1" style={{ color: colors.heroSubtext }}>Sign in to your account</p>
          </div>

          <div className="rounded-2xl p-6"
               style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.footerBorder}` }}>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: colors.heroText }}>Email</label>
                <input type="email" autoComplete="email" placeholder="you@company.com"
                       value={email} onChange={e => setEmail(e.target.value)}
                       style={em.style} onFocus={em.onFocus} onBlur={em.onBlur} />
                {errors.email && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: colors.heroText }}>Password</label>
                <input type="password" autoComplete="current-password" placeholder="••••••••"
                       value={password} onChange={e => setPassword(e.target.value)}
                       style={pw.style} onFocus={pw.onFocus} onBlur={pw.onBlur} />
                {errors.password && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.password}</p>}
              </div>

              {apiError && (
                <div className="rounded-xl px-3 py-2"
                     style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <p className="text-sm" style={{ color: '#f87171' }}>{apiError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 text-sm font-semibold rounded-xl transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: colors.primaryBtn, color: colors.primaryBtnText }}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className="mt-4 text-center text-sm" style={{ color: colors.heroSubtext }}>
              No account?{' '}
              <Link to="/register" style={{ color: '#9aa0ff' }} className="hover:underline font-medium">Create one</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer config={footer} colors={colors} brand={brand} />
    </div>
  );
}
