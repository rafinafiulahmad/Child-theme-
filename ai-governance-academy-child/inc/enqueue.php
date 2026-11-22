<?php
/**
 * Conditional asset enqueuing with filemtime versioning.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'aga_asset_version' ) ) {
	/**
	 * Return file modification time for cache busting, falling back to theme version.
	 *
	 * @param string $relative_path Path relative to child theme root.
	 * @return string|int
	 */
	function aga_asset_version( $relative_path ) {
		$full_path = AGA_CHILD_DIR . '/' . ltrim( $relative_path, '/' );
		if ( file_exists( $full_path ) ) {
			return filemtime( $full_path );
		}
		return AGA_CHILD_VERSION;
	}
}

if ( ! function_exists( 'aga_enqueue_assets' ) ) {
	/**
	 * Enqueue Google fonts, core stylesheets, conditional page styles, and scripts.
	 */
	function aga_enqueue_assets() {
		// 1. Typography: Playfair Display + Source Serif 4 + Bangla fallbacks with font-display: swap.
		wp_enqueue_style(
			'aga-google-fonts',
			'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400&display=swap',
			array(),
			null
		);

		// 2. Always load base, layout, components, header-footer.
		$core_styles = array(
			'aga-base'          => 'assets/css/base.css',
			'aga-layout'        => 'assets/css/layout.css',
			'aga-components'    => 'assets/css/components.css',
			'aga-header-footer' => 'assets/css/header-footer.css',
		);

		$prev_handle = array( 'aga-google-fonts' );
		foreach ( $core_styles as $handle => $path ) {
			wp_enqueue_style(
				$handle,
				AGA_CHILD_URI . '/' . $path,
				$prev_handle,
				aga_asset_version( $path )
			);
			$prev_handle = array( $handle );
		}

		// 3. Conditionally load route-specific styles.
		$conditional_deps = array( 'aga-components' );

		if ( is_front_page() ) {
			wp_enqueue_style(
				'aga-home',
				AGA_CHILD_URI . '/assets/css/home.css',
				$conditional_deps,
				aga_asset_version( 'assets/css/home.css' )
			);
			wp_enqueue_script(
				'aga-home-slider',
				AGA_CHILD_URI . '/assets/js/home-slider.js',
				array(),
				aga_asset_version( 'assets/js/home-slider.js' ),
				true
			);
		}

		if ( is_singular( 'post' ) || is_home() || is_archive() ) {
			wp_enqueue_style(
				'aga-blog',
				AGA_CHILD_URI . '/assets/css/blog.css',
				$conditional_deps,
				aga_asset_version( 'assets/css/blog.css' )
			);
		}

		if ( function_exists( 'is_woocommerce' ) && ( is_woocommerce() || is_cart() || is_checkout() || is_account_page() ) ) {
			wp_enqueue_style(
				'aga-bookstore',
				AGA_CHILD_URI . '/assets/css/bookstore.css',
				$conditional_deps,
				aga_asset_version( 'assets/css/bookstore.css' )
			);
		}

		if ( function_exists( 'tutor_utils' ) && ( is_singular( 'courses' ) || is_post_type_archive( 'courses' ) || is_page( 'dashboard' ) || is_singular( array( 'lesson', 'tutor_quiz', 'tutor_assignments' ) ) ) ) {
			wp_enqueue_style(
				'aga-tutor-lms',
				AGA_CHILD_URI . '/assets/css/tutor-lms.css',
				$conditional_deps,
				aga_asset_version( 'assets/css/tutor-lms.css' )
			);
		}

		if ( is_page( array( 'online-reader', 'reading-library' ) ) ) {
			wp_enqueue_style(
				'aga-reader',
				AGA_CHILD_URI . '/assets/css/reader.css',
				$conditional_deps,
				aga_asset_version( 'assets/css/reader.css' )
			);
			wp_enqueue_script(
				'aga-reader-ui',
				AGA_CHILD_URI . '/assets/js/reader-ui.js',
				array(),
				aga_asset_version( 'assets/js/reader-ui.js' ),
				true
			);
		}

		// 4. Always load responsive overrides last.
		wp_enqueue_style(
			'aga-responsive',
			AGA_CHILD_URI . '/assets/css/responsive.css',
			array( 'aga-header-footer' ),
			aga_asset_version( 'assets/css/responsive.css' )
		);

		// 5. Core navigation & reading progress script.
		wp_enqueue_script(
			'aga-navigation',
			AGA_CHILD_URI . '/assets/js/navigation.js',
			array(),
			aga_asset_version( 'assets/js/navigation.js' ),
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'aga_enqueue_assets', 30 );
