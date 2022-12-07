const express = require("express");

const router = express.Router();
const dossierCreator = require("./src/dossierCreator");

router.post("/createDossier", dossierCreator.evaluate);
router.post("/udateDossier", dossierCreator.evaluate);

router.post("/kk", (req, res) => {
  res.download("merged.pdf");
});

module.exports = router;
