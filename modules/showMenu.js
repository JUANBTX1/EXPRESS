const readlineSync = require("readline-sync");
const addTaskModule = require("./addTask");
const deleteTaskModule = require("./deleteTask");
const completeTaskModule = require("./completeTask");

async function showMenu() {
  console.log("\nMENU:");
  console.log("1. Añadir tarea");
  console.log("2. Eliminar tarea");
  console.log("3. Completar tarea");
  console.log("4. Salir");

  const option = readlineSync.question("Seleccione una opción: ");

  switch (option) {
    case "1":
      try {
        await addTaskModule.addTask();
      } catch (error) {
        console.error("Error:", error.message);
      }
      break;
    case "2":
      await deleteTaskModule.deleteTask(addTaskModule.tasks);
      break;
    case "3":
      await completeTaskModule.completeTask(addTaskModule.tasks);
      break;
    case "4":
      console.log("Saliendo del programa.");
      return;
    default:
      console.log("Opción inválida.");
      break;
  }

  showMenu();
}

module.exports = {
  showMenu,
};
