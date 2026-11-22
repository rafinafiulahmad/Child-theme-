<?php
/**
 * Fixed mobile bottom navigation (<=768px) and full off-canvas navigation drawer.
 *
 * Renders 5 items: Home, Programme, Resources, Books, Menu.
 * Each label renders strictly once.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

$aga_active_key = aga_get_active_mobile_nav_key();
$aga_home_url   = home_url( '/' );
$aga_prog_url   = aga_get_courses_url();
$aga_res_url    = aga_get_blog_url();
$aga_books_url  = aga_get_bookstore_url();

$aga_items = array(
	'home'      => array(
		'label' => aga_get_nav_label( 'home', __( 'Home', 'aga-child' ) ),
		'url'   => $aga_home_url,
		'icon'  => '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6.5h-5V21H4a1 1 0 0 1-1-1v-9.5z" stroke-linejoin="round"/></svg>',
	),
	'programme' => array(
		'label' => aga_get_nav_label( 'programme', __( 'Programme', 'aga-child' ) ),
		'url'   => $aga_prog_url,
		'icon'  => '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5z" stroke-linejoin="round"/><path d="M6 12.5v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" stroke-linecap="round"/></svg>',
	),
	'resources' => array(
		'label' => aga_get_nav_label( 'resources', __( 'Resources', 'aga-child' ) ),
		'url'   => $aga_res_url,
		'icon'  => '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke-linecap="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke-linejoin="round"/></svg>',
	),
	'books'     => array(
		'label' => aga_get_nav_label( 'books', __( 'Books', 'aga-child' ) ),
		'url'   => $aga_books_url,
		'icon'  => '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M2 4.5C2 3.67 2.67 3 3.5 3H9c1.66 0 3 1.34 3 3v14.5c0-1.1-.9-2-2-2H3.5A1.5 1.5 0 0 1 2 17V4.5z" stroke-linejoin="round"/><path d="M22 4.5C22 3.67 21.33 3 20.5 3H15c-1.66 0-3 1.34-3 3v14.5c0-1.1.9-2 2-2h6.5a1.5 1.5 0 0 0 1.5-1.5V4.5z" stroke-linejoin="round"/></svg>',
	),
);
?>
<nav class="aga-bottom-nav" aria-label="<?php esc_attr_e( 'Mobile primary navigation', 'aga-child' ); ?>">
	<?php foreach ( $aga_items as $aga_key => $aga_item ) : ?>
		<?php $aga_is_current = ( $aga_key === $aga_active_key ); ?>
		<a
			href="<?php echo esc_url( $aga_item['url'] ); ?>"
			class="aga-bottom-nav__item<?php echo $aga_is_current ? ' is-active' : ''; ?>"
			<?php echo $aga_is_current ? 'aria-current="page"' : ''; ?>
		>
			<span class="aga-bottom-nav__icon"><?php echo $aga_item['icon']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<span class="aga-bottom-nav__label"><?php echo esc_html( $aga_item['label'] ); ?></span>
		</a>
	<?php endforeach; ?>

	<button
		type="button"
		class="aga-bottom-nav__item aga-bottom-nav__menu-btn"
		data-aga-drawer-open
		aria-expanded="false"
		aria-controls="aga-mobile-drawer"
		aria-label="<?php esc_attr_e( 'Open full navigation menu', 'aga-child' ); ?>"
	>
		<span class="aga-bottom-nav__icon">
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
				<line x1="4" y1="7" x2="20" y2="7" stroke-linecap="round"/>
				<line x1="4" y1="12" x2="20" y2="12" stroke-linecap="round"/>
				<line x1="4" y1="17" x2="20" y2="17" stroke-linecap="round"/>
			</svg>
		</span>
		<span class="aga-bottom-nav__label"><?php echo esc_html( aga_get_nav_label( 'menu', __( 'Menu', 'aga-child' ) ) ); ?></span>
	</button>
</nav>

<div id="aga-mobile-drawer" class="aga-drawer" role="dialog" aria-modal="true" aria-labelledby="aga-drawer-title" hidden>
	<div class="aga-drawer__backdrop" data-aga-drawer-close></div>
	<div class="aga-drawer__panel">
		<div class="aga-drawer__header">
			<span id="aga-drawer-title" class="aga-drawer__title"><?php esc_html_e( 'AI Governance Academy', 'aga-child' ); ?></span>
			<button type="button" class="aga-drawer__close" data-aga-drawer-close aria-label="<?php esc_attr_e( 'Close navigation menu', 'aga-child' ); ?>">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round"/>
					<line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round"/>
				</svg>
			</button>
		</div>

		<nav class="aga-drawer__nav" aria-label="<?php esc_attr_e( 'Full site menu', 'aga-child' ); ?>">
			<?php
			if ( has_nav_menu( 'aga_mobile_drawer' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'aga_mobile_drawer',
						'menu_class'     => 'aga-drawer__list',
						'container'      => false,
					)
				);
			} else {
				?>
				<ul class="aga-drawer__list">
					<li><a href="<?php echo esc_url( $aga_home_url ); ?>"><?php esc_html_e( 'Home', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( $aga_prog_url ); ?>"><?php esc_html_e( 'Learning Programmes', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( $aga_res_url ); ?>"><?php esc_html_e( 'Insights & Research', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( $aga_books_url ); ?>"><?php esc_html_e( 'Bookstore', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/reading-library/' ) ); ?>"><?php esc_html_e( 'Reading Library', 'aga-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( aga_get_account_url() ); ?>"><?php esc_html_e( 'My Account', 'aga-child' ); ?></a></li>
				</ul>
				<?php
			}
			?>
		</nav>
	</div>
</div>
