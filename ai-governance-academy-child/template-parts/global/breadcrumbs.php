<?php
/**
 * Accessible breadcrumb trail for archives, single posts, courses, and bookstore pages.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

if ( is_front_page() ) {
	return;
}

if ( function_exists( 'woocommerce_breadcrumb' ) && function_exists( 'is_woocommerce' ) && is_woocommerce() ) {
	echo '<div class="aga-breadcrumbs">';
	woocommerce_breadcrumb(
		array(
			'delimiter'   => '<span class="aga-breadcrumbs__sep" aria-hidden="true">/</span>',
			'wrap_before' => '<nav class="aga-breadcrumbs__nav" aria-label="' . esc_attr__( 'Breadcrumb', 'aga-child' ) . '">',
			'wrap_after'  => '</nav>',
		)
	);
	echo '</div>';
	return;
}
?>
<nav class="aga-breadcrumbs" aria-label="<?php esc_attr_e( 'Breadcrumb', 'aga-child' ); ?>">
	<ol class="aga-breadcrumbs__list">
		<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'aga-child' ); ?></a></li>
		<?php if ( is_singular( 'post' ) ) : ?>
			<li aria-hidden="true" class="aga-breadcrumbs__sep">/</li>
			<li><a href="<?php echo esc_url( aga_get_blog_url() ); ?>"><?php esc_html_e( 'Insights', 'aga-child' ); ?></a></li>
			<li aria-hidden="true" class="aga-breadcrumbs__sep">/</li>
			<li aria-current="page"><span><?php echo esc_html( get_the_title() ); ?></span></li>
		<?php elseif ( is_home() || is_archive() ) : ?>
			<li aria-hidden="true" class="aga-breadcrumbs__sep">/</li>
			<li aria-current="page"><span><?php echo esc_html( is_home() ? __( 'Insights & Resources', 'aga-child' ) : get_the_archive_title() ); ?></span></li>
		<?php elseif ( is_page() ) : ?>
			<li aria-hidden="true" class="aga-breadcrumbs__sep">/</li>
			<li aria-current="page"><span><?php echo esc_html( get_the_title() ); ?></span></li>
		<?php endif; ?>
	</ol>
</nav>
