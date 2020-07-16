import Util from "../utils/Utils";
import dotenv from "dotenv";
import HeatMapServerService from "../services/HeatMapServerService";

dotenv.config();

const util = new Util();

class HeatMapServerController {
  static async getAll(req, res) {
    try {
      let heatMapServers;

      heatMapServers = await HeatMapServerService.getAll();

      if (heatMapServers.length > 0) {
        util.setSuccess(
          200,
          `heatMapServers retrieved successfully`,
          heatMapServers
        );
      } else {
        util.setSuccess(200, `No heatMapServers found.`);
      }
      return util.send(res);
    } catch (error) {
      console.error(error);

      util.setError(400, error);
      return util.send(res);
    }
  }

  static async findAllByKey(req, res) {
    try {
      const key = req.body.key;

      if (key) {
        var result = await HeatMapServerService.findAllByKey(key);
        if (result.length) {
          util.setSuccess(200, "Successfully fetched.", result);
          return util.send(res);
        } else {
          util.setSuccess(200, "No HeatMapServers found.");
          return util.send(res);
        }
      } else {
        util.setError(400, "key is not valid");
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async findAllByParams(req, res) {
    try {
      const parameter = req.body.parameter;
      const location = req.body.location;
      const satelite = req.body.satelite;

      let isValid = parameter && location && (satelite || satelite === "");

      if (isValid) {
        var result = await HeatMapServerService.findAllByParams(
          parameter,
          location,
          satelite
        );
        if (result.length) {
          util.setSuccess(200, "Successfully fetched.", result);
          return util.send(res);
        } else {
          util.setSuccess(200, "No HeatMapServers found.");
          return util.send(res);
        }
      } else {
        util.setError(400, "params are not valid");
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async __add(heatmapServerObject) {
    try {
      var isSatelliteValid =
        heatmapServerObject.satellite || heatmapServerObject.satellite === "";
      if (
        !heatmapServerObject.key ||
        !heatmapServerObject.parameter ||
        !heatmapServerObject.location ||
        !isSatelliteValid ||
        !heatmapServerObject.timespan
      ) {
        result - 400;
      } else {
        var result = await HeatMapServerService.add(heatmapServerObject);
        if (result) {
          return result;
        } else {
          return -500;
        }
      }
    } catch (error) {
      return -400;
    }
  }

  static async add(req, res) {
    try {
      const newHeatMapServer = req.body;
      console.log(newHeatMapServer);

      if (
        !newHeatMapServer.key ||
        !newHeatMapServer.parameter ||
        !newHeatMapServer.location ||
        !newHeatMapServer.satellite ||
        newHeatMapServer.satellite !== "" ||
        !newHeatMapServer.timespan
      ) {
        util.setError(400, "Please provide complete details.");
        return util.send(res);
      } else {
        var result = await HeatMapServerService.add(newHeatMapServer);
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
    const newupdatedHeatMapServer = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updatedLocationResult = await HeatMapServerService.update(
        id,
        newupdatedHeatMapServer
      );

      if (!updatedLocationResult) {
        util.setError(400, `Cannot find heatMapServer with the id: ${id}`);
      } else {
        util.setSuccess(200, "heatMapServer updated", updatedLocationResult);
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
      const deletedHeatMapServerResult = await HeatMapServerService.delete(id);

      if (!deletedHeatMapServerResult) {
        util.setError(400, `Cannot find heatMapServer with the id: ${id}`);
      } else {
        util.setSuccess(200, "HeatMapServer deleted");
      }
      return util.send(res);
    } catch (error) {
      console.log(error);

      util.setError(500, "An Internal error occured");
      return util.send(res);
    }
  }
}
export default HeatMapServerController;
