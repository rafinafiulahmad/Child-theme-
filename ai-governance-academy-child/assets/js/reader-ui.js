/**
 * Online Reader UI Controls (Visual presentation only: themes, font size, chapter sidebar).
 * Access checks, content delivery, and bookmark/progress persistence belong to aga-bookstore-framework.
 */
(function () {
	'use strict';

	function initReaderUI(root) {
		var themeButtons = Array.prototype.slice.call(root.querySelectorAll('[data-reader-theme-btn]'));
		var decBtn = root.querySelector('[data-reader-font-dec]');
		var incBtn = root.querySelector('[data-reader-font-inc]');
		var toggleChaptersBtn = root.querySelector('[data-reader-toggle-chapters]');
		var sidebar = document.getElementById('aga-reader-chapters');
		var workspace = root.querySelector('.aga-reader__workspace');

		var minSize = 15;
		var maxSize = 24;
		var fontSize = parseInt(root.getAttribute('data-font-size') || '18', 10);

		function applyFontSize(nextSize) {
			fontSize = Math.min(maxSize, Math.max(minSize, nextSize));
			root.setAttribute('data-font-size', String(fontSize));
			root.style.setProperty('--reader-font-size', fontSize + 'px');
		}

		function applyTheme(theme) {
			root.setAttribute('data-reader-theme', theme);
			themeButtons.forEach(function (btn) {
				var active = btn.getAttribute('data-reader-theme-btn') === theme;
				btn.classList.toggle('is-active', active);
				btn.setAttribute('aria-pressed', active ? 'true' : 'false');
			});
		}

		themeButtons.forEach(function (btn) {
			btn.addEventListener('click', function () {
				var theme = btn.getAttribute('data-reader-theme-btn') || 'ivory';
				applyTheme(theme);
			});
		});

		if (decBtn) {
			decBtn.addEventListener('click', function () {
				applyFontSize(fontSize - 1);
			});
		}

		if (incBtn) {
			incBtn.addEventListener('click', function () {
				applyFontSize(fontSize + 1);
			});
		}

		if (toggleChaptersBtn && sidebar) {
			toggleChaptersBtn.addEventListener('click', function () {
				var isDesktop = window.innerWidth >= 769;
				if (isDesktop) {
					var collapsed = sidebar.classList.toggle('is-collapsed');
					if (workspace) {
						workspace.classList.toggle('is-sidebar-collapsed', collapsed);
					}
					toggleChaptersBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
				} else {
					var open = sidebar.classList.toggle('is-open');
					toggleChaptersBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
				}
			});
		}

		applyFontSize(fontSize);
	}

	document.addEventListener('DOMContentLoaded', function () {
		var readers = document.querySelectorAll('.aga-reader');
		readers.forEach(initReaderUI);
	});
})();
