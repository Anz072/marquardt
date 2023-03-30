const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
const router = express.Router();
const dossierCreator = require("./src/dossierCreator");

router.post("/createDossier", dossierCreator.evaluate);
router.post("/updateDossier", dossierCreator.evaluate);

app.use(express.json()); // parse incoming json
app.use("/", router);

app.listen(port, () => {
  console.log(`Marquardt app listening on port ${port}`);
});

module.exports = router;
