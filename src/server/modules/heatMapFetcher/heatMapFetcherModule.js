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
  all = _.sortBy(all, (item) => item.time);

  var greater = all.filter((item) => item.time >= target);
  var less = all.filter((item) => item.time <= target);
  var result = less[less.length - 1];

  if (!greater.length || !less.length) {
    console.log("no data");
    return -1;
  } else {
    return result;
  }
}

export const generateUrl = (timestamp, basePath, params) => {
  var timeNode = findTimeNode(getTimeDirectories(basePath, params), timestamp);
  let url = "";
  if (timeNode) {
    if (timeNode.name && timeNode.location && timeNode.satellite) {
      url = `${timeNode.name}/${timeNode.location}/${timeNode.satellite}/${timeNode.time}`;
    } else if (timeNode.name && timeNode.location && !timeNode.satellite) {
      url = `${timeNode.name}/${timeNode.location}/${timeNode.time}`;
    } else {
      return -1;
    }
  }
  return url;
};

export const init = () => {
  setInterval(() => {
    adresses.forEach((adress) => {
      getTimeDirectories(adress.base, adress.params);
    });
  }, 5000);
};
