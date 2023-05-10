const Product = require("../models/product.js");
const User = require("../models/user.js");
const bcript = require("bcryptjs");

const root = {
  async getProducts() {
    return await Product.find();
  },

  async getUsers() {
    return await User.find();
  },

  async getProduct(data) {
    const result = await Product.find({ id: data.id });
    return result[0];
  },

  async getUser(data) {
    const result = await User.find({ id: data.id });
    return result[0];
  },

  async createProduct(product) {
    const data = await Product.find({});
    const ids = data.map((producto) => producto.id);
    const idMaximo = Math.max(...ids);
    const createdProduct = new Product({
      nombre: product.nombre,
      precio: product.precio,
      thumbnail: product.thumbnail,
      timestamp: Date.now(),
    });
    if (idMaximo == -Infinity) {
      createdProduct.id = 1;
    } else {
      createdProduct.id = idMaximo + 1;
    }
    const res = await createdProduct.save(); 
    return {
      id: res.id,
      ...res._doc,
    };
  },

  async createUser(user) {
    const findUser = await User.findOne({ email: user.email });
    if (findUser) {
      console.log("Ya existe un usuario con ese email");
      return null;
    } else {
      const data = await User.find({});
      const ids = data.map((usuario) => usuario.id);
      const idMaximo = Math.max(...ids);
      const encPass = await bcript.hash(user.password, 10);
      var createdUser = new User({
        email: user.email,
        password: encPass,
      });
      if (idMaximo == -Infinity) {
        createdUser.id = 1;
      } else {
        createdUser.id = idMaximo + 1;
      }
      const res = await createdUser.save(); 
      return {
        id: res.id,
        ...res._doc,
      };
    }
  },

  async deleteProduct(data) {
    const eliminado = (await Product.deleteOne({ id: data.id })).deletedCount;
    return eliminado; 
  },

  async editProduct(data) {
    const modifiedProduct = {
      nombre: data.productInput.nombre,
      precio: data.productInput.precio,
      thumbnail: data.productInput.thumbnail,
    };
    const editado = (await Product.updateOne({ id: data.id }, modifiedProduct))
      .modifiedCount;
    return editado; 
  },
};

module.exports = { root };
