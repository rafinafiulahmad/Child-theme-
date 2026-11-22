<?php
/**
 * Context-aware body classes for layout, bookstore formats, Tutor LMS, and reader scope.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'aga_filter_body_classes' ) ) {
	/**
	 * Append semantic AGA context classes to <body>.
	 *
	 * @param string[] $classes Existing body classes.
	 * @return string[]
	 */
	function aga_filter_body_classes( $classes ) {
		$classes[] = 'aga-theme';

		if ( ! aga_is_reader_context() ) {
			$classes[] = 'aga-has-mobile-nav';
		}

		if ( is_front_page() ) {
			$classes[] = 'aga-page-home';
		}

		if ( is_singular( 'post' ) ) {
			$classes[] = 'aga-reading-article';
		}

		// WooCommerce book format body classes: aga-book-ebook / aga-book-printed.
		if ( function_exists( 'is_product' ) && is_product() ) {
			$product_id = get_queried_object_id();
			$book_type  = get_post_meta( $product_id, '_aga_book_type', true );

			if ( 'digital' === $book_type ) {
				$classes[] = 'aga-book-ebook';
			} elseif ( 'physical' === $book_type ) {
				$classes[] = 'aga-book-printed';
			}
		}

		if ( function_exists( 'is_woocommerce' ) && ( is_woocommerce() || is_cart() || is_checkout() || is_account_page() ) ) {
			$classes[] = 'aga-bookstore-context';
		}

		if ( function_exists( 'tutor_utils' ) && ( is_singular( 'courses' ) || is_post_type_archive( 'courses' ) || is_page( 'dashboard' ) ) ) {
			$classes[] = 'aga-tutor-context';
		}

		if ( is_page( 'online-reader' ) ) {
			$classes[] = 'aga-reader-page';
		}

		if ( is_page( 'reading-library' ) ) {
			$classes[] = 'aga-library-page';
		}

		return array_unique( $classes );
	}
}
add_filter( 'body_class', 'aga_filter_body_classes' );
