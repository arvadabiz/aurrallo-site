import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import config from '../config.json';
import Navbar  from '../components/Navbar';
import Pricing from '../components/Pricing';
import Footer  from '../components/Footer';

const { colors, brand, navbar, pricing, footer } = config;

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------
const FAQS = [
  {
    q: 'What do I need to connect QuickBooks?',
    a: 'Just a QuickBooks Online account. The connection uses QuickBooks\' official OAuth flow and takes under two minutes. We never store your QuickBooks password.',
  },
  {
    q: 'How are "active invoices" counted?',
    a: 'An active invoice is any open (unpaid) invoice that Aurrallo has synced from your QuickBooks account in the current billing period. Once an invoice is marked paid, it no longer counts toward your limit.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Yes, anytime. Upgrades take effect immediately and are prorated. Downgrades take effect at the start of your next billing cycle.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'You can cancel anytime from your account settings. Your account remains active until the end of your current billing period — no partial refunds, no surprise charges.',
  },
  {
    q: 'Do reminder emails show Aurrallo branding?',
    a: 'No. Reminder emails are sent from your domain and show your company name. Clients see a professional follow-up from you, not from us.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        border: `1px solid ${open ? 'rgba(154,160,255,0.2)' : colors.footerBorder}`,
        background: open ? 'rgba(108,99,255,0.06)' : 'rgba(255,255,255,0.025)',
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <span className="text-sm font-semibold pr-4" style={{ color: colors.heroText }}>{q}</span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', color: colors.heroAccent }}
        >
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed" style={{ color: colors.heroSubtext }}>{a}</p>
        </div>
      )}
    </div>
  );
}

function FaqSection() {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section className="py-24 px-6" style={{ background: colors.heroBg }}>
      <div className="max-w-2xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(108,99,255,0.12)', color: colors.heroAccent }}
          >
            FAQ
          </span>
          <h2
            className="font-neue font-bold"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: colors.heroText }}
          >
            Common questions
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map(item => <FaqItem key={item.q} {...item} />)}
        </div>
      </div>
    </section>
  );
}

function CtaStrip() {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section className="py-20 px-6" style={{ background: colors.heroBg, borderTop: `1px solid ${colors.footerBorder}` }}>
      <div
        ref={ref}
        className={`max-w-2xl mx-auto text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="font-neue font-bold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: colors.heroText }}>
          Ready to stop chasing invoices?
        </h2>
        <p className="text-sm mb-8" style={{ color: colors.heroSubtext }}>
          Connect QuickBooks and send your first automated reminder in under five minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/register"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ backgroundColor: colors.primaryBtn, color: colors.primaryBtnText, boxShadow: `0 4px 20px ${colors.primaryBtn}55` }}
          >
            Get started
          </a>
          <a
            href="/contact"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
            style={{ color: colors.heroAccent, border: '1px solid rgba(154,160,255,0.3)' }}
          >
            Talk to sales
          </a>
        </div>
        <p className="text-xs mt-5" style={{ color: 'rgba(230,230,240,0.35)' }}>
          Trusted by small businesses and freelancers using QuickBooks
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function PricingPage() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.05 });

  // Override the pricing component's CTA hrefs to point to /sign-up
  const pricingConfig = {
    ...pricing,
    plans: pricing.plans.map(p => ({ ...p, ctaHref: '/sign-up' })),
  };

  return (
    <div className="font-sans overflow-x-hidden" style={{ background: colors.heroBg }}>
      <Navbar config={navbar} colors={colors} brand={brand} alwaysOpaque />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-6 px-6 overflow-hidden" style={{ background: colors.heroBg }}>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${colors.heroGridColor} 1px, transparent 1px), linear-gradient(90deg, ${colors.heroGridColor} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full" style={{ width: 300, height: 300, background: colors.heroOrb1, filter: 'blur(110px)', opacity: 0.15, top: '10%', left: '30%' }} />
        </div>

        <div
          ref={heroRef}
          className={`relative max-w-2xl mx-auto text-center transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ border: '1px solid rgba(154,160,255,0.3)', color: colors.heroAccent }}
          >
            Pricing
          </div>
          <h1
            className="font-neue font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', color: colors.heroText }}
          >
            Simple, transparent pricing
          </h1>
          <p className="text-base leading-relaxed mb-3" style={{ color: colors.heroSubtext }}>
            No hidden fees. No long-term contracts. Upgrade or cancel anytime.
          </p>
          <p className="text-sm font-medium" style={{ color: colors.heroAccent }}>
            Simple pricing, no long-term contracts.
          </p>
        </div>
      </section>

      {/* ── Pricing cards — reuse existing component ── */}
      <Pricing config={pricingConfig} colors={colors} />

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── CTA ── */}
      <CtaStrip />

      <Footer config={footer} colors={colors} brand={brand} />
    </div>
  );
}
