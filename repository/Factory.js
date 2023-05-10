
const UsuariosMongo = require("./userRepository.js");
const Singleton = require("../utils/singleton.js");
const ProductosDao = require("../DAO/productDAO.js");
const producto = require("../models/product.js");
const ProductsDTO = require("../dtos/product.js");
const MensajesDao = require("../DAO/chatDAO.js");
const MensajesDTO = require("../dtos/chat.js");

function factoryRepository(extention) {
  this.createRepository = function () {
    console.log(Singleton.getInstance());
    if (extention) {
      return new Repository(producto, ProductsDTO);
    } else if (!extention) {
      return new Repository(null, MensajesDTO);
    }
  };
  class Repository extends (extention ? ProductosDao : MensajesDao) {
    constructor(schema, DTO) {
      super(schema);
      this.DTO = DTO;
    }
    async listAll() {
      const data = await this.getAll();
      const dtoResponse = new this.DTO(data);
      return dtoResponse.readData();
    }

    async listById(id) {
      const data = await this.getById(id);
      const dtoResponse = new this.DTO(data);
      return dtoResponse.readSingleProduct();
    }

    async save(payload) {
      const data = await this.saveItem(payload);
      return data;
    }

    async modify(payload, id) {
      const data = await this.updateItem(payload, id);
      return data;
    }

    async delete(id) {
      const data = await this.deleteById(id);
      return data;
    }
  }
}

var productDao = new factoryRepository(true).createRepository();
var chatDao = new factoryRepository(false).createRepository();
var userDao = new UsuariosMongo();

module.exports = { productDao, userDao, chatDao};
