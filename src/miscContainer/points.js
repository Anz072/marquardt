/* eslint-disable no-continue */
/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable operator-linebreak */
const airtable = require("../callContainer/airtable");

function filterUnique(array) {
  const unique = [];
  const checked = {};

  for (let i = 0; i < array.length; i += 1) {
    const stringified = JSON.stringify(array[i]);

    if (checked[stringified]) {
      continue;
    }

    unique.push(array[i]);
    checked[stringified] = true;
  }

  return unique;
}

function agregateValuesAndFindPoints(groupedValues) {
  const promises = [];

  groupedValues.forEach((value, key) => {
    let result = 0;

    // eslint-disable-next-line no-param-reassign
    value = value.filter((item) => item !== 0);

    const sum = value.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    result = value.length === 0 ? 0 : Math.round(sum / value.length);

    promises.push(airtable.airtableCall7(key, result));
  });
  return promises;
}

function groupFinancialValuesById(uniqueFinancials) {
  const groupedValues = new Map();

  uniqueFinancials.forEach((financial) => {
    financial.items.forEach((item) => {
      if (!groupedValues.has(item.id)) {
        groupedValues.set(item.id, []);
      }

      const currentValuesArray = groupedValues.get(item.id);
      currentValuesArray.push(item.value);
      groupedValues.set(item.id, currentValuesArray);
    });
  });

  return groupedValues;
}

exports.getMktgIndictorsPoints = async function (universalCompanyData) {
  let pointsTrademarks = 0;

  if (universalCompanyData?.mktgTechIndicators !== undefined) {
    // step 12
    const airResponse4 = await airtable.airtableCall4();

    if (universalCompanyData?.mktgTechIndicators?.items !== undefined) {
      universalCompanyData.mktgTechIndicators.items.forEach((item) => {
        pointsTrademarks +=
          (airResponse4.records[0]?.fields?.points ?? 0) * item.value;
      });
    }
  }
  return pointsTrademarks;
};

exports.findFinancialsPublictionsPoints = async function (
  universalCompanyData
) {
  let pointsFinancialsPublications = 0;

  const financials = universalCompanyData?.history?.financials ?? [];

  if (universalCompanyData?.financials !== undefined) {
    financials.push(universalCompanyData.financials);
  } else {
    try {
      const noFinPubPoints = await airtable.airtableCall5();
      pointsFinancialsPublications +=
        noFinPubPoints?.records[0]?.fields?.points ?? 0;
    } catch (e) {
      console.log(e);
    }
  }

  const uniqueFinancials = filterUnique(financials);
  let air6Result = {};
  try {
    air6Result = await airtable.airtableCall6(uniqueFinancials.length);
  } catch (e) {
    console.log(e);
    return 0;
  }

  pointsFinancialsPublications += air6Result.records[0]?.fields?.points ?? 0;

  return pointsFinancialsPublications;
};

exports.findFinancialsTrademarksPoints = async function (universalCompanyData) {
  let points_trademarks = 0;

  const financials = universalCompanyData?.history?.financials ?? [];

  if (universalCompanyData?.financials !== undefined) {
    financials.push(universalCompanyData.financials);
  }

  const uniqueFinancials = filterUnique(financials);

  try {
    const groupedValues = groupFinancialValuesById(uniqueFinancials);

    // filtering Map, leaving just trademarks
    const filteredMap = new Map(
      [...groupedValues].filter((item) => item[0] === "Trademarks")
    );

    const airCallPromises = agregateValuesAndFindPoints(filteredMap);

    const results = await Promise.all(airCallPromises);

    let sum = 0;

    results.forEach((item) => {
      sum +=
        item.records.length !== 0 ? item.records[0]?.fields?.points ?? 0 : 0;
    });

    points_trademarks += sum;
    return points_trademarks;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

exports.findFinancialsPoints = async function (universalCompanyData) {
  let points_financials = 0;

  const financials = universalCompanyData?.history?.financials ?? [];

  if (universalCompanyData?.financials !== undefined) {
    financials.push(universalCompanyData.financials);
  }

  const uniqueFinancials = filterUnique(financials);

  try {
    const groupedValues = groupFinancialValuesById(uniqueFinancials); // step 16

    const filteredMap = new Map(
      [...groupedValues].filter((item) => item[0] !== "Trademarks")
    );

    const airCallPromises = agregateValuesAndFindPoints(filteredMap); // step 17,18

    const results = await Promise.all(airCallPromises);

    let sum = 0;

    results.forEach((item) => {
      sum +=
        item.records.length !== 0 ? item.records[0]?.fields?.points ?? 0 : 0;
    });

    points_financials += sum;
    return points_financials;
  } catch (e) {
    console.log(e);
    return 0;
  }
};
