export type RouteId =
  | 'home'
  | 'blog'
  | 'single'
  | 'bookstore'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'my-account'
  | 'course'
  | 'dashboard'
  | 'reading-library'
  | 'online-reader';

export type BookFormat = 'digital' | 'physical';
export type ReaderTheme = 'ivory' | 'sepia' | 'dark';

export function computeReadingTime(text: string, wordsPerMinute = 200): string {
  const cleaned = text.replace(/<[^>]*>/g, ' ').trim();
  if (!cleaned) {
    return '1 min read';
  }
  const words = cleaned.split(/\s+/).filter(Boolean);
  const minutes = Math.max(1, Math.ceil(words.length / Math.max(1, wordsPerMinute)));
  return `${minutes} min read`;
}

export function wrapSlideIndex(nextIndex: number, totalSlides: number): number {
  if (totalSlides <= 0) {
    return 0;
  }
  return ((nextIndex % totalSlides) + totalSlides) % totalSlides;
}

export function clampReaderFontSize(size: number, min = 15, max = 24): number {
  if (!Number.isFinite(size)) {
    return 18;
  }
  return Math.min(max, Math.max(min, Math.round(size)));
}

export function getBookFormatBodyClass(bookType: BookFormat): 'aga-book-ebook' | 'aga-book-printed' {
  return bookType === 'digital' ? 'aga-book-ebook' : 'aga-book-printed';
}

export function getActiveBottomNavKey(route: RouteId): 'home' | 'programme' | 'resources' | 'books' {
  if (route === 'course' || route === 'dashboard') {
    return 'programme';
  }
  if (route === 'blog' || route === 'single') {
    return 'resources';
  }
  if (
    route === 'bookstore' ||
    route === 'product' ||
    route === 'cart' ||
    route === 'checkout' ||
    route === 'reading-library' ||
    route === 'online-reader'
  ) {
    return 'books';
  }
  return 'home';
}
