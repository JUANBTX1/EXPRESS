const readlineSync = require("readline-sync");

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

function addTask() {
  return new Promise((resolve, reject) => {
    const description = readlineSync.question("Descripción de la tarea: ");

    // Validación de la descripción de la tarea
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
