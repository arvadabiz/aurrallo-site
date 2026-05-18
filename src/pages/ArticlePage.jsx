import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { marked } from 'marked';
import { supabase } from '../lib/supabase';
import brand from '../config.json';

marked.setOptions({ gfm: true, breaks: false });

const COLORS = brand.colors;

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

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate  = useNavigate();
  const [article, setArticle]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let cancelled = false;

    supabase
      .from('articles')
      .select('id, title, slug, body, published_at, is_updated, author_id, author:users!author_id(name, first_name, last_name, avatar_url)')
      .eq('slug', slug)
      .not('published_at', 'is', null)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data) {
          setNotFound(true);
        } else {
          setArticle(data);
        }
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  // Redirect to home if not found — give it a beat so the loading state clears first
  useEffect(() => {
    if (notFound) navigate('/', { replace: true });
  }, [notFound, navigate]);

  const bodyHtml = useMemo(() => {
    if (!article?.body) return '';
    try { return marked.parse(article.body); }
    catch { return ''; }
  }, [article?.body]);

  if (loading) {
    return (
      <div style={{ background: COLORS.heroBg, minHeight: '100vh' }}
           className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
             style={{ borderColor: COLORS.heroAccent, borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!article) return null; // redirect pending

  const author     = article.author;
  const authorName = authorDisplayName(author);

  return (
    <div className="font-sans min-h-screen" style={{ background: COLORS.heroBg, color: COLORS.heroText }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b"
           style={{ background: COLORS.navbarBg, backdropFilter: 'blur(14px)', borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={brand.brand.logo} alt={brand.brand.name}
                 className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-neue font-bold text-[15px]" style={{ color: COLORS.heroText }}>
              {brand.brand.name}
            </span>
          </Link>
          <span className="text-sm mx-1" style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span className="text-sm truncate max-w-[220px]"
                style={{ color: COLORS.heroSubtext }}>
            {article.title}
          </span>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-14">

        {/* Header */}
        <header className="mb-10">
          {article.is_updated && (
            <span className="inline-block mb-4 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}>
              Updated
            </span>
          )}

          <h1 className="font-neue font-bold text-4xl leading-tight mb-6"
              style={{ color: COLORS.heroText }}>
            {article.title}
          </h1>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Author */}
            {authorName && (
              <div className="flex items-center gap-2.5">
                {author?.avatar_url ? (
                  <img src={author.avatar_url} alt={authorName}
                       className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                       style={{ background: 'rgba(108,99,255,0.25)', color: COLORS.heroAccent }}>
                    {authorName[0].toUpperCase()}
                  </div>
                )}
                <span className="text-sm" style={{ color: COLORS.heroSubtext }}>
                  {authorName}
                </span>
              </div>
            )}

            {/* Date */}
            {article.published_at && (
              <>
                {authorName && <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>}
                <span className="text-sm" style={{ color: COLORS.heroSubtext }}>
                  {fmtDate(article.published_at)}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Divider */}
        <div className="mb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} />

        {/* Body */}
        <div
          className="prose prose-invert prose-p:leading-relaxed prose-headings:font-neue prose-a:text-[#9aa0ff] prose-a:no-underline hover:prose-a:underline max-w-none"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </article>

      {/* Footer */}
      <footer className="mt-16 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-between gap-4 flex-wrap">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={brand.brand.logo} alt={brand.brand.name}
                 className="w-6 h-6 rounded-lg object-cover" />
            <span className="text-sm font-neue font-bold" style={{ color: COLORS.heroText }}>
              {brand.brand.name}
            </span>
          </Link>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(230,230,240,0.4)' }}>
            <Link to="/privacy" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
            <Link to="/terms" className="hover:opacity-80 transition-opacity">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
