const fs = require("fs");
const paths = require("../../../config/paths");
const files = require("../utils/files");

exports.createDir = (req, res, next) => {
  files.createDir();

  next();
};
