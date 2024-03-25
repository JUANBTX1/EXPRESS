const express = require("express");
const router = express.Router();
const { tasks } = require("../../modules/addTask");

// ruta para visualizar todas las tareas o filtrar por completas/incompletas
router.get("/tasks/:statusOrId?", (req, res) => {
  const { statusOrId } = req.params;

  // Intentar convertir el parámetro en un número para verificar si es un ID
  const taskId = parseInt(statusOrId);

  if (!isNaN(taskId)) {
    // Si es un número válido, buscar la tarea por su ID
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Tarea no encontrada." });
    }
  } else if (statusOrId === "completed") {
    const completedTasks = tasks.filter((task) => task.completed);
    res.status(200).json(completedTasks);
  } else if (statusOrId === "incomplete") {
    const incompleteTasks = tasks.filter((task) => !task.completed);
    res.status(200).json(incompleteTasks);
  } else if (statusOrId !== undefined) {
    // si se proporciona un parametro invalido, responde con un error
    res.status(400).json({ error: "Parámetro inválido." });
  } else {
    // si no se proporciona ningun parametro, muestra todas las tareas
    res.status(200).json(tasks);
  }
});

module.exports = router;
