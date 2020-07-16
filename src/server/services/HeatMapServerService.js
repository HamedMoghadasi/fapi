import database from "../api/models";
import dotenv from "dotenv";

const { Op } = require("sequelize");

dotenv.config();
const url = process.env.HOST_URL;

export default class HeatMapServerService {
  static async getAll() {
    try {
      let heatMapServers = await database.HeatMapServer.findAll({});

      return heatMapServers;
    } catch (error) {
      throw error;
    }
  }

  //AOT_world_nasa
  static async findAllByKey(Key) {
    try {
      const heatMapServers = await database.HeatMapServer.findAll({
        where: {
          [Op.or]: {
            key: {
              [Op.like]: "%" + Key + "%",
            },
          },
        },
      });

      return heatMapServers;
    } catch (error) {
      throw error;
    }
  }

  //AOT , world , nasa
  static async findAllByParams(parameter, location = "world", satellite = "") {
    try {
      const heatMapServers = await database.HeatMapServer.findAll({
        where: {
          [Op.and]: {
            parameter: parameter,
            location: location,
            satellite: satellite,
          },
        },
      });

      return heatMapServers;
    } catch (error) {
      throw error;
    }
  }

  static async add(newHeatMapServer) {
    try {
      return database.HeatMapServer.create(newHeatMapServer).catch((error) => {
        throw error;
      });
    } catch (error) {
      throw error.detail;
    }
  }

  static async update(id, updatedHeatMapServer) {
    try {
      const heatMapServerToUpdate = await database.HeatMapServer.findOne({
        where: { id: Number(id) },
      });
      if (heatMapServerToUpdate) {
        await database.HeatMapServer.update(updatedHeatMapServer, {
          where: { id: Number(id) },
        });

        return updatedHeatMapServer;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const heatMapServerToDelete = await database.HeatMapServer.findOne({
        where: { id: Number(id) },
      });

      if (heatMapServerToDelete) {
        const deletedHeatMapServer = await database.HeatMapServer.destroy({
          where: { id: Number(id) },
        });
        return deletedHeatMapServer;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
