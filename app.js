const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

const indexRouter = require("./index");

app.use(express.json());
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Marquardt app listening on port ${port}`);
});
