var express = require("express");

var app = express();

app.use(express.static("www"));

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));


module.exports = app;










