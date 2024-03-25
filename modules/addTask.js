const tasks = [
  {
    id: 1,
    completed: false,
    description: "Tarea de prueba 1",
  },
  {
    id: 2,
    completed: true,
    description: "Tarea de prueba 2",
  },
];

function addTask(description) {
  return new Promise((resolve, reject) => {
    // Validacion de la descripcion de la tarea
    if (!description.trim()) {
      reject(new Error("La descripción de la tarea no puede estar vacía."));
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      completed: false,
      description,
    };

    tasks.push(newTask);

    console.log("Tarea añadida correctamente.");

    resolve(newTask);
  });
}

module.exports = {
  addTask,
  tasks,
};
