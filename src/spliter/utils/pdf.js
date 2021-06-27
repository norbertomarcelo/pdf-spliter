const path = require("path");
const fs = require("fs");
const HummusRecipe = require("hummus-recipe");

const paths = require("../../../config/paths");

exports.split = () => {
  const pdfDoc = new HummusRecipe(path.resolve(paths.repository, "pdf.pdf"));

  pdfDoc.split(paths.repository, "pdf").endPDF();
};

exports.distribute = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (!fs.existsSync(path.resolve(paths.resolve, `${data[i][1]}`))) {
      fs.mkdirSync(path.resolve(paths.resolve, `${data[i][1]}`));
    }
  }

  for (let i = 0; i < data.length; i++) {
    let soma = i + 1;
    fs.renameSync(
      path.resolve(paths.repository, `pdf-${soma}.pdf`),
      path.resolve(paths.resolve, `${data[i][1]}/${data[i][0]}.pdf`)
    );
  }
};
