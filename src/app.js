const express = require("express");
const multer = require("multer");
const HummusRecipe = require("hummus-recipe");
const archiver = require("archiver");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3333;

app.use("/css", express.static(__dirname));
app.use("/bootstrap", express.static(path.resolve(__dirname, "..", "node_modules", "bootstrap", "dist", "css")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/repository");
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

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/upload", cpUpload, async (request, response) => {
  // Criando o parce do csv
  let data = fs
    .readFileSync("./src/repository/csv.csv")
    .toString()
    .split("\n")
    .map((e) => e.trim())
    .map((e) => e.split(",").map((e) => e.trim()));

  const datapop = data.pop();
  // Separando o pdf
  const pdfDoc = new HummusRecipe("./src/repository/pdf.pdf");
  const outputDir = "./src/resolve";
  pdfDoc.split(outputDir, "pdf").endPDF();
  // Renomeando os pdf
  for (let i = 0; i < data.length; i++) {
    if (!fs.existsSync(`./src/resolve/${data[i][1]}`)) {
      fs.mkdirSync(`./src/resolve/${data[i][1]}`);
    }
  }
  for (let i = 0; i < data.length; i++) {
    let soma = i + 1;
    fs.renameSync(
      `./src/resolve/pdf-${soma}.pdf`,
      `./src/resolve/${data[i][1]}/${data[i][0]}.pdf`
    );
  }
  // Zipar
  const output = fs.createWriteStream("./src/resolve/target.zip");
  const archive = archiver("zip");

  archive.pipe(output);
  archive.directory("./src/resolve/", false);
  archive.finalize();
  archive.pipe(response);

  fs.unlink("./src/repository/")
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});