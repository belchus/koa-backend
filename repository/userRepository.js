const userHandler = require("../DAO/userDAO.js");
const usuario = require("../models/user.js");

module.exports = class UsuariosRepository extends userHandler {
  constructor() {
    super(usuario);
  }
  async listAll() {
    const data = await this.getAll();
    return data;
  }

  async save(user) {
    console.log(user);
    const data = await this.saveUser(user);
    return data;
  }

  async find(email) {
    const data = await this.findUserByMail(email);
    return data;
  }

  async findById(id) {
    const data = await this.findUserById(id);
    return data;
  }
};