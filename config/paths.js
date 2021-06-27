const path = require("path");

module.exports = {
  repository: path.resolve(__dirname, "..", "src", "repository"),
  resolve: path.resolve(__dirname, "..", "src", "resolve"),
  public: path.resolve(__dirname, "..", "public"),
  bootstrap: path.resolve(
    __dirname,
    "..",
    "node_modules",
    "bootstrap",
    "dist",
    "css"
  ),
};
