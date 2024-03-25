const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../users");

const secret = process.env.SECRET_KEY;

router.post("/", (req, res) => {
  const userReq = req.body.user;
  const passReq = req.body.password;

  // busca el user en el array
  const user = users.find(
    (user) => user.user === userReq && user.password === passReq
  );

  //validar si los datos corresponden
  if (user) {
    //Las credenciales son iguales
    //Creamos el payload
    const payload = {
      rol: user.rol,
    };

    //invocamos la libreria para crear el token
    const token = jwt.sign(payload, secret, { expiresIn: 15 * 60 });
    res.send({
      message: "Autenticación exitosa",
      token,
    });
  } else {
    res.status(403).send("No autorizado");
  }
});

module.exports = router;
