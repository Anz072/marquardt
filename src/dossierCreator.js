/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable arrow-body-style */
/* eslint-disable no-prototype-builtins */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */

const fs = require("fs");
const fsPromises = require("fs/promises");

require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { send } = require("process");

const { Response } = require("./classContainer/responseClass");

const { postToBubble, postToGoogle } = require("./webhook");
const { grandGenerator } = require("./pdfContainer/pdfGenerator");
const { mergeFunction } = require("./pdfContainer/merger");

const bafin = require("./miscContainer/bafin");
const airtable = require("./callContainer/airtable");
const evaluationFunctions = require("./miscContainer/evaluationFunctions");

function generateID() {
  return `553 ${`000${Math.random() * 1000}`.slice(-3)} ${`000${
    Math.random() * 1000
  }`.slice(-3)}`;
}
async function writeToFile(infoContainer) {
  try {
    await fsPromises.appendFile(
      "./src/log/mainLog.txt",
      infoContainer,
      "utf-8"
    );
    console.log("WRITTEN TO FILE");
  } catch (err) {
    console.log("Error appending data to file", err);
  }
}

exports.evaluate = async function (req, res) {
  let dossierId = 0;
  const idCheck = req.body.generatedID;
  let isNew = false;
  let infoContainer = "";

  fs.writeFile("./src/log/mainLog.txt", "START OF LOGGING\n", (err) => {
    if (err) {
      console.error(err);
    }
  });

  const responseData = new Response();

  if (idCheck === "" || idCheck === null || idCheck === "null") {
    dossierId = generateID();
    isNew = true;
    console.log("---Dossier status: NEW");
    infoContainer += "---Dossier status: NEW \n";
  } else {
    dossierId = idCheck;
    isNew = false;
    console.log("---Dossier status: REFRESH");
    infoContainer += "---Dossier status: REFRESH \n";
  }
  res.status(200).send(dossierId);
  responseData.setMarquardtProjectId(req.body.marquardtProjectId);
  responseData.setPaymentDetailsId(req.body.paymentDetails);

  const type = req.body.sharesSellerType;
  const {
    salesagentFirstName,
    salesagentLastName,
    salesagentCity,
    sharesSellerType,
    salesagentBirthday,
    salesagentCompanyName,
    salesagentCompanyCity,
    name,
    address,
    pointOfContact,
    activeSearch,
    investmentOffer,
  } = req.body;

  const appurl = req.body.url;

  const user = {
    userName: req.body.userName,
    userLastName: req.body.userLastName,
    userAddress: req.body.userAddress,
    userCity: req.body.userCity,
    userPhone: req.body.userPhone,
    userBirthday: req.body.userBirthday,
  };

  const ShareSellerTypes = {
    COMPANY: "company",
    PERSON: "person",
    BYITSELF: "byitself",
  };

  if (type === ShareSellerTypes.PERSON) {
    await evaluationFunctions.shareSellerPERSON(
      name,
      address,
      salesagentFirstName,
      salesagentLastName,
      salesagentCity,
      salesagentBirthday,
      responseData,
      type,
      user,
      appurl
    );
  } else if (type === ShareSellerTypes.COMPANY) {
    await evaluationFunctions.shareSellerCOMPANY(
      name,
      address,
      salesagentCompanyName,
      salesagentCompanyCity,
      responseData,
      sharesSellerType,
      appurl,
      user
    );
  } else if (type === ShareSellerTypes.BYITSELF) {
    await evaluationFunctions.shareSellerBYITSELF(
      name,
      address,
      sharesSellerType,
      appurl,
      pointOfContact,
      activeSearch,
      investmentOffer,
      user,
      responseData
    );
  }

  responseData.setAnalysisID(
    dossierId,
    isNew,
    req.body.marquardt_companyID,
    req.body.marquardt_pointsID,
    req.body.marquardt_documentsID,
    req.body.marquardt_analysisID,
    req.body.marquardt_saleAgentID,
    req.body.marquardt_personID,
    req.body.marquardt_SalesAgentpersonID,
    req.body.marquardt_SalesAgentbyitselfID,
    req.body.investmentOffer
  );

  try {
    console.log("Step 1.23: Retrieving airtable bafin data");
    infoContainer += "Step 1.23: Retrieving airtable bafin data \n";

    const result22 = await bafin.searchBaFinKeyword2();

    console.log("Step 1.24: Checking if related companies are in airtable");
    infoContainer +=
      "Step 1.24: Checking if related companies are in airtable \n";

    const bafinRelated = await bafin.checkRealatedBafin(
      responseData.data.company.ceos,
      result22
    );
    responseData.data.company.ceos = bafinRelated;

    console.log(
      "Step 1.25: Calculating bafin warnings in related companies & assigning"
    );
    infoContainer +=
      "Step 1.25: Calculating bafin warnings in related companies & assigning \n";

    try {
      const bafinRelatedCount = await bafin.countRelated(
        responseData.data.company.ceos
      );
      if (bafinRelatedCount > 0) {
        responseData.data.company.warnungenBafin = true;
      }
      responseData.data.company.bafinCount += bafinRelatedCount;
    } catch (e) {
      console.log(e);
      infoContainer += e;
    }
    console.log(
      "Step 1.26: Calculating verbaucher warnings in related companies & assigning"
    );
    infoContainer +=
      "Step 1.26: Calculating verbaucher warnings in related companies & assigning \n";

    try {
      const verbRelatedCount = await bafin.countRelatedVerb(
        responseData.data.company.ceos
      );
      if (verbRelatedCount > 0) {
        responseData.data.company.warnungenVerb = true;
      }
      responseData.data.company.verbCount += verbRelatedCount;
    } catch (e) {
      console.log(e);
      infoContainer += e;
    }
    console.log(
      "Step 1.27: Calculating verbaucher warnings in related companies & assigning"
    );
    infoContainer +=
      "Step 1.27: Calculating verbaucher warnings in related companies & assigning \n";

    let points = 0;
    if (responseData.data.company.bafinCount === 0) {
      console.log("---Bafin points -0");
      infoContainer += "---Bafin points -0 \n";
      points = 0;
    } else {
      console.log("---Bafin points -1000");
      infoContainer += "---Bafin points -1000 \n";
      points = -1000;
    }
    const newPoints = responseData.data.company.points_total + points;
    responseData.data.company.points_total = newPoints;

    let scroreResult = {};
    try {
      scroreResult = await airtable.airtableCall8(newPoints);
      if (!scroreResult?.records?.length) {
        // eslint-disable-next-line no-throw-literal
        throw "score not found";
      } else {
        responseData.data.company.rating =
          scroreResult?.records[0]?.fields?.rating;
        responseData.data.company.description_short =
          scroreResult?.records[0]?.fields?.description_short;
        responseData.data.company.description_long =
          scroreResult?.records[0]?.fields?.description_long;
        responseData.data.company.description_short_eng =
          scroreResult?.records[0]?.fields?.description_short_eng;
      }
    } catch (e) {
      console.log(e);
      infoContainer += e;
    }

    console.log("Step 1.28: Generating main dossier files");
    infoContainer += "Step 1.28: Generating main dossier files \n";
  } catch (e) {
    console.log(e);
    infoContainer += e;
    throw e;
  }

  // generate main pdf
  const downloadedNames = await grandGenerator(responseData, sharesSellerType);

  const mergedName = uuidv4();
  await mergeFunction(downloadedNames, mergedName);

  console.log("---Dossier being converted to base64");
  infoContainer += "---Dossier being converted to base64 \n";

  const file_buffer = fs.readFileSync(`./src/mainPdfs/${mergedName}.pdf`);
  const contents_in_base64 = file_buffer.toString("base64");
  // responseData.setGenertedPdf(contents_in_base64);

  try {
    console.log("Step 1.29: Dossier is being sent to bubble");
    infoContainer += "Step 1.29: Dossier is being sent to bubble \n";
    console.log("responseData");
    console.log(responseData.data);

    const responseCopyForLog = JSON.parse(JSON.stringify(responseData));
    responseCopyForLog.data.generatedPdf = "";
    infoContainer += "\nFinal data that will be sent to bubble:\n";
    infoContainer += JSON.stringify(responseCopyForLog, null, 2);

    await writeToFile(infoContainer);

    console.log("---SENDING FUCNTION DEACTIVATED");

    // const googleUrl = await postToGoogle();
    // responseData.data.generatedPdf = googleUrl;

    // postToBubble(responseData.data);
  } catch (e) {
    console.log(e);
    infoContainer += e;
    throw e;
  }
};
