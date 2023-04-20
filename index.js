const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
const router = express.Router();
const dossierCreator = require("./src/dossierCreator");
const mergeController = require("./merge");

router.post("/createDossier", dossierCreator.evaluate);
router.post("/updateDossier", dossierCreator.evaluate);
router.post("/merge", mergeController.merge);

app.use(express.json()); // parse incoming json
app.use("/", router);
// app.use("/pdf", express.static(path.join(__dirname, "pdf")));
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).end();
});

const mainPdfsPath = path.join(__dirname, "src", "mainPdfs");
if (!fs.existsSync(mainPdfsPath)) {
  fs.mkdir(mainPdfsPath, { recursive: true }, (err) => {
    if (err) throw err;
    console.log("mainPdfs folder created successfully!");
  });
} else {
  console.log("mainPdfs folder already exists");
}

app.listen(port, () => {
  console.log(`Marquardt app listening on port ${port}`);
});

module.exports = router;
