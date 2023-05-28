const mongoose = require("mongoose")


const Post = new mongoose.Schema({
    photo: String,
    photoPub: String, 
    username: String,
    content: String,
    userId: String,
    createdAt: Date,


    likes: {
        count: {
          type: Number,
          default: 0
        },
        users: [
          {
            type: String,
            
          }
        ]
      },


    comments: [
        {
            postId: String,
            text: String,
            author: String,
            createdAt: Number,
            photo: String,
            photoPub: String,
            userId: String
        }
    ],

  
})


const Posts = mongoose.model("Posts", Post)

module.exports = Posts