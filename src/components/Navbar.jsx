import { useState, useEffect, useRef } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:5173';

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const DROPDOWN_ITEMS = [
  { label: 'Dashboard', href: `${APP_URL}/dashboard` },
  { label: 'Settings',  href: `${APP_URL}/settings`  },
  { label: 'Changelog', href: '/changelog'             },
];

export default function Navbar({ config, colors, brand, alwaysOpaque = false }) {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [user,         setUser]         = useState(null);
  const [authLoading,  setAuthLoading]  = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('aurrallo_token');
    if (!token) { setAuthLoading(false); return; }
    fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.user) setUser(data.user);
        else {
          localStorage.removeItem('aurrallo_token');
          localStorage.removeItem('aurrallo_refresh_token');
        }
      })
      .catch(() => {})
      .finally(() => setAuthLoading(false));
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [dropdownOpen]);

  function handleSignOut() {
    localStorage.removeItem('aurrallo_token');
    localStorage.removeItem('aurrallo_refresh_token');
    setUser(null);
    setDropdownOpen(false);
    setMobileOpen(false);
  }

  const opaque = scrolled || alwaysOpaque;
  const navStyle = {
    backgroundColor: opaque ? colors.navbarBg : 'transparent',
    backdropFilter:       opaque ? 'blur(14px)' : 'none',
    WebkitBackdropFilter: opaque ? 'blur(14px)' : 'none',
    borderBottom: opaque ? `1px solid ${colors.footerBorder}` : '1px solid transparent',
  };

  const initials = getInitials(user?.name);
  const displayName = user?.name?.split(' ')[0] ?? user?.email;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={navStyle}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <a href="/" className="flex items-center gap-2.5">
          <img src={brand.logo} alt={brand.name} className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-neue font-bold text-[17px]" style={{ color: colors.heroText }}>
            {brand.name}
          </span>
        </a>

        {/* Desktop nav links */}
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

        {/* Desktop auth area */}
        <div className="hidden md:flex items-center gap-2">

          {/* Logged-out */}
          {!authLoading && !user && (
            <>
              <a
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  color: colors.secondaryBtnText,
                  border: `1px solid ${colors.secondaryBtnBorder}`,
                }}
              >
                Log In
              </a>
              <a
                href="/sign-up"
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                style={{ backgroundColor: colors.primaryBtn, color: colors.primaryBtnText }}
              >
                Sign Up
              </a>
            </>
          )}

          {/* Logged-in */}
          {!authLoading && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(v => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: dropdownOpen ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: `1px solid ${dropdownOpen ? colors.footerBorder : 'transparent'}`,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = colors.footerBorder;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = dropdownOpen ? 'rgba(255,255,255,0.08)' : 'transparent';
                  e.currentTarget.style.borderColor = dropdownOpen ? colors.footerBorder : 'transparent';
                }}
              >
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: '#6c63ff', color: '#ffffff' }}
                  >
                    {initials}
                  </div>
                )}
                <span className="text-sm font-medium" style={{ color: colors.heroText }}>
                  {displayName}
                </span>
                <svg
                  width="11" height="11" viewBox="0 0 12 12" fill="none"
                  style={{
                    color: colors.heroSubtext,
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-48 rounded-xl py-1.5 z-50"
                  style={{
                    background: 'rgba(15,13,38,0.97)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid ${colors.footerBorder}`,
                    boxShadow: '0 8px 28px rgba(0,0,0,0.45)',
                  }}
                >
                  {DROPDOWN_ITEMS.map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center px-4 py-2.5 text-sm transition-colors duration-150"
                      style={{ color: colors.heroText, textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      {item.label}
                    </a>
                  ))}
                  <div style={{ borderTop: `1px solid ${colors.footerBorder}`, margin: '4px 8px' }} />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full text-left px-4 py-2.5 text-sm transition-colors duration-150"
                    style={{ color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(248,113,113,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
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
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
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

          {/* Mobile logged-out */}
          {!authLoading && !user && (
            <>
              <a
                href="/login"
                className="mt-4 text-center px-5 py-2.5 rounded-lg text-sm font-semibold"
                style={{ color: colors.secondaryBtnText, border: `1px solid ${colors.secondaryBtnBorder}` }}
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </a>
              <a
                href="/sign-up"
                className="mt-2 text-center px-5 py-2.5 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: colors.primaryBtn, color: colors.primaryBtnText }}
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </a>
            </>
          )}

          {/* Mobile logged-in */}
          {!authLoading && user && (
            <>
              <div className="flex items-center gap-2.5 py-3 mt-1 border-b" style={{ borderColor: colors.footerBorder }}>
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: '#6c63ff', color: '#ffffff' }}>
                    {initials}
                  </div>
                )}
                <span className="text-sm font-medium" style={{ color: colors.heroText }}>{user.name ?? user.email}</span>
              </div>
              {DROPDOWN_ITEMS.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className="py-3 text-sm border-b"
                  style={{ color: colors.navbarText, borderColor: colors.footerBorder }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={handleSignOut}
                className="mt-3 text-left py-2 text-sm"
                style={{ color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
