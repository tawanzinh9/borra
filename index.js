const app = require("./src/app.js")

const port = process.env.PORT || 5000

app.listen(port , () => console.log("Porta iniciada na porta...:", port))