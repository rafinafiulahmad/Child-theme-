<?php
/**
 * Homepage "Latest Insights" section powered by WP_Query (1 featured + list/grid).
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

$aga_insights_query = new WP_Query(
	array(
		'post_type'           => 'post',
		'post_status'         => 'publish',
		'posts_per_page'      => 4,
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	)
);
?>
<section class="aga-section aga-latest-insights" aria-labelledby="aga-insights-heading">
	<div class="aga-container">
		<div class="aga-section-title">
			<h2 id="aga-insights-heading" class="aga-section-title__heading">
				<?php esc_html_e( 'Latest Insights', 'aga-child' ); ?>
			</h2>
			<span class="aga-section-title__rule" aria-hidden="true"></span>
			<a class="aga-section-title__link" href="<?php echo esc_url( aga_get_blog_url() ); ?>">
				<?php esc_html_e( 'View All', 'aga-child' ); ?> <span aria-hidden="true">&rarr;</span>
			</a>
		</div>

		<?php if ( $aga_insights_query->have_posts() ) : ?>
			<?php
			$aga_post_index = 0;
			$aga_has_more   = $aga_insights_query->post_count > 1;
			?>
			<div class="aga-insights-layout">
				<?php
				while ( $aga_insights_query->have_posts() ) :
					$aga_insights_query->the_post();
					if ( 0 === $aga_post_index ) :
						?>
						<div class="aga-insights-layout__featured">
							<?php get_template_part( 'template-parts/blog/article-card', null, array( 'variant' => 'featured' ) ); ?>
						</div>
						<?php if ( $aga_has_more ) : ?>
							<div class="aga-insights-layout__grid">
						<?php endif; ?>
					<?php else : ?>
						<?php get_template_part( 'template-parts/blog/article-card', null, array( 'variant' => 'standard' ) ); ?>
						<?php
					endif;
					$aga_post_index++;
				endwhile;

				if ( $aga_has_more ) :
					?>
					</div>
				<?php endif; ?>
			</div>
			<?php wp_reset_postdata(); ?>
		<?php else : ?>
			<?php
			get_template_part(
				'template-parts/global/empty-state',
				null,
				array(
					'title'      => __( 'Insights Coming Soon', 'aga-child' ),
					'message'    => __( 'Our researchers are preparing new policy briefs and governance analyses.', 'aga-child' ),
					'action_url' => aga_get_bookstore_url(),
					'action_lbl' => __( 'Explore Bookstore', 'aga-child' ),
				)
			);
			?>
		<?php endif; ?>
	</div>
</section>
