/* eslint-disable comma-dangle */
/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
const fs = require("fs").promises;
require("dotenv").config();
const airtable = require("./airtable");
const north = require("./northData");
// const { saveDocuments } = require("./pdfs");

async function getDocumentsAndPoints(
  shopResult,
  documentName,
  makeAirTableRequest
) {
  const response = {
    points: 0,
    pdfs: [],
  };

  const shopItem = shopResult.filter((item) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    item.name.includes(documentName)
  )[0];

  if (shopItem !== undefined) {
    const files = [];

    if (files.length > 0) {
      response.pdfs = response.pdfs.concat(files);

      const airTableResult = await makeAirTableRequest(true);
      response.points = airTableResult?.records[0]?.fields?.points ?? 0;
    } else {
      const airTableResult = await makeAirTableRequest(false);
      response.points = airTableResult?.records[0]?.fields?.points ?? 0;
    }
  } else {
    const airTableResult = await makeAirTableRequest(false);
    response.points = airTableResult?.records[0]?.fields?.points ?? 0;
  }

  return response;
}

exports.getAllDocumentsAndPoints = async function (name, city) {
  const pointsTypes = [
    "points_basicsheet",
    "points_shareholderlist",
    "points_statute",
  ];
  const response = {
    points_basicsheet: 0,
    points_shareholderlist: 0,
    points_statute: 0,
    pdfs: [],
  };

  try {
    const shopResult = await north.northShop(name, city);
    const settledPointsAndDocsPromises = await Promise.allSettled([
      getDocumentsAndPoints(
        shopResult,
        "Aktueller Handelsregisterauszug (AD)",
        airtable.airtableCallDocuments_basicSheet
      ),
      getDocumentsAndPoints(
        shopResult,
        "Liste der Gesellschafter",
        airtable.airtableCallDocuments_shareholderlist
      ),
      getDocumentsAndPoints(
        shopResult,
        "Gesellschaftsvertrag",
        airtable.airtableCallDocuments_statute
      ),
    ]);

    for (let i = 0, n = settledPointsAndDocsPromises.length; i < n; i++) {
      if (settledPointsAndDocsPromises[i].status === "fulfilled") {
        // eslint-disable-next-line operator-linebreak
        response[pointsTypes[i]] =
          settledPointsAndDocsPromises[i].value.points ?? 0;
        response.pdfs = response.pdfs.concat(
          settledPointsAndDocsPromises[i].value.pdfs ?? []
        );
      }
    }

    return response;
  } catch (e) {
    console.log(e);
    return response;
  }
};
