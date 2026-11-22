<?php
/**
 * Homepage Template (Kadence Child).
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<main id="main" class="site-main aga-home-main" role="main">
	<?php
	get_template_part( 'template-parts/home/hero-slider' );
	get_template_part( 'template-parts/home/feature-strip' );
	get_template_part( 'template-parts/home/latest-insights' );
	?>
</main>
<?php
get_footer();
