"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var express = require("express");
var bodyParser = require("body-parser");
var orderRouter_1 = require("./routes/orderRouter");
var app = express();
dotenv.config();
app.use(bodyParser.json());
app.use("/orders", orderRouter_1.orderRouter);
app.listen(process.env.PORT, function () {
    console.log("Node server started running");
});
