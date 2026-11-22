import React, { useState } from 'react';
import { BOOKS, type BookProduct } from '../data/academyContent';
import type { RouteId } from '../utils/themeHelpers';

export function BookstoreArchiveView({
  onNavigate,
}: {
  onNavigate: (route: RouteId, id?: string) => void;
}) {
  return (
    <main id="main" className="site-main aga-bookstore-main" role="main">
      <div className="aga-container aga-bookstore-shell">
        <header className="aga-archive-header">
          <h1 className="aga-archive-header__title">AGA Bookstore</h1>
          <p className="aga-archive-header__desc">
            Monographs, policy handbooks, and practitioner volumes in digital eBook and printed hardcover editions.
          </p>
        </header>

        <ul className="aga-bookstore-grid">
          {BOOKS.map((book) => (
            <li key={book.id}>
              <article className="aga-card aga-book-card">
                <div className="aga-book-card__cover-wrap">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="aga-book-card__cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="aga-book-card__badge-wrap">
                    <span
                      className={`aga-badge aga-book-badge ${
                        book.format === 'digital' ? 'aga-book-badge--ebook' : 'aga-book-badge--printed'
                      }`}
                    >
                      {book.format === 'digital' ? 'eBook' : 'Printed'}
                    </span>
                  </div>
                </div>

                <div className="aga-book-card__body">
                  <h2 className="aga-book-card__title">
                    <a
                      href="#product"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('product', book.id);
                      }}
                    >
                      {book.title}
                    </a>
                  </h2>
                  <div className="aga-book-card__footer">
                    <span className="aga-book-card__price">{book.priceFormatted}</span>
                    <a
                      className="aga-button aga-button--primary aga-book-card__cta"
                      href="#product"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('product', book.id);
                      }}
                    >
                      View book
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export function ProductDetailView({
  bookId,
  onNavigate,
  onAddToCart,
}: {
  bookId: string;
  onNavigate: (route: RouteId, id?: string) => void;
  onAddToCart: (book: BookProduct) => void;
}) {
  const book = BOOKS.find((b) => b.id === bookId) ?? BOOKS[0];
  const [added, setAdded] = useState(false);

  return (
    <main id="main" className="site-main aga-bookstore-main" role="main">
      <div className="aga-container aga-bookstore-shell">
        <div className="aga-product-detail">
          <div className="aga-product-detail__media">
            <img src={book.cover} alt={book.title} referrerPolicy="no-referrer" />
          </div>

          <div>
            <div className="aga-product-detail__meta">
              <span
                className={`aga-badge aga-book-badge ${
                  book.format === 'digital' ? 'aga-book-badge--ebook' : 'aga-book-badge--printed'
                }`}
              >
                {book.format === 'digital' ? 'eBook' : 'Printed'}
              </span>
              <span className="aga-reading-meta__item">{book.author}</span>
            </div>

            <h1>{book.title}</h1>
            <p className="aga-product-detail__price">{book.priceFormatted}</p>

            <p className="aga-product-detail__format-note">
              {book.format === 'digital'
                ? 'Digital Edition: Accessible in your Reading Library and Online Reader after purchase.'
                : 'Printed Hardcover Edition: Clothbound archival print shipped from Dhaka.'}
            </p>

            <p>{book.summary}</p>

            <dl className="aga-product-specs">
              <div>
                <dt>ISBN</dt>
                <dd className="aga-tabular">{book.isbn}</dd>
              </div>
              <div>
                <dt>Extent</dt>
                <dd className="aga-tabular">{book.pages} pages</dd>
              </div>
              <div>
                <dt>Publication Year</dt>
                <dd className="aga-tabular">{book.year}</dd>
              </div>
              <div>
                <dt>Format Class</dt>
                <dd>{book.format === 'digital' ? 'aga-book-ebook' : 'aga-book-printed'}</dd>
              </div>
            </dl>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button
                type="button"
                className="aga-button aga-button--primary"
                onClick={() => {
                  onAddToCart(book);
                  setAdded(true);
                }}
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                type="button"
                className="aga-button aga-button--outline-forest"
                onClick={() => onNavigate('cart')}
              >
                View Cart &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function CartView({
  cartItems,
  onNavigate,
}: {
  cartItems: { book: BookProduct; qty: number }[];
  onNavigate: (route: RouteId) => void;
}) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.book.price * item.qty, 0);

  return (
    <main id="main" className="site-main aga-bookstore-main" role="main">
      <div className="aga-container aga-bookstore-shell">
        <header className="aga-archive-header">
          <h1 className="aga-archive-header__title">Shopping Cart</h1>
        </header>

        <div className="aga-wc-panel">
          {cartItems.length === 0 ? (
            <div className="aga-empty-state">
              <h2 className="aga-empty-state__title">Your cart is empty</h2>
              <p className="aga-empty-state__message">Browse our monographs and policy handbooks.</p>
              <button type="button" className="aga-button aga-button--primary" onClick={() => onNavigate('bookstore')}>
                Explore Bookstore
              </button>
            </div>
          ) : (
            <>
              <table className="aga-wc-table">
                <thead>
                  <tr>
                    <th>Publication</th>
                    <th>Format</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.book.id}>
                      <td>{item.book.title}</td>
                      <td>{item.book.format === 'digital' ? 'eBook' : 'Printed'}</td>
                      <td>{item.qty}</td>
                      <td>${(item.book.price * item.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  marginTop: '24px',
                }}
              >
                <strong className="aga-tabular" style={{ fontSize: '1.2rem' }}>
                  Total: ${subtotal.toFixed(2)}
                </strong>
                <button
                  type="button"
                  className="aga-button aga-button--primary"
                  onClick={() => onNavigate('checkout')}
                >
                  Proceed to Checkout &rarr;
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export function CheckoutView({
  cartItems,
  onNavigate,
}: {
  cartItems: { book: BookProduct; qty: number }[];
  onNavigate: (route: RouteId) => void;
}) {
  const [placed, setPlaced] = useState(false);
  const subtotal = cartItems.reduce((sum, item) => sum + item.book.price * item.qty, 0);

  return (
    <main id="main" className="site-main aga-bookstore-main" role="main">
      <div className="aga-container aga-bookstore-shell">
        <header className="aga-archive-header">
          <h1 className="aga-archive-header__title">Checkout</h1>
        </header>

        <div className="aga-wc-panel">
          {placed ? (
            <div className="aga-empty-state">
              <h2 className="aga-empty-state__title">Order Form Preview Submitted</h2>
              <p className="aga-empty-state__message">
                WooCommerce checkout styling verified. Order verification runs inside the framework plugin in WordPress.
              </p>
              <button
                type="button"
                className="aga-button aga-button--primary"
                onClick={() => onNavigate('my-account')}
              >
                Go to My Account
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPlaced(true);
              }}
              style={{ display: 'grid', gap: '16px', maxWidth: '640px' }}
            >
              <div>
                <label htmlFor="aga-bill-name" style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name
                </label>
                <input id="aga-bill-name" className="aga-input" type="text" defaultValue="Dr. Farhana Rahman" required />
              </div>
              <div>
                <label htmlFor="aga-bill-email" style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  id="aga-bill-email"
                  className="aga-input"
                  type="email"
                  defaultValue="fellow@aigovernanceacademy.org"
                  required
                />
              </div>
              <div>
                <label htmlFor="aga-bill-city" style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>
                  City &amp; Country
                </label>
                <input id="aga-bill-city" className="aga-input" type="text" defaultValue="Dhaka, Bangladesh" required />
              </div>
              <div style={{ paddingTop: '12px', borderTop: '1px solid var(--aga-border)' }}>
                <p className="aga-tabular" style={{ fontWeight: 700 }}>
                  Order Total: ${subtotal.toFixed(2)}
                </p>
                <button type="submit" className="aga-button aga-button--primary">
                  Place Order
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export function MyAccountView({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [tab, setTab] = useState<'overview' | 'orders'>('overview');

  return (
    <main id="main" className="site-main aga-bookstore-main" role="main">
      <div className="aga-container aga-bookstore-shell">
        <header className="aga-archive-header">
          <h1 className="aga-archive-header__title">My Account</h1>
        </header>

        <div className="aga-wc-panel">
          <nav className="aga-account-nav" aria-label="Account sections">
            <button
              type="button"
              className={tab === 'overview' ? 'is-active' : ''}
              onClick={() => setTab('overview')}
            >
              Account Overview
            </button>
            <button
              type="button"
              className={tab === 'orders' ? 'is-active' : ''}
              onClick={() => setTab('orders')}
            >
              Order History
            </button>
            <button type="button" onClick={() => onNavigate('reading-library')}>
              Reading Library
            </button>
            <button type="button" onClick={() => onNavigate('dashboard')}>
              Learning Dashboard
            </button>
          </nav>

          {tab === 'overview' ? (
            <div>
              <h2>Welcome, Dr. Farhana Rahman</h2>
              <p>
                Manage your billing profile, track printed monograph dispatches, and launch your digital Reading Library.
              </p>
            </div>
          ) : (
            <table className="aga-wc-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#AGA-1042</td>
                  <td>Nov 14, 2026</td>
                  <td>Completed</td>
                  <td>$24.00</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
