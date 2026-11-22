<?php
/**
 * WooCommerce visual integration for AGA Bookstore.
 *
 * Strictly visual/template layer only. Payment/order verification and private
 * digital file delivery belong exclusively to the aga-bookstore-framework plugin.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'aga_is_woocommerce_active' ) ) {
	/**
	 * Safe runtime check for WooCommerce.
	 *
	 * @return bool
	 */
	function aga_is_woocommerce_active() {
		return function_exists( 'is_woocommerce' ) && class_exists( 'WooCommerce' );
	}
}

if ( ! function_exists( 'aga_get_book_type_meta' ) ) {
	/**
	 * Retrieve book format meta value ('digital' | 'physical') for visual badging.
	 *
	 * @param int $product_id WooCommerce product post ID.
	 * @return string
	 */
	function aga_get_book_type_meta( $product_id ) {
		$type = get_post_meta( (int) $product_id, '_aga_book_type', true );
		if ( in_array( $type, array( 'digital', 'physical' ), true ) ) {
			return $type;
		}
		return 'physical';
	}
}

if ( ! function_exists( 'aga_get_book_type_label' ) ) {
	/**
	 * Human-readable badge text for a book format.
	 *
	 * @param string $book_type Format slug ('digital'|'physical').
	 * @return string
	 */
	function aga_get_book_type_label( $book_type ) {
		if ( 'digital' === $book_type ) {
			return __( 'eBook', 'aga-child' );
		}
		return __( 'Printed', 'aga-child' );
	}
}

if ( ! function_exists( 'aga_wc_setup_visual_hooks' ) ) {
	/**
	 * Wire WooCommerce visual wrappers and archive column count.
	 */
	function aga_wc_setup_visual_hooks() {
		if ( ! aga_is_woocommerce_active() ) {
			return;
		}

		add_filter(
			'loop_shop_columns',
			function () {
				return 3;
			},
			20
		);

		remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
		remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );
		add_action( 'woocommerce_before_main_content', 'aga_wc_wrapper_start', 10 );
		add_action( 'woocommerce_after_main_content', 'aga_wc_wrapper_end', 10 );
	}
}
add_action( 'wp', 'aga_wc_setup_visual_hooks' );

if ( ! function_exists( 'aga_wc_wrapper_start' ) ) {
	/**
	 * Open AGA bookstore container around WooCommerce main content.
	 */
	function aga_wc_wrapper_start() {
		echo '<main id="main" class="site-main aga-bookstore-main"><div class="aga-container aga-bookstore-shell">';
	}
}

if ( ! function_exists( 'aga_wc_wrapper_end' ) ) {
	/**
	 * Close AGA bookstore container.
	 */
	function aga_wc_wrapper_end() {
		echo '</div></main>';
	}
}
