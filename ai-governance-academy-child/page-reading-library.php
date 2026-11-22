<?php
/**
 * Reading Library Page Template (UI shell; purchased library items supplied by aga-bookstore-framework).
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<main id="main" class="site-main aga-library-main" role="main">
	<div class="aga-container">
		<?php get_template_part( 'template-parts/global/breadcrumbs' ); ?>

		<header class="aga-archive-header">
			<h1 class="aga-archive-header__title"><?php the_title(); ?></h1>
			<p class="aga-archive-header__desc">
				<?php esc_html_e( 'Your digital monographs, policy handbooks, and research volumes.', 'aga-child' ); ?>
			</p>
		</header>

		<div class="aga-library-grid">
			<?php
			while ( have_posts() ) :
				the_post();
				if ( has_action( 'aga_reading_library_content' ) ) {
					do_action( 'aga_reading_library_content', get_current_user_id() );
				} else {
					the_content();
				}
			endwhile;
			?>
		</div>
	</div>
</main>
<?php
get_footer();
