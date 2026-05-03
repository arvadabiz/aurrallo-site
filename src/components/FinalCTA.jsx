import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useEmailSubmit }    from '../hooks/useEmailSubmit';

export default function FinalCTA({ config, colors }) {
  const [ref, isVisible] = useScrollAnimation();
  const {
    id, sectionLabel, title, subtitle,
    useEmailCollection, primaryCta, secondaryCta,
    emailPlaceholder, emailCtaText, trustNote,
  } = config;

  const { email, setEmail, status, message, submit } = useEmailSubmit('cta');

  return (
    <section id={id} className="py-28 px-6" style={{ backgroundColor: colors.ctaBg }}>
      <div className="max-w-3xl mx-auto text-center">
        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            style={{ backgroundColor: `${colors.ctaAccent}18`, color: colors.ctaAccent }}
          >
            {sectionLabel}
          </span>

          <h2
            className="font-neue font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: colors.ctaText }}
          >
            {title}
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: colors.ctaSubtext }}>
            {subtitle}
          </p>

          {useEmailCollection ? (
            <form onSubmit={submit} className="flex flex-col items-center gap-3 max-w-md mx-auto">
              {status === 'success' ? (
                <div
                  className="flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-medium w-full justify-center"
                  style={{
                    backgroundColor: `${colors.ctaAccent}15`,
                    color: colors.ctaAccent,
                    border: `1px solid ${colors.ctaAccent}35`,
                  }}
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
                    className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none border"
                    style={{
                      borderColor: status === 'error' ? '#ef4444' : `${colors.ctaAccent}35`,
                      backgroundColor: 'white',
                      color: colors.ctaText,
                      opacity: status === 'loading' ? 0.6 : 1,
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 whitespace-nowrap flex items-center gap-2 justify-center"
                    style={{
                      backgroundColor: colors.ctaAccent,
                      color: '#ffffff',
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
                <p className="text-xs" style={{ color: '#ef4444' }}>{message}</p>
              )}
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={primaryCta.href}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[15px] transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  backgroundColor: colors.ctaAccent,
                  color: '#ffffff',
                  boxShadow: `0 4px 24px ${colors.ctaAccent}45`,
                }}
              >
                {primaryCta.text}
                <i className="fa-solid fa-arrow-right text-sm" />
              </a>
              <a
                href={secondaryCta.href}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[15px] border transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
                style={{ borderColor: `${colors.ctaAccent}40`, color: colors.ctaAccent }}
              >
                {secondaryCta.text}
                <i className="fa-solid fa-calendar text-sm" />
              </a>
            </div>
          )}

          {trustNote && status !== 'success' && (
            <p className="text-sm mt-6" style={{ color: colors.ctaSubtext }}>
              {trustNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
