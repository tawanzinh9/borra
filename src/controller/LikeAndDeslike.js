const Posts = require("../model/Post");

async function like(req, res) {
  const postId = req.params.id; // pega a postagem
  const userId = req.params.userId

  try {
    // encontra
    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found.");
    }


  

    const userIndex = post.likes.users.indexOf(userId);
    if (userIndex !== -1) {
      post.likes.count--;
      post.likes.users.splice(userIndex, 1);
    } else {
      post.likes.count++;
      post.likes.users.push(userId);
    }
    await post.save();

    res.json({
      updated: "Sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Sorry, something wrong happens.",
    });
  }
}


module.exports = {
  like
};
