// Importa la funcion showTasks
const { showTasks } = require("./showTasks");

function completeTask(tasks) {
  return new Promise((resolve) => {
    // verifica si no hay tareas disponibles
    if (tasks.length === 0) {
      console.log("No hay tareas para completar.");
      resolve();
      return;
    }

    // Llama a la funcion showTasks para mostrar las tareas y obtener la tarea seleccionada
    const taskIndex = showTasks(tasks, "Seleccione la tarea a completar:");

    // verifica si el usuario canceló la seleccion
    if (taskIndex === -1) {
      console.log("Cancelado.");
      resolve();
      return;
    }

    // Cambia el estado de completado de la tarea seleccionada
    tasks[taskIndex].completed = !tasks[taskIndex].completed;

    // Muestra un mensaje de acuerdo al estado actualizado de la tarea
    if (tasks[taskIndex].completed) {
      console.log("Tarea completada correctamente.");
    } else {
      console.log("Tarea marcada como incompleta.");
    }
    resolve();
  });
}

module.exports = {
  completeTask,
};
