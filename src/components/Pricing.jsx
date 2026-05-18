import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Pricing({ config, colors }) {
  const [ref, isVisible] = useScrollAnimation();
  const { id, sectionLabel, title, subtitle, plans } = config;

  return (
    <section id={id} className="py-28 px-6" style={{ backgroundColor: colors.benefitsBg }}>
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
            className="font-neue font-bold leading-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: colors.benefitsText }}
          >
            {title}
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: colors.benefitsSubtext }}>
            {subtitle}
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-700 ease-out hover:-translate-y-1 ${
                plan.highlighted
                  ? 'shadow-2xl'
                  : 'shadow-sm hover:shadow-md'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                backgroundColor:  plan.highlighted ? colors.pricingHighlightBg  : colors.benefitsCardBg,
                borderColor:      plan.highlighted ? 'transparent'               : colors.benefitsCardBorder,
                color:            plan.highlighted ? colors.pricingHighlightText : colors.benefitsText,
                transitionDelay:  `${i * 130 + 200}ms`,
                boxShadow:        plan.highlighted ? `0 8px 40px ${colors.pricingHighlightBg}55` : undefined,
              }}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: colors.pricingHighlightBadgeBg,
                    color: colors.pricingHighlightBadgeText,
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-neue font-bold text-xl mb-2">{plan.name}</h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ opacity: plan.highlighted ? 0.75 : undefined, color: plan.highlighted ? undefined : colors.benefitsSubtext }}
                >
                  {plan.description}
                </p>
                <div className="flex items-end gap-1">
                  <span className="font-neue font-bold" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)' }}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm mb-2 opacity-60">{plan.period}</span>
                  )}
                </div>
              </div>

              {/* Feature list */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <i
                      className="fa-solid fa-circle-check flex-shrink-0"
                      style={{ color: plan.highlighted ? colors.pricingHighlightBadgeBg : colors.benefitsAccent }}
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.name === 'Scale' ? 'mailto:hello@aurrallo.com' : '/register'}
                className="block text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={
                  plan.highlighted
                    ? { backgroundColor: colors.pricingHighlightBadgeBg, color: colors.pricingHighlightBadgeText }
                    : { backgroundColor: colors.primaryBtn,               color: colors.primaryBtnText }
                }
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
