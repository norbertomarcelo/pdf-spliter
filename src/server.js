const express = require("express");
const multer = require("multer");
const fs = require("fs");
const paths = require("../config/paths");
const middleware = require("./spliter/middlewares/index");

const app = express();
const port = process.env.PORT || 3000;

app.use("/css", express.static(paths.public));
app.use("/bootstrap", express.static(paths.bootstrap));

app.use(require("./routes"));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
