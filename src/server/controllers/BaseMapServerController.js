import Util from "../utils/Utils";
import dotenv from "dotenv";
import BaseMapServerService from "../services/BaseMapServerService";

dotenv.config();

const util = new Util();

class BaseMapServerController {
  static async getAll(req, res) {
    try {
      let baseMapServers;

      baseMapServers = await BaseMapServerService.getAll();

      if (baseMapServers.length > 0) {
        baseMapServers = baseMapServers.map((item) => {
          item.imageName = `${process.env.HOST_URL}/static/images/baselayers/${item.imageName}`;
          return item;
        });
        util.setSuccess(
          200,
          `baseMapServers retrieved successfully`,
          baseMapServers
        );
      } else {
        util.setSuccess(200, `No baseMapServers found.`);
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
        var result = await BaseMapServerService.find(searchedPhrase);
        if (result.length) {
          util.setSuccess(200, "Successfully fetched.", result);
          return util.send(res);
        } else {
          util.setSuccess(200, "No BaseMapServer found.");
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
      const newBaseMapServer = req.body;

      if (
        !newBaseMapServer.url ||
        !newBaseMapServer.name ||
        !newBaseMapServer.description ||
        !req.file
      ) {
        util.setError(400, "Please provide complete details.");
        return util.send(res);
      } else {
        newBaseMapServer.imageName = req.file.filename;
        var result = await BaseMapServerService.add(newBaseMapServer);
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
    const newupdatedBaseMapServer = req.body;
    if (req.file) {
      newupdatedBaseMapServer.imageName = req.file.filename;
    }

    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updatedBaseMapServerResult = await BaseMapServerService.update(
        id,
        newupdatedBaseMapServer
      );

      if (!updatedBaseMapServerResult) {
        util.setError(400, `Cannot find baseMapServer with the id: ${id}`);
      } else {
        util.setSuccess(
          200,
          "BaseMapServer updated",
          updatedBaseMapServerResult
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
      const deletedBaseMapServerResult = await BaseMapServerService.delete(id);

      if (!deletedBaseMapServerResult) {
        util.setError(400, `Cannot find baseMapServer with the id: ${id}`);
      } else {
        util.setSuccess(200, "BaseMapServer deleted");
      }
      return util.send(res);
    } catch (error) {
      console.log(error);

      util.setError(500, "An Internal error occured");
      return util.send(res);
    }
  }
}
export default BaseMapServerController;
