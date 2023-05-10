const userModel = require("../models/user.js");
const bcript = require("bcryptjs");
const { connectDB } = require("../config.js");
const logger = require("../logger.js");
module.exports = class UserHandler {
  constructor(url) {
    this.url = url;
  }

  async getAll() {
    try {
      connectDB();
      const data = await userModel.find({});
      return data;
    } catch (error) {
      logger.error(error);
    }
  }

  async saveUser(user) {
    connectDB();
    const findUser = await this.findUserByMail(user.email);
    if (findUser) {
      console.log("ya existe un usuario con ese nombre");
      return null;
    } else {
      var newUser = new userModel();
      newUser.id = await this.getHighestId();
      newUser.email = user.email;
      const encPass = await bcript.hash(user.password, 10);
      newUser.password = encPass;
      newUser.save((err) => {
        if (err) {
          logger.error(err);
        }
      });
    }
  }

  async findUserByMail(email) {
    connectDB();
    const response = await userModel.findOne({ email: email });
    return response;
  }

  async findUserById(id) {
    connectDB();
    const response = await userModel.findOne({ id: id });
    return response;
  }

  async getHighestId() {
    connectDB();
    const data = await userModel.find({}, { id: 1, _id: 0 });
    if (data.length == 0) {
      return 1;
    } else {
      const highest = Math.max(...data.map((o) => o.id));
      const result = highest + 1;
      return result;
    }
  }
};