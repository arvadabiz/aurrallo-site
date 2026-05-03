import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function HowItWorks({ config, colors }) {
  const [ref, isVisible] = useScrollAnimation();
  const { id, sectionLabel, title, subtitle, steps } = config;

  return (
    <section id={id} className="py-28 px-6" style={{ backgroundColor: colors.howItWorksBg }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: `${colors.howItWorksAccent}18`, color: colors.howItWorksAccent }}
          >
            {sectionLabel}
          </span>
          <h2
            className="font-neue font-bold leading-tight mb-5 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: colors.howItWorksText }}
          >
            {title}
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: colors.howItWorksSubtext }}>
            {subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-14 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px"
            style={{ background: `linear-gradient(90deg, ${colors.howItWorksAccent}40, ${colors.howItWorksAccent}40)` }}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center text-center transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 160 + 200}ms` }}
            >
              {/* Number badge */}
              <div
                className="relative z-10 w-28 h-28 rounded-2xl flex flex-col items-center justify-center mb-8 border shadow-md"
                style={{
                  backgroundColor: colors.howItWorksCardBg,
                  borderColor: colors.howItWorksCardBorder,
                  boxShadow: `0 4px 20px ${colors.howItWorksAccent}22`,
                }}
              >
                <span
                  className="font-neue font-bold text-xs mb-1.5 tracking-widest"
                  style={{ color: `${colors.howItWorksAccent}70` }}
                >
                  {step.number}
                </span>
                <i
                  className={`${step.icon} text-3xl`}
                  style={{ color: colors.howItWorksAccent }}
                />
              </div>

              <h3
                className="font-neue font-bold text-xl mb-3 leading-snug"
                style={{ color: colors.howItWorksText }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: `${colors.howItWorksSubtext}cc` }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
