/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable operator-linebreak */
/* eslint-disable func-names */
const airtable = require("../callContainer/airtable");

exports.searchBaFinKeyword = async function () {
  try {
    const airtableResult =
      await airtable.airtableCallSearchKeywordsInBafinNews();

    //-------------------------------------------
    console.log("Airtable data received");
    //-------------------------------------------
    return airtableResult;
  } catch (e) {
    console.log(e);
    return false;
  }
};

exports.checkKeywordsInBaFinNews = async function (result22, keywordsArray) {
  const isNewsIncludeKeyword = {
    bafin: false,
    verbaucher: false,
    bafinCount: 0,
    verbaucherCount: 0,
  };
  let verbraucherCheck = false;
  let bafinCheck = false;
  let bafinCheckAmmount = 0;
  let verbraucherCheckAmmount = 0;
  let bafLink = "";

  for (let j = 0; j < keywordsArray.length; j += 1) {
    for (let i = 0; i < result22.titleArray1.length; i++) {
      const keywordRDY = keywordsArray[j].toLowerCase();
      if (
        result22.titleArray1[i].includes(keywordRDY) === true ||
        result22.contentArray1[i].includes(keywordRDY) === true
      ) {
        verbraucherCheck = true;
        break;
      }
    }

    for (let i = 0; i < result22.titleArray2.length; i++) {
      const keywordRDY = keywordsArray[j].toLowerCase();
      if (
        result22.titleArray2[i].includes(keywordRDY) === true ||
        result22.contentArray2[i].includes(keywordRDY) === true
      ) {
        bafinCheck = true;
        // eslint-disable-next-line no-unused-vars
        bafLink = "";
        break;
      }
    }
    if (bafinCheck === true || verbraucherCheck === true) {
      break;
    }
  }

  for (let j = 0; j < keywordsArray.length; j++) {
    for (let i = 0; i < result22.titleArray1.length; i++) {
      const keywordRDY = keywordsArray[j].toLowerCase();
      if (result22.titleArray1[i].includes(keywordRDY) === true) {
        verbraucherCheckAmmount++;
        result22.titleArray1.splice(i, 1);
        result22.contentArray1.splice(i, 1);
      }
      if (result22.contentArray1[i].includes(keywordRDY) === true) {
        verbraucherCheckAmmount++;
        result22.contentArray1.splice(i, 1);
        result22.titleArray1.splice(i, 1);
      }
    }

    for (let i = 0; i < result22.titleArray2.length; i++) {
      const keywordRDY = keywordsArray[j].toLowerCase();
      if (result22.titleArray2[i].includes(keywordRDY) === true) {
        bafinCheckAmmount++;
        result22.titleArray2.splice(i, 1);
        result22.contentArray2.splice(i, 1);
      }
      if (result22.contentArray2[i].includes(keywordRDY) === true) {
        bafinCheckAmmount++;
        result22.contentArray2.splice(i, 1);
        result22.titleArray2.splice(i, 1);
      }
    }
  }

  if (bafinCheck === true) {
    isNewsIncludeKeyword.bafin = bafinCheck;
    isNewsIncludeKeyword.bafinCount += bafinCheckAmmount;
  }
  if (verbraucherCheck === true) {
    isNewsIncludeKeyword.verbaucher = verbraucherCheck;
    isNewsIncludeKeyword.verbaucherCount += verbraucherCheckAmmount;
  }

  return isNewsIncludeKeyword;
};

exports.checkKeywordsInBaFinNews2 = async function (result22, keywordsArray) {
  const isNewsIncludeKeyword = { bafin: false, verbaucher: false, bafLink: "" };
  let verbraucherCheck = false;
  let bafinCheck = false;
  for (let j = 0; j < keywordsArray.length; j++) {
    for (let i = 0; i < result22.holder1.length; i++) {
      const keywordRDY = keywordsArray[j].toLowerCase();
      const fieldTitle = result22.holder1[i].fields.Title.toLowerCase();
      const contentTitle = result22.holder1[i].fields.Content.toLowerCase();
      if (
        fieldTitle.includes(keywordRDY) === true ||
        contentTitle.includes(keywordRDY) === true
      ) {
        verbraucherCheck = true;
        break;
      }
    }

    for (let i = 0; i < result22.holder2.length; i++) {
      const keywordRDY = keywordsArray[j].toLowerCase();
      if (
        result22.holder2[i].fields.Title !== undefined &&
        result22.holder2[i].fields.Content !== undefined
      ) {
        const fieldTitle = result22.holder2[i].fields.Title.toLowerCase();
        const contentTitle = result22.holder2[i].fields.Content.toLowerCase();

        if (
          fieldTitle.includes(keywordRDY) === true ||
          contentTitle.includes(keywordRDY) === true
        ) {
          bafinCheck = true;

          isNewsIncludeKeyword.bafLink = result22.holder2[i].fields.URL;
          break;
        }
      }
    }

    if (bafinCheck === true || verbraucherCheck === true) {
      break;
    }
  }

  if (bafinCheck === true) {
    isNewsIncludeKeyword.bafin = bafinCheck;
  }
  if (verbraucherCheck === true) {
    isNewsIncludeKeyword.verbaucher = verbraucherCheck;
  }
  return isNewsIncludeKeyword;
};

exports.searchBaFinKeyword2 = async function () {
  try {
    const airtableResult =
      await airtable.airtableCallSearchKeywordsInBafinNews2();

    //-------------------------------------------
    console.log("Airtable data for related companies received");
    //-------------------------------------------

    return airtableResult;
  } catch (e) {
    console.log(e);
    return false;
  }
};

exports.checkRealatedBafin = async function (relatedCompanieslist, result22) {
  let relatedKeywords = [];
  for (let i = 0; i < relatedCompanieslist.length; i += 1) {
    relatedKeywords = [];
    if (relatedCompanieslist[i].type === "company") {
      // eslint-disable-next-line prefer-destructuring
      const name1 = relatedCompanieslist[i].name.name;
      relatedKeywords.push(name1);
      const legal = relatedCompanieslist[i].name.legalForm;
      const nolegal = name1.replace(legal, "").trim();
      relatedKeywords.push(nolegal);
      let isKeywordInBafinNewsRelated = { bafin: false, verbaucher: false };

      try {
        // eslint-disable-next-line no-await-in-loop

        // eslint-disable-next-line no-loop-func
        setTimeout(async () => {
          isKeywordInBafinNewsRelated = await this.checkKeywordsInBaFinNews2(
            result22,
            relatedKeywords
          );
        }, "5000");
      } catch (e) {
        console.log("Airtable call Failed");
        console.log(e);
      }

      if (isKeywordInBafinNewsRelated.bafin === true) {
        relatedCompanieslist[i].warnungenBafin = true;
        relatedCompanieslist[i].BafinLink = isKeywordInBafinNewsRelated.bafLink;
      }
      if (isKeywordInBafinNewsRelated.verbaucher === true) {
        relatedCompanieslist[i].warnungenVerb = true;
      }
      if (
        relatedCompanieslist.warnungenBafin === false &&
        relatedCompanieslist.warnungenVerb === false &&
        (isKeywordInBafinNewsRelated.verbaucher === true ||
          isKeywordInBafinNewsRelated.bafin === true)
      ) {
        console.log("bafinwasfoundgayversion:");
      }
    }
  }
  return relatedCompanieslist;
};

exports.countRelated = async function (companiesAndceos) {
  let count = 0;
  for (let i = 0; i < companiesAndceos.length; i++) {
    if (companiesAndceos[i]?.warnungenBafin !== undefined) {
      if (companiesAndceos[i].warnungenBafin) {
        count++;
      }
    }
  }
  return count;
};

exports.countRelatedVerb = async function (companiesAndceos) {
  let count = 0;
  for (let i = 0; i < companiesAndceos.length; i++) {
    if (companiesAndceos[i]?.warnungenVerb !== undefined) {
      if (companiesAndceos[i].warnungenVerb) {
        count++;
      }
    }
  }
  return count;
};
