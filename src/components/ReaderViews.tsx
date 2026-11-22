import React, { useState } from 'react';
import { BOOKS, READER_CHAPTERS } from '../data/academyContent';
import { clampReaderFontSize, type ReaderTheme, type RouteId } from '../utils/themeHelpers';

export function ReadingLibraryView({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const digitalBooks = BOOKS.filter((b) => b.format === 'digital');

  return (
    <main id="main" className="site-main aga-library-main" role="main">
      <div className="aga-container">
        <header className="aga-archive-header">
          <h1 className="aga-archive-header__title">Reading Library</h1>
          <p className="aga-archive-header__desc">
            Your digital monographs, policy handbooks, and research volumes.
          </p>
        </header>

        <div className="aga-library-grid">
          {digitalBooks.map((book) => (
            <article key={book.id} className="aga-card aga-book-card">
              <div className="aga-book-card__cover-wrap">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="aga-book-card__cover"
                  referrerPolicy="no-referrer"
                />
                <div className="aga-book-card__badge-wrap">
                  <span className="aga-badge aga-book-badge aga-book-badge--ebook">eBook</span>
                </div>
              </div>
              <div className="aga-book-card__body">
                <h2 className="aga-book-card__title">{book.title}</h2>
                <div className="aga-book-card__footer">
                  <span style={{ fontSize: '0.85rem', color: 'var(--aga-muted)' }}>{book.pages} pages</span>
                  <button
                    type="button"
                    className="aga-button aga-button--primary aga-book-card__cta"
                    onClick={() => onNavigate('online-reader')}
                  >
                    Open Reader
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export function OnlineReaderView() {
  const [theme, setTheme] = useState<ReaderTheme>('ivory');
  const [fontSize, setFontSize] = useState(18);
  const [activeChapterId, setActiveChapterId] = useState(READER_CHAPTERS[0].id);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [sidebarCollapsedDesktop, setSidebarCollapsedDesktop] = useState(false);

  const chapter = READER_CHAPTERS.find((c) => c.id === activeChapterId) ?? READER_CHAPTERS[0];

  const handleToggleChapters = () => {
    if (window.innerWidth >= 769) {
      setSidebarCollapsedDesktop((prev) => !prev);
    } else {
      setSidebarOpenMobile((prev) => !prev);
    }
  };

  return (
    <main id="main" className="site-main aga-reader-main" role="main">
      <div
        className="aga-reader"
        data-reader-theme={theme}
        data-font-size={fontSize}
        style={{ '--reader-font-size': `${fontSize}px` } as React.CSSProperties}
      >
        <header className="aga-reader__toolbar" role="toolbar" aria-label="Reading controls">
          <div className="aga-reader__toolbar-left">
            <button
              type="button"
              className="aga-reader__btn"
              aria-expanded={sidebarOpenMobile || !sidebarCollapsedDesktop}
              aria-controls="aga-reader-chapters"
              onClick={handleToggleChapters}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 6h16M4 12h12M4 18h16" />
              </svg>
              <span>Chapters</span>
            </button>
            <span className="aga-reader__book-title">Foundations of AI Governance</span>
          </div>

          <div className="aga-reader__toolbar-right">
            <div className="aga-reader__font-controls" role="group" aria-label="Text size">
              <button
                type="button"
                className="aga-reader__btn"
                aria-label="Decrease font size"
                onClick={() => setFontSize((s) => clampReaderFontSize(s - 1))}
              >
                A-
              </button>
              <button
                type="button"
                className="aga-reader__btn"
                aria-label="Increase font size"
                onClick={() => setFontSize((s) => clampReaderFontSize(s + 1))}
              >
                A+
              </button>
            </div>

            <div className="aga-reader__theme-controls" role="group" aria-label="Reading surface theme">
              {(['ivory', 'sepia', 'dark'] as ReaderTheme[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`aga-reader__theme-chip${theme === t ? ' is-active' : ''}`}
                  aria-pressed={theme === t}
                  onClick={() => setTheme(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className={`aga-reader__workspace${sidebarCollapsedDesktop ? ' is-sidebar-collapsed' : ''}`}>
          <aside
            id="aga-reader-chapters"
            className={`aga-reader__sidebar${sidebarOpenMobile ? ' is-open' : ''}${
              sidebarCollapsedDesktop ? ' is-collapsed' : ''
            }`}
            aria-label="Book chapters"
          >
            <div className="aga-reader__sidebar-header">
              <h2>Table of Contents</h2>
            </div>
            <ul className="aga-reader__chapters">
              {READER_CHAPTERS.map((ch) => (
                <li key={ch.id}>
                  <button
                    type="button"
                    className={ch.id === chapter.id ? 'is-active' : ''}
                    onClick={() => {
                      setActiveChapterId(ch.id);
                      setSidebarOpenMobile(false);
                    }}
                  >
                    {ch.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <article className="aga-reader-content">
            <h1>{chapter.title}</h1>
            {chapter.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
