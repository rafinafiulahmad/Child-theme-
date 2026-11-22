<?php
/**
 * Bookstore card component: cover, format badge, title, price, "View book" link.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

global $product;

if ( ! $product || ! is_a( $product, 'WC_Product' ) ) {
	return;
}

$aga_product_id = $product->get_id();
$aga_permalink  = get_permalink( $aga_product_id );
?>
<article class="aga-card aga-book-card">
	<div class="aga-book-card__cover-wrap">
		<a href="<?php echo esc_url( $aga_permalink ); ?>" class="aga-book-card__cover-link" tabindex="-1" aria-hidden="true">
			<?php if ( has_post_thumbnail( $aga_product_id ) ) : ?>
				<?php echo get_the_post_thumbnail( $aga_product_id, 'aga-book-cover', array( 'class' => 'aga-book-card__cover' ) ); ?>
			<?php else : ?>
				<img
					src="<?php echo esc_url( AGA_CHILD_URI . '/assets/images/book-cover-governance.jpg' ); ?>"
					alt="<?php echo esc_attr( $product->get_name() ); ?>"
					class="aga-book-card__cover"
					loading="lazy"
				/>
			<?php endif; ?>
		</a>
		<div class="aga-book-card__badge-wrap">
			<?php get_template_part( 'template-parts/bookstore/book-badge', null, array( 'product_id' => $aga_product_id ) ); ?>
		</div>
	</div>

	<div class="aga-book-card__body">
		<h2 class="aga-book-card__title">
			<a href="<?php echo esc_url( $aga_permalink ); ?>"><?php echo esc_html( $product->get_name() ); ?></a>
		</h2>

		<div class="aga-book-card__footer">
			<span class="aga-book-card__price"><?php echo wp_kses_post( $product->get_price_html() ); ?></span>
			<a class="aga-button aga-button--primary aga-book-card__cta" href="<?php echo esc_url( $aga_permalink ); ?>">
				<?php esc_html_e( 'View book', 'aga-child' ); ?>
			</a>
		</div>
	</div>
</article>
