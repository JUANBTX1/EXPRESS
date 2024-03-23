const { tasks } = require("./modules/addTask");
const express = require("express");
const app = express();

const port = 3000;

// Responder a peticiones GET
app.get("/showTasks", (req, res) => {
  res.status(200).json(tasks);
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
