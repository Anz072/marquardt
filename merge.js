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
const { PDFDocument, rgb, last } = require("pdf-lib");

const { v4: uuidv4 } = require("uuid");

const util = require("util");

const http = require("https");

const { promisify } = util;

const { google } = require("googleapis");
const fs = require("fs");
const { JWT } = require("google-auth-library");
const axios = require("axios");

require("dotenv").config();

const { postToGoogle } = require("./src/webhook");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const filesToBeRemoved = [];

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
  // console.log(`Step 1.8: Dossier sending to bubble via webhook: ${url2}`);
  //----------------------------------------------------------
  const respname = uuidv4();
  const respnameMain = `${respname}.pdf`;

  const ans = {
    ID,
    googleURL,
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
    throw e;
  });
}

async function Merger(ID, bubbleEnvironment, files, url, destinationPath) {
  const merger = new PDFMerger();

  console.log("Step 1.5: Merging of downloaded files started");
  try {
    const arr241 = [];

    await merger.add(destinationPath);
    for (const file of files) {
      try {
        if (file.slice(-3) !== "pdf") {
          filesToBeRemoved.push(file);
          const name23 = `img_${uuidv4()}`;
          const outputPath = `./src/mainPdfs/${name23}.pdf`;
          await convertImagesToPDF(file, outputPath);
          arr241.push(outputPath);
          await merger.add(outputPath);
          filesToBeRemoved.push(outputPath);
        } else {
          await merger.add(file);
          arr241.push(file);
          filesToBeRemoved.push(file);
        }
      } catch (err) {
        console.error(`Error adding file ${file}:`, err);
      }
    }
    console.error(arr241);
  } catch (e) {
    console.log(e);
  }
  const mergedName = "FINAL_" + uuidv4();
  try {
    await merger.save(`./src/mainPdfs/${mergedName}.pdf`);
  } catch (e) {
    console.log(e);
  }

  try {
    const googleUrl = await postToGoogle(bubbleEnvironment, mergedName);
    postToBubble2(url, googleUrl, ID);
  } catch (e) {
    console.log(e);
  }

  await deleteFiles(filesToBeRemoved);
}

promisify(http.request);

async function downloadFiles(
  ID,
  bubbleEnvironment,
  fileUrls,
  url,
  destinationPath
) {
  const downloadPromises = fileUrls.map(async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "arraybuffer",
      });
      const fileName = uuidv4();

      const lastThree = fileUrl.slice(-3);
      let location = "";
      if (lastThree === "pdf") {
        location = `./src/mainPdfs/${fileName}.pdf`;
      } else {
        location = `./src/mainPdfs/${fileName}.${lastThree}`;
      }
      fs.writeFileSync(location, response.data, "binary");
      return location;
    } catch (error) {
      console.error(`Error downloading file from URL ${fileUrl}:`, error);
      throw error;
    }
  });

  try {
    const files = await Promise.all(downloadPromises);
    console.log("DOWNLOADED");
    await Merger(ID, bubbleEnvironment, files, url, destinationPath);
  } catch (error) {
    console.error("Error while downloading or merging files:", error);
    // Handle the error or send it to Bubble if necessary
    sendError(url, ID);
  }
}

async function downloadFiles2(fileId, url, arr2, ID, str, bubbleEnvironment) {
  // Load the private key JSON file
  const privateKey = process.env.GOOGLE_SERVICE_PRIVATE_KEY;

  // Configuration
  const fileName = `Main_${uuidv4()}`;

  const destinationPath = `./src/mainPdfs/${fileName}.pdf`;
  filesToBeRemoved.push(destinationPath);
  const email = "paperpusher@solid-sun-357412.iam.gserviceaccount.com";
  const SCOPES = ["https://www.googleapis.com/auth/drive"];

  const authClient = new JWT({
    email,
    key: privateKey,
    scopes: SCOPES,
  });

  await authClient.authorize();
  const drive = google.drive({
    version: "v3",
    auth: authClient,
  });

  authClient.authorize((err, tokens) => {
    if (err) {
      console.error("Error authenticating:", err);
      return;
    }
    const arr = [];
    const arrImages = [];

    // Create the Google Drive API client
    const drive = google.drive({ version: "v3", auth: authClient });

    // Download the specific PDF file
    const dest = fs.createWriteStream(destinationPath);
    drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" },
      (err, { data }) => {
        if (err) {
          console.error("Error downloading the file:", err);
          return;
        }
        data
          .on("error", (err) => {
            console.error("Error writing the file:", err);
          })
          .pipe(dest)
          .on("finish", () => {
            for (item in arr2) {
              // eslint-disable-next-line no-undef
              const extension = arr2[item]
                .substr(arr2[item].lastIndexOf(".") + 1)
                .trim();
              arr.push(arr2[item]);
            }
            downloadFiles(ID, bubbleEnvironment, arr, url, destinationPath);
          });
      }
    );
  });
}

async function convertImagesToPDF(imagePath, outputPath) {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Read the image file
    const imageBytes = fs.readFileSync(imagePath);

    // Add a new page to the PDF
    const page = pdfDoc.addPage([600, 800]); // Adjust the page size as needed

    // Embed the image on the page based on the image format
    let image;
    if (imagePath.slice(-3) === "png") {
      image = await pdfDoc.embedPng(imageBytes);
    } else if (imagePath.slice(-3) === "jpg") {
      image = await pdfDoc.embedJpg(imageBytes);
    } else if (imagePath.slice(-3) === "iff") {
      image = await pdfDoc.embedTiff(imageBytes);
    } else if (imagePath.slice(-3) === "bmp") {
      image = await pdfDoc.embedBmp(imageBytes);
    }

    // Draw the image to fill the entire page
    page.drawImage(image, {
      x: 10,
      y: 10,
      width: 580,
      height: 780,
    });

    // Save the PDF to a file
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    return outputPath; // Return the path to the saved PDF
  } catch (error) {
    console.error("Error converting image to PDF:", error);
    throw error; // Handle the error as needed
  }
}

async function deleteFiles(filePaths) {
  try {
    filePaths.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      } else {
        console.log(`File does not exist: ${filePath}`);
      }
    });
  } catch (error) {
    console.error("Error deleting files:", error);
  }
}

exports.merge = async function (req, res) {
  res.status(200).send("merging");
  console.log("Step 1: Merging of documents started");
  const bubbleEnvironment = req.body.environment;
  const { url } = req.body;
  const merger = new PDFMerger();
  const str = req.body.files;
  const ID = req.body.id;
  const arr2 = req.body.files;

  const fileId = req.body.generatedPdf.split("/").pop().split("?")[0];

  await downloadFiles2(fileId, url, arr2, ID, str, bubbleEnvironment);
};
