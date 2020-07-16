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
  all = _.sortBy(all, (item) => item.timespan);
  console.log("all :>> ", all);

  var greater = all.filter((item) => item.timespan >= target);
  console.log("greater :>> ", greater);
  var less = all.filter((item) => item.timespan <= target);
  console.log("less :>> ", less);
  var result = less[less.length - 1];

  if (!greater.length || !less.length) {
    console.log("no data");
    return -1;
  } else {
    return result;
  }
}

export const getTimeDirectoriesByParams = async (
  parameter,
  location,
  satellite
) => {
  var directories = await HeatMapServerController.__findAllByParams(
    parameter,
    location,
    satellite
  );
  return directories;
};

export const generateUrl = async (timestamp, params) => {
  var all = await getTimeDirectoriesByParams(
    params.parameter,
    params.location,
    params.satellite
  );

  var timeNode = findTimeNode(all, timestamp);

  let url = "";
  if (timeNode) {
    console.log("--- timeNode :>> ", timeNode);
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
  return url;
};

export const init = async () => {
  setInterval(() => {
    adresses.forEach((adress) => {
      getTimeDirectories(adress.base, adress.params);
    });
  }, 5000);
};
