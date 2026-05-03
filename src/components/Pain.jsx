import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Pain({ config, colors }) {
  const [ref, isVisible] = useScrollAnimation();
  const { id, sectionLabel, title, subtitle, cards } = config;

  return (
    <section id={id} className="py-28 px-6" style={{ backgroundColor: colors.painBg }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: colors.painIconBg, color: colors.painText }}
          >
            {sectionLabel}
          </span>
          <h2
            className="font-neue font-bold leading-tight mb-5 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: colors.painText }}
          >
            {title}
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: colors.painSubtext }}>
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 border shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-md ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                backgroundColor: colors.painCardBg,
                borderColor: colors.painCardBorder,
                transitionDelay: `${i * 130 + 200}ms`,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: colors.painIconBg }}
              >
                <i className={`${card.icon} text-lg`} style={{ color: colors.painText }} />
              </div>
              <h3
                className="font-neue font-bold text-xl mb-3 leading-snug"
                style={{ color: colors.painText }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: `${colors.painSubtext}cc` }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
