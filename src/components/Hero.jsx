import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useEmailSubmit }    from '../hooks/useEmailSubmit';

export default function Hero({ config, colors, nextSectionBg }) {
  const {
    badge, headline, headlineAccent, subheadline,
    useEmailCollection, primaryCta, secondaryCta,
    emailPlaceholder, emailCtaText, trustNote,
  } = config;

  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });
  const { email, setEmail, status, message, submit } = useEmailSubmit('hero');

  // Split headline around the accent word(s)
  const parts = headlineAccent ? headline.split(headlineAccent) : [headline, ''];

  return (
    <section className="relative min-h-screen flex flex-col" style={{ backgroundColor: colors.heroBg }}>

      {/* CSS grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${colors.heroGridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.heroGridColor} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: 360, height: 360,
            background: colors.heroOrb1,
            filter: 'blur(120px)', opacity: 0.22,
            top: '12%', left: '18%',
            animation: 'float1 13s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 420, height: 420,
            background: colors.heroOrb2,
            filter: 'blur(130px)', opacity: 0.18,
            bottom: '12%', right: '16%',
            animation: 'float2 15s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300,
            background: colors.heroOrb3,
            filter: 'blur(110px)', opacity: 0.15,
            top: '58%', left: '50%',
            animation: 'float3 17s ease-in-out infinite',
          }}
        />
      </div>

      {/* Main content */}
      <div
        ref={ref}
        className={`relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Badge pill */}
        {badge && (
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
            style={{
              borderColor: `${colors.heroAccent}45`,
              color: colors.heroAccent,
              backgroundColor: `${colors.heroAccent}12`,
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.heroAccent }}
            />
            {badge}
          </div>
        )}

        {/* Headline */}
        <h1
          className="font-neue font-bold leading-[1.08] tracking-tight mb-6 max-w-4xl"
          style={{
            color: colors.heroText,
            fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
          }}
        >
          {parts[0]}
          {headlineAccent && (
            <span style={{ color: colors.heroAccent }}>{headlineAccent}</span>
          )}
          {parts[1]}
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          style={{ color: colors.heroSubtext }}
        >
          {subheadline}
        </p>

        {/* CTA — two buttons OR email input, driven by config */}
        {useEmailCollection ? (
          <form onSubmit={submit} className="flex flex-col items-center gap-3 w-full max-w-md">
            {status === 'success' ? (
              <div
                className="flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-medium w-full justify-center"
                style={{ backgroundColor: `${colors.heroAccent}20`, color: colors.heroAccent, border: `1px solid ${colors.heroAccent}40` }}
              >
                <i className="fa-solid fa-circle-check" />
                {message}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={emailPlaceholder}
                  disabled={status === 'loading'}
                  className="hero-email-input flex-1 px-5 py-3.5 rounded-xl text-sm outline-none"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    border: `1px solid ${status === 'error' ? '#f87171' : 'rgba(255,255,255,0.14)'}`,
                    color: colors.heroText,
                    opacity: status === 'loading' ? 0.6 : 1,
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2 justify-center"
                  style={{
                    backgroundColor: colors.primaryBtn,
                    color: colors.primaryBtnText,
                    opacity: status === 'loading' ? 0.7 : 1,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'loading' && <i className="fa-solid fa-circle-notch fa-spin text-xs" />}
                  {emailCtaText}
                </button>
              </div>
            )}
            {status === 'error' && (
              <p className="text-xs" style={{ color: '#f87171' }}>{message}</p>
            )}
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a
              href={primaryCta.href}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xl"
              style={{
                backgroundColor: colors.primaryBtn,
                color: colors.primaryBtnText,
                boxShadow: `0 4px 24px ${colors.primaryBtn}55`,
              }}
            >
              {primaryCta.text}
              <i className="fa-solid fa-arrow-right text-sm" />
            </a>
            <a
              href={secondaryCta.href}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] border transition-all duration-200 hover:bg-white/5 hover:-translate-y-0.5"
              style={{
                borderColor: colors.secondaryBtnBorder,
                color: colors.secondaryBtnText,
              }}
            >
              {secondaryCta.text}
              <i className="fa-solid fa-play text-xs" />
            </a>
          </div>
        )}

        {/* Trust note */}
        {trustNote && (
          <p className="text-sm mt-6" style={{ color: colors.heroSubtext }}>
            {trustNote}
          </p>
        )}
      </div>

      {/* SVG wave divider — animated beach waves */}
      {/*
        clip-path: inset(-600px 0 0 0) — allows waves to be visible 600px above
        the container (into the hero), while hard-clipping the bottom edge so the
        tall animated SVGs never bleed into the SocialProof section below.
      */}
      <div
        className="relative z-10 -mb-px"
        style={{ height: 'clamp(50px, 7vw, 90px)', clipPath: 'inset(-600px 0 0 0)' }}
      >
        {/* Static base: dual-fill, zero transparent areas — no blue ever shows through */}
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full block">
          <path
            d="M0,0 L1440,0 L1440,45 C1380,50 1260,90 1080,45 C900,0 720,90 540,45 C360,0 180,90 0,45 Z"
            fill={colors.heroBg}
          />
          <path
            d="M0,45 C180,90 360,0 540,45 C720,90 900,0 1080,45 C1260,90 1380,50 1440,45 L1440,90 L0,90 Z"
            fill={nextSectionBg}
          />
        </svg>

        {/*
          Animated waves are calc(100% + 350px) tall so their fill always reaches
          the container bottom even at peak translation — no dark gap beneath them.
          The clip-path above cuts them at the container edge so they stay out of the
          next section. viewBox height 440 = ~90px container + 350px extension.
        */}

        {/* Wave 1 */}
        <svg
          viewBox="0 0 1440 440"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%',
            height: 'calc(100% + 350px)',
            animation: 'beach-wave 11s ease-in-out 0s infinite',
          }}
        >
          <path d="M0,45 C180,90 360,0 540,45 C720,90 900,0 1080,45 C1260,90 1380,50 1440,45 L1440,440 L0,440 Z" fill={nextSectionBg} />
        </svg>

        {/* Wave 2 — delay = 40% × 11s = 4.4s, starts right as wave 1 peaks */}
        <svg
          viewBox="0 0 1440 440"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%',
            height: 'calc(100% + 350px)',
            animation: 'beach-wave 11s ease-in-out 4.4s infinite',
          }}
        >
          <path d="M0,52 C200,100 380,8 560,52 C740,100 920,8 1100,52 C1270,100 1390,55 1440,50 L1440,440 L0,440 Z" fill={nextSectionBg} />
        </svg>
      </div>
    </section>
  );
}
