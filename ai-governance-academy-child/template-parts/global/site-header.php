<?php
/**
 * Global sticky site header.
 *
 * Mobile: rounded-square emblem + "AI Governance Academy" bold serif left;
 * circular avatar + chevron (logged in) or Login icon (logged out) right.
 * Desktop: full horizontal navigation menu + user menu/login action.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

$aga_home_url    = home_url( '/' );
$aga_site_name   = get_bloginfo( 'name' );
$aga_display     = $aga_site_name ? $aga_site_name : __( 'AI Governance Academy', 'aga-child' );
$aga_account_url = aga_get_account_url();
$aga_is_logged   = is_user_logged_in();
$aga_user        = $aga_is_logged ? wp_get_current_user() : null;
?>
<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'aga-child' ); ?></a>

<header class="aga-site-header" role="banner">
	<div class="aga-container aga-site-header__inner">
		<a class="aga-brand" href="<?php echo esc_url( $aga_home_url ); ?>" rel="home">
			<?php
			if ( has_custom_logo() ) {
				$aga_logo_id  = get_theme_mod( 'custom_logo' );
				$aga_logo_url = $aga_logo_id ? wp_get_attachment_image_url( $aga_logo_id, 'thumbnail' ) : '';
				if ( $aga_logo_url ) {
					echo '<span class="aga-brand-emblem"><img src="' . esc_url( $aga_logo_url ) . '" alt="" width="38" height="38" /></span>';
				} else {
					echo '<span class="aga-brand-emblem">' . aga_get_brand_emblem_svg() . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				}
			} else {
				echo '<span class="aga-brand-emblem">' . aga_get_brand_emblem_svg() . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			?>
			<span class="aga-brand__title"><?php echo esc_html( $aga_display ); ?></span>
		</a>

		<nav class="aga-desktop-nav" aria-label="<?php esc_attr_e( 'Primary navigation', 'aga-child' ); ?>">
			<?php
			if ( has_nav_menu( 'aga_primary' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'aga_primary',
						'menu_class'     => 'aga-desktop-nav__list',
						'container'      => false,
						'depth'          => 2,
					)
				);
			} else {
				?>
				<ul class="aga-desktop-nav__list">
					<li><a href="<?php echo esc_url( $aga_home_url ); ?>"><?php esc_html_e( 'Home', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( aga_get_courses_url() ); ?>"><?php esc_html_e( 'Programme', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( aga_get_blog_url() ); ?>"><?php esc_html_e( 'Resources', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( aga_get_bookstore_url() ); ?>"><?php esc_html_e( 'Books', 'aga-child' ); ?></a></li>
				</ul>
				<?php
			}
			?>
		</nav>

		<div class="aga-header-actions">
			<?php if ( $aga_is_logged && $aga_user instanceof WP_User ) : ?>
				<div class="aga-user-menu">
					<button
						type="button"
						class="aga-user-menu__trigger"
						aria-expanded="false"
						aria-controls="aga-user-dropdown"
						aria-label="<?php esc_attr_e( 'Open user account menu', 'aga-child' ); ?>"
					>
						<span class="aga-user-menu__avatar">
							<?php echo get_avatar( $aga_user->ID, 64, '', $aga_user->display_name ); ?>
						</span>
						<svg class="aga-user-menu__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
							<path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
					<div id="aga-user-dropdown" class="aga-user-menu__dropdown" hidden>
						<div class="aga-user-menu__identity">
							<strong><?php echo esc_html( $aga_user->display_name ); ?></strong>
						</div>
						<ul class="aga-user-menu__links">
							<li><a href="<?php echo esc_url( $aga_account_url ); ?>"><?php esc_html_e( 'My Account', 'aga-child' ); ?></a></li>
							<li><a href="<?php echo esc_url( home_url( '/reading-library/' ) ); ?>"><?php esc_html_e( 'Reading Library', 'aga-child' ); ?></a></li>
							<?php if ( function_exists( 'tutor_utils' ) ) : ?>
								<li><a href="<?php echo esc_url( home_url( '/dashboard/' ) ); ?>"><?php esc_html_e( 'Learning Dashboard', 'aga-child' ); ?></a></li>
							<?php endif; ?>
							<li><a href="<?php echo esc_url( wp_logout_url( $aga_home_url ) ); ?>"><?php esc_html_e( 'Sign Out', 'aga-child' ); ?></a></li>
						</ul>
					</div>
				</div>
			<?php else : ?>
				<a class="aga-login-trigger" href="<?php echo esc_url( $aga_account_url ); ?>" aria-label="<?php esc_attr_e( 'Log in to your account', 'aga-child' ); ?>">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
						<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke-linecap="round" stroke-linejoin="round"/>
						<polyline points="10 17 15 12 10 7" stroke-linecap="round" stroke-linejoin="round"/>
						<line x1="15" y1="12" x2="3" y2="12" stroke-linecap="round"/>
					</svg>
				</a>
			<?php endif; ?>
		</div>
	</div>
</header>
