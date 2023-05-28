const User = require("../model/User")

const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config()

const jwt = require("jsonwebtoken")
const Posts = require("../model/Post")


async function register (req, res) {
    // controlar cadastros 
    const { username, email, password } = req.body;

    try {
        // verificar email 
        const userExistOrNo = await User.findOne({ email })

        if(userExistOrNo) {
          return  res.status(400).json({
                message: "Email already exist."
            })
        }

        // verificar se o nome de usuario ja existe
         const usernameExistOrNo = await User.findOne({ username })

        if(usernameExistOrNo) {
            return res.status(400).json({
                message: "User already exist."
            })
        }

        if(!username || !email || !password) {
           return res.status(400).json({
                message: "Error, check all fields."
            })
        }

        const newUser = new User ({
            username: username,
            email: email, 
            password: password,
            createdAt: Date.now()
        })

        await newUser.save()

        return res.status(200).json({
            message: "User created with sucessfully. (;", newUser
        })
    }  catch(error) {
        res.status(500).json({
            message: "Something wrong happens, please check."
        })
    }

    
}


async function login (req, res) {
    // pegar o usuario e senha
    const {username, password} = req.body 

    const usernameExist = await User.findOne({username})

    if(!usernameExist) {
        return res.status(400).json({
            message: "Error, username doesn't exist."
        })
    }

    const passwordIsCorrect = await bcrypt.compare(password, usernameExist.password)
    
    if(!passwordIsCorrect) {
       return res.status(400).json({
            message: "Sorry, password is not correct"
        })
    }

    try {
        const secret = "HASHTAG"

        const token = jwt.sign({id: usernameExist._id,
             username: usernameExist.username, 
             email: usernameExist.email, 
             biography: usernameExist.biography,
             photo: usernameExist.photo
            
            }, secret)

             res.status(200).json({
                message: "Token authorized",
                token : token
             })
    } catch (error) {
        res.status(500).json({
            message: "Sorry, something wrong happens, please check." + error
        })
    }
}

async function takeUserByName (req, res) {
  const username = req.body.username 

  const user = await User.findOne(username)

  return res.json(user)
}

async function takeUser (req, res) {
try {
    const userId = req.params.id

    const user = await User.findById(userId)

    if(!user) {
        return res.status(404).json({
            message: "Sorry, user not found."
        })
    }
    

    return res.json(user) 
} catch (error) {
    res.status(500).json({
        message: "Something wrong happens, please check."
    })
}

}

async function savePhoto(req, res) {
  const photoPath = req.file.path; // pegamos a imagem
  const userId = req.body.userId; // e o id do usuario

 
 

  try {
    const filename = path.basename(photoPath); // pega o nome do arquivo
    const apiUrl = `https://borra.onrender.com/files`;
    const photoUrl = `${apiUrl}/${filename}`;

    const user = await User.findById(userId); // Encontra o usuário pelo ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Atualiza a foto do usuário
    user.photo = photoUrl;
    await user.save({ validateBeforeSave: false });
  

    // Atualiza os posts do usuário com a nova foto
    await Posts.updateMany({ userId: userId }, { photo: photoUrl });

    return res.status(200).json({
      message: "Photo updated successfully",
      photoPath,
      photo: photoUrl,
      userId: userId,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error, please try again." + err,
    });
  }
}


async function newBio(req, res) {
  try {
    const id = req.params.id;
    const newBiography = req.body.biography;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { biography: newBiography },
      { new: true }
    );
    res.status(200).json({
      message: "Biography updated with sucessfully",
      biography: updatedUser.biography,
    });
  } catch (error) {
    res.status(400).send({
      error: "Error when updating the biography",
    });
  }
}



module.exports = {
    register, login, takeUser, savePhoto, newBio, takeUserByName
}