import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { supabase } from '../lib/supabase';
import config from '../config.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

marked.setOptions({ gfm: true, breaks: true });

const { colors, brand, navbar, footer } = config;

// Prefix hash-only hrefs so section links work as full-page navigations from article pages
const articleNavConfig = {
  ...navbar,
  links: navbar.links.map(link => ({
    ...link,
    href: link.href.startsWith('#') ? `/${link.href}` : link.href,
  })),
  ctaHref: navbar.ctaHref.startsWith('#') ? `/${navbar.ctaHref}` : navbar.ctaHref,
};

function fmtDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function authorDisplayName(author) {
  if (!author) return null;
  return author.name || [author.first_name, author.last_name].filter(Boolean).join(' ') || null;
}

function Shell({ children }) {
  return (
    <div className="font-sans min-h-screen flex flex-col" style={{ background: colors.heroBg, color: colors.heroText }}>
      <Navbar config={articleNavConfig} colors={colors} brand={brand} alwaysOpaque />
      <div className="flex-1 pt-16">
        {children}
      </div>
      <Footer config={footer} colors={colors} brand={brand} />
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [state, setState] = useState('loading');
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setState('unconfigured');
      return;
    }

    let cancelled = false;
    setState('loading');
    setArticle(null);

    supabase
      .from('articles')
      .select('id, title, slug, body, published_at, is_updated, hide_author, hide_title, hide_date, author_id, author:users!author_id(name, first_name, last_name, avatar_url)')
      .eq('slug', slug)
      .not('published_at', 'is', null)
      .maybeSingle()
      .then(({ data, error: sbErr }) => {
        if (cancelled) return;
        if (sbErr) {
          setError(sbErr.message);
          setState('error');
        } else if (!data) {
          setState('not_found');
        } else {
          setArticle(data);
          setState('found');
        }
      });

    return () => { cancelled = true; };
  }, [slug]);

  const bodyHtml = useMemo(() => {
    if (!article?.body) return '';
    try { return marked.parse(article.body); }
    catch { return ''; }
  }, [article?.body]);

  // ── Loading ──────────────────────────────────────────────
  if (state === 'loading') {
    return (
      <Shell>
        <div className="flex items-center justify-center" style={{ minHeight: '50vh' }}>
          <div className="w-6 h-6 rounded-full border-2 animate-spin"
               style={{ borderColor: colors.heroAccent, borderTopColor: 'transparent' }} />
        </div>
      </Shell>
    );
  }

  // ── Not found ────────────────────────────────────────────
  if (state === 'not_found') {
    return (
      <Shell>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="text-5xl font-neue font-bold mb-4" style={{ color: colors.heroText }}>404</p>
          <p className="mb-8" style={{ color: colors.heroSubtext }}>This page doesn't exist.</p>
          <Link to="/" className="text-sm font-medium" style={{ color: colors.heroAccent }}>
            ← Back to home
          </Link>
        </div>
      </Shell>
    );
  }

  // ── Error / unconfigured ─────────────────────────────────
  if (state === 'error' || state === 'unconfigured') {
    return (
      <Shell>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="text-lg font-semibold mb-3" style={{ color: colors.heroText }}>
            {state === 'unconfigured' ? 'Site not configured' : 'Something went wrong'}
          </p>
          <p className="text-sm mb-8" style={{ color: colors.heroSubtext }}>
            {state === 'unconfigured'
              ? 'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not set.'
              : error}
          </p>
          <Link to="/" className="text-sm font-medium" style={{ color: colors.heroAccent }}>
            ← Back to home
          </Link>
        </div>
      </Shell>
    );
  }

  // ── Article ──────────────────────────────────────────────
  const author     = article.author;
  const authorName = authorDisplayName(author);
  const showAuthor = !article.hide_author && !!authorName;
  const showDate   = !article.hide_date && !!article.published_at;
  const hasHeader  = !article.hide_title || showAuthor || showDate || article.is_updated;

  return (
    <Shell>
      <article className="max-w-3xl mx-auto px-6 py-14">

        {hasHeader && (
          <header className="mb-10">
            {article.is_updated && (
              <span className="inline-block mb-4 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}>
                Updated
              </span>
            )}

            {!article.hide_title && (
              <h1 className="font-neue font-bold text-4xl leading-tight mb-6" style={{ color: colors.heroText }}>
                {article.title}
              </h1>
            )}

            {(showAuthor || showDate) && (
              <div className="flex items-center gap-4 flex-wrap">
                {showAuthor && (
                  <div className="flex items-center gap-2.5">
                    {author?.avatar_url ? (
                      <img src={author.avatar_url} alt={authorName} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                           style={{ background: 'rgba(108,99,255,0.25)', color: colors.heroAccent }}>
                        {authorName[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm" style={{ color: colors.heroSubtext }}>{authorName}</span>
                  </div>
                )}
                {showDate && (
                  <>
                    {showAuthor && <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>}
                    <span className="text-sm" style={{ color: colors.heroSubtext }}>{fmtDate(article.published_at)}</span>
                  </>
                )}
              </div>
            )}
          </header>
        )}

        {hasHeader && <div className="mb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} />}

        <div
          className="prose prose-invert prose-p:leading-relaxed prose-headings:font-neue prose-a:text-[#9aa0ff] prose-a:no-underline hover:prose-a:underline max-w-none"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </article>
    </Shell>
  );
}
