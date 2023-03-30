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
const http = require("http");
const { promisify } = util;
const fs = require("fs");
require("dotenv").config();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function sendError(url, ID) {
  const url2 = `${url}api/1.1/wf/merger-error-handler`;

  const ans = {
    ID: ID,
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

function postToBubble2(url, base64, ID) {
  const url2 = `${url}api/1.1/wf/merger`;
  //----------------------------------------------------------
  console.log(`Step 1.8: Dossier sending to bubble via webhook: ${url2}`);
  //----------------------------------------------------------
  const respname = uuidv4();
  const respnameMain = `${respname}.pdf`;

  const ans = {
    ID,
    file: {
      filename: respnameMain,
      contents: base64,
    },
  };

  const options = {
    method: "POST",
    body: JSON.stringify(ans),
    headers: {
      // "Authorization": "Bearer " + process.env.BUBBLE_KEY,
      "Content-Type": "application/json",
    },
  };
  return fetch(url2, options).catch((e) => {
    throw e;
  });
}

async function Merger(files, url, ID) {
  const merger = new PDFMerger();
  console.log("Step 1.5: Merging of downloaded files started");

  try {
    await Promise.all(files.map((file) => merger.add(file)));
    console.log("--files added for merging");
  } catch (e) {
    console.log(e);
  }

  const mergedName = uuidv4();
  try {
    await merger.save(`./pdf/${mergedName}.pdf`);
    console.log("Step 1.6: Documents have been merged successfully");
  } catch (e) {
    console.log(e);
  }

  try {
    const fileBuffer = await fs.promises.readFile(`./pdf/${mergedName}.pdf`);
    const contentsInBase64 = fileBuffer.toString("base64");
    console.log(
      "Step 1.7: Merged document have been converted into base64 & send to bubble"
    );
    files = [];
    // postToBubble2(url, contentsInBase64, ID);
    console.log("Step 1.9: Merging of documents ended\n");
  } catch (e) {
    console.log(e);
  }
}

// async function dowloadFiles(file_url, files, url, ID, str, arr, gen) {
//   const fileName = uuidv4();
//   let firstPartofPDF = false;

//   if (file_url === gen) {
//     firstPartofPDF = true;
//   }

//   const location = `pdf/${fileName}.pdf`;
//   const file = fs.createWriteStream(location);
//   // eslint-disable-next-line no-unused-vars
//   const request = http.get(file_url, (response) => {
//     response.pipe(file);

//     file.on("finish", () => {
//       file.close();
//       filec += 1;
//       if (firstPartofPDF === true) {
//         files.unshift(fileName);
//       } else {
//         files.push(fileName);
//       }

//       if (filec === arr.length) {
//         //----------------------------------------------------------
//         console.log("Step 1.4: Documents downloaded");
//         //----------------------------------------------------------
//         filec = 0;
//         Merger(files, url, ID, str);
//       }
//     });
//   });
// }

// eslint-disable-next-line consistent-return

promisify(http.request);

async function downloadFiles(fileUrls, url, ID) {
  const promises = fileUrls.map(async (fileUrl) => {
    const fileName = uuidv4();
    const location = `pdf/${fileName}.pdf`;
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
  Merger(files, url, ID);
}

exports.merge = async function (req, res) {
  res.status(200).send("merging");

  console.log("Step 1: Merging of documents started");

  const { url } = req.body;
  // eslint-disable-next-line no-unused-vars
  const merger = new PDFMerger();
  const arr = [];
  const str = req.body.files;
  const ID = req.body.id;
  const strc = req.body.files;

  const gen = `http:${req.body.generatedPdf}`;
  arr.push(gen);
  const arr2 = strc.split(",");
  // check if files ends with pdf
  // eslint-disable-next-line no-restricted-syntax, no-undef
  for (item in arr2) {
    // eslint-disable-next-line no-undef
    const extension = arr2[item].substr(arr2[item].lastIndexOf(".") + 1);
    if (extension.toLowerCase() !== "pdf") {
      console.log(extension);
      console.log("Incorrect file extension uploaded!");
      console.log("Stopping service & sending error to bubble");
      return sendError(url, ID);
    }
  }

  let strcd;
  for (node in arr2) {
    strcd = `http:${arr2[node].replace(/\s/g, "")}`;
    arr.push(strcd);
  }

  //----------------------------------------------------------
  console.log("\nStep 1.1: Links to documents to merge: ");
  for (eff in arr) {
    console.log(arr[eff]);
  }
  console.log(`Step 1.2: User project ID: ${ID}`);
  console.log("Step 1.3: Documents download to heroku started");

  await downloadFiles(arr);
};
