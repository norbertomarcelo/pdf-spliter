const routes = require("express").Router();
const multer = require("multer");
const path = require("path");

const controller = require("../spliter/controllers");
const middleware = require("../spliter/middlewares");
const paths = require("../../config/paths");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, paths.repository);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "." + file.fieldname);
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([
  { name: "pdf", maxCount: 1 },
  { name: "csv", maxCount: 1 },
]);

routes.get("/", controller.get);

routes.post("/upload", middleware.createDir, cpUpload, controller.post);

routes.delete("/upload", controller.delete);

module.exports = routes;
