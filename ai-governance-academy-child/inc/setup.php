<?php
/**
 * Theme setup, textdomain, navigation menus, and Kadence compatibility hooks.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'aga_child_setup' ) ) {
	/**
	 * Register theme supports, image sizes, and navigation menus.
	 */
	function aga_child_setup() {
		load_child_theme_textdomain( 'aga-child', AGA_CHILD_DIR . '/languages' );

		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		add_theme_support(
			'custom-logo',
			array(
				'height'      => 80,
				'width'       => 80,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);

		add_theme_support( 'woocommerce' );

		add_image_size( 'aga-hero', 1600, 900, true );
		add_image_size( 'aga-insight-featured', 960, 600, true );
		add_image_size( 'aga-book-cover', 600, 800, true );

		register_nav_menus(
			array(
				'aga_primary'       => __( 'AGA Primary Header Menu', 'aga-child' ),
				'aga_mobile_drawer' => __( 'AGA Mobile Off-Canvas Menu', 'aga-child' ),
				'aga_footer_col_1'  => __( 'AGA Footer: Academy', 'aga-child' ),
				'aga_footer_col_2'  => __( 'AGA Footer: Programs & Books', 'aga-child' ),
			)
		);
	}
}
add_action( 'after_setup_theme', 'aga_child_setup', 20 );

if ( ! function_exists( 'aga_register_kadence_layout_hooks' ) ) {
	/**
	 * Integrate AGA header, mobile bottom bar, and footer cleanly with Kadence
	 * when Kadence's header/footer actions are present.
	 */
	function aga_register_kadence_layout_hooks() {
		if ( has_action( 'kadence_header' ) ) {
			remove_all_actions( 'kadence_header' );
			add_action( 'kadence_header', 'aga_render_site_header' );
		}

		if ( has_action( 'kadence_footer' ) ) {
			remove_all_actions( 'kadence_footer' );
			add_action( 'kadence_footer', 'aga_render_site_footer' );
		}

		add_action( 'wp_footer', 'aga_render_mobile_bottom_nav', 5 );
	}
}
add_action( 'wp', 'aga_register_kadence_layout_hooks' );

if ( ! function_exists( 'aga_render_site_header' ) ) {
	/**
	 * Render custom AGA header template part.
	 */
	function aga_render_site_header() {
		get_template_part( 'template-parts/global/site-header' );
	}
}

if ( ! function_exists( 'aga_render_site_footer' ) ) {
	/**
	 * Render custom AGA footer template part.
	 */
	function aga_render_site_footer() {
		get_template_part( 'template-parts/global/site-footer' );
	}
}

if ( ! function_exists( 'aga_render_mobile_bottom_nav' ) ) {
	/**
	 * Render mobile bottom navigation bar and off-canvas menu drawer.
	 */
	function aga_render_mobile_bottom_nav() {
		if ( aga_is_reader_context() ) {
			return;
		}
		get_template_part( 'template-parts/global/mobile-bottom-nav' );
	}
}
