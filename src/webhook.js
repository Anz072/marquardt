/* eslint-disable func-names */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
require("dotenv").config();

const axios = require("axios");

const fs = require("fs");
const formData = require("form-data");
const { google } = require("googleapis");
// const { GoogleAuth } = require("google-auth-library");
const { JWT } = require("google-auth-library");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.postToBubble = function (data) {
  let url = "x";
  if (data.isNew === true) {
    url = `${data.url}api/1.1/wf/marquardt-webhook_google`;
  } else {
    url = `${data.url}api/1.1/wf/marquardt-webhook-update`;
  }

  if (Object.keys(data.salesagent_byitself).length !== 0) {
    data.salesagent_company = {
      capital: "",
      earnings: "",
      name: "",
      legalform: "",
      contacts: "",
      ceoinfo: "",
      subject: "",
      trademarktech: "",
      city: "",
      country: "",
      formated_address: "",
      postal_code: "",
      register_city: "",
      register_country: "",
      register_id: "",
      state: "",
      status: "",
      street: "",
      pointsgeneralsheet: 0,
      googlerating: 0,
      trademarkpoints: 0,
      financialspublicationspoints: 0,
      financialspoints: 0,
      basicsheetpoints: 0,
      shareholderlistpoints: 0,
      statutepoints: 0,
      bafinpoints: 0,
      points_total: 0,
      ceo_entrepreneurship: "",
      ceoName: "",
      financials: [],
      foundingDuration: 0,
      foundingDate: "",
      pdfs: [],
      warnungenBafin: "",
      creditworthiness: "",
    };
    data.salesagent_person = {
      ceo_entrepreneurship: "",
      associated_companies_count: 0,
      liquidated_companies_count: 0,
      creditworthiness: "",
      personAndCompanies: [],
      warnungenBafin: "",
      name: "",
      lastName: "",
      city: "",
      birthdate: "",
    };
  } else if (Object.keys(data.salesagent_person).length !== 0) {
    data.salesagent_company = {
      capital: "",
      earnings: "",
      name: "",
      legalform: "",
      contacts: "",
      ceoinfo: "",
      subject: "",
      trademarktech: "",
      city: "",
      country: "",
      formated_address: "",
      postal_code: "",
      register_city: "",
      register_country: "",
      register_id: "",
      state: "",
      status: "",
      street: "",
      pointsgeneralsheet: 0,
      googlerating: 0,
      trademarkpoints: 0,
      financialspublicationspoints: 0,
      financialspoints: 0,
      basicsheetpoints: 0,
      shareholderlistpoints: 0,
      statutepoints: 0,
      bafinpoints: 0,
      points_total: 0,
      ceo_entrepreneurship: "",
      ceoName: "",
      financials: [],
      foundingDuration: 0,
      foundingDate: "",
      pdfs: [],
      warnungenBafin: "",
      creditworthiness: "",
    };
    data.salesagent_byitself = { salesagencyText: "", warnungenBafin: "" };
  } else if (Object.keys(data.salesagent_company).length !== 0) {
    data.salesagent_byitself = { salesagencyText: "", warnungenBafin: "" };
    data.salesagent_person = {
      ceo_entrepreneurship: "",
      associated_companies_count: 0,
      liquidated_companies_count: 0,
      creditworthiness: "",
      personAndCompanies: [],
      warnungenBafin: "",
      name: "",
      lastName: "",
      city: "",
      birthdate: "",
    };
  }

  data.mergedPdf = "";
  if (
    data.investmentOffer === "ja" ||
    data.investmentOffer === "true" ||
    data.investmentOffer === true
  ) {
    data.investmentOffer = true;
  } else if (data.investmentOffer === "null") {
    data.investmentOffer = true;
  } else {
    data.investmentOffer = false;
  }
  console.log(`Dossier sending to bubble via webhook: ${url}`);

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${process.env.BUBBLE_KEY}`,
      "Content-Type": "application/json",
    },
  };
  return fetch(url, options).catch((e) => {
    throw e;
  });
};

exports.sendError = function (data, e) {
  const url = `${data.url}api/1.1/wf/marquardt-webhook-error`;

  const options = {
    method: "POST",
    body: JSON.stringify({
      error: e.toString(),
      payment_details: data.payment_details,
    }),
    headers: {
      Authorization: `Bearer ${process.env.BUBBLE_KEY}`,
      "Content-Type": "application/json",
    },
  };

  return fetch(url, options).catch((e) => {
    console.log(e);
  });
};

exports.postToGoogle = async function (bubbleEnvironment, mergedName) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      let parentFolder = process.env.GOOGLE_LIVE_PARENT_FOLDER;
      if (bubbleEnvironment === "test") {
        parentFolder = process.env.GOOGLE_DEVELOPMENT_PARENT_FOLDER;
      }
      // console.log("KEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY");
      // console.log(process.env.GOOGLE_SERVICE_PRIVATE_KEY);
      const privateKey = process.env.GOOGLE_SERVICE_PRIVATE_KEY;
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
      const fileMetadata = {
        name: `${mergedName}.pdf`,
        parents: [parentFolder],
      };
      const media = {
        mimeType: "application/pdf",
        body: fs.createReadStream(`src/mainPdfs/${mergedName}.pdf`),
      };
      const { data } = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: "id",
      });
      console.log("File ID:", data.id);
      // Make the file publicly available
      await drive.permissions.create({
        fileId: data.id,
        resource: {
          type: "anyone",
          role: "reader",
        },
      });
      // resolve(data.id);
      resolve(
        `https://www.googleapis.com/drive/v3/files/${data.id}?alt=media&key=${process.env.GOOGLE_API_KEY}`
      );
    } catch (err) {
      reject(err);
    }
  });
};
