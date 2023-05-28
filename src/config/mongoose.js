const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const db = mongoose
  .connect("mongodb+srv://88taw:7714721a@tarmoonproject.geyi7zy.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Sucesso"))
  .catch((e) => console.log("erro" + e));

module.exports = db;
