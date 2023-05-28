const routesUser = require("express").Router();
const storage = require("../middlewares/multerphoto");
const controllerUser = require("../controller/User.controller");
const uploadImage = require("../../services/firebase")



routesUser.post("/register",   controllerUser.register);
routesUser.post("/login", controllerUser.login);
routesUser.get("/takeUser/:id", controllerUser.takeUser);
routesUser.get("/takeUserByName", controllerUser.takeUserByName);
routesUser.put("/biography/:id", controllerUser.newBio)
routesUser.post("/upload", storage.single("photo"), uploadImage ,   controllerUser.savePhoto);

module.exports = routesUser;
