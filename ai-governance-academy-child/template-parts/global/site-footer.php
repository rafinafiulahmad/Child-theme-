<?php
/**
 * Global site footer.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;
?>
<footer class="aga-site-footer" role="contentinfo">
	<div class="aga-container aga-site-footer__grid">
		<div class="aga-site-footer__brand">
			<div class="aga-site-footer__lockup">
				<span class="aga-brand-emblem"><?php echo aga_get_brand_emblem_svg(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				<span class="aga-site-footer__name"><?php echo esc_html( get_bloginfo( 'name' ) ? get_bloginfo( 'name' ) : __( 'AI Governance Academy', 'aga-child' ) ); ?></span>
			</div>
			<p class="aga-site-footer__mission">
				<?php esc_html_e( 'Research, education and policy solutions for responsible AI governance in Bangladesh and beyond.', 'aga-child' ); ?>
			</p>
		</div>

		<div class="aga-site-footer__col">
			<h2 class="aga-site-footer__heading"><?php esc_html_e( 'Academy', 'aga-child' ); ?></h2>
			<?php
			if ( has_nav_menu( 'aga_footer_col_1' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'aga_footer_col_1',
						'menu_class'     => 'aga-site-footer__links',
						'container'      => false,
					)
				);
			} else {
				?>
				<ul class="aga-site-footer__links">
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( aga_get_blog_url() ); ?>"><?php esc_html_e( 'Policy Insights', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( aga_get_courses_url() ); ?>"><?php esc_html_e( 'Learning Programmes', 'aga-child' ); ?></a></li>
				</ul>
				<?php
			}
			?>
		</div>

		<div class="aga-site-footer__col">
			<h2 class="aga-site-footer__heading"><?php esc_html_e( 'Publications & Portal', 'aga-child' ); ?></h2>
			<?php
			if ( has_nav_menu( 'aga_footer_col_2' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'aga_footer_col_2',
						'menu_class'     => 'aga-site-footer__links',
						'container'      => false,
					)
				);
			} else {
				?>
				<ul class="aga-site-footer__links">
					<li><a href="<?php echo esc_url( aga_get_bookstore_url() ); ?>"><?php esc_html_e( 'Bookstore', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/reading-library/' ) ); ?>"><?php esc_html_e( 'Reading Library', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( aga_get_account_url() ); ?>"><?php esc_html_e( 'Member Account', 'aga-child' ); ?></a></li>
				</ul>
				<?php
			}
			?>
		</div>
	</div>

	<div class="aga-container aga-site-footer__bottom">
		<p class="aga-site-footer__copyright">
			<?php
			printf(
				/* translators: 1: current year, 2: site name */
				esc_html__( '© %1$s %2$s. All rights reserved.', 'aga-child' ),
				esc_html( gmdate( 'Y' ) ),
				esc_html( get_bloginfo( 'name' ) ? get_bloginfo( 'name' ) : __( 'AI Governance Academy', 'aga-child' ) )
			);
			?>
		</p>
	</div>
</footer>
