import React, { useEffect, useRef, useState } from 'react';
import { ARTICLES } from '../data/academyContent';
import { computeReadingTime, type RouteId } from '../utils/themeHelpers';

export function BlogArchiveView({
  onNavigate,
}: {
  onNavigate: (route: RouteId, id?: string) => void;
}) {
  return (
    <main id="main" className="site-main aga-blog-main" role="main">
      <div className="aga-container">
        <nav className="aga-breadcrumbs" aria-label="Breadcrumb">
          <ol className="aga-breadcrumbs__list">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
              >
                Home
              </a>
            </li>
            <li aria-hidden="true" className="aga-breadcrumbs__sep">
              /
            </li>
            <li aria-current="page">
              <span>Insights &amp; Resources</span>
            </li>
          </ol>
        </nav>

        <header className="aga-archive-header">
          <h1 className="aga-archive-header__title">Insights &amp; Policy Research</h1>
          <p className="aga-archive-header__desc">
            Peer-reviewed briefings, policy essays, and regulatory analyses on responsible artificial intelligence.
          </p>
        </header>

        <div className="aga-blog-grid">
          {ARTICLES.map((post) => (
            <article key={post.id} className="aga-card aga-article-card aga-article-card--standard">
              <div className="aga-article-card__media">
                <a
                  href="#single"
                  className="aga-article-card__image-link"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('single', post.id);
                  }}
                >
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="aga-article-card__image"
                    referrerPolicy="no-referrer"
                  />
                </a>
                <span className="aga-badge aga-article-card__badge">{post.category}</span>
              </div>
              <div className="aga-article-card__body">
                <h2 className="aga-article-card__title">
                  <a
                    href="#single"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('single', post.id);
                    }}
                  >
                    {post.title}
                  </a>
                </h2>
                <p className="aga-article-card__excerpt">{post.excerpt}</p>
                <div className="aga-reading-meta">
                  <span className="aga-reading-meta__item">{post.date}</span>
                  <span className="aga-reading-meta__item">
                    {post.readTimeOverride ?? computeReadingTime(post.paragraphs.join(' '))}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export function SinglePostView({
  postId,
  onNavigate,
}: {
  postId: string;
  onNavigate: (route: RouteId, id?: string) => void;
}) {
  const post = ARTICLES.find((a) => a.id === postId) ?? ARTICLES[0];
  const related = ARTICLES.filter((a) => a.id !== post.id).slice(0, 3);
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight * 0.4);
      const scrolled = Math.min(total, Math.max(0, -rect.top + 80));
      setProgress(Math.round((scrolled / total) * 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [post.id]);

  return (
    <>
      <div className="aga-reading-progress" aria-hidden="true">
        <div className="aga-reading-progress__bar" style={{ width: `${progress}%` }} />
      </div>

      <main id="main" className="site-main aga-single-main" role="main">
        <div className="aga-container">
          <nav className="aga-breadcrumbs" aria-label="Breadcrumb">
            <ol className="aga-breadcrumbs__list">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                  }}
                >
                  Home
                </a>
              </li>
              <li aria-hidden="true" className="aga-breadcrumbs__sep">
                /
              </li>
              <li>
                <a
                  href="#blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('blog');
                  }}
                >
                  Insights
                </a>
              </li>
              <li aria-hidden="true" className="aga-breadcrumbs__sep">
                /
              </li>
              <li aria-current="page">
                <span>{post.title}</span>
              </li>
            </ol>
          </nav>

          <article className="aga-single-article">
            <header className="aga-single-article__header">
              <span className="aga-badge">{post.category}</span>
              <h1 className="aga-single-article__title">{post.title}</h1>
              <div className="aga-reading-meta">
                <span className="aga-reading-meta__item">{post.author}</span>
                <span className="aga-reading-meta__item">{post.date}</span>
                <span className="aga-reading-meta__item">
                  {post.readTimeOverride ?? computeReadingTime(post.paragraphs.join(' '))}
                </span>
              </div>
            </header>

            <figure className="aga-single-article__cover">
              <img
                src={post.image}
                alt={post.imageAlt}
                className="aga-single-article__image"
                referrerPolicy="no-referrer"
              />
            </figure>

            <div className="entry-content" ref={articleRef}>
              {post.paragraphs.slice(0, 2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <blockquote>{post.quote}</blockquote>
              {post.paragraphs.slice(2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>

          <section className="aga-related-posts" aria-labelledby="aga-related-heading">
            <div className="aga-section-title">
              <h2 id="aga-related-heading" className="aga-section-title__heading">
                Related Insights
              </h2>
              <span className="aga-section-title__rule" aria-hidden="true" />
              <a
                className="aga-section-title__link"
                href="#blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('blog');
                }}
              >
                View All &rarr;
              </a>
            </div>
            <div className="aga-blog-grid">
              {related.map((rel) => (
                <article key={rel.id} className="aga-card aga-article-card aga-article-card--standard">
                  <div className="aga-article-card__media">
                    <img
                      src={rel.image}
                      alt={rel.imageAlt}
                      className="aga-article-card__image"
                      referrerPolicy="no-referrer"
                    />
                    <span className="aga-badge aga-article-card__badge">{rel.category}</span>
                  </div>
                  <div className="aga-article-card__body">
                    <h3 className="aga-article-card__title">
                      <a
                        href="#single"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate('single', rel.id);
                        }}
                      >
                        {rel.title}
                      </a>
                    </h3>
                    <div className="aga-reading-meta">
                      <span className="aga-reading-meta__item">{rel.date}</span>
                      <span className="aga-reading-meta__item">
                        {computeReadingTime(rel.paragraphs.join(' '))}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
