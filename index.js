const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const dossierCreator = require("./src/dossierCreator");

router.post("/createDossier", dossierCreator.evaluate);
router.post("/udateDossier", dossierCreator.evaluate);

// router.post("/kk", (req, res) => {
//   res.download("merged.pdf");
// });

app.use(express.json());
app.use("/", router);

// app.get("/test", (req, res) => {
//   res.sendFile("bullshite.pdf", { root: "src/mainPdfs/" });
// });

app.listen(port, () => {
  console.log(`Marquardt app listening on port ${port}`);
});

module.exports = router;
