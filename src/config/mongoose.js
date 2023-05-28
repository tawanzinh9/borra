const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Sucesso"))
  .catch((e) => console.log("erro" + e));

module.exports = db;
