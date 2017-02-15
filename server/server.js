// set up ======================================================================
require("./config/config");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const express = require("express");
const http = require("http");
const path = require("path");
const hbs = require("hbs");

const publicPath = path.join(__dirname, "../public");
const publicViewsPath = path.join(__dirname, "../public/views");

// configuration ===============================================================
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {
    console.log("New Client Connected");

    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    });
});



app.set("view engine", "hbs");
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use("/js", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js"))); // redirect bootstrap JS
app.use("/js", express.static(path.join(__dirname,"../node_modules/jquery/dist"))); // redirect JS jQuery
app.use("/css", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css"))); // redirect CSS bootstrap

hbs.registerPartials(path.join(publicViewsPath, "/partials"));
hbs.registerHelper("getCurrentYear", () => { return new Date().getFullYear(); });
hbs.registerHelper("upperCase", (text) => { return text.toUpperCase(); });

// listen =======================================================================
server.listen(process.env.PORT, () => {
    console.log(`Started on port ${process.env.PORT}`);
});

// routes =======================================================================
app.get("", (request, response) => {
    response.render(path.join(publicViewsPath, "/main.hbs"), {
        pageTitle: "Welcome to my Website", 
        pageParagraph: "I'm just an iOS Developer and fullstack web developer"
    });
});
// var todos = require("./routes/todos");
// app.use(todos);

module.exports = {app};
// cd Desktop/NodeJS/mongo/bin/
// ./mongod -dbpath ~/Desktop/NodeJS/mongo-data/
