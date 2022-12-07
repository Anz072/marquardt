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

const airtable = require("../callContainer/airtable");
const bafin = require("../miscContainer/bafin");

function dateNow() {
  const d = new Date();

  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const yy = d.getFullYear();

  return `${dd.toString()}.${mm.toString()}.${yy.toString()}`;
}

function formCeoJSONForPDF(ceoData) {
  const data = [];
  if (ceoData === undefined) {
    return "[]";
  }

  ceoData.forEach((item) => {
    const companies = item.associated_Companies;
    delete item.associated_Companies;
    item.type = "ceo";
    data.push(item);
    companies.forEach((company) => {
      company.type = "company";
      data.push(company);
    });
  });

  // eslint-disable-next-line no-restricted-syntax, no-undef
  for (obj in data) {
    // eslint-disable-next-line no-undef
    if (data[obj].hasOwnProperty("type")) {
      // eslint-disable-next-line no-undef
      if (data[obj].type === "company") {
        // eslint-disable-next-line no-undef
        data[obj].warnungenBafin = false;
        // eslint-disable-next-line no-undef
        data[obj].BafinLink = "https://google.com";
        // eslint-disable-next-line no-undef
        data[obj].warnungenVerb = false;
        // eslint-disable-next-line no-undef
        data[obj].VerbLink = "";
      }
    }
  }
  return data;
}

exports.Response = class Response {
  data = {
    url: "",
    marquardt_analysisID: "",
    marquardt_pointsID: "",
    marquardt_SalesAgentbyitselfID: "",
    marquardt_companyID: "",
    marquardt_documentsID: "",
    marquardt_personID: "",
    marquardt_SalesAgentpersonID: "",
    marquardt_salesAgentCompanyID: "",
    ID: "",
    investmentOffer: "",
    salesagent_type: "",
    date: dateNow(),
    description: "",
    marquardt_project: "",
    payment_details: "",
    company: {},
    salesagent_company: {},
    salesagent_person: {},
    salesagent_byitself: {},
  };

  setCompanyData(eval_result, sellerType, URL) {
    this.data.url = URL;
    this.data.salesagent_type = sellerType;
    this.data.description = eval_result?.score_result?.description_short ?? "";

    this.data.company.rating = eval_result?.score_result?.rating ?? "";
    this.data.company.description_short =
      eval_result?.score_result?.description_short ?? "";

    this.data.company.description_long =
      eval_result?.score_result?.description_long ?? "";
    this.data.company.description_short_eng =
      eval_result?.score_result?.description_short_eng ?? "";
    this.data.company.points_total = eval_result?.points?.sumOfPoints ?? 0;

    this.data.company.city = eval_result?.address ?? "";
    this.data.company.country =
      eval_result?.companyData?.address?.country ?? "";
    this.data.company.address_state =
      eval_result?.companyData?.address?.state ?? "";
    this.data.company.postalcode =
      eval_result?.companyData?.address?.postalCode ?? "";
    this.data.company.street = eval_result?.companyData?.address?.street ?? "";
    this.data.company.address_formattedvalue =
      eval_result?.companyData?.address?.formattedValue ?? "";
    this.data.company.register_city =
      eval_result?.companyData?.register?.city ?? "";
    this.data.company.register_country =
      eval_result?.companyData?.register?.country ?? "";
    this.data.company.register_id =
      eval_result?.companyData?.register?.id ?? "";
    this.data.company.name = eval_result?.name ?? "";
    this.data.company.legalform =
      eval_result?.companyData?.name?.legalForm ?? "";

    this.data.company.status = eval_result?.companyData?.status ?? "";
    this.data.company.subject = eval_result?.companyData?.subject ?? "";
    this.data.company.foundingDuration = eval_result?.company_duration ?? "";
    this.data.company.foundingDate = eval_result?.company_founding_date ?? "";
    this.data.company.contacts = eval_result?.contacts ?? "";

    this.data.company.pointsgeneralsheet =
      eval_result?.points?.points_general_sheet ?? 0;
    this.data.company.google_rating =
      // eslint-disable-next-line max-len
      eval_result?.pagerank_googlepresence.toFixed(1); // misc.round(eval_result?.pagerank_googlepresence ?? 0,1);
    this.data.company.trademarkpoints =
      (eval_result?.points?.points_trademarks ?? 0) +
        eval_result?.points?.points_financials_trademarks ?? 0;
    this.data.company.financialspublicationspoints =
      eval_result?.points?.points_financials_publications ?? 0;
    this.data.company.financialspoints =
      eval_result?.points?.points_financials ?? 0;
    this.data.company.basicsheetpoints =
      eval_result?.points?.points_basicsheet ?? 0;
    this.data.company.shareholderlistpoints =
      eval_result?.points?.points_shareholderlist ?? 0;
    this.data.company.statutepoints = eval_result?.points?.points_statute ?? 0;
    this.data.company.bafinpoints = eval_result?.points?.points_baFin ?? 0;

    this.data.company.financials = eval_result?.financials.map((financial) => {
      // eslint-disable-next-line no-param-reassign
      delete financial?.source;
      return financial;
    });
    this.data.company.capital = eval_result?.capital ?? "";

    this.data.company.earnings = eval_result?.earnings ?? "";
    this.data.company.earningsKasse = eval_result?.earningsKasse ?? "";

    this.data.company.ceoinfo = eval_result?.ceos?.reduce(
      (previousValue, currentValue) =>
        `${previousValue + currentValue?.ceo_info}; `,
      ""
    );
    this.data.company.ceo_entrepreneurship = eval_result?.ceos?.reduce(
      (previousValue, currentValue) =>
        `${previousValue + currentValue?.entrepreneurship}; `,
      ""
    );

    this.data.company.trademarks = eval_result?.trademarks ?? "";
    this.data.company.associated_companies_count =
      eval_result?.associated_companies_count ?? 0;
    this.data.company.associatedCompniesLiquidated =
      eval_result?.liquidated_companies_count ?? 0;

    this.data.company.ceos = formCeoJSONForPDF(eval_result?.ceos);

    this.data.company.pdfs = eval_result?.pdfs;

    this.data.company.warnungenBafin = eval_result?.baFin_warning ?? "";
    this.data.company.warnungenVerb = eval_result?.warnungenVerb ?? "";
    this.data.company.bafinCount = eval_result?.warnungenBafCount ?? "";

    this.data.company.verbCount = eval_result?.warnungenVerbCount ?? "";
    this.data.company.creditworthiness = "positive";
  }

  setSalesagentCompanyData(salesAgentCompany_result) {
    this.data.salesagent_company.capital =
      salesAgentCompany_result?.capital ?? "";
    this.data.salesagent_company.earnings =
      salesAgentCompany_result?.earnings ?? "";

    this.data.salesagent_company.name =
      salesAgentCompany_result?.companyData?.name?.name ?? "";
    this.data.salesagent_company.legalform =
      salesAgentCompany_result?.companyData?.name?.legalForm ?? "";
    this.data.salesagent_company.contacts =
      salesAgentCompany_result?.contacts ?? "";
    this.data.salesagent_company.ceoinfo =
      salesAgentCompany_result?.ceos?.reduce(
        (previousValue, currentValue) =>
          `${previousValue + currentValue?.ceo_info}; `,
        ""
      );
    this.data.salesagent_company.subject =
      salesAgentCompany_result?.companyData?.subject ?? "";
    this.data.salesagent_company.trademarktech =
      salesAgentCompany_result?.trademarks ?? "";

    this.data.salesagent_company.city = salesAgentCompany_result?.address ?? "";
    this.data.salesagent_company.country =
      salesAgentCompany_result?.companyData?.address?.country ?? "";
    this.data.salesagent_company.formated_address =
      salesAgentCompany_result?.companyData?.address?.formattedValue ?? "";
    this.data.salesagent_company.postal_code =
      salesAgentCompany_result?.companyData?.address?.postalCode ?? "";
    this.data.salesagent_company.register_city =
      salesAgentCompany_result?.companyData?.register?.city ?? "";
    this.data.salesagent_company.register_country =
      salesAgentCompany_result?.companyData?.address?.country ?? "";
    this.data.salesagent_company.register_id =
      salesAgentCompany_result?.companyData?.register?.id ?? "";
    this.data.salesagent_company.state =
      salesAgentCompany_result?.companyData?.address?.state ?? "";
    this.data.salesagent_company.status =
      salesAgentCompany_result?.companyData?.status ?? "";
    this.data.salesagent_company.street =
      salesAgentCompany_result?.companyData?.address?.street ?? "";

    this.data.salesagent_company.pointsgeneralsheet =
      salesAgentCompany_result?.points?.points_general_sheet ?? 0;
    this.data.salesagent_company.googlerating = airtable.round(
      salesAgentCompany_result?.pagerank_googlepresence ?? 0,
      1
    );
    this.data.salesagent_company.trademarkpoints =
      salesAgentCompany_result?.points?.points_trademarks +
        salesAgentCompany_result?.points?.points_financials_trademarks ?? 0;
    this.data.salesagent_company.financialspublicationspoints =
      salesAgentCompany_result?.points?.points_financials_publications ?? 0;
    this.data.salesagent_company.financialspoints =
      salesAgentCompany_result?.points?.points_financials ?? 0;
    this.data.salesagent_company.basicsheetpoints =
      salesAgentCompany_result?.points?.points_basicsheet ?? 0;
    this.data.salesagent_company.shareholderlistpoints =
      salesAgentCompany_result?.points?.points_shareholderlist ?? 0;
    this.data.salesagent_company.statutepoints =
      salesAgentCompany_result?.points?.points_statute ?? 0;
    this.data.salesagent_company.bafinpoints =
      salesAgentCompany_result?.points?.points_baFin ?? 0;
    this.data.salesagent_company.points_total =
      salesAgentCompany_result?.points?.sumOfPoints ?? 0;

    this.data.salesagent_company.ceo_entrepreneurship =
      salesAgentCompany_result?.ceos?.reduce(
        (previousValue, currentValue) =>
          `${previousValue + currentValue?.entrepreneurship}; `,
        ""
      );

    // eslint-disable-next-line array-callback-return, consistent-return
    let salescomp2 = salesAgentCompany_result?.ceos?.map((ceo) => {
      if (ceo.active === true) {
        return ceo.ceo_full_name;
      }
    });
    if (salescomp2 === []) {
      salescomp2 = salesAgentCompany_result?.ceos?.map((ceo) => {
        return ceo.ceo_full_name;
      })[0];
    }
    salescomp2 = salescomp2.filter((element) => {
      return element !== undefined;
    });

    const salescompString = salescomp2.toString().split(",").join(", ");

    this.data.salesagent_company.ceoName = salescompString;

    this.data.salesagent_company.financials =
      salesAgentCompany_result?.financials?.map((financial) => {
        // eslint-disable-next-line no-param-reassign
        delete financial?.source;
        return financial;
      });

    this.data.salesagent_company.foundingDuration =
      salesAgentCompany_result?.company_duration ?? "";
    this.data.salesagent_company.foundingDate =
      salesAgentCompany_result?.company_founding_date ?? "";

    this.data.salesagent_company.pdfs = salesAgentCompany_result?.pdfs ?? [];

    this.data.salesagent_company.warnungenBafin =
      salesAgentCompany_result.baFin_warning ?? "";

    this.data.salesagent_company.warnungenBafin =
      salesAgentCompany_result?.baFin_warning ?? "";

    this.data.salesagent_company.baffLink = "test";

    this.data.salesagent_company.warnungenVerb =
      salesAgentCompany_result?.warnungenVerb ?? "";
    this.data.salesagent_company.bafinCount =
      salesAgentCompany_result?.warnungenBafCount ?? "";
    this.data.salesagent_company.verbCount =
      salesAgentCompany_result?.warnungenVerbCount ?? "";
    // sitas field nera gaunamas tai dabar tiesiog default reiksme palikta
    this.data.salesagent_company.creditworthiness = "positive";
  }

  async setSalesagentPersonData(person_result) {
    const result22 = await bafin.searchBaFinKeyword();
    const bafinWarning = await bafin.checkKeywordsInBaFinNews(result22, [
      person_result.ceo_full_name,
    ]);

    this.data.salesagent_person.ceo_entrepreneurship =
      person_result?.entrepreneurship ?? "";
    this.data.salesagent_person.associated_companies_count =
      person_result?.other_compnies_count ?? "";
    this.data.salesagent_person.liquidated_companies_count =
      person_result?.liquidated ?? "";
    this.data.salesagent_person.creditworthiness = "positive";
    this.data.salesagent_person.personAndCompanies = formCeoJSONForPDF([
      person_result,
    ]);
    this.data.salesagent_person.warnungenBafin = bafinWarning.bafin;
    this.data.salesagent_person.warnungenVerb = bafinWarning.verbaucher;
    this.data.salesagent_person.bafinCount = bafinWarning.bafinCount;
    this.data.salesagent_person.verbCount = bafinWarning.verbaucherCount;
    this.data.salesagent_person.name = person_result.name;
    this.data.salesagent_person.lastName = person_result.lastName;
    this.data.salesagent_person.city = person_result.city;
    this.data.salesagent_person.birthdate = person_result.birthday;
  }

  setSalesagentByitselfData(text, bafinWarning) {
    this.data.salesagent_byitself.salesagencyText = text;
    this.data.salesagent_byitself.warnungenBafin = bafinWarning;
  }

  setGenertedPdf(pdfUrl) {
    this.data.generatedPdf = pdfUrl;
  }

  setMergedPdf(pdfUrl) {
    this.data.mergedPdf = pdfUrl;
  }

  setMarquardtProjectId(id) {
    this.data.marquardt_project = id ?? null;
  }

  setPaymentDetailsId(id) {
    this.data.payment_details = id ?? null;
  }

  setAnalysisID(
    id,
    ISnew,
    companyID,
    pointsID,
    documentsID,
    analysisID,
    salesAgentCompanyID,
    personID,
    SalesAgentpersonID,
    salesagentbyitselfID,
    investmentOffr
  ) {
    this.data.ID = id;
    this.data.isNew = ISnew;
    this.data.marquardt_analysisID = analysisID;
    this.data.marquardt_pointsID = pointsID;
    this.data.marquardt_companyID = companyID;
    this.data.marquardt_documentsID = documentsID;
    this.data.marquardt_salesAgentCompanyID = salesAgentCompanyID;
    this.data.marquardt_personID = personID;
    this.data.marquardt_SalesAgentbyitselfID = salesagentbyitselfID;
    this.data.marquardt_SalesAgentpersonID = SalesAgentpersonID;
    this.data.investmentOffer = investmentOffr;
  }
};
