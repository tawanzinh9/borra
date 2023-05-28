const multer = require("multer")

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024, // limite  
})

module.exports = Multer 