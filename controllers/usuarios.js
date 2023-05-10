
//const Usuarios = require("../classes/users.js");
//const user = new Usuarios("./db/user.txt");
const { userDao } = require("../repository/Factory.js");


async function listAll() {
    const resultado = await userDao.getAll();
    return res.send(resultado);
}

async function listById(id) {
    const resultado = await userDao.getById(id);
    return resultado;
}

async function createUser(user) {
    const resultado = await userDao.save(user);
    return resultado;
}


async function deleteUser(user) {
    const resultado = await userDao.deleteById(user);
    return resultado;
}

async function findUserById(id) {
    const resultado = await userDao.findById(id)
    return resultado
  }

function login(req, res) {
    const resultado = user.userLogged(req.body)
    return resultado
}

module.exports = { listAll, listById, createUser, deleteUser, login,findUserById }