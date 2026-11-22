/**
 * Accessible Homepage Hero Slider
 * Supports dots, prev/next buttons, keyboard arrows, touch swipe,
 * hover/focus pause, and prefers-reduced-motion.
 */
(function () {
	'use strict';

	function initHeroSlider(root) {
		var slides = Array.prototype.slice.call(root.querySelectorAll('[data-aga-slide]'));
		var dots = Array.prototype.slice.call(root.querySelectorAll('[data-aga-slide-to]'));
		var prevBtn = root.querySelector('[data-aga-slide-prev]');
		var nextBtn = root.querySelector('[data-aga-slide-next]');
		var statusEl = root.querySelector('[data-aga-slider-status]');

		if (slides.length <= 1) {
			return;
		}

		var current = 0;
		var timerId = null;
		var isPaused = false;
		var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var touchStartX = 0;

		function goTo(index, announce) {
			var total = slides.length;
			current = ((index % total) + total) % total;

			slides.forEach(function (slide, i) {
				var active = i === current;
				slide.classList.toggle('is-active', active);
				slide.setAttribute('aria-hidden', active ? 'false' : 'true');
				var links = slide.querySelectorAll('a, button');
				links.forEach(function (el) {
					el.setAttribute('tabindex', active ? '0' : '-1');
				});
			});

			dots.forEach(function (dot, i) {
				var active = i === current;
				dot.classList.toggle('is-active', active);
				dot.setAttribute('aria-selected', active ? 'true' : 'false');
			});

			if (announce && statusEl) {
				statusEl.textContent = 'Slide ' + (current + 1) + ' of ' + total;
			}
		}

		function startAutoplay() {
			if (reduceMotion || timerId !== null) {
				return;
			}
			timerId = window.setInterval(function () {
				if (!isPaused) {
					goTo(current + 1, false);
				}
			}, 6500);
		}

		function stopAutoplay() {
			if (timerId !== null) {
				window.clearInterval(timerId);
				timerId = null;
			}
		}

		if (prevBtn) {
			prevBtn.addEventListener('click', function () {
				goTo(current - 1, true);
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener('click', function () {
				goTo(current + 1, true);
			});
		}

		dots.forEach(function (dot) {
			dot.addEventListener('click', function () {
				var targetIndex = parseInt(dot.getAttribute('data-aga-slide-to') || '0', 10);
				goTo(targetIndex, true);
			});
		});

		root.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				goTo(current - 1, true);
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				goTo(current + 1, true);
			}
		});

		root.addEventListener(
			'touchstart',
			function (e) {
				if (e.changedTouches && e.changedTouches.length) {
					touchStartX = e.changedTouches[0].clientX;
				}
			},
			{ passive: true }
		);

		root.addEventListener(
			'touchend',
			function (e) {
				if (!e.changedTouches || !e.changedTouches.length) {
					return;
				}
				var deltaX = e.changedTouches[0].clientX - touchStartX;
				if (Math.abs(deltaX) >= 40) {
					goTo(deltaX < 0 ? current + 1 : current - 1, true);
				}
			},
			{ passive: true }
		);

		root.addEventListener('mouseenter', function () {
			isPaused = true;
		});
		root.addEventListener('mouseleave', function () {
			isPaused = false;
		});
		root.addEventListener('focusin', function () {
			isPaused = true;
		});
		root.addEventListener('focusout', function () {
			isPaused = false;
		});

		document.addEventListener('visibilitychange', function () {
			if (document.hidden) {
				stopAutoplay();
			} else {
				startAutoplay();
			}
		});

		goTo(0, false);
		startAutoplay();
	}

	document.addEventListener('DOMContentLoaded', function () {
		var sliders = document.querySelectorAll('[data-aga-slider]');
		sliders.forEach(initHeroSlider);
	});
})();
