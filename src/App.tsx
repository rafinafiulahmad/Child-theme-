import { useEffect, useState } from 'react';
import { BlogArchiveView, SinglePostView } from './components/BlogViews';
import {
  BookstoreArchiveView,
  CartView,
  CheckoutView,
  MyAccountView,
  ProductDetailView,
} from './components/BookstoreViews';
import { MobileBottomNav, SiteFooter, SiteHeader } from './components/GlobalChrome';
import { HomeView } from './components/HomeView';
import { OnlineReaderView, ReadingLibraryView } from './components/ReaderViews';
import { CourseView, DashboardView } from './components/TutorViews';
import { ARTICLES, BOOKS, type BookProduct } from './data/academyContent';
import { getBookFormatBodyClass, type RouteId } from './utils/themeHelpers';

const VALID_ROUTES: RouteId[] = [
  'home',
  'blog',
  'single',
  'bookstore',
  'product',
  'cart',
  'checkout',
  'my-account',
  'course',
  'dashboard',
  'reading-library',
  'online-reader',
];

function parseHashRoute(): RouteId {
  const hash = window.location.hash.replace(/^#/, '') as RouteId;
  return VALID_ROUTES.includes(hash) ? hash : 'home';
}

export default function App() {
  const [route, setRoute] = useState<RouteId>(() => parseHashRoute());
  const [selectedPostId, setSelectedPostId] = useState(ARTICLES[0].id);
  const [selectedBookId, setSelectedBookId] = useState(BOOKS[0].id);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartItems, setCartItems] = useState<{ book: BookProduct; qty: number }[]>([
    { book: BOOKS[0], qty: 1 },
  ]);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHashRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const classes = ['aga-theme'];
    if (route !== 'online-reader') {
      classes.push('aga-has-mobile-nav');
    }
    if (route === 'home') classes.push('aga-page-home');
    if (route === 'single') classes.push('single-post', 'aga-reading-article');
    if (route === 'product') {
      const book = BOOKS.find((b) => b.id === selectedBookId) ?? BOOKS[0];
      classes.push('aga-bookstore-context', getBookFormatBodyClass(book.format));
    }
    if (
      route === 'bookstore' ||
      route === 'cart' ||
      route === 'checkout' ||
      route === 'my-account'
    ) {
      classes.push('aga-bookstore-context');
    }
    if (route === 'course' || route === 'dashboard') {
      classes.push('aga-tutor-context');
    }
    if (route === 'online-reader') classes.push('aga-reader-page');
    if (route === 'reading-library') classes.push('aga-library-page');

    document.body.className = classes.join(' ');
  }, [route, selectedBookId]);

  const navigate = (nextRoute: RouteId, itemId?: string) => {
    if (nextRoute === 'single' && itemId) {
      setSelectedPostId(itemId);
    }
    if (nextRoute === 'product' && itemId) {
      setSelectedBookId(itemId);
    }
    setRoute(nextRoute);
    window.location.hash = nextRoute;
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleAddToCart = (book: BookProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.book.id === book.id);
      if (existing) {
        return prev.map((i) => (i.book.id === book.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { book, qty: 1 }];
    });
  };

  return (
    <div id="page" className="site">
      <SiteHeader
        activeRoute={route}
        onNavigate={navigate}
        isLoggedIn={isLoggedIn}
        onToggleLogin={() => setIsLoggedIn((prev) => !prev)}
        cartCount={cartItems.reduce((sum, item) => sum + item.qty, 0)}
      />

      {route === 'home' && <HomeView onNavigate={navigate} />}
      {route === 'blog' && <BlogArchiveView onNavigate={navigate} />}
      {route === 'single' && <SinglePostView postId={selectedPostId} onNavigate={navigate} />}
      {route === 'bookstore' && <BookstoreArchiveView onNavigate={navigate} />}
      {route === 'product' && (
        <ProductDetailView
          bookId={selectedBookId}
          onNavigate={navigate}
          onAddToCart={handleAddToCart}
        />
      )}
      {route === 'cart' && <CartView cartItems={cartItems} onNavigate={navigate} />}
      {route === 'checkout' && <CheckoutView cartItems={cartItems} onNavigate={navigate} />}
      {route === 'my-account' && <MyAccountView onNavigate={navigate} />}
      {route === 'course' && <CourseView onNavigate={navigate} />}
      {route === 'dashboard' && <DashboardView onNavigate={navigate} />}
      {route === 'reading-library' && <ReadingLibraryView onNavigate={navigate} />}
      {route === 'online-reader' && <OnlineReaderView />}

      {route !== 'online-reader' && <SiteFooter onNavigate={navigate} />}
      <MobileBottomNav activeRoute={route} onNavigate={navigate} />
    </div>
  );
}
