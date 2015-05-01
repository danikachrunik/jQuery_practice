$(document).ready(function() {
	//toggle (toggle show and hide)
	$('#toggle-btn').click(function() {
		$('#toggle').toggle('slow');
	});
	//Fade
	$('#fade-btn').click(function() {
		$('#fade').fadeToggle('slow');
	});
	//Slide
	$('#slide-btn').click(function() {
		$('#slide').slideToggle('slow');
	});
	//Animate img opacity
	$('#img1').animate({opacity: '0'}, 2000).animate({opacity: '1'}, 3000);
	//Hide and Show img
	$('#img2').delay(1000).hide(1000).show(2000);
	//Rotate and Scale
	var logo = $('#img3'),
		s = 0,
		r = 0;
	$({ s: 0 , r: 0}).animate(
		{
			s:1,
			r: 360
		},
		{
			duration: 3000,
			step: function (now, fx) {
				if (fx.prop == 's')
					s = now;
				else if (fx.prop == 'r')
					r = now;
				logo.css('transform', 'scale(' + s + ') rotate('+ r + 'deg)');
			}
		}
	);
});