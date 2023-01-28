/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
/* eslint-disable func-names */
const evaluation = require("../evaluation");
const airtable = require("../callContainer/airtable");
const northData = require("../callContainer/northData");

exports.shareSellerBYITSELF = async function (
  name,
  address,
  sharesSellerType,
  appurl,
  pointOfContact,
  activeSearch,
  investmentOffer,
  user,
  responseData
) {
  const evaluationResult = await evaluation.generator(name, address, []);
  responseData.setCompanyData(evaluationResult, sharesSellerType, appurl);

  if (
    pointOfContact !== undefined &&
    activeSearch !== undefined &&
    investmentOffer !== undefined
  ) {
    const textfield_salesagency = await airtable.airtableTextfieldsSalegency(
      investmentOffer,
      pointOfContact,
      activeSearch
    );

    if (textfield_salesagency?.records !== undefined) {
      const text = textfield_salesagency?.records[0]?.fields?.text ?? "null";
      responseData.setSalesagentByitselfData(
        text,
        responseData.data.company.warnungenBafin
      );

      airtable.insertUserSearchRowToAirtable(
        evaluationResult,
        null,
        null,
        sharesSellerType,
        user
      );
    }
  }
};

exports.shareSellerCOMPANY = async function (
  name,
  address,
  salesagentCompanyName,
  salesagentCompanyCity,
  responseData,
  sharesSellerType,
  appurl,
  user
) {
  const evaluationResultCompany = evaluation.generator(name, address, []);
  const promises = [evaluationResultCompany];

  if (
    salesagentCompanyName !== undefined &&
    salesagentCompanyCity !== undefined
  ) {
    promises.push(
      evaluation.generator(salesagentCompanyName, salesagentCompanyCity, [])
    );
  }

  const settledPromises = await Promise.allSettled(promises);

  if (settledPromises[0].status === "fulfilled") {
    responseData.setCompanyData(
      settledPromises[0].value,
      sharesSellerType,
      appurl
    );
    airtable.insertUserSearchRowToAirtable(
      settledPromises[0].value,
      settledPromises[1].value,
      null,
      sharesSellerType,
      user
    );
  } else {
    throw settledPromises[0].reason;
  }

  if (settledPromises[1].status === "fulfilled") {
    responseData.setSalesagentCompanyData(settledPromises[1].value);
  } else {
    throw settledPromises[1].reason;
  }
};
exports.shareSellerPERSON = async function (
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
) {
  const promises = [];
  const eva = await evaluation.generator(name, address, [
    `${salesagentFirstName} ${salesagentLastName}`,
  ]);
  promises.push(eva);
  if (
    salesagentFirstName !== undefined &&
    salesagentLastName !== undefined &&
    salesagentCity !== undefined &&
    salesagentBirthday !== undefined
  ) {
    promises.push(
      northData.getCEOsData(
        salesagentFirstName,
        salesagentLastName,
        salesagentCity,
        salesagentBirthday
      )
    );
  }
  const settledPromises = await Promise.allSettled(promises);

  if (settledPromises[0].status === "fulfilled") {
    responseData.setCompanyData(settledPromises[0].value, type, appurl);
    airtable.insertUserSearchRowToAirtable(
      settledPromises[0].value,
      null,
      settledPromises[1].value,
      type,
      user
    );
  } else {
    throw settledPromises[0].reason;
  }
  if (settledPromises[1].status === "fulfilled") {
    await responseData.setSalesagentPersonData(settledPromises[1].value);
  } else {
    throw settledPromises[1].reason;
  }
};
