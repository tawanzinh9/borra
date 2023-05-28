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
      photoPubPath = req.file.path;
      const apiUrl = `https://socialmedia-mauve.vercel.app/files`;
      const filename = path.basename(photoPubPath);
      photoUrl = `${apiUrl}/${filename}`;

      // Atualiza a foto do usuário nos posts antigos
      

 

    
    }

    const post = new Posts({
      photo: user.photo,
      photoPub: photoUrl,
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
