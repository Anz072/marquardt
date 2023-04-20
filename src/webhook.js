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
      const privateKey =
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDPyAO5JDiJoSbb\nZwjkTlsuSGqsaT9VWfx0x7JuXKVksMBAJhDuFQ9uIsr/XUswWWvFDb3nTC2YtlhX\nKG+4VcuDCXh3dDmTUJmWhLlxhvSFuEwpQHFts+Yit7oZiuI0waDydxUmL1vSrHDZ\nbOzGIxnNOqI7IN0jfyjVaW1SGYPUYmX6cxsGirNbICqQnm6XiIZBQ8yHsM7y5X7j\nJIeHZIm+siBYmexrvJdU+bnR6W6nH29UOyZ917gG1hstMD52wJIime0mkVssvEX7\nVzYSGpaM6OoNQxjWe9pZaR7HCcYvl4vILqMP7ktkm0gxbc0hvDDAbaejWnCoxQ4J\naYg/3lWNAgMBAAECggEABULn0TrZEacagEjCIWHYjjn4NYhuuZ8PNPfPjVrcN0oA\nfD9ag2TWILBR2piGrGE/SNyZt+8mYm0PnJliBtVpU1acjc3MHW5XjUesGHNV4sLx\nbsP6e1AoXi2v0TDCnJpglHMufmqJlTKXovHOpw/BegBnlj61Ss5P/uNuCLurqmeN\nxY9YjeXs/QOTIjCbuqMoeXvPB25ks4ftEMdc1U6SHixtcrit1F20BLS3d62t6A9Y\nwKrTO58mggDbBr6iBMz/UKGKexTYGuWwH4YCrZSEQUzYmzNpb+9jWa5tUQ93uMwj\nDwMLr4Of0TM1+ktTPIuwsbAPV/D9mapgAmV7wY2ZkQKBgQDsGRby8HrOngNMZCQk\ntKQb+EX0K8aiiPQUeOjMn7Ppi0rX2uSJWZswGM1F7CNSZgRWz6M4rUQukODuvBj6\n/Iom3YZ+EEPxNMoKkFy7g/qiIVnbMxQ46N56pp58v/1/Zm1EaJRo+7hkVzlJASsd\n3PFieg7tOpPjc8xKTf8huWp+GQKBgQDhS9xU8GzHDWWoS4ZBrCVrf1Nh2QjGOd7P\n437RPz/LM9v28J1347Exy/zpsZw2+2q5fVTDPwv/I9VkCcl5ZxTZUSF0Y+yB/xMC\nigq48NLFeaiGoWlRuJM5vSlZ1ZANDOiVt1y484k7E2UN/zwzakoc98+RJMVjYKHP\nagr3EHaZlQKBgCmP7SNNREE1Pd1nz5kKl804so/eWPRp6ZXlBw5mmtRlKgK/zPWE\n6bXY1+IURM+Pl/n0SYaDsfoElSRRxpAAfw2Cd9efY2aF5X9glIKKJEgAWQImhsvR\n6sBqroHFhomz7U5anq2winBXjoUUiJOUPoYYeKI4aqpiyzbVbjFwo5eZAoGBAK1h\nVw+a8uuAuOH6NTjnBOkkVIPxpVn/gSQVXCwl868qmrYAV/7CoEPFSz6BK8n4VBqp\nhAi5xT61Uewpx/4AwT+4uvk6SPGF3hhPKY9H7byBMpthLo7wb4S4uVDkFHamn3tQ\nYDAJY2uuMk/CQ48B1kVSxE9br/gZjozze7rE1bC9AoGAZmUyW5p3Juf7H9trggs5\n+IxlUTTfaH1wWRj507K7fBf08KURpiB65GlLxTXr00/i0sJxwrZg1gAM6jzW1M/D\nu6I8PxCUxqEPMmDEFCdFDvzX2Uyepd1/GT/bbJHQujIg1ICOaxLg4yxtC8MEllQg\n97lA14VU49/gE1L8qDXyTgs=\n-----END PRIVATE KEY-----\n"; //process.env.GOOGLE_SERVICE_PRIVATE_KEY;
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
