const express = require("express");
const router = express.Router();
const { authMiddleware, roleMiddleware } = require("../middlewares/functions");

// Ruta que recibe el rol como param
router.get(
  "/:role",
  authMiddleware,
  (req, res, next) => {
    const { role } = req.params;

    // comprobamos si el param es admin o user
    if (role === "admin") {
      roleMiddleware(["admin"])(req, res, next);
    } else if (role === "user") {
      roleMiddleware(["user"])(req, res, next);
    } else {
      // si el param no es valido, manda respuesta de error
      res.status(400).json({ message: "Rol inválido" });
    }
  },
  (req, res) => {
    // Si fue validado, manda respuesta con el mensaje correspondiente
    const { role } = req.params;
    if (role === "admin") {
      res.json({ message: "Acceso autorizado para el rol de administrador" });
    } else if (role === "user") {
      res.json({ message: "Acceso autorizado para el rol de usuario" });
    }
  }
);

module.exports = router;
