const fs = require("fs");
const paths = require("../../../config/paths");

exports.createDir = () => {
  if (!fs.existsSync(paths.repository)) {
    fs.mkdirSync(paths.repository);
  }

  if (!fs.existsSync(paths.resolve)) {
    fs.mkdirSync(paths.resolve);
  }
};

exports.cleanDir = () => {
  setTimeout(() => {
    if (fs.existsSync(paths.repository)) {
      fs.rmdirSync(paths.repository, { recursive: true });
    }

    if (fs.existsSync(paths.resolve)) {
      fs.rmdirSync(paths.resolve, { recursive: true });
    }
  }, 1000);
};
