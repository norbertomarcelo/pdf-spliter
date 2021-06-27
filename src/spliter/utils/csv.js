const path = require("path");
const fs = require("fs");

const paths = require("../../../config/paths");

exports.read = () => {
  const data = fs
    .readFileSync(path.resolve(paths.repository, "csv.csv"))
    .toString()
    .split("\n")
    .map((e) => e.trim())
    .map((e) => e.split(",").map((e) => e.trim()));

  if (data[data.length - 1][0] === "") {
    const datapop = data.pop();
  }

  return data;
};
