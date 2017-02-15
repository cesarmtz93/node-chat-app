// set up ======================================================================
require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");
const publicPath = path.join(__dirname, "../public");

// configuration ===============================================================
var app = express();
app.use(express.static(publicPath));
app.use(bodyParser.json());

// listen =======================================================================
app.listen(process.env.PORT, () => {
    console.log(`Started on port ${process.env.PORT}`);
});

// routes =======================================================================
// var todos = require("./routes/todos");
// app.use(todos);

module.exports = {app};
// cd Desktop/NodeJS/mongo/bin/
// ./mongod -dbpath ~/Desktop/NodeJS/mongo-data/
