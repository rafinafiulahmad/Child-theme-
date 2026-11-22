<?php
/**
 * WordPress Customizer settings for lightweight editable theme options:
 * Brand title/logo, 3 hero slides, and mobile bottom navigation labels.
 *
 * @package AGA_Child
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'aga_customize_register' ) ) {
	/**
	 * Register AGA Customizer panel, sections, and controls.
	 *
	 * @param WP_Customize_Manager $wp_customize Customizer manager instance.
	 */
	function aga_customize_register( $wp_customize ) {
		$wp_customize->add_panel(
			'aga_theme_panel',
			array(
				'title'       => __( 'AI Governance Academy Options', 'aga-child' ),
				'description' => __( 'Configure hero slides, mobile navigation labels, and academy brand display.', 'aga-child' ),
				'priority'    => 35,
			)
		);

		// Section: Hero Slider (3 Slides).
		$wp_customize->add_section(
			'aga_hero_section',
			array(
				'title' => __( 'Homepage Hero Slides', 'aga-child' ),
				'panel' => 'aga_theme_panel',
			)
		);

		$slide_defaults = array(
			1 => array(
				'eyebrow'      => 'AI GOVERNANCE ACADEMY',
				'title_prefix' => 'Building an Inclusive and Trustworthy',
				'title_accent' => 'AI Future',
				'subtitle'     => 'Research, education and policy solutions for responsible AI governance in Bangladesh and beyond.',
			),
			2 => array(
				'eyebrow'      => 'POLICY & RESEARCH FELLOWSHIPS',
				'title_prefix' => 'Advancing Evidence-Based Frameworks for',
				'title_accent' => 'Public Trust',
				'subtitle'     => 'Interdisciplinary monographs, legislative toolkits, and comparative AI regulation studies for South Asia.',
			),
			3 => array(
				'eyebrow'      => 'EXECUTIVE & JUDICIAL DIALOGUES',
				'title_prefix' => 'Equipping Regulators and Leaders for',
				'title_accent' => 'Algorithmic Accountability',
				'subtitle'     => 'Cohort-based executive courses, policy labs, and global governance roundtables.',
			),
		);

		foreach ( $slide_defaults as $i => $defaults ) {
			$wp_customize->add_setting(
				"aga_hero_slide_{$i}_image",
				array(
					'default'           => '',
					'sanitize_callback' => 'esc_url_raw',
				)
			);
			$wp_customize->add_control(
				new WP_Customize_Image_Control(
					$wp_customize,
					"aga_hero_slide_{$i}_image",
					array(
						/* translators: %d: slide number */
						'label'   => sprintf( __( 'Slide %d Background Image', 'aga-child' ), $i ),
						'section' => 'aga_hero_section',
					)
				)
			);

			$fields = array(
				'eyebrow'      => __( 'Eyebrow', 'aga-child' ),
				'title_prefix' => __( 'Headline (Ivory)', 'aga-child' ),
				'title_accent' => __( 'Headline Accent (Gold)', 'aga-child' ),
				'subtitle'     => __( 'Subtitle', 'aga-child' ),
			);

			foreach ( $fields as $key => $label ) {
				$setting_id = "aga_hero_slide_{$i}_{$key}";
				$wp_customize->add_setting(
					$setting_id,
					array(
						'default'           => $defaults[ $key ],
						'sanitize_callback' => 'sanitize_text_field',
					)
				);
				$wp_customize->add_control(
					$setting_id,
					array(
						/* translators: 1: slide number, 2: field label */
						'label'   => sprintf( __( 'Slide %1$d %2$s', 'aga-child' ), $i, $label ),
						'section' => 'aga_hero_section',
						'type'    => 'subtitle' === $key ? 'textarea' : 'text',
					)
				);
			}
		}

		// Section: Mobile Bottom Navigation Labels.
		$wp_customize->add_section(
			'aga_mobile_nav_section',
			array(
				'title' => __( 'Mobile Bottom Navigation Labels', 'aga-child' ),
				'panel' => 'aga_theme_panel',
			)
		);

		$nav_defaults = array(
			'home'      => __( 'Home', 'aga-child' ),
			'programme' => __( 'Programme', 'aga-child' ),
			'resources' => __( 'Resources', 'aga-child' ),
			'books'     => __( 'Books', 'aga-child' ),
			'menu'      => __( 'Menu', 'aga-child' ),
		);

		foreach ( $nav_defaults as $key => $default ) {
			$setting_id = 'aga_nav_label_' . $key;
			$wp_customize->add_setting(
				$setting_id,
				array(
					'default'           => $default,
					'sanitize_callback' => 'sanitize_text_field',
				)
			);
			$wp_customize->add_control(
				$setting_id,
				array(
					'label'   => sprintf( __( 'Nav Label: %s', 'aga-child' ), $default ),
					'section' => 'aga_mobile_nav_section',
					'type'    => 'text',
				)
			);
		}
	}
}
add_action( 'customize_register', 'aga_customize_register' );
