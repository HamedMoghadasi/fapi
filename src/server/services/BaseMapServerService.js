import database from "../api/models";
import dotenv from "dotenv";

const { Op } = require("sequelize");

dotenv.config();
const url = process.env.HOST_URL;

export default class BaseMapServerService {
  static async getAll() {
    try {
      let baseMapServer = await database.BaseMapServer.findAll({});

      return baseMapServer;
    } catch (error) {
      throw error;
    }
  }
  static async find(searchedPhrase) {
    console.log("searchedPhrase", searchedPhrase);

    try {
      const baseMapServer = await database.BaseMapServer.findAll({
        where: {
          [Op.or]: {
            Name: {
              [Op.like]: "%" + searchedPhrase + "%",
            },
            KeyWords: {
              [Op.like]: "%" + searchedPhrase + "%",
            },
          },
        },
      });

      return baseMapServer;
    } catch (error) {
      throw error;
    }
  }

  static async add(newBaseMapServer) {
    try {
      return database.BaseMapServer.create(newBaseMapServer).catch((error) => {
        throw error;
      });
    } catch (error) {
      throw error.detail;
    }
  }
  static async update(id, updatedBaseMapServer) {
    try {
      const BaseMapServerToUpdate = await database.BaseMapServer.findOne({
        where: { id: Number(id) },
      });
      if (BaseMapServerToUpdate) {
        await database.BaseMapServer.update(updatedBaseMapServer, {
          where: { id: Number(id) },
        });

        return updatedBaseMapServer;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      const BaseMapServerToDelete = await database.BaseMapServer.findOne({
        where: { id: Number(id) },
      });

      if (BaseMapServerToDelete) {
        const deletedBaseMapServer = await database.BaseMapServer.destroy({
          where: { id: Number(id) },
        });
        return deletedBaseMapServer;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
