<?php
/**
 * The template for displaying product content within loops.
 *
 * Minimal override to render the AGA Book Card (cover, eBook/Printed badge,
 * title, price, "View book" action) while preserving standard WooCommerce hooks.
 *
 * @package AGA_Child
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}
?>
<li <?php wc_product_class( 'aga-bookstore-grid__item', $product ); ?>>
	<?php
	do_action( 'woocommerce_before_shop_loop_item' );
	get_template_part( 'template-parts/bookstore/book-card' );
	do_action( 'woocommerce_after_shop_loop_item' );
	?>
</li>
