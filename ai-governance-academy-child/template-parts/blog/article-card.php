<?php
/**
 * Reusable article card for Latest Insights and Blog archive.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

$aga_card_args  = wp_parse_args(
	isset( $args ) && is_array( $args ) ? $args : array(),
	array(
		'variant' => 'standard',
	)
);
$aga_is_feat    = ( 'featured' === $aga_card_args['variant'] );
$aga_categories = get_the_category();
$aga_cat_name   = ! empty( $aga_categories ) ? $aga_categories[0]->name : __( 'AI Governance', 'aga-child' );
$aga_thumb_size = $aga_is_feat ? 'aga-insight-featured' : 'medium_large';
?>
<article <?php post_class( array( 'aga-card', 'aga-article-card', $aga_is_feat ? 'aga-article-card--featured' : 'aga-article-card--standard' ) ); ?>>
	<div class="aga-article-card__media">
		<a href="<?php the_permalink(); ?>" class="aga-article-card__image-link" aria-hidden="true" tabindex="-1">
			<?php if ( has_post_thumbnail() ) : ?>
				<?php the_post_thumbnail( $aga_thumb_size, array( 'class' => 'aga-article-card__image' ) ); ?>
			<?php else : ?>
				<img
					src="<?php echo esc_url( AGA_CHILD_URI . '/assets/images/insight-featured.jpg' ); ?>"
					alt="<?php echo esc_attr( get_the_title() ); ?>"
					class="aga-article-card__image"
					loading="lazy"
				/>
			<?php endif; ?>
		</a>
		<span class="aga-badge aga-article-card__badge"><?php echo esc_html( $aga_cat_name ); ?></span>
	</div>

	<div class="aga-article-card__body">
		<h3 class="aga-article-card__title">
			<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
		</h3>
		<?php if ( $aga_is_feat && has_excerpt() ) : ?>
			<p class="aga-article-card__excerpt"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 24 ) ); ?></p>
		<?php endif; ?>
		<?php get_template_part( 'template-parts/blog/reading-meta' ); ?>
	</div>
</article>
