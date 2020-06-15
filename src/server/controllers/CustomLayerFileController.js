import Util from "../utils/Utils";
import dotenv from "dotenv";
import CustomLayerFileService from "../services/CustomLayerFileService";

dotenv.config();

const util = new Util();

class CustomLayerFileController {
  static async getAll(req, res) {
    try {
      let customLayerFiles;

      customLayerFiles = await CustomLayerFileService.getAll();

      if (customLayerFiles.length > 0) {
        customLayerFiles = customLayerFiles.map((item) => {
          item.fileName = `${process.env.HOST_URL}/static/customVectorFiles/${item.fileName}`;
          return item;
        });
        util.setSuccess(
          200,
          `customLayerFiles retrieved successfully`,
          customLayerFiles
        );
      } else {
        util.setSuccess(200, `No customLayerFiles found.`);
      }
      return util.send(res);
    } catch (error) {
      console.error(error);

      util.setError(400, error);
      return util.send(res);
    }
  }

  static async find(req, res) {
    try {
      const searchedPhrase = req.body.searchedPhrase;

      if (searchedPhrase) {
        var result = await CustomLayerFileService.find(searchedPhrase);
        if (result.length) {
          util.setSuccess(200, "Successfully fetched.", result);
          return util.send(res);
        } else {
          util.setSuccess(200, "No CustomLayerFile found.");
          return util.send(res);
        }
      } else {
        util.setError(400, "searched phrase is not valid");
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async add(req, res) {
    try {
      const newCustomLayerFile = req.body;
      console.log("newCustomLayerFile :>> ", newCustomLayerFile);

      if (
        !newCustomLayerFile.name ||
        !newCustomLayerFile.description ||
        !req.file
      ) {
        util.setError(400, "Please provide complete details.");
        return util.send(res);
      } else {
        newCustomLayerFile.fileName = req.file.filename;
        var result = await CustomLayerFileService.add(newCustomLayerFile);
        result.fileName = `${process.env.HOST_URL}/static/customVectorFiles/${result.fileName}`;
        if (result) {
          util.setSuccess(200, "Successfully Added.", result);
          return util.send(res);
        } else {
          util.setError(500, "An internal error occured!");
          return util.send(res);
        }
      }
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async update(req, res) {
    const newupdatedCustomLayerFile = req.body;
    console.log("newupdatedCustomLayerFile :>> ", newupdatedCustomLayerFile);
    if (req.file) {
      newupdatedCustomLayerFile.fileName = req.file.filename;
    }

    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updatedCustomLayerFileResult = await CustomLayerFileService.update(
        id,
        newupdatedCustomLayerFile
      );
      if (updatedCustomLayerFileResult.fileName) {
        updatedCustomLayerFileResult.fileName = `${process.env.HOST_URL}/static/customVectorFiles/${updatedCustomLayerFileResult.fileName}`;
      }

      if (!updatedCustomLayerFileResult) {
        util.setError(400, `Cannot find customLayerFile with the id: ${id}`);
      } else {
        util.setSuccess(
          200,
          "CustomLayerFile updated",
          updatedCustomLayerFileResult
        );
      }
      return util.send(res);
    } catch (error) {
      console.log(error);

      util.setError(500, "An Internal error occured");
      return util.send(res);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const deletedCustomLayerFileResult = await CustomLayerFileService.delete(
        id
      );

      if (!deletedCustomLayerFileResult) {
        util.setError(400, `Cannot find customLayerFile with the id: ${id}`);
      } else {
        util.setSuccess(200, "CustomLayerFile deleted");
      }
      return util.send(res);
    } catch (error) {
      console.log(error);

      util.setError(500, "An Internal error occured");
      return util.send(res);
    }
  }
}
export default CustomLayerFileController;
