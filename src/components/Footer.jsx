export default function Footer({ config, colors, brand }) {
  const {
    linksEnabled,
    linksDisabledText,
    description,
    email,
    columns,
    social,
    copyright,
  } = config;

  return (
    <footer className="pt-20 pb-10 px-6" style={{ backgroundColor: colors.footerBg }}>
      <div className="max-w-7xl mx-auto">

        {/* Top row */}
        <div
          className="pb-14 border-b"
          style={{ borderColor: colors.footerBorder }}
        >
          {linksEnabled ? (
            /* ── Full layout: brand col + link columns ── */
            <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
              <BrandCol brand={brand} description={description} email={email} colors={colors} />
              {columns.map((col) => (
                <div key={col.title}>
                  <h4
                    className="text-xs font-bold uppercase tracking-widest mb-5"
                    style={{ color: colors.footerHeading }}
                  >
                    {col.title}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <FooterLink href={link.href} label={link.label} colors={colors} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            /* ── Minimal layout: brand + "coming soon" note ── */
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <BrandCol brand={brand} description={description} email={email} colors={colors} />
              <div
                className="md:text-right max-w-xs md:max-w-sm"
              >
                <p
                  className="text-sm italic leading-relaxed"
                  style={{ color: `${colors.footerText}88` }}
                >
                  {linksDisabledText}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom row — always visible */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm" style={{ color: `${colors.footerText}88` }}>
            {copyright}
          </p>
          <div className="flex items-center gap-3">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: colors.footerBorder, color: colors.footerText }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = colors.footerLinkHover;
                  e.currentTarget.style.borderColor = `${colors.footerLinkHover}35`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = colors.footerText;
                  e.currentTarget.style.borderColor = colors.footerBorder;
                }}
              >
                <i className={`${s.icon} text-sm`} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

/* ── Shared sub-components ──────────────────────────────── */
function BrandCol({ brand, description, email, colors }) {
  return (
    <div className="col-span-2">
      <div className="flex items-center gap-2.5 mb-4">
        <img src={brand.logo} alt={brand.name} className="w-8 h-8 rounded-lg object-cover" />
        <span className="font-neue font-bold text-[17px]" style={{ color: colors.footerHeading }}>
          {brand.name}
        </span>
      </div>
      <p className="text-sm leading-relaxed mb-5 max-w-[200px]" style={{ color: colors.footerText }}>
        {description}
      </p>
      <a
        href={`mailto:${email}`}
        className="text-sm transition-colors duration-200"
        style={{ color: colors.footerText }}
        onMouseEnter={e => (e.currentTarget.style.color = colors.footerLinkHover)}
        onMouseLeave={e => (e.currentTarget.style.color = colors.footerText)}
      >
        <i className="fa-regular fa-envelope mr-2" />
        {email}
      </a>
    </div>
  );
}

function FooterLink({ href, label, colors }) {
  return (
    <a
      href={href}
      className="text-sm transition-colors duration-200"
      style={{ color: colors.footerText }}
      onMouseEnter={e => (e.currentTarget.style.color = colors.footerLinkHover)}
      onMouseLeave={e => (e.currentTarget.style.color = colors.footerText)}
    >
      {label}
    </a>
  );
}
