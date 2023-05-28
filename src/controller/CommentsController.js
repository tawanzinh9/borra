const Comments = require("../model/Comments");
const path = require("path");
const User = require("../model/User.js")
const Posts = require("../model/Post");

async function newComment(req, res) {
  try {
    const postId = req.params.id;
    const photo = req.body.photo;
    const text = req.body.text;
    const author = req.body.author;
    const userId = req.body.userId
    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({ mensagem: "Post não encontrado" });
    }

    let photoPubPath = null;
    let photoUrl = null;

    if (req.file) {
      photoPubPath = req.file.path;
      const apiUrl = `https://borra.onrender.com/files`;
      const filename = path.basename(photoPubPath);
      photoUrl = `${apiUrl}/${filename}`;
    }

 
    const comment = new Comments({
      postId: post._id,
      text: text,
      userId: userId,
      photo: photo,
      author: author,
      photoPub: photoUrl,
      createdAt: Date.now(),
    });

    await comment.save();

    post.comments.push(comment);
    await post.save();

    res.status(200).json({
      mensagem: "Comentário enviado com sucesso!",
      postId,
      text,
      author,
      photo,
      userId,
      photoUrl: photoUrl,
    });
  } catch (error) {
    res.status(400).send("dfsfds" + error);
  }
}

async function showComments(req, res) {
  try {
    const id = req.params.id;
    const showComments =  await Comments.find({ postId: id });
    res.status(200).json(showComments);
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  newComment,
  showComments,
};
