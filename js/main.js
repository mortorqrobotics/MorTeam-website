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
function request(type, url, data, responsecb) {
    var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");;
    xhr.open(type, url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            responsecb(xhr.responseText);
        }
    };
    xhr.send(data);
}

function getTimeNow() {
    var now = new Date();
    var Hours = now.getHours();
    var suffix;
    if (parseInt(Hours) > 12) {
        Hours = (parseInt(Hours) - 12).toString();
        suffix = "PM";
    } else if (Hours == "12") {
        suffix = "PM";
    } else {
        suffix = "AM";
    }
    var Minutes = now.getMinutes();
    if (parseInt(Minutes) < 10) {
        Minutes = "0" + Minutes;
    }
    return Hours + ":" + Minutes + " " + suffix;
}
var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var mtend = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

function getDaysInMonth(month, year) {
    if (month == 2 && year % 4 != 0) {
        return 28;
    }
    return mtend[month - 1];
}
function logout(){
    request("POST", "/f/logout", JSON.stringify({"user":localStorage.username, "token":localStorage.userToken}), function(responseText){
        localStorage.clear();
        location = "login";
    });
}
function userInfo(username){
    //Probably shouldn't be used
    var info = null;
    request("POST", "/f/getuserinfo", JSON.stringify({"user":localStorage.username, "desiredUser":username}), function(responseText){
        var user = JSON.parse(responseText);
        var name = user[0].first + " " + user[0].last;
        info = {"name":name, "phone":user[0].phone, "email":user[0].email};
    });
    while (info != null){
        return info;
    }
}
function updateTeammates(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/f/getteammates", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var users = JSON.parse(xhr.responseText);
            var newUsers = {};
            for (var i = 0; i < users.length; i++){
                newUsers[users[i].user] = {"name":users[i].first + " " + users[i].last, "status":users[i].status, "position":users[i].position};
            }
            localStorage.teammates = JSON.stringify(newUsers);
        }
    };
    xhr.send(JSON.stringify({
        "user": localStorage.username,
        "teamCode": localStorage.teamCode
    }));
}
updateTeammates();

function qs(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

function getDayOfWeek(m, d, y) {
    m--;
    var hlpr = mtend[m];
    if (d <= mtend[m]) {
        if (m == 1 && y % 4 != 0) {
            hlpr--;
        }
        var c = new Date(y, m, d);
        var dayOfWeek = c.getDay();
        return days[dayOfWeek];
    } else {
        alert("Invalid: " + months[m] + " " + d + ", " + y);
    }
}



function getPic(user, target) {
    $(target).attr("src", "/f/getPic?user=" + user);
    $.post("/f/getPic?user=" + user, function(response) {
        if (response == "") {
            $(target).attr("src", "/images/user.jpg");
        }
    });
}
function updateToken(){
    request("POST", "/f/updatetoken", JSON.stringify({"user":localStorage.username, "token":localStorage.userToken, "teamCode":localStorage.teamCode}), function(responseText){
        if (responseText.substring(0, 4) == "fail"){
            logout();
        }
        else {
            var data = JSON.parse(responseText);
            localStorage.userToken = data.token;
            localStorage.position = data.position;
        }
    });
}

function showNewMessageNotice(sender, content, convo, chatcode) { // ADD A USERNAME PARAMETER AND REPLACE "farbod909" WITH THAT.
    var newMessageNotice = new jBox('Notice', {
        attributes: {
            x: 'right',
            y: 'bottom'
        },
        theme: 'NoticeBorder',
        volume: 100,
        animation: {
            open: 'slide:bottom',
            close: 'slide:right'
        },
        content: content,
        maxWidth: 300,
        maxHeight: 105,
        title: sender,
        closeOnClick: false,
        onOpen: function() {
            $($(this)[0].content).attr("data-sender", convo);
            $($(this)[0].content).attr("data-chatcode", chatcode);
        }
    });

};
$(document).ready(function() {

    $('#name_link').html(localStorage.firstName);
    //getPic(localStorage.username, $("#small_prof_pic"));
    $("#small_prof_pic").attr("src", "/f/getPic?user=" + localStorage.username);
    $("#small_prof_pic").attr("onError", "this.src=\'./images/user.jpg\'");

    /*isBlur = false;
    $(window).blur(function(){
        isBlur = true;
        //b.trigger("click");
    });
    $(window).focus(function(){
        isBlur = false;
    });*/

    var fade_speed = 200;

    var socket = io.connect();
    socket.emit("updateclient", {
        "user": localStorage.username,
        "chatcode": "",
        "teamcode": localStorage.teamCode,
        "token":localStorage.userToken
    });





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
    $('.profile_id').click(function() {
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
    $('.profile_name').click(function() {
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
    $(document).on( "click", "#logout_button", function() {
        /*localStorage.removeItem('username');
        localStorage.removeItem('userToken');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('subdivison');
        localStorage.removeItem('phone');
        localStorage.removeItem('email');
        localStorage.removeItem('teamName');
        localStorage.removeItem('teamCode');
        localStorage.removeItem('teammates');
        localStorage.removeItem('teamNumber');
        localStorage.removeItem('position');
        location = "login";*/
        logout();
    });
    socket.on("notification", function(data) {
        if (data.chatname == "") {
            showNewMessageNotice(data.name, data.message, data.user, data.chatcode);
        } else {
            showNewMessageNotice(data.name + " in " + data.chatname, data.message, data.chatname, data.chatcode);
        }
        $('#audio-files').find('audio#click-sound')[0].play();
        $('#audio-files').find('audio#click-sound')[0].currentTime = 0;

    });

    $(document).on("click", ".jBox-Notice", function() {
        // $(this).find(".jBox-content").attr("data-sender") ---> the username or chatname
        // $(this).find(".jBox-content").attr("data-chatcode") ---> the chatcode
    });
    $(document).on("click", ".accept_invite_btn", function(){
        var scopeName = $(this).parent().prev().prev().find(".invited_scope_name").html();
        request("POST", "/f/respondtoinvite", JSON.stringify({"user":localStorage.username, "teamCode":localStorage.teamCode, "scopeName":scopeName, "response":"accept"}), function(responseText){
            $("#your_scopes").append('<p class="scope_link"><span class="glyphicon glyphicon-screenshot"></span> <span class="scopeName">'+scopeName+'</span></p>');
            $("#invited_scopes").find("span:contains('"+scopeName+"')").parent().remove()//get(0).remove();
        });
        scope_invite.close();
    });
    var scope_invite = new jBox('Modal', {
        width: 'auto',
        height: 'auto',
        title: 'Subdivison Invitation',
        content: '<span><span class="inviter"></span> You have been invited to the subdivison: <span class="invited_scope_name"></span></span><br/><div style="text-align: center"><input type="button" class="button invite_btn accept_invite_btn" value="Accept"></input><input type="button" class="button invite_btn ignore_invite_btn" value="Ignore"></input></div>',
        onOpen: function() {

         // $(".inviter").html("Farbod Rafezy");
          //$(".invited_scope_name").html("Programming");

        }
    });
    if (location.pathname.substring(1, 6) != "index"){
        updateToken();
    }


    $(document).on("click", ".scope_invite", function(){
        scope_invite.setContent('<span><span class="inviter"></span> You have been invited to the subdivison: <span class="invited_scope_name">'+$(this).find(".scopeName").html()+'</span></span><br/><div style="text-align: center"><input type="button" class="button invite_btn accept_invite_btn" value="Accept"></input><input type="button" class="button invite_btn ignore_invite_btn" value="Ignore"></input></div>')
        //$(this).find(".accept_invite_btn").attr("data-scopeName", $(this).find(".scopeName").html());
        scope_invite.open();
    });

    $(".menu").click(function() {
        if ($(".nav_dropdown").css("top").indexOf("-") != -1) {
            $(".nav_dropdown").velocity({
                top: "40px"
            }, 200);
        } else {
            $(".nav_dropdown").velocity({
                top: "-215px"
            }, 200);
        }
    })

});
