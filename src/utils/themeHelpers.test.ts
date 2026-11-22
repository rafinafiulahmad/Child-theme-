import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampReaderFontSize,
  computeReadingTime,
  getActiveBottomNavKey,
  getBookFormatBodyClass,
  wrapSlideIndex,
} from './themeHelpers';

test('computeReadingTime calculates rounded-up minutes from word count', () => {
  assert.equal(computeReadingTime(''), '1 min read');
  const sixteenHundredWords = Array.from({ length: 1600 }, () => 'policy').join(' ');
  assert.equal(computeReadingTime(sixteenHundredWords), '8 min read');
});

test('wrapSlideIndex wraps positively and negatively', () => {
  assert.equal(wrapSlideIndex(0, 3), 0);
  assert.equal(wrapSlideIndex(3, 3), 0);
  assert.equal(wrapSlideIndex(-1, 3), 2);
  assert.equal(wrapSlideIndex(4, 3), 1);
});

test('clampReaderFontSize enforces 15px-24px bounds', () => {
  assert.equal(clampReaderFontSize(12), 15);
  assert.equal(clampReaderFontSize(18), 18);
  assert.equal(clampReaderFontSize(30), 24);
});

test('getBookFormatBodyClass maps digital/physical to exact theme classes', () => {
  assert.equal(getBookFormatBodyClass('digital'), 'aga-book-ebook');
  assert.equal(getBookFormatBodyClass('physical'), 'aga-book-printed');
});

test('getActiveBottomNavKey resolves mobile bottom nav active item', () => {
  assert.equal(getActiveBottomNavKey('home'), 'home');
  assert.equal(getActiveBottomNavKey('course'), 'programme');
  assert.equal(getActiveBottomNavKey('single'), 'resources');
  assert.equal(getActiveBottomNavKey('bookstore'), 'books');
  assert.equal(getActiveBottomNavKey('online-reader'), 'books');
});
