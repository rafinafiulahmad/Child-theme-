<?php
/**
 * Online Reader Page Template (UI shell only; content & access supplied by aga-bookstore-framework).
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<main id="main" class="site-main aga-reader-main" role="main">
	<?php
	aga_render_reader_toolbar_open( get_the_title() );

	while ( have_posts() ) :
		the_post();
		?>
		<aside id="aga-reader-chapters" class="aga-reader__sidebar" aria-label="<?php esc_attr_e( 'Book chapters', 'aga-child' ); ?>">
			<div class="aga-reader__sidebar-header">
				<h2><?php esc_html_e( 'Table of Contents', 'aga-child' ); ?></h2>
			</div>
			<?php do_action( 'aga_reader_sidebar_content', get_the_ID() ); ?>
		</aside>

		<article class="aga-reader-content">
			<?php
			if ( has_action( 'aga_reader_main_content' ) ) {
				do_action( 'aga_reader_main_content', get_the_ID() );
			} else {
				the_content();
			}
			?>
		</article>
		<?php
	endwhile;

	aga_render_reader_toolbar_close();
	?>
</main>
<?php
get_footer();
