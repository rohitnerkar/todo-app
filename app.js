const express = require('express');
const path = require("path");
const bodyparser = require("body-parser");
const connectMongodb = require("./init/mongodb")
const todoRoute = require("./routes/todo")
const dotenv = require("dotenv")

dotenv.config();

const app = express();

connectMongodb();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/", todoRoute);

module.exports = app;
