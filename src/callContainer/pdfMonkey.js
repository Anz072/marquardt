/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable block-scoped-var */
/* eslint-disable operator-linebreak */
require("dotenv").config();
const fs = require("fs");
const { DownloaderHelper } = require("node-downloader-helper");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function CheckError(response) {
  // response - fetch response object
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  }
  if (response.status === 404) {
    return undefined;
  }
  throw new Error(response.statusText);
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function checkIfReady(id) {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.PDFMONKEY_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const resp = await fetch(
      `https://api.pdfmonkey.io/api/v1/documents/${id}`,
      options
    );
    const data = await CheckError(resp);
    if (data) {
      return data;
    }

    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}
// eslint-disable-next-line consistent-return
async function getDownloadUrl(id) {
  let attemts = 0;

  try {
    let continue_ = true;

    while (continue_) {
      const res = await checkIfReady(id);

      attemts += 1;
      if (res?.document?.status !== undefined) {
        const status = res.document.status;

        if (status === "success") {
          continue_ = false;
          //----------------------------------------------------------
          console.log("Pdf monkey successfully generated Dossier");
          //----------------------------------------------------------
          return res.document.download_url;
        }
        if (status === "failure") {
          continue_ = false;
          //----------------------------------------------------------
          console.log("Pdf monkey Dossier generation has failed");
          //----------------------------------------------------------
          return null;
        }
        if (attemts >= 600) {
          continue_ = false;
          return null;
        }
        await delay(2000);
        continue;
      } else {
        continue_ = false;
        return null;
      }
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

exports.generatePdf = async function (data, templateID) {
  if (
    data.investmentOffer === null ||
    data.investmentOffer === "null" ||
    data.investmentOffer === undefined
  ) {
    data.investmentOffer = "ja";
  }

  const body = {
    document: {
      document_template_id: templateID,
      payload: data,
      status: "pending",
    },
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${process.env.PDFMONKEY_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const resp = await fetch(
      "https://api.pdfmonkey.io/api/v1/documents",
      options
    );
    const data = await CheckError(resp);
    if (data) {
      const url = await getDownloadUrl(data.document.id);

      return url;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

exports.downloadPDFs2 = async function (fileURL, name) {
  return new Promise((resolve) => {
    // setTimeout(() => reject(new Error("Timeout")), isPhoto ? 10000 : 60000);

    const dl = new DownloaderHelper(fileURL, "./src/mainPdfs", {
      override: true,
      fileName: `${name}.pdf`,
    });
    dl.on("end", () => {
      resolve();
    });
    dl.start();
  });
};

// exports.downloadPDFs3 = async function (fileURL, name) {
//   return new Promise((resolve) => {
//     const dl = new DownloaderHelper(fileURL, "./mainPdfs", {
//       override: true,
//       fileName: `${name}.pdf`,
//     });
//     dl.on("end", () => {
//       resolve();
//     });
//     dl.start();
//   });
// };
