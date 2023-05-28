const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function authMiddleware (req, res, next) {
  // Verificar se o token de autenticação está presente nos headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Passar os dados do usuário autenticado para as rotas subsequentes
    req.user = decoded;

    // Continuar para a próxima função de middleware ou rota
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
module.exports = authMiddleware;
