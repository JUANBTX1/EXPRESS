const { showTasks } = require("./showTasks");

function deleteTask(tasks) {
  return new Promise((resolve) => {
    if (tasks.length === 0) {
      console.log("No hay tareas para eliminar.");
      resolve();
      return;
    }

    // Llama a la función showTasks para mostrar las tareas y obtener la tarea seleccionada
    const taskIndex = showTasks(tasks, "Seleccione la tarea a eliminar:");

    // verifica si el usuario canceló la selección
    if (taskIndex === -1) {
      console.log("Cancelado.");
      resolve();
      return;
    }

    tasks.splice(taskIndex, 1); // Elimina la tarea seleccionada del arreglo de tareas
    console.log("Tarea eliminada correctamente.");
    resolve();
  });
}

module.exports = {
  deleteTask,
};
