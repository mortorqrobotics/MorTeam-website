// function getPic(user) {
//     $.post("/f/getPic?user=" + user, function(response){
//       if(response == ""){
//         $("#small_prof_pic").attr("src", "/images/user.jpg");
//         $(".profile_pic").attr("src", "/images/user.jpg");
//       } else {
//         $("#small_prof_pic").attr("src", "/f/getPic?user=" + user);
//         $(".profile_pic").attr("src", "/f/getPic?user=" + user);
//       }
//     });
// }
function getPic(user, target) {
    $(target).attr("src", "/f/getPic?user=" + user);
    $.post("/f/getPic?user=" + user, function(response){
      if(response == ""){
        $(target).attr("src", "/images/user.jpg");
      }
    });
}
$(document).ready(function() {
    $('#name_link').html(localStorage.firstName);
    //getPic(localStorage.username, $("#small_prof_pic"));
    $("#small_prof_pic").attr("src", "/f/getPic?user=" + localStorage.username);
    $("#small_prof_pic").attr("onError", "this.src=\'./images/user.jpg\'");

    var fade_speed = 200;



    $('#notif_button').click(function() {
        $('#notif_drop').fadeIn(fade_speed).removeClass("hidden")
        $('.triangle_thing_notif').fadeIn(fade_speed).removeClass("hidden")
        $('#darken').fadeIn(fade_speed).removeClass("hidden")
        $('#notif_button').addClass('active');
        $('#darken').click(function() {
            $(this).fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('#notif_drop').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('.triangle_thing_notif').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('#notif_button').removeClass('active');
        });
    });
    $('#profile_id').click(function() {
        $('#prof_drop').fadeIn(fade_speed).removeClass("hidden");
        $('.triangle_thing_prof').fadeIn(fade_speed).removeClass("hidden");
        $('#darken').fadeIn(fade_speed).removeClass("hidden");
        $('#darken').click(function() {
            $(this).fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('#prof_drop').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('.triangle_thing_prof').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
        });
    });
    $('#profile_name').click(function() {
        $('#prof_drop').fadeIn(fade_speed).removeClass("hidden");
        $('.triangle_thing_prof').fadeIn(fade_speed).removeClass("hidden");
        $('#darken').fadeIn(fade_speed).removeClass("hidden");
        $('#darken').click(function() {
            $(this).fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('#prof_drop').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('.triangle_thing_prof').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
        });
    });
    $('#logout_button').click(function() {
        localStorage.removeItem('username');
        localStorage.removeItem('userToken');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('subdivison');
        localStorage.removeItem('phone');
        localStorage.removeItem('email');
        localStorage.removeItem('teamName');
        localStorage.removeItem('teamNumber');
        location = "login.html";
    });
});
