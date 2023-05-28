const routesUser = require("express").Router();
const multer = require("multer");
const storage = require("../middlewares/multerphoto");
const controllerUser = require("../controller/User.controller");


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});


routesUser.post("/register",   controllerUser.register);
routesUser.post("/login", controllerUser.login);
routesUser.get("/takeUser/:id", controllerUser.takeUser);
routesUser.get("/takeUserByName", controllerUser.takeUserByName);
routesUser.put("/biography/:id", controllerUser.newBio)
routesUser.post("/upload", upload.single("photo"), controllerUser.savePhoto);

module.exports = routesUser;
