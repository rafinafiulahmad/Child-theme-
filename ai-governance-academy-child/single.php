<?php
/**
 * Single Post Template with reading progress bar, 820px reading measure, and related posts.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div class="aga-reading-progress" aria-hidden="true">
	<div class="aga-reading-progress__bar" data-aga-reading-progress></div>
</div>

<main id="main" class="site-main aga-single-main" role="main">
	<div class="aga-container">
		<?php get_template_part( 'template-parts/global/breadcrumbs' ); ?>

		<?php
		while ( have_posts() ) :
			the_post();
			$aga_categories = get_the_category();
			$aga_cat_ids    = wp_list_pluck( $aga_categories, 'term_id' );
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class( 'aga-single-article' ); ?>>
				<header class="aga-single-article__header">
					<?php if ( ! empty( $aga_categories ) ) : ?>
						<span class="aga-badge"><?php echo esc_html( $aga_categories[0]->name ); ?></span>
					<?php endif; ?>
					<h1 class="aga-single-article__title"><?php the_title(); ?></h1>
					<?php get_template_part( 'template-parts/blog/reading-meta', null, array( 'show_author' => true ) ); ?>
				</header>

				<?php if ( has_post_thumbnail() ) : ?>
					<figure class="aga-single-article__cover">
						<?php the_post_thumbnail( 'large', array( 'class' => 'aga-single-article__image' ) ); ?>
					</figure>
				<?php endif; ?>

				<div class="entry-content" data-aga-reading-target>
					<?php
					the_content();
					wp_link_pages(
						array(
							'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'aga-child' ),
							'after'  => '</div>',
						)
					);
					?>
				</div>
			</article>

			<?php
			if ( ! empty( $aga_cat_ids ) ) :
				$aga_related = new WP_Query(
					array(
						'post_type'           => 'post',
						'post_status'         => 'publish',
						'posts_per_page'      => 3,
						'post__not_in'        => array( get_the_ID() ),
						'category__in'        => $aga_cat_ids,
						'ignore_sticky_posts' => true,
						'no_found_rows'       => true,
					)
				);
				if ( $aga_related->have_posts() ) :
					?>
					<section class="aga-related-posts" aria-labelledby="aga-related-heading">
						<div class="aga-section-title">
							<h2 id="aga-related-heading" class="aga-section-title__heading"><?php esc_html_e( 'Related Insights', 'aga-child' ); ?></h2>
							<span class="aga-section-title__rule" aria-hidden="true"></span>
							<a class="aga-section-title__link" href="<?php echo esc_url( aga_get_blog_url() ); ?>"><?php esc_html_e( 'View All', 'aga-child' ); ?> &rarr;</a>
						</div>
						<div class="aga-blog-grid">
							<?php
							while ( $aga_related->have_posts() ) :
								$aga_related->the_post();
								get_template_part( 'template-parts/blog/article-card', null, array( 'variant' => 'standard' ) );
							endwhile;
							wp_reset_postdata();
							?>
						</div>
					</section>
					<?php
				endif;
			endif;
		endwhile;
		?>
	</div>
</main>
<?php
get_footer();
