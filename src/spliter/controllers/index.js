const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const paths = require("../../../config/paths");
const csv = require("../utils/csv");
const pdf = require("../utils/pdf");
const files = require("../utils/files");
const middleware = require("../middlewares/index");

exports.get = (request, response, next) => {
  response.sendFile(path.resolve(paths.public, "index.html"));
};

exports.post = (request, response, next) => {
  // Criando o parce do csv
  const data = csv.read();
  // Separando o pdf
  pdf.split();
  // Renomeando os pdf
  pdf.distribute(data);
  // Zipar
  const output = fs.createWriteStream(
    path.resolve(paths.resolve, "target.zip")
  );

  const archive = archiver("zip");

  archive.pipe(output);
  archive.directory(paths.resolve, false);
  archive.finalize();
  archive.pipe(response);

  files.cleanDir();
};

exports.delete = (request, response, next) => {
  if (fs.existsSync(paths.repository)) {
    fs.rmdirSync(paths.repository, { recursive: true });
  }

  if (fs.existsSync(paths.resolve)) {
    fs.rmdirSync(paths.resolve, { recursive: true });
  }

  response.send();
};
