/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
require("dotenv").config();

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
  console.log("Evaluation ended\n");

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
