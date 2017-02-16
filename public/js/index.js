var socket = io();

socket.on("connect", function() {
    console.log("Connected to server");
});

socket.on("disconnect", function(){
    console.log("Disconnected from server");
});

socket.emit("createMessage", {
    from: "jen@example.com", 
    text: "hey what´sup?"
});

socket.on("newMessage", function(message){
    console.log("newMessage: ", message);
});
