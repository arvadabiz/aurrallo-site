import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Benefits({ config, colors }) {
  const [ref, isVisible] = useScrollAnimation();
  const { sectionLabel, title, subtitle, items } = config;

  return (
    <section className="py-28 px-6" style={{ backgroundColor: colors.benefitsBg }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: colors.benefitsIconBg, color: colors.benefitsAccent }}
          >
            {sectionLabel}
          </span>
          <h2
            className="font-neue font-bold leading-tight mb-5 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: colors.benefitsText }}
          >
            {title}
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: colors.benefitsSubtext }}>
            {subtitle}
          </p>
        </div>

        {/* 3×2 grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl p-7 border shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-md ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                backgroundColor: colors.benefitsCardBg,
                borderColor: colors.benefitsCardBorder,
                transitionDelay: `${i * 80 + 200}ms`,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: colors.benefitsIconBg }}
              >
                <i className={`${item.icon} text-lg`} style={{ color: colors.benefitsAccent }} />
              </div>
              <h3
                className="font-neue font-bold text-lg mb-2 leading-snug"
                style={{ color: colors.benefitsText }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: `${colors.benefitsSubtext}bb` }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
