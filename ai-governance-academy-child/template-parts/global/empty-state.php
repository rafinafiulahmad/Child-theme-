<?php
/**
 * Reusable empty-state component for posts, books, courses, or library items.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

$aga_empty_args = wp_parse_args(
	isset( $args ) && is_array( $args ) ? $args : array(),
	array(
		'title'      => __( 'No items found', 'aga-child' ),
		'message'    => __( 'There are currently no published entries in this section.', 'aga-child' ),
		'action_url' => home_url( '/' ),
		'action_lbl' => __( 'Return Home', 'aga-child' ),
	)
);
?>
<div class="aga-card aga-empty-state">
	<div class="aga-empty-state__icon" aria-hidden="true">
		<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
			<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke-linecap="round"/>
			<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke-linejoin="round"/>
		</svg>
	</div>
	<h2 class="aga-empty-state__title"><?php echo esc_html( $aga_empty_args['title'] ); ?></h2>
	<p class="aga-empty-state__message"><?php echo esc_html( $aga_empty_args['message'] ); ?></p>
	<?php if ( ! empty( $aga_empty_args['action_url'] ) && ! empty( $aga_empty_args['action_lbl'] ) ) : ?>
		<a class="aga-button aga-button--primary" href="<?php echo esc_url( $aga_empty_args['action_url'] ); ?>">
			<?php echo esc_html( $aga_empty_args['action_lbl'] ); ?>
		</a>
	<?php endif; ?>
</div>
