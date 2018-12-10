"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var app = express();
app.use('/dist', express.static('dist'));
app.get('/', function (req, res) { return res.sendFile(path.resolve(__dirname, '..', 'index.html')); });
app.listen('3000', function () { return console.log('listening on port 3000..'); });
