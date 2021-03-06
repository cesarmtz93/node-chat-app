// set up ======================================================================
require("./config/config");
// const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const express = require("express");
const http = require("http");
const path = require("path");
// const hbs = require("hbs");

const publicPath = path.join(__dirname, "../public");
const publicViewsPath = path.join(__dirname, "../public/views"); 
const {generateMessage, generateLocationMessage} = require("./utils/message");

// configuration ===============================================================
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {
    socket.on("disconnect", () => { console.log("Client Disconnected"); });

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));

    socket.broadcast.emit("newMessage", generateMessage("Admin", "New User Joined"));

    socket.on("createMessage", (message, callback) => {
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback();
    });

    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });
});

// app.set("view engine", "hbs");
app.use(express.static(publicPath));
app.use(express.static(publicViewsPath));
// app.use(bodyParser.json());
app.use("/js", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js"))); // redirect bootstrap JS
app.use("/js", express.static(path.join(__dirname,"../node_modules/jquery/dist"))); // redirect JS jQuery
app.use("/css", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css"))); // redirect CSS bootstrap

app.use("/js", express.static(path.join(__dirname,"../node_modules/moment"))); // redirect Moment

// hbs.registerPartials(path.join(publicViewsPath, "/partials"));
// hbs.registerHelper("getCurrentYear", () => { return new Date().getFullYear(); });
// hbs.registerHelper("upperCase", (text) => { return text.toUpperCase(); });

// listen =======================================================================
server.listen(process.env.PORT, () => {
    console.log(`Started on port ${process.env.PORT}`);
});

// routes =======================================================================
// app.get("", (request, response) => {
//     response.render(path.join(publicViewsPath));
// });

// var todos = require("./routes/todos");
// app.use(todos);

module.exports = {app};
// cd Desktop/NodeJS/mongo/bin/
// ./mongod -dbpath ~/Desktop/NodeJS/mongo-data/
