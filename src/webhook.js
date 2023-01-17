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

exports.postFileToBubble = async function (data) {
  let urln = "x";
  urln =
    "https://paper-pusher.bubbleapps.io/version-test/api/1.1/wf/filereceivetest/initialize";
  console.log(`Dossier file sending to bubble via webhook: ${urln}`);

  // const form = new formData();
  // form.append("file1", fs.createReadStream("./stickers.jpg")); // give absolute path if possible

  // var URL = "XYZ URL";

  // fetch(urln, {
  //   method: "POST",
  //   body: form,
  //   headers: {
  //     ...form.getHeaders(),
  //     Authorization: "Bearer " + process.env.BUBBLE_KEY,
  //   },
  // })
  //   .then((res) => console.log(res))
  //   .catch((err) => console.error(err));

  //authorization
  const auth = 0; //removed for privacy
  // });

  const client = await auth.getClient();
  const drive = google.drive({ version: "v3", auth: client });

  const fileMetadata = {
    name: "file.pdf",
  };
  const media = {
    mimeType: "application/pdf",
    body: fs.createReadStream("bullshite.pdf"),
  };
  const resourcesa = {
    name: "newTitle2",
    parents: ["1kVJl5agOs0UrfQ-QCGG2ZNG6uOY3ACIc"], //folder to upload to on Shared Drive
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
      resource: resourcesa,
    },
    (err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("File ID: ", file.data.id);
      }
    }
  );
};
