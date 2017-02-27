var socket = io();

socket.on("connect", function() {
    console.log("Connected to server");
});

socket.on("disconnect", function(){
    console.log("Disconnected from server");
});

socket.on("newMessage", function(message){
    var div_html = "";
    
    div_html += "<div class=\"header_sec\">";
        div_html += "<strong class=\"primary-font\">"+message.from+"</strong> ";
        div_html += "<strong class=\"pull-right\">"+message.createdAtTime+"</strong>";
    div_html += "</div>";

    var badge = "<div class=\"contact_sec\">\
        <span class=\"badge pull-right\">3</span>\
    </div>";

    var li_html = "";
    li_html += "<li class=\"left clearfix\">";
        li_html += "<span class=\"chat-img1 pull-left\">";
            li_html += "<strong class=\"primary-font\">"+message.from+"</strong> ";
            // li_html += "<img src=\"https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg\" alt=\"User Avatar\" class=\"img-circle\">";
        li_html += "</span>";
        li_html += "<div class=\"chat-body1 clearfix\">";
            li_html += "<p>"+message.text+"</p>";
            li_html += "<div class=\"chat_time pull-right\">"+message.createdAtTime+"</div>";
        li_html += "</div>";
    li_html += "</li>";

    $("#messages").append(li_html);
    // $("#user_name").append(message.from);
});

socket.on("newLocationMessage", function(message) {
    var li_html = "";
        li_html += "<li class=\"left clearfix\">";
            li_html += "<span class=\"chat-img1 pull-left\">";
                li_html += "<strong class=\"primary-font\">Admin</strong>";
            li_html += "</span>";
            li_html += "<div class=\"chat-body1 clearfix\">";
                li_html += "<p><a target=\"_blank\" href=\""+message.url+"\"id=\"send-location\">";
                    li_html += "<i class=\"fa fa-location-arrow\" aria-hidden=\"true\"></i>";
                    li_html += "Shared Location";
                li_html += "</a></p>";
                li_html += "<div class=\"chat_time pull-right\">"+message.createdAtTime+"</div>";
            li_html += "</div>";
        li_html += "</li>";
    
    $("#messages").append(li_html);
})

$(function() { //shorthand document.ready function
    $("#message-form").on("submit", function(e) {
        e.preventDefault();

        socket.emit("createMessage", {
            from: "User", 
            text: $("#messageInput").val()
        }, function() {
            $('#messageInput').val("");
        });
    });

    var locationButton = $("#send-location");
    locationButton.on("click", function() {
        if(!navigator.geolocation) {
            return $('#geolocationModal').modal('show'); 
        }

        navigator.geolocation.getCurrentPosition(function(position) {
            socket.emit("createLocationMessage", {
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
            });
        }, function() {
            alert("Unable to fetch location.");
        });
    });
});
