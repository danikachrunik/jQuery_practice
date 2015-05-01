$(document).ready(function() {
	$('input').click(function() {
	var a = $('#animate');
	if (a.is(':hidden'))
		a.show();
	else
		a.hide();
	});
});