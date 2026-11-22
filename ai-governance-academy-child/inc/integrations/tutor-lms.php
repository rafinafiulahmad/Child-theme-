<?php
/**
 * Tutor LMS visual integration (CSS-first approach).
 *
 * Enhances Tutor LMS containers with AGA layout classes when active.
 * Always wrapped in function_exists('tutor_utils') so deactivation never errors.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'aga_is_tutor_active' ) ) {
	/**
	 * Safe runtime check for Tutor LMS.
	 *
	 * @return bool
	 */
	function aga_is_tutor_active() {
		return function_exists( 'tutor_utils' );
	}
}

if ( ! function_exists( 'aga_tutor_setup_visual_hooks' ) ) {
	/**
	 * Attach non-destructive wrapper classes around Tutor LMS course archive grids.
	 */
	function aga_tutor_setup_visual_hooks() {
		if ( ! aga_is_tutor_active() ) {
			return;
		}

		add_action( 'tutor_course/archive/before_loop', 'aga_tutor_archive_wrap_open', 5 );
		add_action( 'tutor_course/archive/after_loop', 'aga_tutor_archive_wrap_close', 99 );
	}
}
add_action( 'init', 'aga_tutor_setup_visual_hooks' );

if ( ! function_exists( 'aga_tutor_archive_wrap_open' ) ) {
	/**
	 * Open AGA visual shell around Tutor LMS course loop.
	 */
	function aga_tutor_archive_wrap_open() {
		echo '<div class="aga-tutor-archive-shell">';
	}
}

if ( ! function_exists( 'aga_tutor_archive_wrap_close' ) ) {
	/**
	 * Close AGA visual shell around Tutor LMS course loop.
	 */
	function aga_tutor_archive_wrap_close() {
		echo '</div>';
	}
}
