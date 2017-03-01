$(document).ready(function() { 
    var socket = io();

    socket.on("connect", function() {
        console.log("Connected to server");
    });

    socket.on("disconnect", function(){
        console.log("Disconnected from server");
    });

    socket.on("newMessage", function(message){
        var template = $("#message-template").html();

        var html = Mustache.render(template, {
            from: message.from, 
            text: message.text, 
            createdAt: moment(message.createdAt).format("h:mm a")
        });

        $("#messages").append(html);
    });

    socket.on("newLocationMessage", function(message) {
        var template = $("#location-message-template").html();

        var html = Mustache.render(template, {
            url: message.url,
            createdAt: moment(message.createdAt).format("h:mm a")
        });

        $("#messages").append(html);
    });

    $('#messageInput').keypress(function (e) {
        if (e.which == 13) {
            $('#message-form').submit();
            return false;    //<---- Add this line
        }
    });

    $("#message-form").on("submit", function(e) {
        e.preventDefault();

        if($("#messageInput").val() !== "") {
            $("#messageError").hide();
            socket.emit("createMessage", {
                from: "User", 
                text: $("#messageInput").val()
            }, function() {
                $('#messageInput').val("");
            });
        } else{
            $("#messageError").show();
        }
    });

    var locationButton = $("#send-location");
    locationButton.on("click", function() {
        locationButton.addClass('disabled');
        
        if(!navigator.geolocation) {
            return $('#geolocationModal').modal('show'); 
        }        

        locationButton.text("Sending Location ... ");
        navigator.geolocation.getCurrentPosition(function(position) {
            socket.emit("createLocationMessage", {
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
            });
            locationButton.removeClass('disabled');
            locationButton.text("");
            locationButton.append("<i class=\"fa fa-location-arrow\" aria-hidden=\"true\"></i> Share Location");
        }, function() {
            alert("Unable to fetch location.");
            locationButton.removeClass('disabled');
            locationButton.text("");
            locationButton.append("<i class=\"fa fa-location-arrow\" aria-hidden=\"true\"></i> Share Location");
        });
    });
});
