<?php
/**
 * Article reading metadata row: calendar date + clock reading time.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

$aga_show_author = isset( $args['show_author'] ) ? (bool) $args['show_author'] : false;
?>
<div class="aga-reading-meta">
	<?php if ( $aga_show_author ) : ?>
		<span class="aga-reading-meta__item aga-reading-meta__author">
			<?php echo esc_html( get_the_author() ); ?>
		</span>
	<?php endif; ?>

	<span class="aga-reading-meta__item">
		<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
			<line x1="16" y1="2" x2="16" y2="6"/>
			<line x1="8" y1="2" x2="8" y2="6"/>
			<line x1="3" y1="10" x2="21" y2="10"/>
		</svg>
		<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>">
			<?php echo esc_html( get_the_date() ); ?>
		</time>
	</span>

	<span class="aga-reading-meta__item">
		<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
			<circle cx="12" cy="12" r="9"/>
			<polyline points="12 7 12 12 15.5 14"/>
		</svg>
		<span><?php echo esc_html( aga_get_reading_time() ); ?></span>
	</span>
</div>
