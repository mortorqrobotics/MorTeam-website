$(document).ready(function(){
	$('#name_link').html(localStorage.firstName);

    $('#darken').hide();

    $('#notif_drop').hide();
    $('.triangle_thing_notif').hide()

    $('#prof_drop').hide();
    $('.triangle_thing_prof').hide()

    $('#notif_button').click(function(){
      $('#notif_drop').fadeIn(300)
      $('.triangle_thing_notif').fadeIn(300)
      $('#darken').fadeIn(300);
      $('#notif_button').addClass('active');
      $('#darken').click(function(){
        $(this).fadeOut(300);
        $('#notif_drop').fadeOut(300);
        $('.triangle_thing_notif').fadeOut(300);
        $('#notif_button').removeClass('active');
      });
    });
    $('#profile_id').click(function(){
      $('#prof_drop').fadeIn(300);
      $('.triangle_thing_prof').fadeIn(300);
      $('#darken').fadeIn(300);
      $('#darken').click(function(){
        $(this).fadeOut(300);
        $('#prof_drop').fadeOut(300);
        $('.triangle_thing_prof').fadeOut(300);
      });
    });
    $('#profile_name').click(function(){
      $('#prof_drop').fadeIn(300);
      $('.triangle_thing_prof').fadeIn(300);
      $('#darken').fadeIn(300);
      $('#darken').click(function(){
        $(this).fadeOut(300);
        $('#prof_drop').fadeOut(300);
        $('.triangle_thing_prof').fadeOut(300);
      });
    });
});