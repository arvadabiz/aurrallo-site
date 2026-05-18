import { useScrollAnimation } from '../hooks/useScrollAnimation';
import config from '../config.json';
import Navbar     from '../components/Navbar';
import Solution   from '../components/Solution';
import HowItWorks from '../components/HowItWorks';
import Benefits   from '../components/Benefits';
import Footer     from '../components/Footer';

const { colors, brand, navbar, solution, howItWorks, benefits, footer } = config;

// ---------------------------------------------------------------------------
// Feature spotlight — alternating layout
// ---------------------------------------------------------------------------
const FEATURES = [
  {
    icon: 'fa-solid fa-link',
    label: 'QuickBooks Integration',
    headline: 'Sync directly from QuickBooks',
    body: 'Connect your QuickBooks Online account in under two minutes. Aurrallo pulls in every invoice, payment, and status update automatically — so your follow-up list is always accurate and up to date.',
    stats: [{ value: '2 min', label: 'avg. setup time' }, { value: '100%', label: 'invoice sync' }],
  },
  {
    icon: 'fa-solid fa-paper-plane',
    label: 'Automated Reminders',
    headline: 'Set rules once. Get paid forever.',
    body: 'Configure reminder cadences — 7 days overdue, 14 days, 30 days — and Aurrallo sends professional follow-ups on your behalf, on schedule, every time. No drafting, no sending, no forgetting.',
    stats: [{ value: '3x', label: 'faster collections' }, { value: '0', label: 'manual emails' }],
  },
  {
    icon: 'fa-solid fa-chart-bar',
    label: 'Invoice Visibility',
    headline: 'Always know exactly what you\'re owed',
    body: 'A live dashboard shows every outstanding invoice, which reminders have gone out, and what\'s been paid. No more digging through QuickBooks reports or maintaining a side spreadsheet.',
    stats: [{ value: 'Live', label: 'dashboard' }, { value: 'Full', label: 'audit trail' }],
  },
];

function FeatureSpotlight({ feature, index }) {
  const [ref, isVisible] = useScrollAnimation();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${!isEven ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Text */}
      <div className="flex-1 min-w-0">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: 'rgba(108,99,255,0.12)', color: colors.heroAccent }}
        >
          <i className={`${feature.icon} text-[10px]`} />
          {feature.label}
        </div>
        <h3
          className="font-neue font-bold leading-tight mb-4"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: colors.heroText }}
        >
          {feature.headline}
        </h3>
        <p className="text-base leading-relaxed mb-8" style={{ color: colors.heroSubtext }}>
          {feature.body}
        </p>
        <div className="flex gap-8">
          {feature.stats.map(s => (
            <div key={s.label}>
              <div className="font-neue font-bold text-3xl" style={{ color: colors.heroAccent }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: colors.heroSubtext }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual card */}
      <div className="flex-1 min-w-0 w-full">
        <div
          className="rounded-2xl p-8 flex flex-col gap-4"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(108,99,255,0.18)' }}
          >
            <i className={`${feature.icon} text-xl`} style={{ color: colors.heroAccent }} />
          </div>
          <div>
            <div className="text-sm font-semibold mb-1" style={{ color: colors.heroText }}>{feature.label}</div>
            <div className="text-xs leading-relaxed" style={{ color: colors.heroSubtext }}>{feature.body}</div>
          </div>
          <div className="flex gap-3 mt-2">
            {feature.stats.map(s => (
              <div
                key={s.label}
                className="flex-1 rounded-xl p-3 text-center"
                style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)' }}
              >
                <div className="font-neue font-bold text-xl" style={{ color: colors.heroAccent }}>{s.value}</div>
                <div className="text-[10px] mt-0.5" style={{ color: colors.heroSubtext }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dark CTA strip
// ---------------------------------------------------------------------------
function CtaStrip() {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section className="py-24 px-6" style={{ background: colors.heroBg }}>
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2
          className="font-neue font-bold mb-5"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: colors.heroText }}
        >
          Ready to stop chasing invoices?
        </h2>
        <p className="text-base mb-8" style={{ color: colors.heroSubtext }}>
          Connect QuickBooks and send your first automated reminder in under five minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/sign-up"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ backgroundColor: colors.primaryBtn, color: colors.primaryBtnText, boxShadow: `0 4px 20px ${colors.primaryBtn}55` }}
          >
            Start free trial
          </a>
          <a
            href="/pricing"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{ color: colors.heroAccent, border: '1px solid rgba(154,160,255,0.3)' }}
          >
            View pricing
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function FeaturesPage() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.05 });

  return (
    <div className="font-sans overflow-x-hidden" style={{ background: colors.heroBg }}>
      <Navbar config={navbar} colors={colors} brand={brand} alwaysOpaque />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: colors.heroBg }}>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${colors.heroGridColor} 1px, transparent 1px), linear-gradient(90deg, ${colors.heroGridColor} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full" style={{ width: 340, height: 340, background: colors.heroOrb1, filter: 'blur(110px)', opacity: 0.18, top: '5%', left: '25%' }} />
          <div className="absolute rounded-full" style={{ width: 260, height: 260, background: colors.heroOrb2, filter: 'blur(100px)', opacity: 0.14, top: '20%', right: '15%' }} />
        </div>

        <div
          ref={heroRef}
          className={`relative max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ border: '1px solid rgba(154,160,255,0.3)', color: colors.heroAccent }}
          >
            Product Features
          </div>
          <h1
            className="font-neue font-bold leading-tight mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', color: colors.heroText }}
          >
            Invoice follow-up,<br />
            <span style={{ color: colors.heroAccent }}>fully automated.</span>
          </h1>
          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: colors.heroSubtext }}>
            Aurrallo connects to QuickBooks and handles every overdue reminder for you — so you get paid faster, with zero manual effort.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/sign-up"
              className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ backgroundColor: colors.primaryBtn, color: colors.primaryBtnText, boxShadow: `0 4px 20px ${colors.primaryBtn}55` }}
            >
              Start free trial
            </a>
            <a
              href="/pricing"
              className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
              style={{ color: colors.heroAccent, border: '1px solid rgba(154,160,255,0.3)' }}
            >
              See pricing
            </a>
          </div>
        </div>
      </section>

      {/* ── Feature spotlights ── */}
      <section className="py-24 px-6" style={{ background: colors.heroBg }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-28">
          {FEATURES.map((f, i) => <FeatureSpotlight key={f.label} feature={f} index={i} />)}
        </div>
      </section>

      {/* ── Reuse existing sections with their own bg colors ── */}
      <Solution   config={solution}   colors={colors} />
      <HowItWorks config={howItWorks} colors={colors} />
      <Benefits   config={benefits}   colors={colors} />

      <CtaStrip />

      <Footer config={footer} colors={colors} brand={brand} />
    </div>
  );
}
