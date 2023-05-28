const Posts = require("../model/Post");
const User = require("../model/User");
const path = require("path");

async function getPosts(req, res) {
  try {    
    const posts = await Posts.find();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Something wrong happens" });
  }
}

async function getPostsById(req, res) {
  const id = req.params.id 
  try {    
    const post = await Posts.findById(id);

    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: "Something wrong happens" });
  }
}


  async function getUsersWhoLikedById(req, res) {
    try {
      const postId = req.params.id;
      
      const post = await Posts.findById(postId).select('likes.users');
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const users = post.likes.users;
      res.status(200).json({ users });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong', error: err });
    }
  }

  async function getAllCommentsById(req, res) {
    try {
      const postId = req.params.id;
      
      const post = await Posts.findById(postId).select('comments');
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const comments = post.comments;
      res.status(200).json({ comments });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong', error: err });
    }
  }



async function createdPosts(req, res) {
  const { username, content, userId } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "Sorry, user not found.",
      });
    }

    let photoPubPath = null;
    let photoUrl = null;

    if (req.file) {
      const photoPubPath = req.file.path;
      const filename = path.basename(photoPubPath);
    
      // Fazer o upload da imagem para o Firebase Storage
      const file = bucket.file(filename);
      await file.save(photoPubPath, {
        metadata: {
          contentType: req.file.mimetype,
        },
      });
    
      // Obter o URL da imagem no Firebase Storage
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2023" // Defina a expiração desejada para o URL
      });
      photoPub = url;
    }
    
    const post = new Posts({
      photo: user.photo,
      photoPub, // Usar o URL da imagem no Firebase Storage
      username: user.username,
      content,
      userId,
      createdAt: Date.now(),
      likes: { count: 0, users: [] },
      comments: [],
    });
    
    await post.save();
    

    return res.status(201).json({
      message: "Post created successfully",
      postId: post._id,
      post,
    });
  } catch (err) {
    res.status(500).json({
      message: "Sorry, something went wrong" + err,
    });
  }
}

module.exports = {
  getPosts,
  createdPosts,
  getPostsById,
  getUsersWhoLikedById,
  getAllCommentsById
};
