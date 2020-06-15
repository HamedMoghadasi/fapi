import database from "../api/models";
import dotenv from "dotenv";

const { Op } = require("sequelize");

dotenv.config();
const url = process.env.HOST_URL;

export default class CustomVectorFileService {
  static async getAll() {
    try {
      let customVectorFile = await database.CustomVectorFile.findAll({});

      return customVectorFile;
    } catch (error) {
      throw error;
    }
  }
  static async find(searchedPhrase) {
    console.log("searchedPhrase", searchedPhrase);

    try {
      const customVectorFile = await database.CustomVectorFile.findAll({
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

      return customVectorFile;
    } catch (error) {
      throw error;
    }
  }
  static async add(newCustomVectorFile) {
    try {
      return database.CustomVectorFile.create(newCustomVectorFile).catch(
        (error) => {
          throw error;
        }
      );
    } catch (error) {
      throw error.detail;
    }
  }
  static async update(id, updatedCustomVectorFile) {
    try {
      const CustomVectorFileToUpdate = await database.CustomVectorFile.findOne({
        where: { id: Number(id) },
      });
      console.log("updatedCustomVectorFile :>> ", updatedCustomVectorFile);
      console.log("CustomVectorFileToUpdate :>> ", CustomVectorFileToUpdate);
      if (CustomVectorFileToUpdate) {
        await database.CustomVectorFile.update(updatedCustomVectorFile, {
          where: { id: Number(id) },
        });

        return updatedCustomVectorFile;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      const CustomVectorFileToDelete = await database.CustomVectorFile.findOne({
        where: { id: Number(id) },
      });

      if (CustomVectorFileToDelete) {
        const deletedCustomVectorFile = await database.CustomVectorFile.destroy(
          {
            where: { id: Number(id) },
          }
        );
        return deletedCustomVectorFile;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
