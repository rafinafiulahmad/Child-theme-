import React, { useEffect, useRef, useState } from 'react';
import { ARTICLES, FEATURE_PILLARS, HERO_SLIDES } from '../data/academyContent';
import { computeReadingTime, wrapSlideIndex, type RouteId } from '../utils/themeHelpers';

interface HomeViewProps {
  onNavigate: (route: RouteId, id?: string) => void;
}

function FeatureIcon({ id }: { id: string }) {
  if (id === 'publications') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
        <path d="M2 5.5C2 4.67 2.67 4 3.5 4H9c1.66 0 3 1.34 3 3v13c-1.1-.8-2.4-1.2-3.8-1.2H3.5A1.5 1.5 0 0 1 2 17.3V5.5z" strokeLinejoin="round" />
        <path d="M22 5.5C22 4.67 21.33 4 20.5 4H15c-1.66 0-3 1.34-3 3v13c1.1-.8 2.4-1.2 3.8-1.2h4.7a1.5 1.5 0 0 0 1.5-1.5V5.5z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === 'learning') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
        <path d="M22 10L12 5 2 10l10 5 10-5z" strokeLinejoin="round" />
        <path d="M6 12.5v4.5c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7v-4.5" strokeLinecap="round" />
        <path d="M20 11v5" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'research') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
        <path d="M12 3v17" strokeLinecap="round" />
        <path d="M5 7h14" strokeLinecap="round" />
        <path d="M5 7l-2.5 5.5h5L5 7z" strokeLinejoin="round" />
        <path d="M19 7l-2.5 5.5h5L19 7z" strokeLinejoin="round" />
        <path d="M8 20h8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="3.5" />
      <path d="M22 21v-2a3.5 3.5 0 0 0-2.6-3.4" strokeLinecap="round" />
      <path d="M16.5 3.6a3.5 3.5 0 0 1 0 6.8" strokeLinecap="round" />
    </svg>
  );
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [statusText, setStatusText] = useState('');
  const touchStartX = useRef(0);

  const goTo = (next: number, announce = true) => {
    const wrapped = wrapSlideIndex(next, HERO_SLIDES.length);
    setSlideIndex(wrapped);
    if (announce) {
      setStatusText(`Slide ${wrapped + 1} of ${HERO_SLIDES.length}`);
    }
  };

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || paused) {
      return;
    }
    const id = window.setInterval(() => {
      setSlideIndex((prev) => wrapSlideIndex(prev + 1, HERO_SLIDES.length));
    }, 6500);
    return () => window.clearInterval(id);
  }, [paused]);

  const featuredArticle = ARTICLES[0];
  const secondaryArticles = ARTICLES.slice(1, 4);

  return (
    <main id="main" className="site-main aga-home-main" role="main">
      {/* 1. Hero Slider */}
      <section
        className="aga-hero"
        role="region"
        aria-roledescription="carousel"
        aria-label="AI Governance Academy Highlights"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(slideIndex - 1);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goTo(slideIndex + 1);
          }
        }}
        onTouchStart={(e) => {
          if (e.changedTouches.length) {
            touchStartX.current = e.changedTouches[0].clientX;
          }
        }}
        onTouchEnd={(e) => {
          if (!e.changedTouches.length) {
            return;
          }
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(delta) >= 40) {
            goTo(delta < 0 ? slideIndex + 1 : slideIndex - 1);
          }
        }}
      >
        <div className="aga-hero__track">
          {HERO_SLIDES.map((slide, idx) => {
            const active = idx === slideIndex;
            const HeadingTag = idx === 0 ? 'h1' : 'h2';
            return (
              <article
                key={slide.id}
                className={`aga-hero__slide${active ? ' is-active' : ''}`}
                aria-hidden={!active}
              >
                <div className="aga-hero__media">
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    className="aga-hero__image"
                    referrerPolicy="no-referrer"
                  />
                  <div className="aga-hero__scrim" aria-hidden="true" />
                </div>

                <div className="aga-container aga-hero__content">
                  <div className="aga-hero__inner">
                    <p className="aga-hero__eyebrow">
                      <span>{slide.eyebrow}</span>
                      <span className="aga-hero__eyebrow-line" aria-hidden="true" />
                    </p>

                    <HeadingTag className="aga-hero__title">
                      {slide.titlePrefix}{' '}
                      <span className="aga-hero__title-accent">{slide.titleAccent}</span>
                    </HeadingTag>

                    <p className="aga-hero__subtitle">{slide.subtitle}</p>

                    <div className="aga-hero__actions">
                      <a
                        className="aga-button aga-button--primary"
                        href="#bookstore"
                        tabIndex={active ? 0 : -1}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(slide.primaryRoute);
                        }}
                      >
                        <span>{slide.primaryText}</span>
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                      <a
                        className="aga-button aga-button--secondary"
                        href="#course"
                        tabIndex={active ? 0 : -1}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(slide.secondaryRoute);
                        }}
                      >
                        {slide.secondaryText}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="aga-container aga-hero__controls-wrap">
          <div className="aga-hero__controls">
            <div className="aga-hero__dots" role="tablist" aria-label="Choose hero slide">
              {HERO_SLIDES.map((slide, idx) => {
                const active = idx === slideIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    className={`aga-hero__dot${active ? ' is-active' : ''}`}
                    role="tab"
                    aria-selected={active}
                    aria-label={`Slide ${idx + 1}`}
                    onClick={() => goTo(idx)}
                  />
                );
              })}
            </div>

            <div className="aga-hero__arrows">
              <button
                type="button"
                className="aga-hero__arrow"
                aria-label="Previous slide"
                onClick={() => goTo(slideIndex - 1)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className="aga-hero__arrow"
                aria-label="Next slide"
                onClick={() => goTo(slideIndex + 1)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <p className="screen-reader-text" aria-live="polite">
          {statusText}
        </p>
      </section>

      {/* 2. 4-Column Feature Strip */}
      <section className="aga-feature-strip" aria-label="Academy pillars">
        <div className="aga-container">
          <ul className="aga-feature-strip__grid">
            {FEATURE_PILLARS.map((pillar) => (
              <li key={pillar.id} className="aga-feature-strip__item">
                <span className="aga-feature-strip__icon">
                  <FeatureIcon id={pillar.id} />
                </span>
                <span className="aga-feature-strip__label">
                  <span>{pillar.line1}</span>
                  <span>{pillar.line2}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Latest Insights */}
      <section className="aga-section aga-latest-insights" aria-labelledby="aga-insights-heading">
        <div className="aga-container">
          <div className="aga-section-title">
            <h2 id="aga-insights-heading" className="aga-section-title__heading">
              Latest Insights
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
              View All <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="aga-insights-layout">
            <div className="aga-insights-layout__featured">
              <article className="aga-card aga-article-card aga-article-card--featured">
                <div className="aga-article-card__media">
                  <a
                    href="#single"
                    className="aga-article-card__image-link"
                    tabIndex={-1}
                    aria-hidden="true"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('single', featuredArticle.id);
                    }}
                  >
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.imageAlt}
                      className="aga-article-card__image"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                  <span className="aga-badge aga-article-card__badge">{featuredArticle.category}</span>
                </div>

                <div className="aga-article-card__body">
                  <h3 className="aga-article-card__title">
                    <a
                      href="#single"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('single', featuredArticle.id);
                      }}
                    >
                      {featuredArticle.title}
                    </a>
                  </h3>
                  <p className="aga-article-card__excerpt">{featuredArticle.excerpt}</p>
                  <div className="aga-reading-meta">
                    <span className="aga-reading-meta__item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <time>{featuredArticle.date}</time>
                    </span>
                    <span className="aga-reading-meta__item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" />
                        <polyline points="12 7 12 12 15.5 14" />
                      </svg>
                      <span>{featuredArticle.readTimeOverride ?? computeReadingTime(featuredArticle.paragraphs.join(' '))}</span>
                    </span>
                  </div>
                </div>
              </article>
            </div>

            <div className="aga-insights-layout__grid">
              {secondaryArticles.map((post) => (
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
                    <h3 className="aga-article-card__title">
                      <a
                        href="#single"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate('single', post.id);
                        }}
                      >
                        {post.title}
                      </a>
                    </h3>
                    <div className="aga-reading-meta">
                      <span className="aga-reading-meta__item">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <time>{post.date}</time>
                      </span>
                      <span className="aga-reading-meta__item">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" />
                          <polyline points="12 7 12 12 15.5 14" />
                        </svg>
                        <span>{computeReadingTime(post.paragraphs.join(' '))}</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
