<?php
/**
 * Homepage 4-column ivory feature strip with thin vertical dividers.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

$aga_features = array(
	array(
		'line1' => __( 'Premium', 'aga-child' ),
		'line2' => __( 'Publications', 'aga-child' ),
		'icon'  => '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" aria-hidden="true"><path d="M2 5.5C2 4.67 2.67 4 3.5 4H9c1.66 0 3 1.34 3 3v13c-1.1-.8-2.4-1.2-3.8-1.2H3.5A1.5 1.5 0 0 1 2 17.3V5.5z" stroke-linejoin="round"/><path d="M22 5.5C22 4.67 21.33 4 20.5 4H15c-1.66 0-3 1.34-3 3v13c1.1-.8 2.4-1.2 3.8-1.2h4.7a1.5 1.5 0 0 0 1.5-1.5V5.5z" stroke-linejoin="round"/></svg>',
	),
	array(
		'line1' => __( 'Expert-Led', 'aga-child' ),
		'line2' => __( 'Learning', 'aga-child' ),
		'icon'  => '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5z" stroke-linejoin="round"/><path d="M6 12.5v4.5c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7v-4.5" stroke-linecap="round"/><path d="M20 11v5" stroke-linecap="round"/></svg>',
	),
	array(
		'line1' => __( 'Evidence-Based', 'aga-child' ),
		'line2' => __( 'Policy Research', 'aga-child' ),
		'icon'  => '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" aria-hidden="true"><path d="M12 3v17" stroke-linecap="round"/><path d="M5 7h14" stroke-linecap="round"/><path d="M5 7l-2.5 5.5h5L5 7z" stroke-linejoin="round"/><path d="M19 7l-2.5 5.5h5L19 7z" stroke-linejoin="round"/><path d="M8 20h8" stroke-linecap="round"/></svg>',
	),
	array(
		'line1' => __( 'Global', 'aga-child' ),
		'line2' => __( 'Community', 'aga-child' ),
		'icon'  => '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke-linecap="round"/><circle cx="9" cy="7" r="3.5"/><path d="M22 21v-2a3.5 3.5 0 0 0-2.6-3.4" stroke-linecap="round"/><path d="M16.5 3.6a3.5 3.5 0 0 1 0 6.8" stroke-linecap="round"/></svg>',
	),
);
?>
<section class="aga-feature-strip" aria-label="<?php esc_attr_e( 'Academy pillars', 'aga-child' ); ?>">
	<div class="aga-container">
		<ul class="aga-feature-strip__grid">
			<?php foreach ( $aga_features as $aga_feature ) : ?>
				<li class="aga-feature-strip__item">
					<span class="aga-feature-strip__icon"><?php echo $aga_feature['icon']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
					<span class="aga-feature-strip__label">
						<span><?php echo esc_html( $aga_feature['line1'] ); ?></span>
						<span><?php echo esc_html( $aga_feature['line2'] ); ?></span>
					</span>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
