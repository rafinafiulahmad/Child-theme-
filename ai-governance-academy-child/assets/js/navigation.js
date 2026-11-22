/**
 * Navigation, User Dropdown, Off-Canvas Drawer, and Single-Post Reading Progress
 */
(function () {
	'use strict';

	function initUserMenu() {
		var trigger = document.querySelector('.aga-user-menu__trigger');
		var dropdown = document.getElementById('aga-user-dropdown');
		if (!trigger || !dropdown) {
			return;
		}

		function setOpen(isOpen) {
			trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
			dropdown.hidden = !isOpen;
		}

		trigger.addEventListener('click', function (e) {
			e.stopPropagation();
			var expanded = trigger.getAttribute('aria-expanded') === 'true';
			setOpen(!expanded);
		});

		document.addEventListener('click', function (e) {
			if (!dropdown.hidden && !dropdown.contains(e.target) && !trigger.contains(e.target)) {
				setOpen(false);
			}
		});

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && !dropdown.hidden) {
				setOpen(false);
				trigger.focus();
			}
		});
	}

	function initMobileDrawer() {
		var drawer = document.getElementById('aga-mobile-drawer');
		var openButtons = document.querySelectorAll('[data-aga-drawer-open]');
		var closeButtons = document.querySelectorAll('[data-aga-drawer-close]');
		var lastTrigger = null;

		if (!drawer || !openButtons.length) {
			return;
		}

		function openDrawer(triggerEl) {
			lastTrigger = triggerEl;
			drawer.hidden = false;
			document.body.style.overflow = 'hidden';
			openButtons.forEach(function (btn) {
				btn.setAttribute('aria-expanded', 'true');
			});
			var closeBtn = drawer.querySelector('.aga-drawer__close');
			if (closeBtn) {
				closeBtn.focus();
			}
		}

		function closeDrawer() {
			drawer.hidden = true;
			document.body.style.overflow = '';
			openButtons.forEach(function (btn) {
				btn.setAttribute('aria-expanded', 'false');
			});
			if (lastTrigger && typeof lastTrigger.focus === 'function') {
				lastTrigger.focus();
			}
		}

		openButtons.forEach(function (btn) {
			btn.addEventListener('click', function () {
				openDrawer(btn);
			});
		});

		closeButtons.forEach(function (btn) {
			btn.addEventListener('click', closeDrawer);
		});

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && !drawer.hidden) {
				closeDrawer();
			}
		});
	}

	function initReadingProgress() {
		var bar = document.querySelector('[data-aga-reading-progress]');
		var target = document.querySelector('[data-aga-reading-target]');
		if (!bar || !target) {
			return;
		}

		var ticking = false;

		function updateProgress() {
			ticking = false;
			var rect = target.getBoundingClientRect();
			var total = Math.max(1, target.offsetHeight - window.innerHeight * 0.5);
			var scrolled = Math.min(total, Math.max(0, -rect.top + 80));
			var pct = Math.round((scrolled / total) * 100);
			bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
		}

		window.addEventListener(
			'scroll',
			function () {
				if (!ticking) {
					ticking = true;
					window.requestAnimationFrame(updateProgress);
				}
			},
			{ passive: true }
		);
		updateProgress();
	}

	document.addEventListener('DOMContentLoaded', function () {
		initUserMenu();
		initMobileDrawer();
		initReadingProgress();
	});
})();
