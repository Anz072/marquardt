/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* global item */
/* eslint no-undef: ["error", { "typeof": true }] */
const fs = require("fs");
const fsPromises = require("fs/promises");

const northData = require("./callContainer/northData");
const airtable = require("./callContainer/airtable");
const pagerank = require("./miscContainer/pagerank");
const bafin = require("./miscContainer/bafin");
const points = require("./miscContainer/points");
const financials = require("./miscContainer/financials");
require("dotenv").config();

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

// eslint-disable-next-line func-names
exports.generator = async function (name, address, bafinKeywords) {
  let infoContainer = "";
  console.log("Step 1.1: Get Company call");
  infoContainer += "Step 1.1: Get Company call\n";

  const response = {
    name,
    address,
    companyData: {},
    points: {
      points_financials: 0,
      points_trademarks: 0,
      points_financials_trademarks: 0,
      points_financials_publications: 0,
      points_general_sheet: 0,
      points_basicsheet: 0,
      points_statute: 0,
      points_shareholderlist: 0,
      points_baFin: 0,
      sumOfPoints: 0,
    },
    score_result: {},
    pagerank_googlepresence: 0,
    trademarks: "null",
    financials: [],
    ceos: [],
    current_ceo: {},
    company_duration: 0,
    capital: "null",
    earnings: "null",
    contacts: "null",
    company_founding_date: null,
    associated_companies_count: 0,
    liquidated_companies_count: 0,
    pdfs: [],
    baFin_warning: false,
    earningsKasse: false,
  };

  let companyData = {};
  try {
    companyData = await northData.getCompany(name, address);

    response.companyData = companyData;
  } catch (e) {
    console.log(e);
  }
  infoContainer += JSON.stringify(companyData, null, 2);

  console.log("Step 1.2: Company Universal Call");
  infoContainer += "\nStep 1.2: Company Universal Call\n";

  let companyUniversal = {};
  try {
    const companyRegisterCity = companyData?.register?.city;
    const companyRegisterID = companyData?.register?.id;

    companyUniversal = await northData.northUniversal(
      companyRegisterCity,
      companyRegisterID
    );
    response.companyData = companyUniversal?.results[0]?.company;
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }

  const promisesGeneralSheet = [];
  let airtable1;
  let airtable2;
  let airtable3;

  console.log("Step 1.3: Airtable call block 1");
  infoContainer += "\nStep 1.3: Airtable call block 1\n";

  if (companyData?.status !== undefined) {
    try {
      console.log("Step 1.3.1: Airtable call company status points");
      infoContainer += "\nStep 1.3.1: Airtable call company status points\n";

      airtable1 = airtable.airtableCall_1("active");

      promisesGeneralSheet.push(airtable1);
    } catch (e) {
      console.log(e);
      infoContainer += e;
    }
  }

  console.log("Step 1.3.2: Airtable call legalform points");
  infoContainer += "\nStep 1.3.2: Airtable call legalform points\n";

  if (companyData?.name?.legalForm !== undefined) {
    try {
      airtable2 = airtable.airtableCall_2(companyData.name.legalForm);
      promisesGeneralSheet.push(airtable2);
    } catch (e) {
      console.log(e);
      infoContainer += e;
    }
  }

  console.log("Step 1.3.3: Airtable call legalform+capital value points");
  infoContainer +=
    "\nStep 1.3.3: Airtable call legalform+capital value points\n";

  if (
    // eslint-disable-next-line operator-linebreak
    companyData.capital?.items[0]?.value !== undefined &&
    companyData?.name?.legalForm !== undefined
  ) {
    try {
      airtable3 = airtable.airtableCall_3(
        companyData.capital.items[0].value,
        companyData.name.legalForm
      );
      promisesGeneralSheet.push(airtable3);
    } catch (e) {
      console.log(e);
      infoContainer += e;
    }
  }

  console.log("Step 1.3.4: Airtable await promises & assign them to response");
  infoContainer +=
    "\nStep 1.3.4: Airtable await promises & assign them to response\n";

  const promisesGeneralSheetResults = await Promise.all(promisesGeneralSheet);
  infoContainer += JSON.stringify(promisesGeneralSheetResults, null, 2);

  let promisesGeneralSheetResultsScore = 0;
  promisesGeneralSheetResults.forEach((value) => {
    if (value?.records[0]?.fields?.points !== undefined) {
      promisesGeneralSheetResultsScore += value.records[0].fields.points;
    }
    response.points.points_general_sheet = promisesGeneralSheetResultsScore;
  });

  console.log("Step 1.4: Looking for a CEO of the company");
  infoContainer += "\nStep 1.4: Looking for a CEO of the company\n";
  const listas = [];
  const listas2 = [];
  listas.push(companyData);
  let executionCounter = 0;
  let universalCompanyData = companyUniversal?.results[0]?.company;

  if (universalCompanyData === undefined) {
    if (companyUniversal.results.length > 1) {
      for (let i = 0; i < companyUniversal.results.length; i += 1) {
        const keys = Object.keys(companyUniversal?.results[i]);
        if (keys[0] === "company") {
          universalCompanyData = companyUniversal?.results[i]?.company;
          break;
        }
      }
    }
  }

  infoContainer += "\nUniversal company data\n";
  infoContainer += JSON.stringify(universalCompanyData, null, 2);
  try {
    // if (universalCompanyData !== undefined) {
    for (let i = 0; i < listas.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const northUniversalResult = await northData.northUniversal(
        listas[i].register.city,
        listas[i].register.id
      );

      if (
        northUniversalResult?.results[0]?.company?.relatedCompanies?.items
          .length > 0
      ) {
        for (
          // eslint-disable-next-line no-shadow
          let i = 0;
          i <
          northUniversalResult?.results[0]?.company?.relatedCompanies?.items
            .length;
          i += 1
        ) {
          if (
            // eslint-disable-next-line operator-linebreak
            northUniversalResult?.results[0]?.company?.relatedCompanies?.items[
              i
            ]?.company?.register?.city !== undefined &&
            northUniversalResult?.results[0]?.company?.relatedCompanies
              ?.items[0]?.company?.register?.id !== undefined
          ) {
            if (
              listas2.includes(
                northUniversalResult?.results[0]?.company?.relatedCompanies
                  ?.items[0]?.company?.register?.id
              ) === false
            ) {
              listas2.push(
                northUniversalResult?.results[0]?.company?.relatedCompanies
                  ?.items[0]?.company?.register?.id
              );
              const fakeCompany = {
                register: {
                  city: northUniversalResult?.results[0]?.company
                    ?.relatedCompanies?.items[i]?.company?.register?.city,
                  id: northUniversalResult?.results[0]?.company
                    ?.relatedCompanies?.items[0]?.company?.register?.id,
                },
              };
              listas.push(fakeCompany);
            }
          }
        }
      }

      if (northUniversalResult.results[0].company !== undefined) {
        if (
          // eslint-disable-next-line no-trailing-spaces, operator-linebreak
          northUniversalResult.results[0].company.relatedPersons.items[0] ===
          undefined
        ) {
          if (
            northUniversalResult.results[0].company.relatedCompanies.items !==
            []
          ) {
            // eslint-disable-next-line no-restricted-syntax, guard-for-in, no-global-assign
            for (item in northUniversalResult.results[0].company
              .relatedCompanies.items) {
              executionCounter += 1;

              if (
                // eslint-disable-next-line max-len
                northUniversalResult.results[0].company.relatedCompanies.items[
                  item
                  // eslint-disable-next-line no-prototype-builtins
                ].company.hasOwnProperty("address") === false
              ) {
                // eslint-disable-next-line no-continue
                continue;
              }

              // eslint-disable-next-line no-await-in-loop
              const getCompany = await northData.getCompany(
                // eslint-disable-next-line no-undef
                northUniversalResult.results[0].company.relatedCompanies.items[
                  item
                ].company.name.name,
                // eslint-disable-next-line no-undef
                northUniversalResult.results[0].company.relatedCompanies.items[
                  item
                ].company.address.city
              );

              if (getCompany === undefined) {
                // eslint-disable-next-line no-continue
                continue;
              }

              if (getCompany.register !== undefined) {
                if (listas2.includes(getCompany.register.id) === false) {
                  listas.push(getCompany);
                }
                listas2.push(getCompany.register.id);
              }
            }
          }
        } else if (
          northUniversalResult.results[0].company.relatedPersons !== undefined
        ) {
          const actualPerson2 = `${northUniversalResult.results[0].company.relatedPersons.items[0].person.name.firstName} ${northUniversalResult.results[0].company.relatedPersons.items[0].person.name.lastName}`;
          if (universalCompanyData.relatedPersons.items.length === 0) {
            universalCompanyData.relatedPersons.items.push(
              northUniversalResult.results[0].company.relatedPersons.items[0]
            );
          }
          console.log(`-----------Iterations: ${executionCounter}`);
          infoContainer += `\n-----------Iterations: ${executionCounter}\n`;

          console.log(`-----------CEO: ${actualPerson2}`);
          infoContainer += `\n-----------CEO: ${actualPerson2}\n`;

          break;
        }
      }
    }
    // } else {
    //   console.log("-----------Universal Data is undefined");
    //   console.log("-----------Skipping search for ceos!");
    //   infoContainer += "\n-----------Skipping search for ceos!\n";
    // }
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }

  console.log("Step 1.5: Assigning financials info to response");
  infoContainer += "\nStep 1.5: Assigning financials info to response\n";

  try {
    response.financials = financials.getFinancials(universalCompanyData);
    console.log(`---Found ${response.financials.length} Financial objects`);
    infoContainer += `\n---Found ${response.financials.length} Financial objects\n`;
    infoContainer += JSON.stringify(response.financials, null, 2);
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  console.log("Step 1.6: Assigning company duration info to response");
  infoContainer += "\nStep 1.6: Assigning company duration info to response\n";

  try {
    response.company_duration = financials.calculateYears(universalCompanyData);
    infoContainer += JSON.stringify(response.company_duration, null, 2);
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  console.log("Step 1.7: Assigning capital info to response");
  infoContainer += "\nStep 1.7: Assigning capital info to response\n";

  try {
    response.capital = financials.get_stocks_capital(universalCompanyData);
    infoContainer += JSON.stringify(response.capital, null, 2);
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  console.log("Step 1.8: Assigning contacts info to response");
  infoContainer += "\nStep 1.8: Assigning contacts info to response\n";

  try {
    response.contacts = financials.get_contacts(universalCompanyData);
    infoContainer += JSON.stringify(response.contacts, null, 2);
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  console.log("Step 1.9: Assigning founding date info to response");
  infoContainer += "\nStep 1.9: Assigning founding date info to response\n";

  try {
    response.company_founding_date =
      financials.getFoundingDate(universalCompanyData);
    infoContainer += JSON.stringify(response.company_founding_date, null, 2);
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }

  console.log("Step 1.10: Assigning last financial earnings to response");
  infoContainer +=
    "\nStep 1.10: Assigning last financial earnings to response\n";

  response.earnings = financials.lastFinancialEarnings(universalCompanyData);
  infoContainer += JSON.stringify(response.earnings, null, 2);

  console.log("Step 1.11: Checking if last financial earnings are empty");
  infoContainer +=
    "\nStep 1.11: Checking if last financial earnings are empty\n";

  if (response.earnings === "null" || response.earnings == null) {
    response.earnings =
      financials.lastFinancialEarningsKasseVersion(universalCompanyData);
    if (response.earnings !== "null" || response.earnings !== null) {
      console.log("Step 1.11-A: Changing last financial earnings to CASH");
      infoContainer +=
        "\nStep 1.11-A: Changing last financial earnings to CASH\n";

      response.earningsKasse = true;
    }
  }

  if (Object.keys(response.financials).length !== 0) {
    console.log("Step 1.12: Checking for duplicates in financial earnings");
    infoContainer +=
      "\nStep 1.12: Checking for duplicates in financial earnings\n";

    const financialsReworked = financials.checkForDuplicateFinancials(
      response.financials
    );
    const diff = response.financials.length - financialsReworked.length;
    response.financials = financialsReworked;
    console.log(`---Removed ${diff} duplicates from financial report`);
    infoContainer += `\n---Removed ${diff} duplicates from financial report\n`;
    infoContainer += "\n---new financials\n";
    infoContainer += JSON.stringify(response.financials, null, 2);
  }

  console.log("Step 1.13: Aquiring Google page rank");
  infoContainer += "\nStep 1.13: Aquiring Google page rank\n";

  try {
    response.pagerank_googlepresence = await pagerank.getAvarageDomainRanking(
      universalCompanyData
    );
    infoContainer += JSON.stringify(response.pagerank_googlepresence, null, 2);
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  console.log("Step 1.14: Assigning trademarks to response");
  infoContainer += "\nStep 1.14: Assigning trademarks to response\n";

  try {
    response.trademarks = await financials.getTechTrademarks(
      universalCompanyData
    );
    infoContainer += JSON.stringify(response.trademarks, null, 2);
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  console.log("Step 1.15: Assigning financials publications to response");
  infoContainer +=
    "\nStep 1.15: Assigning financials publications to response\n";

  try {
    response.points.points_financials_publications =
      await points.findFinancialsPublictionsPoints(universalCompanyData);
    infoContainer += JSON.stringify(
      response.points.points_financials_publications,
      null,
      2
    );
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  console.log("Step 1.16: Assigning financial points to response");
  infoContainer += "\nStep 1.16: Assigning financial points to response\n";

  try {
    response.points.points_financials_trademarks =
      await points.findFinancialsTrademarksPoints(universalCompanyData);
    infoContainer += JSON.stringify(
      response.points.points_financials_trademarks,
      null,
      2
    );
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  console.log("Step 1.17: Assigning financial points to response");
  infoContainer += "\nStep 1.17: Assigning financial points to response\n";

  try {
    response.points.points_financials = await points.findFinancialsPoints(
      universalCompanyData
    );
    infoContainer += JSON.stringify(response.points.points_financials, null, 2);
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  console.log("Step 1.18: Assigning trademark points to response");
  infoContainer += "\nStep 1.18: Assigning trademark points to response\n";

  try {
    response.points.points_trademarks = await points.getMktgIndictorsPoints(
      universalCompanyData
    );
    infoContainer += JSON.stringify(response.points.points_trademarks, null, 2);
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  console.log("Step 1.19: Getting documents to assign to response");
  console.log(
    "---Assigning to response: basic sheet, shareholderlist & statute points"
  );
  infoContainer += "\nStep 1.19: Getting documents to assign to response\n";
  infoContainer +=
    "---Assigning to response: basic sheet, shareholderlist & statute points\n";

  console.log("Step 1.20: Checking for bafin warning for the main company ");
  infoContainer +=
    "\nStep 1.20: Checking for bafin warning for the main company \n";

  const companyFullName = JSON.parse(JSON.stringify(companyData.name.name));
  const legalForm = JSON.parse(JSON.stringify(companyData.name.legalForm));
  const companyNameWithoutLegalForm = companyFullName
    .replace(legalForm, "")
    .trim();
  bafinKeywords.push(companyFullName, companyNameWithoutLegalForm);

  console.log(`---Keywords to look for in Airtable: ${bafinKeywords}`);
  infoContainer += `---Keywords to look for in Airtable: ${bafinKeywords}`;

  let result22 = {};
  let isKeywordInBafinNews;
  console.log("---Receiving Bafin Airtable");
  infoContainer += "---Receiving Bafin Airtable\n";
  try {
    result22 = await bafin.searchBaFinKeyword();
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  console.log("---Trying to check for a warning & assign to response");
  infoContainer += "---Trying to check for a warning & assign to response\n";

  try {
    isKeywordInBafinNews = await bafin.checkKeywordsInBaFinNews(
      result22,
      bafinKeywords
    );
    infoContainer += JSON.stringify(isKeywordInBafinNews, null, 2);
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }

  response.baFin_warning = isKeywordInBafinNews.bafin;
  response.warnungenVerb = isKeywordInBafinNews.verbaucher;
  response.warnungenBafCount = isKeywordInBafinNews.bafinCount;
  response.warnungenVerbCount = isKeywordInBafinNews.verbaucherCount;

  if (response.baFin_warning === true || response.warnungenVerb === true) {
    console.log("---Bafin Warning found, so a 1000 points is subtracted");
    infoContainer += "---Bafin Warning found, so a 1000 points is subtracted\n";
    response.points.points_baFin = -1000;
  }
  console.log("Step 1.21: Calculating overall response points ");
  infoContainer += "Step 1.21: Calculating overall response points\n";

  response.points.sumOfPoints =
    response.points.points_trademarks +
    response.points.points_basicsheet +
    response.points.points_financials +
    response.points.points_financials_publications +
    response.points.points_financials_trademarks +
    response.points.points_general_sheet +
    response.points.points_shareholderlist +
    response.points.points_statute +
    response.points.points_baFin;

  console.log(`---Bafin sum of Points: ${response.points.sumOfPoints}`);
  infoContainer += `---Bafin sum of Points: ${response.points.sumOfPoints}`;

  let scroreResult = {};
  try {
    scroreResult = await airtable.airtableCall8(response.points.sumOfPoints);
    infoContainer += JSON.stringify(scroreResult, null, 2);
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }

  if (!scroreResult?.records?.length) {
    // eslint-disable-next-line no-throw-literal
    throw "score not found";
  } else {
    response.score_result = scroreResult?.records[0]?.fields;
  }

  console.log("Step 1.22: Retrieving info about CEO ");
  infoContainer += "Step 1.22: Retrieving info about CEO";

  try {
    response.ceos = await northData.getCeos(universalCompanyData);

    if (response.ceos.length !== 0) {
      for (let i = 0; i < response.ceos.length; i += 1) {
        if (response.ceos[i].city === undefined) {
          response.ceos[i].city = "undefined";
        }
        if (response.ceos[i].liquidated == null) {
          response.ceos[i].liquidated = "null";
        }
        if (response.ceos[i].other_compnies_count == null) {
          response.ceos[i].other_compnies_count = "null";
        }
      }

      if (response.ceos !== []) {
        response.liquidated_companies_count = response.ceos?.reduce(
          (currentCount, currentCeo) => {
            if (
              currentCeo.liquidated_companies_count !== "null" &&
              currentCeo.liquidated_companies_count !== null &&
              currentCeo.liquidated_companies_count !== undefined
            ) {
              return currentCount + currentCeo.liquidated_companies_count;
            }
            return currentCount + 0;
          },
          0
        );
      }

      if (response.ceos.length > 0) {
        if (response.ceos[0].active === true) {
          // eslint-disable-next-line prefer-destructuring
          response.current_ceo = response.ceos[0];
        }
      }
    } else {
      console.log("----------No related ceos exist, skipping search");
      infoContainer += "\n---------No related ceos exist, skipping search";
    }
  } catch (e) {
    console.log(e);
    infoContainer += e;
  }
  await writeToFile(infoContainer);

  return response;
};
