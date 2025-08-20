const path = require("path");
const moduleAlias = require("module-alias");

moduleAlias.addAliases({
  "@": path.join(__dirname, "/"),
  "@helpers": path.join(__dirname, "/@helpers"),
});

require("./server/worker.js");
