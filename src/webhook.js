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
const { GoogleAuth } = require("google-auth-library");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.postToBubble = function (data) {
  let url = "x";
  if (data.isNew === true) {
    url = `${data.url}api/1.1/wf/marquardt-webhook`;
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

exports.postToGoogle = async function () {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const client = await auth.getClient();
  const drive = google.drive({ version: "v3", auth: client });
  let fileId = 0; // generated file id
  const media = {
    mimeType: "application/pdf",
    body: fs.createReadStream("bullshite.pdf"),
  };
  const resource = {
    name: "newTitle2",
    parents: [process.env.GOOGLE_PARENT_FOLDER],
  };
  return new Promise((resolve, reject) => {
    drive.files.create(
      {
        media,
        fields: "id",
        resource,
      },
      (err, file) => {
        if (err) {
          // Handle error
          reject(err);
        } else {
          fileId = file.data.id;
          // Make the file publicly available
          drive.permissions.create(
            {
              fileId: file.data.id,
              resource: {
                type: "anyone",
                role: "reader",
              },
            },
            (err) => {
              if (err) {
                reject(err);
              } else {
                console.log("File made publicly available");
                resolve(fileId);
              }
            }
          );
        }
      }
    );
  }).then(
    (fileId) =>
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${process.env.GOOGLE_API_KEY}`
  );
};
