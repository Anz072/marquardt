const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 3000;
const mergeController = require("./merge");

app.use("/pdf", express.static(path.join(__dirname, "pdf")));
app.use(cors());
app.use(express.json());

app.post("/merge", mergeController.merge);
app.get("/", (req, res) => {
  res.status(200).end();
});

// function setUpDirs() {
//   if (!fs.existsSync(path.join(__dirname, "temp"))) {
//     fs.mkdirSync(path.join(__dirname, "temp"));
//   }

//   if (!fs.existsSync(path.join(__dirname, `pdf`))) {
//     fs.mkdirSync(path.join(__dirname, `pdf`));
//   }
// }

app.listen(port, () => {
  // setUpDirs();
  console.log(`Marquardt app merger listening on port ${port}`);
});
