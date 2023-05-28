const express = require("express");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(cors());
// http://localhost:5000/files
app.use("/files", express.static("uploads")) 


const db = require("./config/mongoose");
app.set("Mongoose", db);

const routes = require("./routes/user.routes")
const routesPosts = require("./routes/post.routes")
app.use(routes)
app.use(routesPosts)


module.exports = app;
