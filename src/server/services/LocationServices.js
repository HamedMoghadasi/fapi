import database from "../api/models";
import dotenv from "dotenv";

const { Op } = require("sequelize");

dotenv.config();
const url = process.env.HOST_URL;

export default class LocationService {
  static async getAll() {
    try {
      let locations = await database.Locations.findAll({});

      return locations;
    } catch (error) {
      throw error;
    }
  }
  static async find(searchedPhrase) {
    console.log("searchedPhrase", searchedPhrase);

    try {
      const locations = await database.Locations.findAll({
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

      return locations;
    } catch (error) {
      throw error;
    }
  }

  static async add(newLocation) {
    try {
      return database.Locations.create(newLocation).catch((error) => {
        throw error;
      });
    } catch (error) {
      throw error.detail;
    }
  }
  static async update(id, updatedLocation) {
    try {
      const LocationToUpdate = await database.Locations.findOne({
        where: { id: Number(id) },
      });
      if (LocationToUpdate) {
        await database.Locations.update(updatedLocation, {
          where: { id: Number(id) },
        });

        return updatedLocation;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      const LocationToDelete = await database.Locations.findOne({
        where: { id: Number(id) },
      });

      if (LocationToDelete) {
        const deletedLocation = await database.Locations.destroy({
          where: { id: Number(id) },
        });
        return deletedLocation;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
