import Util from "../utils/Utils";
import dotenv from "dotenv";
import LocationService from "../services/locationServices";

dotenv.config();

const util = new Util();

class LocationController {
  static async getAll(req, res) {
    try {
      let locations;

      locations = await LocationService.getAll();

      if (locations.length > 0) {
        util.setSuccess(200, `locations retrieved successfully`, locations);
      } else {
        util.setSuccess(200, `No locations found.`);
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
        var result = await LocationService.find(searchedPhrase);
        if (result.length) {
          util.setSuccess(200, "Successfully fetched.", result);
          return util.send(res);
        } else {
          util.setSuccess(200, "No Location found.");
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
      const newLocation = req.body;
      console.log(newLocation);

      if (
        !newLocation.Name ||
        !newLocation.KeyWords ||
        !newLocation.lat ||
        !newLocation.lon
      ) {
        util.setError(400, "Please provide complete details.");
        return util.send(res);
      } else {
        var result = await LocationService.add(newLocation);
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
    const newupdatedLocation = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updatedLocationResult = await LocationService.update(
        id,
        newupdatedLocation
      );

      if (!updatedLocationResult) {
        util.setError(400, `Cannot find location with the id: ${id}`);
      } else {
        util.setSuccess(200, "Location updated", updatedLocationResult);
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
      const deletedLocationResult = await LocationService.delete(id);

      if (!deletedLocationResult) {
        util.setError(400, `Cannot find location with the id: ${id}`);
      } else {
        util.setSuccess(200, "Location deleted");
      }
      return util.send(res);
    } catch (error) {
      console.log(error);

      util.setError(500, "An Internal error occured");
      return util.send(res);
    }
  }
}
export default LocationController;
