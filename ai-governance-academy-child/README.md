# AI Governance Academy — Kadence Child Theme (`ai-governance-academy-child`)

Production-ready WordPress child theme for **Kadence** (`Template: kadence`, text domain `aga-child`, PHP 7.4+, WordPress 6.x).

## Scope & Architecture

This child theme handles **visual design, layout tokens, typography, and templates ONLY**:
- Sticky header, desktop horizontal menu, logged-in avatar dropdown / guest login trigger
- Mobile fixed bottom navigation (`<=768px`) with accessible off-canvas drawer
- Accessible 3-slide hero carousel, 4-column feature strip, and `WP_Query`-driven Latest Insights
- Editorial blog archive, single article reading measure (`820px`), scroll progress bar, and related posts
- WooCommerce Bookstore styling (`_aga_book_type` badges & `aga-book-ebook` / `aga-book-printed` body classes), Cart, Checkout, and My Account
- Tutor LMS CSS-first integration (course cards, dashboard sidebar, progress bars, lessons, quizzes)
- Isolated Online Reader UI (`.aga-reader .aga-reader-content`) with Ivory / Sepia / Dark themes, font-size controls, and chapter sidebar

**Out of scope (implemented separately in `aga-bookstore-framework` plugin):**
- Payment & order verification
- Private file delivery / signed downloads
- Reader entitlement & access control
- Bookmark / reading progress persistence

---

## Mandatory Installation & Verification Order

Install and activate components strictly in this sequence, testing every active route after each step:

1. **Step 1 — Kadence Parent Theme Only**
   - Install and activate **Kadence** from WordPress Appearance → Themes.
   - Verify baseline WordPress Home, Blog, and Single Post routes render cleanly with no errors.
2. **Step 2 — Activate `ai-governance-academy-child`**
   - Upload/install `ai-governance-academy-child/` into `wp-content/themes/` and activate it.
   - Configure menus (`AGA Primary Header Menu`, `AGA Mobile Off-Canvas Menu`, Footer menus) and optional Customizer slides under Appearance → Customize → *AI Governance Academy Options*.
   - Verify Home, Blog, and Single Post routes on 360px, 390px, 768px, 1024px, and 1440px.
3. **Step 3 — Install & Activate WooCommerce**
   - Install WooCommerce and run the store setup wizard (create Shop, Cart, Checkout, My Account pages).
   - Set book product meta `_aga_book_type` to `digital` or `physical` on book products.
   - Verify Bookstore (`/shop/`), Product, Cart, Checkout, and My Account routes.
4. **Step 4 — Install & Activate Tutor LMS**
   - Install Tutor LMS and verify Course Archive, Single Course, Lesson/Quiz, and Student Dashboard (`/dashboard/`) routes.
5. **Step 5 — Install & Activate `aga-bookstore-framework` Plugin**
   - Activate the companion framework plugin and assign pages with slugs `reading-library` and `online-reader`.
   - Verify Reading Library and Online Reader UI routes (including Ivory/Sepia/Dark theme switching and font controls).

---

## Route Verification Checklist

- [ ] **Home** (`/`) — Sticky header, 3-slide hero carousel, 4-column feature strip, Latest Insights (`WP_Query`), mobile bottom nav (`<=768px`, single labels)
- [ ] **Blog** (`/blog/`) — Archive header, breadcrumbs, responsive card grid, pagination
- [ ] **Single post** (`/{post-slug}/`) — Scroll reading progress bar, `820px` `.entry-content` measure, reading time meta, related posts
- [ ] **Bookstore** (`/shop/`) — 3-column desktop / mobile book grid, `eBook` / `Printed` badges, price, `View book` CTA
- [ ] **Product** (`/product/{book-slug}/`) — `aga-book-ebook` / `aga-book-printed` body classes, format indicator, WooCommerce add-to-cart styling
- [ ] **Cart** (`/cart/`) — Styled WooCommerce cart table, totals, and primary gold checkout CTA
- [ ] **Checkout** (`/checkout/`) — Styled billing fields, order review table, accessible inputs
- [ ] **My Account** (`/my-account/`) — Styled WooCommerce account navigation tabs and order history table
- [ ] **Course** (`/courses/{course-slug}/`) — Tutor LMS course hero, curriculum modules, lesson/quiz styling
- [ ] **Dashboard** (`/dashboard/`) — Tutor LMS dashboard sidebar, enrolled course cards, gold progress bars
- [ ] **Reading Library** (`/reading-library/`) — Library grid container styled for `aga-bookstore-framework` hooks
- [ ] **Online Reader** (`/online-reader/`) — Isolated `.aga-reader .aga-reader-content` workspace, chapter toggle, Ivory/Sepia/Dark themes, A-/A+ font sizing
