import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import config from '../config.json';

const { colors, brand, navbar, footer } = config;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:5173';

const signUpNavConfig = {
  ...navbar,
  links: navbar.links.map(link => ({
    ...link,
    href: link.href.startsWith('#') ? `/${link.href}` : link.href,
  })),
  ctaText: 'Sign In',
  ctaHref: '/login',
};

// ---------------------------------------------------------------------------
// Input style helpers
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
  const style = {
    ...baseInput,
    borderColor: focused ? '#6c63ff' : 'rgba(255,255,255,0.10)',
    boxShadow: focused ? '0 0 0 3px rgba(108,99,255,0.2)' : 'none',
  };
  return { style, onFocus: () => setFocused(true), onBlur: () => setFocused(false) };
}

function Field({ label, optional, error, children }) {
  return (
    <div>
      <label
        className="block text-sm font-medium mb-1.5"
        style={{ color: colors.heroText }}
      >
        {label}
        {optional && (
          <span className="font-normal ml-1" style={{ color: colors.heroSubtext }}>(optional)</span>
        )}
      </label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{error}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Works With carousel
// ---------------------------------------------------------------------------
const INTEGRATIONS = [
  { name: 'QuickBooks', bg: '#2CA01C', abbr: 'QB' },
  { name: 'Stripe',     bg: '#635BFF', abbr: 'S'  },
  { name: 'Resend',     bg: '#111827', abbr: 'R'  },
];

function WorksWithCarousel() {
  const [idx, setIdx]     = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setIdx(i => (i + 1) % INTEGRATIONS.length); setFading(false); }, 280);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const item = INTEGRATIONS[idx];

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
         style={{ color: colors.heroSubtext }}>
        Works with
      </p>
      <div className="flex items-center gap-2.5"
           style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(4px)' : 'translateY(0)',
                    transition: 'opacity 0.28s ease, transform 0.28s ease' }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
             style={{ backgroundColor: item.bg }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{item.abbr}</span>
        </div>
        <span className="text-sm font-semibold" style={{ color: colors.heroText }}>{item.name}</span>
        <div className="flex items-center gap-1 ml-1">
          {INTEGRATIONS.map((_, i) => (
            <div key={i} style={{
              width: i === idx ? '16px' : '5px',
              height: '5px',
              borderRadius: '999px',
              backgroundColor: i === idx ? '#6c63ff' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------
function StatCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 w-fit" style={{
      background: 'linear-gradient(135deg, rgba(108,99,255,0.28) 0%, rgba(108,99,255,0.06) 100%)',
      border: '1px solid rgba(108,99,255,0.45)',
      boxShadow: '0 0 48px rgba(108,99,255,0.18), 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
    }}>
      <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.35) 0%, transparent 70%)' }} />
      <div className="relative flex items-center gap-5">
        <div className="flex flex-col">
          <span className="font-neue font-bold leading-none"
                style={{ fontSize: '4rem', color: '#a5a0ff',
                         textShadow: '0 0 32px rgba(108,99,255,0.9), 0 0 64px rgba(108,99,255,0.4)' }}>
            3x
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest mt-1"
                style={{ color: 'rgba(165,160,255,0.6)' }}>
            avg improvement
          </span>
        </div>
        <div className="w-px self-stretch" style={{ background: 'rgba(108,99,255,0.3)' }} />
        <p className="text-sm leading-snug max-w-[130px]" style={{ color: 'rgba(230,230,240,0.75)' }}>
          Faster invoice collections for Aurrallo users
        </p>
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
  const [errors, setErrors]   = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  function validate() {
    const e = {};
    if (!fields.firstName.trim())  e.firstName  = 'Required';
    if (!fields.lastName.trim())   e.lastName   = 'Required';
    if (!fields.companyName.trim()) e.companyName = 'Company name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Invalid email address';
    if (fields.website && !/^https?:\/\/.+/.test(fields.website)) e.website = 'Enter a valid URL (include https://)';
    if (fields.phone.trim().length < 7) e.phone = 'Enter a valid phone number';
    if (fields.password.length < 8)     e.password = 'Password must be at least 8 characters';
    if (!fields.consent)                e.consent = 'You must agree to continue';
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
          firstName: fields.firstName,
          lastName:  fields.lastName,
          companyName: fields.companyName,
          email:     fields.email,
          website:   fields.website || undefined,
          phone:     fields.phone,
          password:  fields.password,
          marketingConsent: true,
        }),
      });

      if (res.status === 409) { setApiError('An account with this email already exists.'); setLoading(false); return; }
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Registration failed'); }

      const { access_token, refresh_token } = await res.json();
      const params = new URLSearchParams({ access_token, refresh_token: refresh_token || '', redirect: '/onboarding' });
      window.location.href = `${APP_URL}/auth/callback?${params}`;
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  }

  // Individual input focus state
  const fn = useInputFocus(), ln = useInputFocus(), co = useInputFocus(),
        em = useInputFocus(), ws = useInputFocus(), ph = useInputFocus(),
        pw = useInputFocus();

  return (
    <div className="flex flex-col min-h-screen" style={{ background: colors.heroBg, color: colors.heroText }}>
      <Navbar config={signUpNavConfig} colors={colors} brand={brand} alwaysOpaque />

      {/* Split body */}
      <div className="flex flex-1 pt-16">

        {/* Left panel */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between px-16 py-14"
             style={{ borderRight: `1px solid ${colors.footerBorder}` }}>

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <img src={brand.logo} alt={brand.name} className="w-8 h-8 rounded-xl object-contain" />
            <span className="font-neue font-bold text-lg tracking-tight" style={{ color: '#9aa0ff' }}>
              {brand.name}
            </span>
          </div>

          {/* Hero */}
          <div className="flex flex-col gap-8">
            <h1 className="font-neue font-bold leading-[1.1]"
                style={{ fontSize: 'clamp(2.4rem, 3.5vw, 3.25rem)', color: colors.heroText }}>
              Get paid faster,<br />automatically.
            </h1>
            <StatCard />
            <p className="text-sm leading-relaxed max-w-[300px]" style={{ color: colors.heroSubtext }}>
              Stop chasing invoices. Aurrallo sends automated reminders on your behalf so you get paid without the awkward follow-up.
            </p>
          </div>

          <WorksWithCarousel />
        </div>

        {/* Right panel — form */}
        <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-center px-6 lg:px-16 py-12 overflow-y-auto">
          <div className="w-full max-w-sm">

            {/* Mobile logo */}
            <div className="flex items-center gap-2.5 mb-8 lg:hidden">
              <img src={brand.logo} alt={brand.name} className="w-8 h-8 rounded-xl object-contain" />
              <span className="font-neue font-bold text-lg tracking-tight" style={{ color: '#9aa0ff' }}>{brand.name}</span>
            </div>

            <div className="mb-7">
              <h2 className="text-2xl font-semibold" style={{ color: colors.heroText }}>Create your account</h2>
              <p className="text-sm mt-1" style={{ color: colors.heroSubtext }}>Get started with automated invoice follow-up</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* First + Last */}
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

              {/* Consent */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={fields.consent} onChange={set('consent')}
                         className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded"
                         style={{ accentColor: '#6c63ff' }} />
                  <span className="text-xs leading-relaxed" style={{ color: colors.heroSubtext }}>
                    I agree to Aurrallo's{' '}
                    <Link to="/terms" style={{ color: '#9aa0ff' }} className="hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" style={{ color: '#9aa0ff' }} className="hover:underline">Privacy Policy</Link>
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
              <Link to="/login" style={{ color: '#9aa0ff' }} className="hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>

      </div>

      <Footer config={footer} colors={colors} brand={brand} />
    </div>
  );
}
