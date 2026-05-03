import { useState, useEffect } from 'react';

export default function Navbar({ config, colors, brand }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    backgroundColor: scrolled ? colors.navbarBg : 'transparent',
    backdropFilter:       scrolled ? 'blur(14px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
    borderBottom: scrolled ? `1px solid ${colors.footerBorder}` : '1px solid transparent',
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={navStyle}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5">
          <img
            src={brand.logo}
            alt={brand.name}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="font-neue font-bold text-[17px]" style={{ color: colors.heroText }}>
            {brand.name}
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {config.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: colors.navbarText }}
              onMouseEnter={e => (e.currentTarget.style.color = colors.navbarLinkHover)}
              onMouseLeave={e => (e.currentTarget.style.color = colors.navbarText)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href={config.ctaHref}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
            style={{ backgroundColor: colors.primaryBtn, color: colors.primaryBtnText }}
          >
            {config.ctaText}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 transition-colors duration-200"
          style={{ color: colors.navbarText }}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-lg`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ backgroundColor: colors.navbarBg, borderTop: `1px solid ${colors.footerBorder}` }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {config.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-3 text-sm font-medium border-b"
              style={{ color: colors.navbarText, borderColor: colors.footerBorder }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={config.ctaHref}
            className="mt-4 text-center px-5 py-2.5 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: colors.primaryBtn, color: colors.primaryBtnText }}
            onClick={() => setMobileOpen(false)}
          >
            {config.ctaText}
          </a>
        </div>
      </div>
    </nav>
  );
}
