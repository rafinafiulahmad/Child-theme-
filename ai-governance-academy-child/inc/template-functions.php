<?php
/**
 * Shared template helper functions, reading time calculation, SVG icons, and route helpers.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'aga_is_reader_context' ) ) {
	/**
	 * Determine if the current request is the Online Reader view.
	 *
	 * @return bool
	 */
	function aga_is_reader_context() {
		return is_page( 'online-reader' );
	}
}

if ( ! function_exists( 'aga_get_reading_time' ) ) {
	/**
	 * Calculate estimated reading time in minutes from post content word count.
	 *
	 * @param int|WP_Post|null $post Optional post object or ID.
	 * @return string Localized reading time label, e.g. "8 min read".
	 */
	function aga_get_reading_time( $post = null ) {
		$post_obj = get_post( $post );
		if ( ! $post_obj instanceof WP_Post ) {
			return __( '1 min read', 'aga-child' );
		}

		$plain_text = wp_strip_all_tags( strip_shortcodes( $post_obj->post_content ) );
		// Support both Latin words and Bengali/Unicode sequences cleanly.
		$words      = preg_split( '/\s+/u', trim( $plain_text ), -1, PREG_SPLIT_NO_EMPTY );
		$word_count = is_array( $words ) ? count( $words ) : 0;
		$minutes    = max( 1, (int) ceil( $word_count / 200 ) );

		/* translators: %d: number of minutes */
		return sprintf( _n( '%d min read', '%d min read', $minutes, 'aga-child' ), $minutes );
	}
}

if ( ! function_exists( 'aga_get_bookstore_url' ) ) {
	/**
	 * Return the WooCommerce shop URL or fallback books archive URL.
	 *
	 * @return string
	 */
	function aga_get_bookstore_url() {
		if ( function_exists( 'wc_get_page_permalink' ) ) {
			$shop_url = wc_get_page_permalink( 'shop' );
			if ( $shop_url ) {
				return $shop_url;
			}
		}
		return home_url( '/shop/' );
	}
}

if ( ! function_exists( 'aga_get_courses_url' ) ) {
	/**
	 * Return the Tutor LMS courses archive URL or fallback programme URL.
	 *
	 * @return string
	 */
	function aga_get_courses_url() {
		$courses_link = get_post_type_archive_link( 'courses' );
		if ( $courses_link ) {
			return $courses_link;
		}
		return home_url( '/courses/' );
	}
}

if ( ! function_exists( 'aga_get_blog_url' ) ) {
	/**
	 * Return the Insights / Blog index URL.
	 *
	 * @return string
	 */
	function aga_get_blog_url() {
		$posts_page_id = (int) get_option( 'page_for_posts' );
		if ( $posts_page_id > 0 ) {
			return get_permalink( $posts_page_id );
		}
		return home_url( '/blog/' );
	}
}

if ( ! function_exists( 'aga_get_account_url' ) ) {
	/**
	 * Return WooCommerce My Account URL, Tutor dashboard URL, or login URL.
	 *
	 * @return string
	 */
	function aga_get_account_url() {
		if ( function_exists( 'wc_get_page_permalink' ) ) {
			$account_url = wc_get_page_permalink( 'myaccount' );
			if ( $account_url ) {
				return $account_url;
			}
		}
		return wp_login_url( get_permalink() );
	}
}

if ( ! function_exists( 'aga_get_nav_label' ) ) {
	/**
	 * Retrieve mobile bottom nav label with Customizer override.
	 *
	 * @param string $key     Setting key suffix.
	 * @param string $default Default fallback label.
	 * @return string
	 */
	function aga_get_nav_label( $key, $default ) {
		$value = get_theme_mod( 'aga_nav_label_' . $key, $default );
		return is_string( $value ) && '' !== trim( $value ) ? $value : $default;
	}
}

if ( ! function_exists( 'aga_get_brand_emblem_svg' ) ) {
	/**
	 * Return the rounded-square green/gold justice-scales building emblem SVG.
	 *
	 * @return string
	 */
	function aga_get_brand_emblem_svg() {
		return '<svg class="aga-brand-emblem__svg" width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
			. '<rect width="40" height="40" rx="10" fill="#123B2E"/>'
			. '<rect x="1" y="1" width="38" height="38" rx="9" stroke="#B9954F" stroke-opacity="0.45" stroke-width="1"/>'
			. '<path d="M20 8V29" stroke="#B9954F" stroke-width="1.75" stroke-linecap="round"/>'
			. '<path d="M11.5 13.5H28.5" stroke="#B9954F" stroke-width="1.75" stroke-linecap="round"/>'
			. '<path d="M11.5 13.5L8.5 20.5H14.5L11.5 13.5Z" stroke="#F8F5EC" stroke-width="1.35" stroke-linejoin="round"/>'
			. '<path d="M28.5 13.5L25.5 20.5H31.5L28.5 13.5Z" stroke="#F8F5EC" stroke-width="1.35" stroke-linejoin="round"/>'
			. '<path d="M13 31.5H27" stroke="#B9954F" stroke-width="1.75" stroke-linecap="round"/>'
			. '<path d="M15.5 29H24.5" stroke="#F8F5EC" stroke-width="1.35" stroke-linecap="round"/>'
			. '</svg>';
	}
}

if ( ! function_exists( 'aga_get_hero_slides' ) ) {
	/**
	 * Return the 3 configured hero slides with Customizer overrides and local fallback photography.
	 *
	 * @return array<int, array<string, string>>
	 */
	function aga_get_hero_slides() {
		$defaults = array(
			1 => array(
				'eyebrow'      => __( 'AI GOVERNANCE ACADEMY', 'aga-child' ),
				'title_prefix' => __( 'Building an Inclusive and Trustworthy', 'aga-child' ),
				'title_accent' => __( 'AI Future', 'aga-child' ),
				'subtitle'     => __( 'Research, education and policy solutions for responsible AI governance in Bangladesh and beyond.', 'aga-child' ),
				'primary_text' => __( 'Explore Our Books', 'aga-child' ),
				'primary_url'  => aga_get_bookstore_url(),
				'second_text'  => __( 'Join Our Learning Programs', 'aga-child' ),
				'second_url'   => aga_get_courses_url(),
				'image'        => AGA_CHILD_URI . '/assets/images/hero-campus.jpg',
				'image_alt'    => __( 'AI Governance Academy campus building surrounded by greenery at golden hour', 'aga-child' ),
			),
			2 => array(
				'eyebrow'      => __( 'POLICY & RESEARCH FELLOWSHIPS', 'aga-child' ),
				'title_prefix' => __( 'Advancing Evidence-Based Frameworks for', 'aga-child' ),
				'title_accent' => __( 'Public Trust', 'aga-child' ),
				'subtitle'     => __( 'Interdisciplinary monographs, legislative toolkits, and comparative AI regulation studies for South Asia.', 'aga-child' ),
				'primary_text' => __( 'Explore Our Books', 'aga-child' ),
				'primary_url'  => aga_get_bookstore_url(),
				'second_text'  => __( 'Join Our Learning Programs', 'aga-child' ),
				'second_url'   => aga_get_courses_url(),
				'image'        => AGA_CHILD_URI . '/assets/images/hero-research.jpg',
				'image_alt'    => __( 'Scholars conducting AI policy research in the academy library hall', 'aga-child' ),
			),
			3 => array(
				'eyebrow'      => __( 'EXECUTIVE & JUDICIAL DIALOGUES', 'aga-child' ),
				'title_prefix' => __( 'Equipping Regulators and Leaders for', 'aga-child' ),
				'title_accent' => __( 'Algorithmic Accountability', 'aga-child' ),
				'subtitle'     => __( 'Cohort-based executive courses, policy labs, and global governance roundtables.', 'aga-child' ),
				'primary_text' => __( 'Explore Our Books', 'aga-child' ),
				'primary_url'  => aga_get_bookstore_url(),
				'second_text'  => __( 'Join Our Learning Programs', 'aga-child' ),
				'second_url'   => aga_get_courses_url(),
				'image'        => AGA_CHILD_URI . '/assets/images/hero-summit.jpg',
				'image_alt'    => __( 'International policymakers and researchers gathered at a governance roundtable', 'aga-child' ),
			),
		);

		$slides = array();
		foreach ( $defaults as $index => $slide ) {
			$custom_img = get_theme_mod( "aga_hero_slide_{$index}_image", '' );
			$slides[]   = array(
				'eyebrow'      => get_theme_mod( "aga_hero_slide_{$index}_eyebrow", $slide['eyebrow'] ),
				'title_prefix' => get_theme_mod( "aga_hero_slide_{$index}_title_prefix", $slide['title_prefix'] ),
				'title_accent' => get_theme_mod( "aga_hero_slide_{$index}_title_accent", $slide['title_accent'] ),
				'subtitle'     => get_theme_mod( "aga_hero_slide_{$index}_subtitle", $slide['subtitle'] ),
				'primary_text' => get_theme_mod( "aga_hero_slide_{$index}_primary_text", $slide['primary_text'] ),
				'primary_url'  => get_theme_mod( "aga_hero_slide_{$index}_primary_url", $slide['primary_url'] ),
				'second_text'  => get_theme_mod( "aga_hero_slide_{$index}_second_text", $slide['second_text'] ),
				'second_url'   => get_theme_mod( "aga_hero_slide_{$index}_second_url", $slide['second_url'] ),
				'image'        => $custom_img ? $custom_img : $slide['image'],
				'image_alt'    => $slide['image_alt'],
			);
		}

		return $slides;
	}
}

if ( ! function_exists( 'aga_get_active_mobile_nav_key' ) ) {
	/**
	 * Determine which mobile bottom navigation item is active on the current route.
	 *
	 * @return string One of 'home', 'programme', 'resources', 'books', 'menu'.
	 */
	function aga_get_active_mobile_nav_key() {
		if ( is_front_page() ) {
			return 'home';
		}

		if (
			( function_exists( 'tutor_utils' ) && ( is_singular( 'courses' ) || is_post_type_archive( 'courses' ) || is_page( 'dashboard' ) ) )
			|| is_page( array( 'programme', 'courses', 'dashboard' ) )
		) {
			return 'programme';
		}

		if (
			( function_exists( 'is_woocommerce' ) && ( is_woocommerce() || is_cart() || is_checkout() ) )
			|| is_page( array( 'reading-library', 'online-reader' ) )
		) {
			return 'books';
		}

		if ( is_home() || is_singular( 'post' ) || is_archive() ) {
			return 'resources';
		}

		return 'home';
	}
}
