import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import config from '../config.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { colors, brand, navbar, footer } = config;

const blogNavConfig = navbar;

const GRADIENTS = [
  'linear-gradient(135deg, #6c63ff 0%, #3b82f6 100%)',
  'linear-gradient(135deg, #7c3aed 0%, #6c63ff 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
  'linear-gradient(135deg, #6c63ff 0%, #ec4899 100%)',
  'linear-gradient(135deg, #0ea5e9 0%, #6c63ff 100%)',
];

function gradientForSlug(slug) {
  const hash = (slug || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return GRADIENTS[hash % GRADIENTS.length];
}

function calcReadTime(body, override) {
  if (override) return override;
  const words = (body || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function stripMarkdown(md) {
  return (md || '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/^[-*>]\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim();
}

function fmtDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function authorName(author) {
  if (!author) return null;
  return author.name || [author.first_name, author.last_name].filter(Boolean).join(' ') || null;
}

function Thumbnail({ article, className, style }) {
  if (article.thumbnail_url) {
    return (
      <img
        src={article.thumbnail_url}
        alt={article.title}
        className={`${className} object-cover`}
        style={style}
      />
    );
  }
  return (
    <div
      className={className}
      style={{ background: gradientForSlug(article.slug), ...style }}
    />
  );
}

function AuthorChip({ author, date, readTime }) {
  const name = authorName(author);
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {name && (
        <div className="flex items-center gap-1.5">
          {author?.avatar_url ? (
            <img src={author.avatar_url} alt={name} className="w-5 h-5 rounded-full object-cover" />
          ) : (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
              style={{ background: 'rgba(108,99,255,0.3)', color: colors.heroAccent }}
            >
              {name[0].toUpperCase()}
            </div>
          )}
          <span className="text-xs" style={{ color: colors.heroSubtext }}>{name}</span>
        </div>
      )}
      {name && (date || readTime) && (
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
      )}
      {date && (
        <span className="text-xs" style={{ color: colors.heroSubtext }}>{fmtDate(date)}</span>
      )}
      {(date || name) && readTime && (
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
      )}
      {readTime && (
        <span className="text-xs" style={{ color: colors.heroSubtext }}>{readTime} min read</span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Featured hero card
// ---------------------------------------------------------------------------
function FeaturedCard({ article }) {
  const rt = calcReadTime(article.body, article.read_time_override);
  const excerpt = stripMarkdown(article.body).slice(0, 200).trim();
  const displayExcerpt = excerpt.length === 200 ? excerpt + '…' : excerpt;

  return (
    <Link
      to={`/${article.slug}`}
      className="group block rounded-2xl overflow-hidden border transition-all duration-300"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
    >
      <div className="grid md:grid-cols-2 min-h-[340px]">
        {/* Thumbnail */}
        <div className="relative overflow-hidden min-h-[220px] md:min-h-0">
          <Thumbnail
            article={article}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(10,9,32,0.6))' }} />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 gap-4">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{ background: 'rgba(108,99,255,0.2)', color: colors.heroAccent, border: '1px solid rgba(108,99,255,0.3)' }}
            >
              Featured
            </span>
            {article.is_updated && (
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}
              >
                Updated
              </span>
            )}
          </div>

          <h2
            className="font-neue font-bold text-2xl md:text-3xl leading-tight group-hover:opacity-90 transition-opacity"
            style={{ color: colors.heroText }}
          >
            {article.title}
          </h2>

          {displayExcerpt && (
            <p className="text-sm leading-relaxed line-clamp-3" style={{ color: colors.heroSubtext }}>
              {displayExcerpt}
            </p>
          )}

          <AuthorChip author={article.author} date={article.published_at} readTime={rt} />

          <span
            className="text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 w-fit"
            style={{ color: colors.heroAccent }}
          >
            Read article →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Grid card
// ---------------------------------------------------------------------------
function ArticleCard({ article }) {
  const rt = calcReadTime(article.body, article.read_time_override);
  const excerpt = stripMarkdown(article.body).slice(0, 130).trim();
  const displayExcerpt = excerpt.length === 130 ? excerpt + '…' : excerpt;

  return (
    <Link
      to={`/${article.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Thumbnail
          article={article}
          className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {article.is_updated && (
          <div className="absolute top-3 left-3">
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }}
            >
              Updated
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3
          className="font-neue font-semibold text-base leading-snug line-clamp-2 group-hover:opacity-90 transition-opacity"
          style={{ color: colors.heroText }}
        >
          {article.title}
        </h3>

        {displayExcerpt && (
          <p className="text-sm leading-relaxed line-clamp-2 flex-1" style={{ color: colors.heroSubtext }}>
            {displayExcerpt}
          </p>
        )}

        <AuthorChip author={article.author} date={article.published_at} readTime={rt} />
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------
function Shell({ children }) {
  return (
    <div className="font-sans min-h-screen flex flex-col" style={{ background: colors.heroBg, color: colors.heroText }}>
      <Navbar config={blogNavConfig} colors={colors} brand={brand} alwaysOpaque />
      <div className="flex-1 pt-16">{children}</div>
      <Footer config={footer} colors={colors} brand={brand} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function BlogPage() {
  const [state, setState] = useState('loading');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!supabase) { setState('unconfigured'); return; }

    supabase
      .from('articles')
      .select('id, title, slug, body, published_at, is_updated, is_featured, thumbnail_url, read_time_override, author_id, author:users!author_id(name, first_name, last_name, avatar_url)')
      .not('published_at', 'is', null)
      .eq('is_hidden', false)
      .order('published_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) { setState('error'); return; }
        setArticles(data ?? []);
        setState('ready');
      });
  }, []);

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

  if (state === 'error' || state === 'unconfigured') {
    return (
      <Shell>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="text-lg font-semibold mb-3" style={{ color: colors.heroText }}>
            {state === 'unconfigured' ? 'Site not configured' : 'Something went wrong'}
          </p>
          <Link to="/" className="text-sm font-medium" style={{ color: colors.heroAccent }}>← Back to home</Link>
        </div>
      </Shell>
    );
  }

  const featured = articles.find(a => a.is_featured) ?? articles[0] ?? null;
  const grid = articles.filter(a => a.id !== featured?.id);

  return (
    <Shell>
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: colors.heroAccent }}
          >
            Blog
          </p>
          <h1 className="font-neue font-bold text-4xl md:text-5xl" style={{ color: colors.heroText }}>
            Insights on getting paid faster
          </h1>
          <p className="mt-3 text-base max-w-xl" style={{ color: colors.heroSubtext }}>
            Tips, product updates, and thinking around invoicing, cash flow, and running a small business.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
            <p className="text-lg font-semibold" style={{ color: colors.heroText }}>Nothing here yet</p>
            <p className="text-sm" style={{ color: colors.heroSubtext }}>Check back soon — we're working on it.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured */}
            {featured && <FeaturedCard article={featured} />}

            {/* Grid */}
            {grid.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {grid.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </Shell>
  );
}
