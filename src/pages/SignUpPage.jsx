import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import config from '../config.json';

const { colors, brand, navbar, footer } = config;

function QuickBooksLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="26" fill="#2CA01C" />
      <path d="M17 18h11a7 7 0 010 14h-5v-4h5a3 3 0 000-6H21v14h-4V18z" fill="white" />
      <circle cx="34" cy="36" r="4" fill="white" />
    </svg>
  );
}

function StripeLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="12" fill="#635BFF" />
      <path d="M26 17c-3.6 0-6.5 1.8-6.5 5.4 0 6.8 8.7 5.2 8.7 8.1 0 1.2-1.1 1.9-2.9 1.9-2.5 0-5.5-1-5.5-1v4.5s3 .9 5.8.9c4 0 7-1.9 7-5.6 0-6.9-8.8-5.4-8.8-8.2 0-1.1 1-1.7 2.5-1.7 2.4 0 5 .9 5 .9v-4.4S28.7 17 26 17z" fill="white" />
    </svg>
  );
}

function ResendLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="12" fill="#18181B" />
      <path d="M15 15h13c4.4 0 8 3.6 8 8s-3.6 8-8 8h-4l7 9h-5.5l-6.5-9H19v9h-4V15zm4 4v8h9a4 4 0 000-8h-9z" fill="white" />
    </svg>
  );
}

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: colors.heroBg, color: colors.heroText }}>
      <Navbar config={navbar} colors={colors} brand={brand} alwaysOpaque />

      <div className="flex flex-1 pt-16">

        {/* ── Left panel ── */}
        <div
          className="hidden lg:flex w-1/2 flex-col justify-between px-10 py-8"
          style={{ borderRight: `1px solid ${colors.footerBorder}` }}
        >
          <div
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '5px 12px', borderRadius: '7px',
              border: '1px solid rgba(154,160,255,0.3)', width: 'fit-content',
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.heroAccent }}>
              Private Beta
            </span>
          </div>

          <h1
            className="font-neue font-bold"
            style={{ fontSize: 'clamp(2.4rem, 3.8vw, 3.2rem)', lineHeight: 1.07, color: colors.heroText, margin: 0 }}
          >
            Stop chasing<br />invoices.
          </h1>

          <p style={{ fontSize: '14px', lineHeight: 1.65, color: colors.heroSubtext, margin: 0 }}>
            Aurrallo connects to QuickBooks and automatically sends reminders
            for overdue invoices — so you get paid without the awkward follow-up.
          </p>

          <div
            className="flex items-center gap-5 rounded-2xl w-full"
            style={{ background: '#6c63ff', padding: '18px 22px' }}
          >
            <span className="font-neue font-bold shrink-0" style={{ fontSize: '3.25rem', color: '#ffffff', lineHeight: 1 }}>3x</span>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, margin: 0 }}>
              Average improvement in invoice collections after signing up with Aurrallo
            </p>
          </div>

          <div>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(230,230,240,0.3)', marginBottom: '10px' }}>
              Integrates with
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <QuickBooksLogo />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(230,230,240,0.5)' }}>QuickBooks</span>
              </div>
              <div className="flex items-center gap-2">
                <StripeLogo />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(230,230,240,0.5)' }}>Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <ResendLogo />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(230,230,240,0.5)' }}>Resend</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-16 py-12">
          <div className="w-full max-w-sm">

            {/* Mobile logo */}
            <div className="flex items-center gap-2.5 mb-8 lg:hidden">
              <img src={brand.logo} alt={brand.name} className="w-8 h-8 rounded-xl object-contain" />
              <span className="font-neue font-bold text-lg tracking-tight" style={{ color: colors.heroAccent }}>
                {brand.name}
              </span>
            </div>

            {/* Closed badge */}
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                padding: '5px 12px', borderRadius: '7px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f87171', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#f87171' }}>
                Registration closed
              </span>
            </div>

            <h2 className="text-2xl font-semibold mb-2" style={{ color: colors.heroText }}>
              We're in private beta.
            </h2>
            <p className="text-sm mb-8" style={{ color: colors.heroSubtext, lineHeight: 1.65 }}>
              Aurrallo isn't open for general registration yet — but we're actively
              onboarding beta testers right now. If you use QuickBooks and want to
              stop chasing invoices manually, we'd love to have you in.
            </p>

            {/* CTA card */}
            <div
              className="rounded-2xl p-5 mb-6"
              style={{
                background: 'rgba(108,99,255,0.08)',
                border: '1px solid rgba(108,99,255,0.25)',
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: colors.heroText }}>
                Apply to beta test Aurrallo
              </p>
              <p className="text-xs mb-4" style={{ color: colors.heroSubtext, lineHeight: 1.6 }}>
                Send us a quick email — tell us your name, what kind of business you run,
                and how many invoices you're managing. We'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:beta@aurrallo.com?subject=Beta%20Test%20Application&body=Hi%2C%0A%0AMy%20name%20is%20%5Byour%20name%5D.%20I%20run%20%5Byour%20business%5D%20and%20manage%20roughly%20%5BX%5D%20invoices%20per%20month.%20I%27d%20love%20to%20beta%20test%20Aurrallo."
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: colors.primaryBtn, color: colors.primaryBtnText }}
              >
                Email beta@aurrallo.com
              </a>
            </div>

            {/* What to include */}
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(230,230,240,0.3)' }}>
                What to include in your email
              </p>
              <ul className="space-y-2">
                {[
                  'Your name and business name',
                  'What industry you\'re in',
                  'Roughly how many invoices you manage per month',
                  'Whether you\'re already using QuickBooks',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: colors.heroSubtext, lineHeight: 1.5 }}>
                    <span style={{ color: colors.heroAccent, marginTop: 1 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-center text-sm" style={{ color: colors.heroSubtext }}>
              Already a beta tester?{' '}
              <Link to="/login" style={{ color: colors.heroAccent }} className="hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer config={footer} colors={colors} brand={brand} />
    </div>
  );
}
