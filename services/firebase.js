var admin = require("firebase-admin");

var serviceAccount = require("../src/config/chavefirebase.json");

const BUCKET = "kkkkkkk-24d6f.appspot.com/"
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET // endereço padrao
});

const bucket = admin.storage().bucket()

const uploadImage = (req, res, next) => {
    if(!req.file) return next()

    const imagem = req.file;
    const nomeArquivo = Date.now() + "." + imagem .originalname.split(".").pop()

    const file = bucket.file(nomeArquivo)

    const stream = file.createWriteStream({
        metadata: {
            contentType: imagem.mimetype
        }
    })

    stream.on("error", (e) => {
        console.log(e)
    })

    stream.on("finish", async () => {
        
       await file.makePublic()

       req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}`


        next()


        stream.end(imagem.buffer)
    })
}

module.exports = uploadImage