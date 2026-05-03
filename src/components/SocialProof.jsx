import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function SocialProof({ config, colors }) {
  const [ref, isVisible] = useScrollAnimation();
  const { title, stats } = config;

  return (
    <section className="py-20 px-6" style={{ backgroundColor: colors.socialProofBg }}>
      <div
        ref={ref}
        className={`max-w-5xl mx-auto text-center transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p
          className="text-xs font-semibold uppercase tracking-[0.18em] mb-12"
          style={{ color: colors.socialProofText }}
        >
          {title}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span
                className="font-neue font-bold"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  color: colors.socialProofStat,
                }}
              >
                {stat.value}
              </span>
              <span className="text-sm" style={{ color: colors.socialProofText }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
