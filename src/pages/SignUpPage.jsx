import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import config from '../config.json';

const { colors, brand, navbar, footer } = config;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:5173';

const signUpNavConfig = navbar;

// ---------------------------------------------------------------------------
// Input helpers
// ---------------------------------------------------------------------------
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
      boxShadow:   focused ? '0 0 0 3px rgba(108,99,255,0.2)' : 'none',
    },
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
  };
}

function Field({ label, optional, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: colors.heroText }}>
        {label}
        {optional && <span className="font-normal ml-1" style={{ color: colors.heroSubtext }}>(optional)</span>}
      </label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{error}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Integration logo SVGs
// ---------------------------------------------------------------------------
function QuickBooksLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="26" fill="#2CA01C" />
      <path d="M17 18h11a7 7 0 010 14h-5v-4h5a3 3 0 000-6H21v14h-4V18z" fill="white" />
      <circle cx="34" cy="36" r="4" fill="white" />
    </svg>
  );
}

function StripeLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="12" fill="#635BFF" />
      <path
        d="M26 17c-3.6 0-6.5 1.8-6.5 5.4 0 6.8 8.7 5.2 8.7 8.1 0 1.2-1.1 1.9-2.9 1.9-2.5 0-5.5-1-5.5-1v4.5s3 .9 5.8.9c4 0 7-1.9 7-5.6 0-6.9-8.8-5.4-8.8-8.2 0-1.1 1-1.7 2.5-1.7 2.4 0 5 .9 5 .9v-4.4S28.7 17 26 17z"
        fill="white"
      />
    </svg>
  );
}

function ResendLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="12" fill="#18181B" />
      <path
        d="M15 15h13c4.4 0 8 3.6 8 8s-3.6 8-8 8h-4l7 9h-5.5l-6.5-9H19v9h-4V15zm4 4v8h9a4 4 0 000-8h-9z"
        fill="white"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Left panel
// ---------------------------------------------------------------------------
function HeroPanel() {
  return (
    <div
      className="hidden lg:flex w-1/2 flex-col justify-between px-10 py-8"
      style={{ borderRight: `1px solid ${colors.footerBorder}` }}
    >
      {/* Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '5px 12px',
          borderRadius: '7px',
          border: '1px solid rgba(154,160,255,0.3)',
          width: 'fit-content',
        }}
      >
        <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.heroAccent }}>
          Automated Invoice Follow-Up
        </span>
      </div>

      {/* Headline */}
      <h1
        className="font-neue font-bold"
        style={{ fontSize: 'clamp(2.4rem, 3.8vw, 3.2rem)', lineHeight: 1.07, color: colors.heroText, margin: 0 }}
      >
        Stop chasing<br />invoices.
      </h1>

      {/* Body copy */}
      <p style={{ fontSize: '14px', lineHeight: 1.65, color: colors.heroSubtext, margin: 0 }}>
        Aurrallo connects to QuickBooks and automatically sends reminders
        for overdue invoices — so you get paid without the awkward follow-up.
      </p>

      {/* Stat card — full width of panel content area */}
      <div
        className="flex items-center gap-5 rounded-2xl w-full"
        style={{ background: '#6c63ff', padding: '18px 22px' }}
      >
        <span
          className="font-neue font-bold shrink-0"
          style={{ fontSize: '3.25rem', color: '#ffffff', lineHeight: 1 }}
        >
          3x
        </span>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, margin: 0 }}>
          Average improvement in invoice collections after signing up with Aurrallo
        </p>
      </div>

      {/* Integration logo row */}
      <div>
        <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(230,230,240,0.3)', marginBottom: '10px' }}>
          Integrates with
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <QuickBooksLogo size={28} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(230,230,240,0.5)' }}>QuickBooks</span>
          </div>
          <div className="flex items-center gap-2">
            <StripeLogo size={28} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(230,230,240,0.5)' }}>Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <ResendLogo size={28} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(230,230,240,0.5)' }}>Resend</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function SignUpPage() {
  const [fields, setFields] = useState({
    firstName: '', lastName: '', companyName: '', email: '',
    website: '', phone: '', password: '', consent: false,
  });
  const [errors,   setErrors]   = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading,  setLoading]  = useState(false);

  const set = k => e =>
    setFields(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  function validate() {
    const e = {};
    if (!fields.firstName.trim())   e.firstName   = 'Required';
    if (!fields.lastName.trim())    e.lastName    = 'Required';
    if (!fields.companyName.trim()) e.companyName = 'Company name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Invalid email address';
    if (fields.website && !/^https?:\/\/.+/.test(fields.website)) e.website = 'Enter a valid URL (include https://)';
    if (fields.phone.trim().length < 7) e.phone    = 'Enter a valid phone number';
    if (fields.password.length < 8)     e.password = 'Password must be at least 8 characters';
    if (!fields.consent)                e.consent  = 'You must agree to continue';
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
      const res = await fetch(`${API_URL}/auth/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:        fields.firstName,
          lastName:         fields.lastName,
          companyName:      fields.companyName,
          email:            fields.email,
          website:          fields.website || undefined,
          phone:            fields.phone,
          password:         fields.password,
          marketingConsent: true,
        }),
      });

      if (res.status === 409) { setApiError('An account with this email already exists.'); setLoading(false); return; }
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Registration failed'); }

      const { access_token, refresh_token } = await res.json();
      localStorage.setItem('aurrallo_token', access_token);
      if (refresh_token) localStorage.setItem('aurrallo_refresh_token', refresh_token);
      const params = new URLSearchParams({
        access_token,
        refresh_token: refresh_token || '',
        redirect: '/onboarding',
      });
      window.location.href = `${APP_URL}/auth/callback?${params}`;
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  }

  const fn = useInputFocus(), ln = useInputFocus(), co = useInputFocus(),
        em = useInputFocus(), ws = useInputFocus(), ph = useInputFocus(),
        pw = useInputFocus();

  return (
    <div className="flex flex-col min-h-screen" style={{ background: colors.heroBg, color: colors.heroText }}>
      <Navbar config={signUpNavConfig} colors={colors} brand={brand} alwaysOpaque />

      <div className="flex flex-1 pt-16">
        <HeroPanel />

        {/* ── Right panel ── */}
        <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-center px-6 lg:px-16 py-12 overflow-y-auto">
          <div className="w-full max-w-sm">

            {/* Mobile logo */}
            <div className="flex items-center gap-2.5 mb-8 lg:hidden">
              <img src={brand.logo} alt={brand.name} className="w-8 h-8 rounded-xl object-contain" />
              <span className="font-neue font-bold text-lg tracking-tight" style={{ color: colors.heroAccent }}>
                {brand.name}
              </span>
            </div>

            <div className="mb-5">
              <h2 className="text-2xl font-semibold" style={{ color: colors.heroText }}>Create your account</h2>
              <p className="text-sm mt-1" style={{ color: colors.heroSubtext }}>Get started with automated invoice follow-up</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3" noValidate>

              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" error={errors.firstName}>
                  <input type="text" autoComplete="given-name" placeholder="Jane"
                         value={fields.firstName} onChange={set('firstName')}
                         style={fn.style} onFocus={fn.onFocus} onBlur={fn.onBlur} />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input type="text" autoComplete="family-name" placeholder="Smith"
                         value={fields.lastName} onChange={set('lastName')}
                         style={ln.style} onFocus={ln.onFocus} onBlur={ln.onBlur} />
                </Field>
              </div>

              <Field label="Company name" error={errors.companyName}>
                <input type="text" autoComplete="organization" placeholder="Smith Consulting LLC"
                       value={fields.companyName} onChange={set('companyName')}
                       style={co.style} onFocus={co.onFocus} onBlur={co.onBlur} />
              </Field>

              <Field label="Company email" error={errors.email}>
                <input type="email" autoComplete="email" placeholder="you@company.com"
                       value={fields.email} onChange={set('email')}
                       style={em.style} onFocus={em.onFocus} onBlur={em.onBlur} />
              </Field>

              <Field label="Website" optional error={errors.website}>
                <input type="url" autoComplete="url" placeholder="https://yourcompany.com"
                       value={fields.website} onChange={set('website')}
                       style={ws.style} onFocus={ws.onFocus} onBlur={ws.onBlur} />
              </Field>

              <Field label="Phone number" error={errors.phone}>
                <input type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000"
                       value={fields.phone} onChange={set('phone')}
                       style={ph.style} onFocus={ph.onFocus} onBlur={ph.onBlur} />
              </Field>

              <Field label="Password" error={errors.password}>
                <input type="password" autoComplete="new-password" placeholder="Min. 8 characters"
                       value={fields.password} onChange={set('password')}
                       style={pw.style} onFocus={pw.onFocus} onBlur={pw.onBlur} />
              </Field>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fields.consent}
                    onChange={set('consent')}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded"
                    style={{ accentColor: '#6c63ff' }}
                  />
                  <span className="text-xs leading-relaxed" style={{ color: colors.heroSubtext }}>
                    I agree to Aurrallo's{' '}
                    <Link to="/terms" style={{ color: colors.heroAccent }} className="hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" style={{ color: colors.heroAccent }} className="hover:underline">Privacy Policy</Link>
                    , and consent to receive product updates and marketing communications. You can unsubscribe at any time.
                  </span>
                </label>
                {errors.consent && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.consent}</p>}
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
                {loading ? 'Creating account…' : 'Sign Up'}
              </button>
            </form>

            <p className="mt-4 text-center text-sm" style={{ color: colors.heroSubtext }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: colors.heroAccent }} className="hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer config={footer} colors={colors} brand={brand} />
    </div>
  );
}
