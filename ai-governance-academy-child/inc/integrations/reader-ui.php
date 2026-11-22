<?php
/**
 * Isolated Online Reader & Reading Library visual integration.
 *
 * UI presentation ONLY: theme presets (ivory, sepia, dark), font-size bounds,
 * and layout chrome hooks. Content delivery, access checks, and bookmark/progress
 * persistence are handled exclusively by the aga-bookstore-framework plugin.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'aga_get_reader_themes' ) ) {
	/**
	 * Return supported visual reading themes for the Online Reader toolbar.
	 *
	 * @return array<string, string>
	 */
	function aga_get_reader_themes() {
		return array(
			'ivory' => __( 'Ivory', 'aga-child' ),
			'sepia' => __( 'Sepia', 'aga-child' ),
			'dark'  => __( 'Dark', 'aga-child' ),
		);
	}
}

if ( ! function_exists( 'aga_get_reader_font_bounds' ) ) {
	/**
	 * Return reader font-size limits (px) for toolbar controls.
	 *
	 * @return array<string, int>
	 */
	function aga_get_reader_font_bounds() {
		return array(
			'min'     => 15,
			'max'     => 24,
			'default' => 18,
			'step'    => 1,
		);
	}
}

if ( ! function_exists( 'aga_render_reader_toolbar_open' ) ) {
	/**
	 * Render the scoped Online Reader UI shell header for plugin template hooks.
	 *
	 * @param string $book_title Optional current book title supplied by framework plugin.
	 */
	function aga_render_reader_toolbar_open( $book_title = '' ) {
		$themes      = aga_get_reader_themes();
		$font_bounds = aga_get_reader_font_bounds();
		?>
		<div class="aga-reader" data-reader-theme="ivory" data-font-size="<?php echo esc_attr( (string) $font_bounds['default'] ); ?>">
			<header class="aga-reader__toolbar" role="toolbar" aria-label="<?php esc_attr_e( 'Reading controls', 'aga-child' ); ?>">
				<div class="aga-reader__toolbar-left">
					<button type="button" class="aga-reader__btn" data-reader-toggle-chapters aria-expanded="false" aria-controls="aga-reader-chapters">
						<span class="screen-reader-text"><?php esc_html_e( 'Toggle chapter index', 'aga-child' ); ?></span>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 6h16M4 12h12M4 18h16"/></svg>
						<span><?php esc_html_e( 'Chapters', 'aga-child' ); ?></span>
					</button>
					<?php if ( '' !== $book_title ) : ?>
						<span class="aga-reader__book-title"><?php echo esc_html( $book_title ); ?></span>
					<?php endif; ?>
				</div>
				<div class="aga-reader__toolbar-right">
					<div class="aga-reader__font-controls" role="group" aria-label="<?php esc_attr_e( 'Text size', 'aga-child' ); ?>">
						<button type="button" class="aga-reader__btn" data-reader-font-dec aria-label="<?php esc_attr_e( 'Decrease font size', 'aga-child' ); ?>">A-</button>
						<button type="button" class="aga-reader__btn" data-reader-font-inc aria-label="<?php esc_attr_e( 'Increase font size', 'aga-child' ); ?>">A+</button>
					</div>
					<div class="aga-reader__theme-controls" role="group" aria-label="<?php esc_attr_e( 'Reading surface theme', 'aga-child' ); ?>">
						<?php foreach ( $themes as $slug => $label ) : ?>
							<button
								type="button"
								class="aga-reader__theme-chip<?php echo 'ivory' === $slug ? ' is-active' : ''; ?>"
								data-reader-theme-btn="<?php echo esc_attr( $slug ); ?>"
								aria-pressed="<?php echo 'ivory' === $slug ? 'true' : 'false'; ?>"
							>
								<?php echo esc_html( $label ); ?>
							</button>
						<?php endforeach; ?>
					</div>
				</div>
			</header>
			<div class="aga-reader__workspace">
		<?php
	}
}

if ( ! function_exists( 'aga_render_reader_toolbar_close' ) ) {
	/**
	 * Close the scoped Online Reader UI shell.
	 */
	function aga_render_reader_toolbar_close() {
		?>
			</div>
		</div>
		<?php
	}
}
