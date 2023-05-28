const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true 
    },

    email: {
        type: String, 
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    },
    photo: {
        type: String
    }
})

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

const User = mongoose.model("User", userSchema)


module.exports = User