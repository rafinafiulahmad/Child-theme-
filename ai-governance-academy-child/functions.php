<?php
/**
 * AI Governance Academy Child Theme Loader.
 *
 * Thin bootstrap only: loads modular setup, asset enqueues, body classes,
 * template helpers, Customizer controls, and optional plugin integrations.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

define( 'AGA_CHILD_VERSION', '1.0.0' );
define( 'AGA_CHILD_DIR', get_stylesheet_directory() );
define( 'AGA_CHILD_URI', get_stylesheet_directory_uri() );

$aga_includes = array(
	'/inc/setup.php',
	'/inc/enqueue.php',
	'/inc/body-classes.php',
	'/inc/template-functions.php',
	'/inc/customizer.php',
	'/inc/integrations/woocommerce.php',
	'/inc/integrations/tutor-lms.php',
	'/inc/integrations/reader-ui.php',
);

foreach ( $aga_includes as $aga_file ) {
	$aga_filepath = AGA_CHILD_DIR . $aga_file;
	if ( file_exists( $aga_filepath ) ) {
		require_once $aga_filepath;
	}
}
