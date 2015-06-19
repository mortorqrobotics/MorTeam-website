$(document).ready(function(){
	$('#name_link').html(localStorage.firstName);

    $('#darken').hide();

    $('#notif_drop').hide();
    $('.triangle_thing_notif').hide()

    $('#prof_drop').hide();
    $('.triangle_thing_prof').hide()

    var fade_speed = 200;

    $('#notif_button').click(function(){
      $('#notif_drop').fadeIn(fade_speed)
      $('.triangle_thing_notif').fadeIn(fade_speed)
      $('#darken').fadeIn(fade_speed);
      $('#notif_button').addClass('active');
      $('#darken').click(function(){
        $(this).fadeOut(fade_speed);
        $('#notif_drop').fadeOut(fade_speed);
        $('.triangle_thing_notif').fadeOut(fade_speed);
        $('#notif_button').removeClass('active');
      });
    });
    $('#profile_id').click(function(){
      $('#prof_drop').fadeIn(fade_speed);
      $('.triangle_thing_prof').fadeIn(fade_speed);
      $('#darken').fadeIn(fade_speed);
      $('#darken').click(function(){
        $(this).fadeOut(fade_speed);
        $('#prof_drop').fadeOut(fade_speed);
        $('.triangle_thing_prof').fadeOut(fade_speed);
      });
    });
    $('#profile_name').click(function(){
      $('#prof_drop').fadeIn(fade_speed);
      $('.triangle_thing_prof').fadeIn(fade_speed);
      $('#darken').fadeIn(fade_speed);
      $('#darken').click(function(){
        $(this).fadeOut(fade_speed);
        $('#prof_drop').fadeOut(fade_speed);
        $('.triangle_thing_prof').fadeOut(fade_speed);
      });
    });
    $('#logout_button').click(function(){
    	localStorage.removeItem('username');
    	localStorage.removeItem('userToken');
    	localStorage.removeItem('firstName');
    	localStorage.removeItem('lastName');
    	localStorage.removeItem('subdivison');
    	localStorage.removeItem('phone');
    	localStorage.removeItem('email');
    	localStorage.removeItem('teamName');
    	localStorage.removeItem('teamNumber');
    	location="login.html";
    });
});