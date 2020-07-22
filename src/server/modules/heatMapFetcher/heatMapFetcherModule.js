import fs from "fs";
import _ from "lodash";
import HeatMapServerController from "../../controllers/HeatMapServerController";
import { adresses } from "./addresses";

export const getTimeDirectories = (basePath, params) => {
  let path = basePath;
  params.map((param) => {
    path = `${path}/${param}`;
  });
  var directories = fs
    .readdirSync(path)
    .filter(function (file) {
      return fs.statSync(path + "/" + file).isDirectory();
    })
    .filter((directory) => Number(directory[0]));

  let key = "";
  params.map((param) => {
    key = key.length > 0 ? `${key}_${param}` : `${param}`;
  });

  var result = directories.map((directory) => {
    return {
      key: `${key}_${directory}`,
      parameter: params[0] ? params[0] : "",
      location: params[1] ? params[1] : "",
      satellite: params[2] ? params[2] : "",
      timespan: directory,
    };
  });
  result.map((item) => {
    HeatMapServerController.__add(item);
  });

  return result;
};

function findTimeNode(all, target) {
  var result = all.filter((item) => item.timespan === `${target}`);
  if (!result.length) {
    console.log("no data");
    return -1;
  } else {
    return result[0];
  }
}

export const getTimeDirectoryByParamsAndTimespanRange = async (
  parameter,
  location,
  satellite,
  timestamps
) => {
  var directories = await HeatMapServerController.__findOneByParamsAndTimespanRange(
    parameter,
    location,
    satellite,
    timestamps
  );
  return directories;
};

export const generateUrl = async (timestamps, params) => {
  var timeNode = await getTimeDirectoryByParamsAndTimespanRange(
    params.parameter,
    params.location,
    params.satellite,
    timestamps
  );
  timeNode = timeNode[0];

  let url = "";

  if (timeNode) {
    if (
      timeNode.parameter &&
      timeNode.location &&
      timeNode.satellite &&
      timeNode.timespan
    ) {
      url = `${timeNode.parameter}/${timeNode.location}/${timeNode.satellite}/${timeNode.timespan}`;
    } else if (
      timeNode.parameter &&
      timeNode.location &&
      !timeNode.satellite &&
      timeNode.timespan
    ) {
      url = `${timeNode.parameter}/${timeNode.location}/${timeNode.timespan}`;
    } else {
      return -1;
    }
  }
  console.log("url :>> ", url);
  return url;
};

export const init = async () => {
  setInterval(() => {
    adresses.forEach((adress) => {
      getTimeDirectories(adress.base, adress.params);
    });
  }, 600000);
};
