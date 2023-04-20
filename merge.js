/* eslint-disable spaced-comment */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */

const PDFMerger = require("pdf-merger-js");

const { v4: uuidv4 } = require("uuid");

const util = require("util");

const http = require("https");

const { promisify } = util;

const fs = require("fs");

require("dotenv").config();

const { postToGoogle } = require("./src/webhook");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function sendError(url, ID) {
  const url2 = `${url}api/1.1/wf/merger-error-handler`;

  const ans = {
    ID,
    merging: "no",
  };

  const options = {
    method: "POST",
    body: JSON.stringify(ans),
    headers: {
      Authorization: `Bearer ${process.env.BUBBLE_KEY}`,
      "Content-Type": "application/json",
    },
  };

  return fetch(url2, options).catch((e) => {
    console.log(e);
  });
}

function postToBubble2(url, googleURL, ID) {
  const url2 = `${url}api/1.1/wf/merger_google`;
  //----------------------------------------------------------
  console.log(`Step 1.8: Dossier sending to bubble via webhook: ${url2}`);
  //----------------------------------------------------------
  const respname = uuidv4();
  const respnameMain = `${respname}.pdf`;

  const ans = {
    ID,
    googleURL,
  };
  console.log("ans");
  console.log(url);
  const options = {
    method: "POST",
    body: JSON.stringify(ans),
    headers: {
      Authorization: `Bearer ${process.env.BUBBLE_KEY}`,
      "Content-Type": "application/json",
    },
  };
  return fetch(url2, options).catch((e) => {
    throw e;
  });
}

async function Merger(ID, bubbleEnvironment, files, url) {
  const merger = new PDFMerger();
  console.log("Step 1.5: Merging of downloaded files started");
  try {
    // Add the first file to the merger
    await merger.add(files[0]);
    console.log(`File ${files[0]} added to merger`);

    // Add the rest of the files to the merger using Promise.all
    await Promise.all(
      files.slice(1).map(async (file) => {
        try {
          await merger.add(file);
          console.log(`File ${file} added to merger`);
        } catch (err) {
          console.error(`Error adding file ${file}:`, err);
        }
      })
    );

    console.log("--files added for merging");
    // console.log(merger);
  } catch (e) {
    console.log(e);
  }
  // console.log(merger);
  const mergedName = uuidv4();
  try {
    await merger.save(`./src/mainPdfs/${mergedName}.pdf`);
    console.log("Step 1.6: Documents have been merged successfully");
  } catch (e) {
    console.log(e);
  }

  try {
    // const fileBuffer = await fs.promises.readFile(`./pdf/${mergedName}.pdf`);
    // const contentsInBase64 = fileBuffer.toString("base64");
    console.log(
      "Step 1.7: Merged document have been converted into base64 & send to bubble"
    );

    const googleUrl = await postToGoogle(bubbleEnvironment, mergedName);
    console.log("googleUrl");
    console.log(googleUrl);
    postToBubble2(url, googleUrl, ID);
    console.log("Step 1.9: Merging of documents ended\n");
  } catch (e) {
    console.log(e);
  }
}

promisify(http.request);

async function downloadFiles(ID, bubbleEnvironment, fileUrls, url) {
  const promises = fileUrls.map(async (fileUrl) => {
    const fileName = uuidv4();
    const location = `./src/mainPdfs/${fileName}.pdf`;
    const file = fs.createWriteStream(location);
    const request = http.request(fileUrl, (response) => {
      response.pipe(file);
    });
    request.end();
    return new Promise((resolve) => {
      file.on("finish", () => {
        file.close();
        resolve(location);
      });
    });
  });

  const files = await Promise.all(promises);
  console.log("DOWNLOADED");
  Merger(ID, bubbleEnvironment, files, url);
}

exports.merge = async function (req, res) {
  res.status(200).send("merging");

  console.log("Step 1: Merging of documents started");
  const bubbleEnvironment = req.body.environment;
  const { url } = req.body;
  // eslint-disable-next-line no-unused-vars
  const merger = new PDFMerger();
  const arr = [];
  const str = req.body.files;
  const ID = req.body.id;
  const strc = req.body.files;

  const gen = req.body.generatedPdf; //`http:${req.body.generatedPdf}`;
  arr.push(gen);
  const arr2 = strc.split(",");
  // check if files ends with pdf
  // eslint-disable-next-line no-restricted-syntax, no-undef
  for (item in arr2) {
    // eslint-disable-next-line no-undef
    const extension = arr2[item].substr(arr2[item].lastIndexOf(".") + 1).trim();
    if (extension.toLowerCase() !== "pdf") {
      // console.log(extension + "D");
      console.log("Incorrect file extension uploaded!");
      console.log("Stopping service & sending error to bubble");
      return sendError(url, ID);
    }
  }

  let strcd;
  for (node in arr2) {
    strcd = `https:${arr2[node].replace(/\s/g, "")}`;
    arr.push(strcd);
  }

  //----------------------------------------------------------
  console.log("\nStep 1.1: Links to documents to merge: ");
  for (eff in arr) {
    console.log(arr[eff]);
  }
  console.log(`Step 1.2: User project ID: ${ID}`);
  console.log("Step 1.3: Documents download to heroku started");

  await downloadFiles(ID, bubbleEnvironment, arr, url);
};
