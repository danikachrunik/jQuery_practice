(function (ns) {

	ns.Gallery = function (id) {

		var gallery = $('#' + id);
		var images = gallery.find('.galleryImg');

		var xPos = 50;
		var yPos = 50;
		var gWidth = gallery.width();
		var hoverWait = false;

		images.each(function (idx, el) {
			var img = $(el);
			img.data('homeX', xPos);
			img.data('homeY', yPos);
			img.data('currentScale', 1);
			img.css({
				'left': xPos,
				'top': yPos,
				'width': img.width() * 0.2
			});
			xPos += 220;
			if (xPos > gWidth - 200) {
				xPos = 50;
				yPos += 150;
			}

			img.hover(
				function (event) {
					hoverWait = false;
					var target = $(event.target);
					bringImageToTop(target);
					avoidImage(target);
					animateImg(target, 500, target.data('homeX'), target.data('homeY'), 2);
				},
				function(event) {
					hoverWait = true;
					setTimeout(function () {
						if (hoverWait)
							returnAllToNormal();
					}, 200);
				}
			);

			img.click(function () {

				if (!showingLargeImage) {
					//show large image
					showingLargeImage = true;
					avoidImage(img, 500, 200, 150, 4);
					//fade and rotate
					images.each(function (idx, el) {
						var target = $(el);
						if (img[0] != target[0]) {

							target.animate({'opacity': 0},
							{
								duration: 1000,
								step: function (now) {
									target.css('transform', 'rotateY(' + (90 * now - 90) + 'deg)');
								}
							});
						}
					});

				} else {

					animateImg(img, 500, img.data('homeX'), img.data('homeY'), 1);
					//returnAllToNormal();

					//fade images in and rotate to normal
					images.each

					//showingLargeImage = false;
				};
			});

			var bringImageToTop = function (img) {
				images.each(function (idx, el) {
					$(el).css('z-index', 0);
				});
				img.css('z-index', 1);
			}

			var avoidImage = function (target) {
				images.each(function (idx, el) {
					var img = $(el);
					if (img[0] != target[0]) {

						var xdiff = img.data('homeX') - target.data('homeX');
						var ydiff = img.data('homeY') - target.data('homeY');

						var adj = 40;
						var xAdjust = (xdiff > 0) ? adj : (xdiff < 0) ? -adj : 0;
						var yAdjust = (ydiff > 0) ? adj : (ydiff < 0) ? -adj : 0;
						if (yAdjust != 0) xAdjust = 0;

						var newX = img.data('homeX') + xAdjust;
						var newY = img.data('homeY') + yAdjust;

						animateImg(img, 500, newX, newY, 1);
					}
				});
			}

		var returnAllToNormal = function () {
			images.each(function (idx, el) {
				animateImg(img, 500, img.data('homeX'), img.data('homeY'), 2);
			});
		}

		var animateImg = function(img, duration, left, top, scale) {
			img.stop();

			img.css('textIndent', img.data('currentScale'));

			img.animate({
				'left': left,
				'top': top,
				'textIndent': scale //use textIndent css property for scaling
			},
			{
				duration: duration,
				step: function (now, fx) {
					//scale
					if (fx.prop === 'textIndent') {
						img.data('currentScale', now);
						img.css('transform', 'scale(' + now + ')');
					}
					else if (fx.prop === 'left')
						img.css('left', now);
					else if (fx.prop === 'top')
						img.css('top', now);
				}
			});
		}
	}
}(window.space = window.space || {}));

var g = new space.Gallery('gallery');