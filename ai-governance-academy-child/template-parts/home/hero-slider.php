<?php
/**
 * Homepage Hero Slider (3 slides, accessible keyboard + swipe + dots/arrows).
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

$aga_slides = aga_get_hero_slides();
if ( empty( $aga_slides ) ) {
	return;
}
?>
<section
	class="aga-hero"
	data-aga-slider
	role="region"
	aria-roledescription="<?php esc_attr_e( 'carousel', 'aga-child' ); ?>"
	aria-label="<?php esc_attr_e( 'AI Governance Academy Highlights', 'aga-child' ); ?>"
>
	<div class="aga-hero__track" data-aga-slider-track>
		<?php foreach ( $aga_slides as $aga_index => $aga_slide ) : ?>
			<?php
			$aga_is_first = ( 0 === $aga_index );
			$aga_heading  = $aga_is_first ? 'h1' : 'h2';
			?>
			<article
				class="aga-hero__slide<?php echo $aga_is_first ? ' is-active' : ''; ?>"
				data-aga-slide="<?php echo esc_attr( (string) $aga_index ); ?>"
				aria-hidden="<?php echo $aga_is_first ? 'false' : 'true'; ?>"
			>
				<div class="aga-hero__media">
					<img
						src="<?php echo esc_url( $aga_slide['image'] ); ?>"
						alt="<?php echo esc_attr( $aga_slide['image_alt'] ); ?>"
						class="aga-hero__image"
						loading="<?php echo $aga_is_first ? 'eager' : 'lazy'; ?>"
						decoding="async"
					/>
					<div class="aga-hero__scrim" aria-hidden="true"></div>
				</div>

				<div class="aga-container aga-hero__content">
					<div class="aga-hero__inner">
						<p class="aga-hero__eyebrow">
							<span><?php echo esc_html( $aga_slide['eyebrow'] ); ?></span>
							<span class="aga-hero__eyebrow-line" aria-hidden="true"></span>
						</p>

						<<?php echo tag_escape( $aga_heading ); ?> class="aga-hero__title">
							<?php echo esc_html( $aga_slide['title_prefix'] ); ?>
							<span class="aga-hero__title-accent"><?php echo esc_html( $aga_slide['title_accent'] ); ?></span>
						</<?php echo tag_escape( $aga_heading ); ?>>

						<p class="aga-hero__subtitle"><?php echo esc_html( $aga_slide['subtitle'] ); ?></p>

						<div class="aga-hero__actions">
							<a class="aga-button aga-button--primary" href="<?php echo esc_url( $aga_slide['primary_url'] ); ?>" tabindex="<?php echo $aga_is_first ? '0' : '-1'; ?>">
								<span><?php echo esc_html( $aga_slide['primary_text'] ); ?></span>
								<span aria-hidden="true">&rarr;</span>
							</a>
							<a class="aga-button aga-button--secondary" href="<?php echo esc_url( $aga_slide['second_url'] ); ?>" tabindex="<?php echo $aga_is_first ? '0' : '-1'; ?>">
								<?php echo esc_html( $aga_slide['second_text'] ); ?>
							</a>
						</div>
					</div>
				</div>
			</article>
		<?php endforeach; ?>
	</div>

	<div class="aga-container aga-hero__controls-wrap">
		<div class="aga-hero__controls">
			<div class="aga-hero__dots" role="tablist" aria-label="<?php esc_attr_e( 'Choose hero slide', 'aga-child' ); ?>">
				<?php foreach ( $aga_slides as $aga_index => $aga_slide ) : ?>
					<?php $aga_is_first = ( 0 === $aga_index ); ?>
					<button
						type="button"
						class="aga-hero__dot<?php echo $aga_is_first ? ' is-active' : ''; ?>"
						role="tab"
						aria-selected="<?php echo $aga_is_first ? 'true' : 'false'; ?>"
						aria-label="<?php echo esc_attr( sprintf( __( 'Slide %d', 'aga-child' ), $aga_index + 1 ) ); ?>"
						data-aga-slide-to="<?php echo esc_attr( (string) $aga_index ); ?>"
					></button>
				<?php endforeach; ?>
			</div>

			<div class="aga-hero__arrows">
				<button
					type="button"
					class="aga-hero__arrow"
					data-aga-slide-prev
					aria-label="<?php esc_attr_e( 'Previous slide', 'aga-child' ); ?>"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<button
					type="button"
					class="aga-hero__arrow"
					data-aga-slide-next
					aria-label="<?php esc_attr_e( 'Next slide', 'aga-child' ); ?>"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<p class="screen-reader-text" aria-live="polite" data-aga-slider-status></p>
</section>
