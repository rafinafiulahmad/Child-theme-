<?php
/**
 * Blog / Insights Archive Template.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<main id="main" class="site-main aga-blog-main" role="main">
	<div class="aga-container">
		<?php get_template_part( 'template-parts/global/breadcrumbs' ); ?>

		<header class="aga-archive-header">
			<h1 class="aga-archive-header__title">
				<?php
				if ( is_home() && ! is_front_page() ) {
					single_post_title();
				} elseif ( is_archive() ) {
					the_archive_title();
				} else {
					esc_html_e( 'Insights & Policy Research', 'aga-child' );
				}
				?>
			</h1>
			<?php if ( is_archive() && get_the_archive_description() ) : ?>
				<div class="aga-archive-header__desc"><?php echo wp_kses_post( get_the_archive_description() ); ?></div>
			<?php else : ?>
				<p class="aga-archive-header__desc">
					<?php esc_html_e( 'Peer-reviewed briefings, policy essays, and regulatory analyses on responsible artificial intelligence.', 'aga-child' ); ?>
				</p>
			<?php endif; ?>
		</header>

		<?php if ( have_posts() ) : ?>
			<div class="aga-blog-grid">
				<?php
				while ( have_posts() ) :
					the_post();
					get_template_part( 'template-parts/blog/article-card', null, array( 'variant' => 'standard' ) );
				endwhile;
				?>
			</div>

			<div class="aga-pagination">
				<?php
				the_posts_pagination(
					array(
						'prev_text' => __( '&larr; Previous', 'aga-child' ),
						'next_text' => __( 'Next &rarr;', 'aga-child' ),
					)
				);
				?>
			</div>
		<?php else : ?>
			<?php get_template_part( 'template-parts/global/empty-state' ); ?>
		<?php endif; ?>
	</div>
</main>
<?php
get_footer();
