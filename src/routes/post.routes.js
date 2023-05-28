const routesPosts = require("express").Router()
const posts = require("../controller/Post.controller")
const likesAndDeslike= require("../controller/LikeAndDeslike")
const comments = require("../controller/CommentsController")

const multer = require("multer");
const storage = require("../middlewares/multerphoto");



const upload = multer({
    storage: storage,
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
  });



// get and create new post 
// htpp://localhost:5000/getPosts ||  htpp://localhost:5000/createPosts 
routesPosts.get("/", (req,res) => {
  res.status(200).send("Api ok")
})
routesPosts.get("/getPosts", posts.getPosts)
routesPosts.post("/createPosts", upload.single("photoPub"),  posts.createdPosts)
routesPosts.get("/getPostsById/:id", posts.getPostsById)
routesPosts.get("/getUsersWhoLikedbyId/:id", posts.getUsersWhoLikedById)
// likes and deslike
// http://localhost:5000/like/id
routesPosts.put("/like/:id/:userId", likesAndDeslike.like)


// Comentários // http://localhost:4000/
routesPosts.post("/creatingComment/:id", upload.single("photoPub"), comments.newComment);
routesPosts.get("/getComments/:id", comments.showComments);




module.exports = routesPosts