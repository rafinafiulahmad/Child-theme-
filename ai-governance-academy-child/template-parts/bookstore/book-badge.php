<?php
/**
 * Book format badge component ('eBook' | 'Printed') driven by _aga_book_type meta.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

$aga_product_id = isset( $args['product_id'] ) ? (int) $args['product_id'] : get_the_ID();
$aga_book_type  = function_exists( 'aga_get_book_type_meta' ) ? aga_get_book_type_meta( $aga_product_id ) : 'physical';
$aga_badge_text = function_exists( 'aga_get_book_type_label' ) ? aga_get_book_type_label( $aga_book_type ) : __( 'Printed', 'aga-child' );
$aga_badge_mod  = ( 'digital' === $aga_book_type ) ? 'aga-book-badge--ebook' : 'aga-book-badge--printed';
?>
<span class="aga-badge aga-book-badge <?php echo esc_attr( $aga_badge_mod ); ?>">
	<?php echo esc_html( $aga_badge_text ); ?>
</span>
