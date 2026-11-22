import React, { useEffect, useRef, useState } from 'react';
import { getActiveBottomNavKey, type RouteId } from '../utils/themeHelpers';

interface GlobalChromeProps {
  activeRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  cartCount: number;
}

export function BrandEmblemSvg() {
  return (
    <svg
      className="aga-brand-emblem__svg"
      width="38"
      height="38"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="#123B2E" />
      <rect x="1" y="1" width="38" height="38" rx="9" stroke="#B9954F" strokeOpacity="0.45" strokeWidth="1" />
      <path d="M20 8V29" stroke="#B9954F" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M11.5 13.5H28.5" stroke="#B9954F" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M11.5 13.5L8.5 20.5H14.5L11.5 13.5Z" stroke="#F8F5EC" strokeWidth="1.35" strokeLinejoin="round" />
      <path d="M28.5 13.5L25.5 20.5H31.5L28.5 13.5Z" stroke="#F8F5EC" strokeWidth="1.35" strokeLinejoin="round" />
      <path d="M13 31.5H27" stroke="#B9954F" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M15.5 29H24.5" stroke="#F8F5EC" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader({
  activeRoute,
  onNavigate,
  isLoggedIn,
  onToggleLogin,
}: GlobalChromeProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const navLink = (route: RouteId, label: string) => {
    const isCurrent =
      (route === 'home' && activeRoute === 'home') ||
      (route === 'course' && (activeRoute === 'course' || activeRoute === 'dashboard')) ||
      (route === 'blog' && (activeRoute === 'blog' || activeRoute === 'single')) ||
      (route === 'bookstore' &&
        (activeRoute === 'bookstore' ||
          activeRoute === 'product' ||
          activeRoute === 'cart' ||
          activeRoute === 'checkout'));
    return (
      <li key={route}>
        <a
          href={`#${route}`}
          aria-current={isCurrent ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(route);
          }}
        >
          {label}
        </a>
      </li>
    );
  };

  return (
    <>
      <a className="skip-link screen-reader-text" href="#main">
        Skip to content
      </a>
      <header className="aga-site-header" role="banner">
        <div className="aga-container aga-site-header__inner">
          <a
            className="aga-brand"
            href="#home"
            rel="home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
          >
            <span className="aga-brand-emblem">
              <BrandEmblemSvg />
            </span>
            <span className="aga-brand__title">AI Governance Academy</span>
          </a>

          <nav className="aga-desktop-nav" aria-label="Primary navigation">
            <ul className="aga-desktop-nav__list">
              {navLink('home', 'Home')}
              {navLink('course', 'Programme')}
              {navLink('blog', 'Resources')}
              {navLink('bookstore', 'Books')}
            </ul>
          </nav>

          <div className="aga-header-actions" ref={menuRef}>
            {isLoggedIn ? (
              <div className="aga-user-menu">
                <button
                  type="button"
                  className="aga-user-menu__trigger"
                  aria-expanded={menuOpen}
                  aria-controls="aga-user-dropdown"
                  aria-label="Open user account menu"
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  <span className="aga-user-menu__avatar" aria-hidden="true">
                    FR
                  </span>
                  <svg
                    className="aga-user-menu__chevron"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div id="aga-user-dropdown" className="aga-user-menu__dropdown" hidden={!menuOpen}>
                  <div className="aga-user-menu__identity">
                    <strong>Dr. Farhana Rahman</strong>
                  </div>
                  <ul className="aga-user-menu__links">
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onNavigate('my-account');
                        }}
                      >
                        My Account
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onNavigate('reading-library');
                        }}
                      >
                        Reading Library
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onNavigate('dashboard');
                        }}
                      >
                        Learning Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onNavigate('cart');
                        }}
                      >
                        Cart
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onToggleLogin();
                        }}
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="aga-login-trigger"
                aria-label="Log in to your account"
                onClick={onToggleLogin}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="10 17 15 12 10 7" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="15" y1="12" x2="3" y2="12" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export function MobileBottomNav({
  activeRoute,
  onNavigate,
}: {
  activeRoute: RouteId;
  onNavigate: (route: RouteId) => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const activeKey = getActiveBottomNavKey(activeRoute);

  useEffect(() => {
    if (!drawerOpen || activeRoute === 'online-reader') {
      return;
    }
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        openBtnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [drawerOpen, activeRoute]);

  if (activeRoute === 'online-reader') {
    return null;
  }

  const closeDrawer = () => {
    setDrawerOpen(false);
    openBtnRef.current?.focus();
  };

  const navigateFromDrawer = (route: RouteId) => {
    setDrawerOpen(false);
    onNavigate(route);
  };

  return (
    <>
      <nav className="aga-bottom-nav" aria-label="Mobile primary navigation">
        <a
          href="#home"
          className={`aga-bottom-nav__item${activeKey === 'home' ? ' is-active' : ''}`}
          aria-current={activeKey === 'home' ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          <span className="aga-bottom-nav__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6.5h-5V21H4a1 1 0 0 1-1-1v-9.5z" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="aga-bottom-nav__label">Home</span>
        </a>

        <a
          href="#course"
          className={`aga-bottom-nav__item${activeKey === 'programme' ? ' is-active' : ''}`}
          aria-current={activeKey === 'programme' ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('course');
          }}
        >
          <span className="aga-bottom-nav__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M22 10L12 5 2 10l10 5 10-5z" strokeLinejoin="round" />
              <path d="M6 12.5v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="aga-bottom-nav__label">Programme</span>
        </a>

        <a
          href="#blog"
          className={`aga-bottom-nav__item${activeKey === 'resources' ? ' is-active' : ''}`}
          aria-current={activeKey === 'resources' ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('blog');
          }}
        >
          <span className="aga-bottom-nav__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="aga-bottom-nav__label">Resources</span>
        </a>

        <a
          href="#bookstore"
          className={`aga-bottom-nav__item${activeKey === 'books' ? ' is-active' : ''}`}
          aria-current={activeKey === 'books' ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('bookstore');
          }}
        >
          <span className="aga-bottom-nav__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M2 4.5C2 3.67 2.67 3 3.5 3H9c1.66 0 3 1.34 3 3v14.5c0-1.1-.9-2-2-2H3.5A1.5 1.5 0 0 1 2 17V4.5z" strokeLinejoin="round" />
              <path d="M22 4.5C22 3.67 21.33 3 20.5 3H15c-1.66 0-3 1.34-3 3v14.5c0-1.1.9-2 2-2h6.5a1.5 1.5 0 0 0 1.5-1.5V4.5z" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="aga-bottom-nav__label">Books</span>
        </a>

        <button
          ref={openBtnRef}
          type="button"
          className="aga-bottom-nav__item aga-bottom-nav__menu-btn"
          aria-expanded={drawerOpen}
          aria-controls="aga-mobile-drawer"
          aria-label="Open full navigation menu"
          onClick={() => setDrawerOpen(true)}
        >
          <span className="aga-bottom-nav__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7" strokeLinecap="round" />
              <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
              <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round" />
            </svg>
          </span>
          <span className="aga-bottom-nav__label">Menu</span>
        </button>
      </nav>

      <div
        id="aga-mobile-drawer"
        className="aga-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="aga-drawer-title"
        hidden={!drawerOpen}
      >
        <div className="aga-drawer__backdrop" onClick={closeDrawer} />
        <div className="aga-drawer__panel">
          <div className="aga-drawer__header">
            <span id="aga-drawer-title" className="aga-drawer__title">
              AI Governance Academy
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              className="aga-drawer__close"
              aria-label="Close navigation menu"
              onClick={closeDrawer}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="aga-drawer__nav" aria-label="Full site menu">
            <ul className="aga-drawer__list">
              {(
                [
                  ['home', 'Home'],
                  ['blog', 'Insights & Research'],
                  ['single', 'Featured Policy Brief'],
                  ['bookstore', 'Bookstore'],
                  ['product', 'Book Edition Detail'],
                  ['cart', 'Shopping Cart'],
                  ['checkout', 'Checkout'],
                  ['my-account', 'My Account'],
                  ['course', 'Learning Programme'],
                  ['dashboard', 'Student Dashboard'],
                  ['reading-library', 'Reading Library'],
                  ['online-reader', 'Online Reader'],
                ] as [RouteId, string][]
              ).map(([r, label]) => (
                <li key={r}>
                  <a
                    href={`#${r}`}
                    aria-current={activeRoute === r ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateFromDrawer(r);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export function SiteFooter({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const linkBtn = (route: RouteId, label: string) => (
    <li key={route}>
      <a
        href={`#${route}`}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(route);
        }}
      >
        {label}
      </a>
    </li>
  );

  return (
    <footer className="aga-site-footer" role="contentinfo">
      <div className="aga-container aga-site-footer__grid">
        <div className="aga-site-footer__brand">
          <div className="aga-site-footer__lockup">
            <span className="aga-brand-emblem">
              <BrandEmblemSvg />
            </span>
            <span className="aga-site-footer__name">AI Governance Academy</span>
          </div>
          <p className="aga-site-footer__mission">
            Research, education and policy solutions for responsible AI governance in Bangladesh and beyond.
          </p>
        </div>

        <div className="aga-site-footer__col">
          <h2 className="aga-site-footer__heading">Academy</h2>
          <ul className="aga-site-footer__links">
            {linkBtn('home', 'Home')}
            {linkBtn('blog', 'Policy Insights')}
            {linkBtn('course', 'Learning Programmes')}
            {linkBtn('dashboard', 'Student Dashboard')}
          </ul>
        </div>

        <div className="aga-site-footer__col">
          <h2 className="aga-site-footer__heading">Publications & Portal</h2>
          <ul className="aga-site-footer__links">
            {linkBtn('bookstore', 'Bookstore')}
            {linkBtn('reading-library', 'Reading Library')}
            {linkBtn('online-reader', 'Online Reader')}
            {linkBtn('my-account', 'Member Account')}
          </ul>
        </div>
      </div>

      <div className="aga-container aga-site-footer__bottom">
        <p className="aga-site-footer__copyright">© 2026 AI Governance Academy. All rights reserved.</p>
      </div>
    </footer>
  );
}
