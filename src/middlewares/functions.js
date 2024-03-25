const jwt = require("jsonwebtoken");

// valida el metodo HTTP de la solicitud.
const Middleware = (req, res, next) => {
  const metodo = req.method;

  if (
    metodo == "POST" ||
    metodo == "GET" ||
    metodo == "PUT" ||
    metodo == "DELETE"
  ) {
    next(); //next para continuar
  } else {
    res.status(405).send("Método inválido"); // fin de la solicitud
  }
};

// valida si el cuerpo de la solicitud no esta vacío
function validateBody(req, res, next) {
  if (Object.values(req.body).length === 0) {
    res.status(400).send("Es requirido un body");
  } else {
    next();
  }
}

// valida la info de una tarea en la solicitud
function validateInfo(req, res, next) {
  const { description, completed } = req.body;
  if (!description || typeof description !== "string") {
    return res
      .status(400)
      .json({ error: "La descripción de la tarea es inválida o faltante." });
  } else if (typeof completed !== "boolean" && completed !== undefined) {
    return res
      .status(400)
      .json({ error: "El campo 'completed' debe ser true o false." });
  } else {
    next();
  }
}

// valida el param 'status' en una solicitud.
function validateStatusParam(req, res, next) {
  const { status } = req.params;
  if (status && status !== "completed" && status !== "incomplete") {
    return res.status(400).json({ error: "Parámetro 'status' inválido." });
  }
  next();
}

// Middleware de autenticación para verificar y decodificar un token

function authMiddleware(req, res, next) {
  // Obtenemos el secreto de los variables de entorno
  const secret = process.env.SECRET_KEY;
  // Verificar si se envió el token JWT en la cabecera de autorización
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No se proporcionó un token de autorización" });
  }

  // Extraer el token JWT de la cabecera de autorización

  const token = authHeader.split(" ")[1];

  try {
    // Verificar y decodificar el token JWT
    const decodedToken = jwt.verify(token, secret);

    // verificar la expiracion
    if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ message: "Token expirado" });
    }

    // Agregar el objeto decodificado del token JWT al objeto de solicitud

    req.user = decodedToken;

    // Continuar con la solicitud

    next();
  } catch (err) {
    // Enviar respuesta de error si el token es inválido

    return res.status(401).json({ message: "Token de autorización inválido" });
  }
}

// Middleware de validación de roles

function roleMiddleware(roles) {
  return (req, res, next) => {
    // Verificar si el usuario está autenticado y tiene un rol
    if (!req.user || !req.user.rol) {
      return res.status(401).json({
        message: "Acceso no autorizado: usuario no autenticado o sin rol",
      });
    }

    // Verificar si el usuario tiene el rol requerido
    if (!roles.includes(req.user.rol)) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: se requiere un rol válido" });
    }

    // Continuar con la solicitud
    next();
  };
}

module.exports = {
  Middleware,
  validateBody,
  validateInfo,
  validateStatusParam,
  authMiddleware,
  roleMiddleware,
};
