const fs = require("fs");

class All {
  constructor() {
    this.all = [];
  }
  list() {
    return this.all;
  }
  add(prueba) {
    let todo = {
      prueba: prueba,
      complete: false,
    };
    this.all.push(todo);
  }
  complete(prueba) {
    if (this.all.length === 0) {
      throw new Error("No hay tareas");
    }

    let todoFound = false;
    this.all.forEach((todo) => {
      if (todo.prueba === prueba) {
        todo.complete = true;
        todoFound = true;
        return;
      }
    });
    if (!todoFound) {
      throw new Error("Tarea no encontrada");
    }
  }
  async saveToFileCb(cb) {
    let fileContents = "";
    this.all.forEach((todo) => {
      fileContents += `${todo.title}, ${todo.complete}`;
    });
    fs.promises.writeFile("all.txt", fileContents, cb);
  }

  async saveToFilePromise() {
    let fileContents = "";
    this.all.forEach((todo) => {
      fileContents += `${todo.title}, ${todo.complete}`;
    });
    return fs.promises.writeFile("all.txt", fileContents);
  }
}

module.exports = All;