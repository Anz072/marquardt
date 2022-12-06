/* eslint-disable operator-linebreak */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-prototype-builtins */
/* eslint-disable comma-dangle */
/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable implicit-arrow-linebreak */
require("dotenv").config();

const fetch = (...args) =>
  // eslint-disable-next-line no-shadow
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function CheckError(response) {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  }
  if (response.status === 404) {
    return undefined;
  }
  throw new Error(response.statusText);
}

function fetchAirTable(url) {
  const init = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
    },
  };

  return fetch(url, init)
    .then(CheckError)
    .then((data) => data)
    .catch(() => {
      const msg = `error fetching airtable data, \n url : ${url}`;
      throw msg;
    });
}

exports.airtableTextfieldsSalegency = function (
  investment_offer,
  point_of_contact,
  active_search
) {
  const url = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/textfields_salesagency?filterByFormula=AND%28%0A%7Bpoint_of_contact%7D%3D%22${encodeURIComponent(
    point_of_contact
  )}%22%2C%0A%7Bactive_search%7D%3D%22${encodeURIComponent(
    active_search
  )}%22%2C%0A%7Binvestment_offer%7D%3D%22${encodeURIComponent(
    investment_offer
  )}%22%0A%29`;
  return fetchAirTable(url);
};

exports.airtableCall_1 = function (status) {
  const url = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Algorithm?filterByFormula=AND(%0A%7Bset%7D+%3D+%22general+sheet%22%2C%0A%7BKey%7D+%3D+%22status%22%2C%0A%7Bvalue%7D+%3D+%22${encodeURIComponent(
    status
  )}%22%0A)&limit=1`;
  return fetchAirTable(url);
};

exports.airtableCall_2 = function (legalForm) {
  const url = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Algorithm?filterByFormula=AND(%0A%7Bset%7D+%3D+%22general+sheet%22%2C%0A%7BKey%7D+%3D+%22legalForm%22%2C%0A%7Bvalue%7D+%3D+%22${encodeURIComponent(
    legalForm
  )}%22%0A)&limit=1`;
  return fetchAirTable(url);
};

exports.airtableCall_3 = function (capitalValue_, legalForm) {
  const capitalValue = capitalValue_ != null ? capitalValue_ : 0;
  const url = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Algorithm?filterByFormula=AND(%0A%7Bset%7D+%3D+%22general+sheet%22%2C%0A%7BKey%7D+%3D+%22capitalvalue%22%2C%0A%7Bvalue%7D+%3C+%22${encodeURIComponent(
    capitalValue
  )}%22%2C%0A%7Bvalue2%7D+%3D+%22${encodeURIComponent(
    legalForm
  )}%22%0A)&limit=1`;
  return fetchAirTable(url);
};

exports.airtableCall4 = function () {
  const url =
    "https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Algorithm?filterByFormula=AND(%0A%7Bset%7D%20%3D%20%22mktgTechIndicators%22%2C%0A%7BKey%7D%20%3D%20%22Trademarks%22%2C%0A%7Bvalue%7D%20%3D%20%22yes%22%0A)&limit=1";
  return fetchAirTable(url);
};

exports.airtableCall5 = function () {
  const url =
    "https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Algorithm?filterByFormula=AND(%0A%7Bset%7D+%3D+%22financials%22%2C%0A%7BKey%7D+%3D+%22Publications%22%2C%0A%7Bvalue%7D+%3D+%22no%22%0A)&limit=1";
  return fetchAirTable(url);
};

exports.airtableCall6 = function (count) {
  const url = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Algorithm?filterByFormula=AND(%0A%7Bset%7D%20%3D%20%22financials%22%2C%0A%7BKey%7D%20%3D%20%22Publications_count%22%2C%0A%7Bvalue_integer_low%7D%20%3C%3D%20%20${encodeURIComponent(
    count
  )}%20%2C%0A%7Bvalue_integer_high%7D%20%3E%3D%20${encodeURIComponent(
    count
  )}%20%0A)&limit=1`;

  return fetchAirTable(url);
};

exports.airtableCall7 = function (
  key,
  result //  step 18
) {
  const url = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Algorithm?filterByFormula=AND(%0A%7Bset%7D%20%3D%20%22financials%22%2C%0A%7BKey%7D%20%3D%20%22${encodeURIComponent(
    key
  )}%22%2C%0A%7Bvalue_integer_low%7D%20%3C%3D%20%20${encodeURIComponent(
    result
  )}%20%2C%0A%7Bvalue_integer_high%7D%20%3E%3D%20%20${encodeURIComponent(
    result
  )}%20%0A)&limit=1`;
  return fetchAirTable(url);
};

exports.airtableCall8 = function (
  points //  step 25
) {
  const url = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Scoring?filterByFormula=AND(%0A%7Bpoints_start%7D%20%3C%3D%20%20${encodeURIComponent(
    points
  )}%2C%0A%7Bpoints_end%7D%20%3E%3D%20%20${encodeURIComponent(
    points
  )}%0A)&limit=1`;
  return fetchAirTable(url);
};

exports.airtableCallDocuments_basicSheet = function (exists) {
  const value = exists ? "yes" : "no";
  const url = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Algorithm?filterByFormula=AND(%0A%7Bset%7D+%3D+%22documents%22%2C%0A%7BKey%7D+%3D+%22basic+sheet%22%2C%0A%7Bvalue%7D+%3D+%22${encodeURIComponent(
    value
  )}%22)`;
  return fetchAirTable(url);
};

exports.airtableCallDocuments_shareholderlist = function (exists) {
  const value = exists ? "yes" : "no";
  const url = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Algorithm?filterByFormula=AND(%0A%7Bset%7D+%3D+%22documents%22%2C%0A%7BKey%7D+%3D+%22shareholderlist%22%2C%0A%7Bvalue%7D+%3D+%22${encodeURIComponent(
    value
  )}%22)`;
  return fetchAirTable(url);
};

exports.airtableCallDocuments_statute = function (exists) {
  const value = exists ? "yes" : "no";
  const url = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Algorithm?filterByFormula=AND(%0A%7Bset%7D+%3D+%22documents%22%2C%0A%7BKey%7D+%3D+%22statutes%22%2C%0A%7Bvalue%7D+%3D+%22${encodeURIComponent(
    value
  )}%22)`;
  return fetchAirTable(url);
};

exports.airtableCallfinancialsCount = function (count) {
  const url = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/Algorithm?filterByFormula=AND(%7Bset%7D%3D%22financials%22%2C%7Bkey%7D%3D%22Publications_count%22%2C%7Bvalue_integer_low%7D%3C%3D%7B${encodeURIComponent(
    count
  )}%7D%2C%7Bvalue_integer_high%7D%3E%3D%7B${encodeURIComponent(count)}%7D)`;
  return fetchAirTable(url);
};

async function fetcher(url, init) {
  const zb = await fetch(url, init)
    .then(CheckError)
    .then((data) => data)
    .catch((e) => {
      throw e;
    });

  return zb;
}

exports.airtableCallSearchKeywordsInBafinNews = async function () {
  // eslint-disable-next-line operator-linebreak
  const url =
    "https://api.airtable.com/v0/appctpGHdSxhxGaQ8/BaFin_Company_News";

  const holder = [];

  const init = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
    },
    params: {
      maxRecords: "2",
    },
  };

  const zet = await fetcher(url, init);
  for (let i = 0; i < zet.records.length; i += 1) {
    holder.push(zet.records[i]);
  }

  if (zet.offset !== undefined) {
    const url2 = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/BaFin_Company_News?offset=${zet.offset}`;

    let gZet = await fetcher(url2, init);

    for (let i = 0; i < gZet.records.length; i += 1) {
      holder.push(gZet.records[i]);
    }

    while (gZet.offset !== undefined) {
      const url3 = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/BaFin_Company_News?offset=${gZet.offset}`;

      // eslint-disable-next-line no-await-in-loop
      gZet = await fetcher(url3, init);

      for (let i = 0; i < gZet.records.length; i += 1) {
        holder.push(gZet.records[i]);
      }
    }
  }

  const holder1 = []; // Bafin
  const holder2 = []; // Verbraucher
  const titleArray1 = [];
  const contentArray1 = [];
  const titleArray2 = [];
  const contentArray2 = [];

  for (let i = 0; i < holder.length; i += 1) {
    if (holder[i].hasOwnProperty("fields")) {
      if (holder[i].fields.Label === "Verbraucherschutz") {
        holder1.push(holder[i]);
      } else {
        holder2.push(holder[i]);
      }
    }
  }

  for (let i = 0; i < holder1.length; i += 1) {
    if (holder1[i].fields.Title !== undefined) {
      titleArray1.push(holder1[i].fields.Title.toLowerCase());
    }
    if (holder1[i].fields.Content !== undefined) {
      contentArray1.push(holder1[i].fields.Content.toLowerCase());
    }
  }

  for (let i = 0; i < holder2.length; i += 1) {
    if (holder2[i].fields.Title !== undefined) {
      titleArray2.push(holder2[i].fields.Title.toLowerCase());
    }
    if (holder2[i].fields.Content !== undefined) {
      contentArray2.push(holder2[i].fields.Content.toLowerCase());
    }
  }

  return {
    titleArray1,
    contentArray1,
    titleArray2,
    contentArray2,
  };
};

exports.airtableCallSearchKeywordsInBafinNews2 = async function () {
  // eslint-disable-next-line operator-linebreak
  const url =
    "https://api.airtable.com/v0/appctpGHdSxhxGaQ8/BaFin_Company_News";

  const holder = [];

  const init = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
    },
    params: {
      maxRecords: "2",
    },
  };

  const zet = await fetcher(url, init);
  for (let i = 0; i < zet.records.length; i += 1) {
    holder.push(zet.records[i]);
  }

  if (zet.offset !== undefined) {
    const url2 = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/BaFin_Company_News?offset=${zet.offset}`;

    let gZet = await fetcher(url2, init);

    for (let i = 0; i < gZet.records.length; i += 1) {
      holder.push(gZet.records[i]);
    }

    while (gZet.offset !== undefined) {
      const url3 = `https://api.airtable.com/v0/appctpGHdSxhxGaQ8/BaFin_Company_News?offset=${gZet.offset}`;

      // eslint-disable-next-line no-await-in-loop
      gZet = await fetcher(url3, init);

      for (let i = 0; i < gZet.records.length; i += 1) {
        holder.push(gZet.records[i]);
      }
    }
  }

  const holder1 = []; // Bafin
  const holder2 = []; // Verbraucher

  for (let i = 0; i < holder.length; i += 1) {
    if (holder[i].hasOwnProperty("fields")) {
      if (holder[i].fields.Label === "Verbraucherschutz") {
        holder1.push(holder[i]);
      } else {
        holder2.push(holder[i]);
      }
    }
  }

  return { holder1, holder2 };
};
function round(value, precision = 0) {
  const exponent = 10 ** precision;
  return Math.round(value * exponent) / exponent;
}
exports.round = function (value, precision = 0) {
  const exponent = 10 ** precision;
  return Math.round(value * exponent) / exponent;
};
function createUserSearchRow(
  companyEvaluation,
  salesAgentCompanyData,
  salesAgentPerson,
  shares_seller_type,
  user
) {
  const row = {
    fields: {
      "Search count": new Date().getTime(),
      User_FirstName: user.userName,
      User_LastName: user.userLastName,
      User_Address: user.userAddress,
      User_City: user.userCity,
      User_DateOfBirth: user.userBirthday,
      User_PhoneNumber: user.userPhone,

      Company_Name: companyEvaluation?.name ?? "-",
      Company_LegalForm: companyEvaluation?.companyData?.name?.legalForm ?? "",
      Company_ContactData: companyEvaluation?.contacts ?? "",
      Company_CEOinfo: companyEvaluation?.ceos?.reduce(
        (previousValue, currentValue) =>
          // eslint-disable-next-line prefer-template
          previousValue + currentValue?.ceo_info + "; ",
        ""
      ),
      Company_Subject:
        // eslint-disable-next-line operator-linebreak
        companyEvaluation?.companyData?.subject === undefined ||
        companyEvaluation?.companyData?.subject === ""
          ? "no subject"
          : companyEvaluation?.companyData?.subject,
      Company_PointsGeneralsheet:
        companyEvaluation?.points?.points_general_sheet ?? 0,
      Company_TrademarksTech: companyEvaluation?.trademarks ?? "",
      Company_GooglePresencePagerankAverage: round(
        companyEvaluation?.pagerank_googlepresence ?? 0,
        1
      ),
      Company_TrademarkPoints:
        (companyEvaluation?.points?.points_trademarks ?? 0) +
          companyEvaluation?.points?.points_financials_trademarks ?? 0,
      Company_FinancialsPublicationsPoints:
        companyEvaluation?.points?.points_financials_publications ?? 0,
      Company_FinancialsPoints:
        companyEvaluation?.points?.points_financials ?? 0,
      Company_BasicsheetPoints:
        companyEvaluation?.points?.points_basicsheet ?? 0,
      Company_ShareholderlistPoints:
        companyEvaluation?.points?.points_shareholderlist ?? 0,
      Company_StatutePoints: companyEvaluation?.points?.points_statute ?? 0,
      Company_ceo_entrepreneurship: companyEvaluation?.ceos?.reduce(
        (previousValue, currentValue) =>
          // eslint-disable-next-line prefer-template
          previousValue + currentValue?.entrepreneurship + "; ",
        ""
      ),
    },
  };

  if (shares_seller_type === "byitself") {
    row.fields.Company_Seller_Type = ["Selling shares by itself"];
  }

  if (shares_seller_type === "person") {
    row.fields.Company_Seller_Type = ["Salesagent - person"];
    row.fields.Seller_Person_ceo_entrepreneurship =
      salesAgentPerson?.entrepreneurship ?? "";
  }

  if (shares_seller_type === "company") {
    row.fields.Company_Seller_Type = ["Salesagent - company"];
    row.fields.Seller_Company_Name =
      salesAgentCompanyData?.companyData?.name?.name ?? "";
    row.fields.Seller_Company_ContactInfo =
      salesAgentCompanyData?.contacts ?? "";
    row.fields.Seller_Company_CEOinfo =
      salesAgentCompanyData?.current_ceo?.ceo_info ?? "";
    row.fields.Seller_Company_Subject =
      salesAgentCompanyData?.companyData?.subject === undefined ||
      salesAgentCompanyData?.companyData?.subject
        ? "no subject"
        : salesAgentCompanyData?.companyData?.subject;
    row.fields.Seller_Company_PointsGeneralsheet =
      salesAgentCompanyData?.points?.points_general_sheet ?? 0;
    row.fields.Seller_Company_TrademarkTech =
      salesAgentCompanyData?.trademarks ?? "";
    row.fields.Seller_Company_GooglePresencePagerankAverage =
      salesAgentCompanyData?.pagerank_googlepresence ?? 0;
    row.fields.Seller_Company_TrademarkPoints =
      (salesAgentCompanyData?.points?.points_trademarks ?? 0) +
        salesAgentCompanyData?.points?.points_financials_trademarks ?? 0;
    row.fields.Seller_Company_FinancialsPublicationsPoints =
      salesAgentCompanyData?.points?.points_financials_publications ?? 0;
    row.fields.Seller_Company_FinancialsPoints =
      salesAgentCompanyData?.points?.points_financials ?? 0;
    row.fields.Seller_Company_BasicsheetPoints =
      salesAgentCompanyData?.points?.points_basicsheet ?? 0;
    row.fields.Seller_Company_ShareholderlistPoints =
      salesAgentCompanyData?.points?.points_shareholderlist ?? 0;
    row.fields.Seller_Company_StatutePoints =
      salesAgentCompanyData?.points?.points_statute ?? 0;
    row.fields.Seller_Company_ceo_entrepreneurship =
      salesAgentCompanyData?.current_ceo?.entrepreneurship ?? "";
  }

  return row;
}

function insertToAirTable(row) {
  const url = "https://api.airtable.com/v0/appctpGHdSxhxGaQ8/User%20Searches";

  if (process.env.AIRTABLE_KEY == null) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject("missing airtble api key");
  }

  const options = {
    method: "POST",
    body: JSON.stringify(row),
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
      "Content-Type": "application/json",
    },
  };

  return fetch(url, options)
    .then(CheckError)
    .then((data) => data)
    .catch((e) => {
      console.log(e);
    });
}

exports.insertUserSearchRowToAirtable = async function (
  result,
  salesagent_company,
  salesagent_person,
  shares_seller_type,
  user
) {
  try {
    const row1 = createUserSearchRow(
      result,
      salesagent_company,
      salesagent_person,
      shares_seller_type,
      user
    );
    insertToAirTable(row1);
  } catch (e) {
    console.log(e);
  }
};
