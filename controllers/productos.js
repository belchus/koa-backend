const logger = require("../utils/logger.js");
//const {productDao} = require ('../DAO/DaoGeneral.js')
const {productDao} = require ('../repository/Factory.js')

async function listAll() {
    const resultado = await productDao.listAll();
    return resultado;
};

async function listAllProducts (req, res) {
    logger.info(`ruta: '${req.url}' - método: get peticionada`);
    const resultado = await productDao.listAll();
    return res.send(resultado);
};

async function listById(req, res) {
    let { id } = req.params;
    logger.info(`ruta: '${req.url}' - método: get peticionada`);
    const resultado = await productDao.listById(id);
    return res.send(resultado);
};

async function createProduct(req, res) {
    logger.info(`ruta: '${req.url}' - método: get peticionada`);
    const resultado = await productDao.save(req.body);
    return res.send(resultado);
};

async function modifyProduct(req, res) {
    const {id} = req.params
    logger.info(`ruta: '${req.url}' - método: put peticionada`);
    const resultado = await productDao.update(req.body, id);
    return res.send(resultado);
};

async function deleteProduct(req, res) {
    logger.info(`ruta: '${req.url}' - método: delete peticionada`);
    const resultado = await productDao.delete(req.params.id);
    return res.send(resultado);
}

async function randomize(cant) {
    if (isNaN(cant)) {
        const resultado = await productDao.random(5)
        return res.send(resultado);
    } else {
        const resultado = await productDao.random(cant)
        return  res.send(resultado);
    }

}
module.exports = { listAll, listAllProducts, listById, createProduct, modifyProduct, deleteProduct,randomize}