/* eslint-disable comma-dangle */
/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable no-continue */
require("dotenv").config();

const fetch = (...args) =>
  // eslint-disable-next-line implicit-arrow-linebreak, no-shadow
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function filterUniqueStrings(array) {
  const unique = [];
  const checked = {};

  for (let i = 0; i < array.length; i += 1) {
    if (checked[array[i]]) {
      continue;
    }
    unique.push(array[i]);
    checked[array[i]] = true;
  }
  return unique;
}

function getCurrentDateString() {
  const d = new Date();

  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const yy = d.getFullYear();

  return `${mm.toString()}/${dd.toString()}/${yy.toString()}`;
}

function CheckError(response) {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  }
  if (response.status === 404) {
    return undefined;
  }
  throw new Error(response.statusText);
}

function fetchScaleserpData(url) {
  const init = {
    method: "GET",
  };

  return fetch(url, init)
    .then(CheckError)
    .then((data) => data)
    .catch((e) => {
      const msg = `error fetching Scaleserp data, \n url : ${url}`;
      console.log(e);
      throw msg;
    });
}

function scaleserpcall1(q) {
  const currentDate = getCurrentDateString();
  const url = `https://api.scaleserp.com/search?api_key=${
    process.env.SCALESERP_KEY
  }&q=${encodeURIComponent(
    q
  )}&google_domain=google.de&location=Germany&gl=de&hl=de&sort_by=relevance&time_period=custom&time_period_min=03/01/2006&time_period_max=${currentDate}&output=json`;
  return fetchScaleserpData(url);
}

async function makeOpenPageRankRequest(domains) {
  if (domains === undefined) {
    console.log("domains not found");
    return false;
  }

  if (process.env.OPENPAGERANK_KEY === undefined) {
    console.log("openpagerank api is missing");
    return false;
  }

  const joinedDomains = domains.reduce((string, domain, index) => {
    const separator = domains.length !== index + 1 ? "&" : "";
    return `${string}domains[]=${domain}${separator}`;
  }, "");

  const params = joinedDomains !== undefined ? `?${joinedDomains}` : "";
  const url = `https://openpagerank.com/api/v1.0/getPageRank${params}`;
  try {
    const result = await fetch(url, {
      headers: {
        "API-OPR": process.env.OPENPAGERANK_KEY,
      },
    });

    return await result.json();
  } catch (e) {
    return false;
  }
}

function getTradeMarkDescriptions(universalCompanyData) {
  if (
    // eslint-disable-next-line operator-linebreak
    universalCompanyData?.events?.items === undefined ||
    !Array.isArray(universalCompanyData?.events?.items)
  ) {
    return [];
  }

  const descriptions = universalCompanyData?.events?.items.map(
    (item) => item.description
  );

  const uniqueDescriptions = filterUniqueStrings(descriptions);

  const with_arke = uniqueDescriptions.filter(
    (item) => item.includes("Wort-/Bildmarke:") || item.includes("Wortmarke:")
  );
  // eslint-disable-next-line no-confusing-arrow
  const descriptions_splited = with_arke.map(
    (item) => (item.split(": ").length === 2 ? item.split(": ")[1] : item)
    // eslint-disable-next-line function-paren-newline
  );

  return descriptions_splited;
}

exports.getAvarageDomainRanking = async function (universalCompanyData) {
  try {
    const trademarks = getTradeMarkDescriptions(universalCompanyData);

    const promises = [];

    trademarks.forEach((item) => {
      promises.push(scaleserpcall1(item));
    });

    const scaleserpResults = await Promise.all(promises);

    const domainsRankingsPromises = [];

    scaleserpResults.forEach((result) => {
      if (result?.request_info?.success) {
        if (result?.organic_results !== undefined) {
          // eslint-disable-next-line no-confusing-arrow
          const organic_results_sorted = result.organic_results.sort(
            (a, b) => (a.position > b.position ? 1 : -1)
            // eslint-disable-next-line function-paren-newline
          );
          const top_4_domains = organic_results_sorted
            .slice(0, 4)
            .map((item) => item.domain ?? null)
            .filter((item) => item != null);

          domainsRankingsPromises.push(makeOpenPageRankRequest(top_4_domains));
        }
      }
    });

    const rankings = await Promise.all(domainsRankingsPromises);

    let ratings_sum = 0;
    let ratings_count = 0;
    rankings.forEach((result) => {
      if (result?.status_code === 200) {
        result?.response?.forEach((responseObject) => {
          if (responseObject?.status_code === 200) {
            // eslint-disable-next-line no-unsafe-optional-chaining
            ratings_sum += responseObject?.page_rank_decimal;
            ratings_count += 1;
          }
        });
      }
    });

    const avarage = ratings_count !== 0 ? ratings_sum / ratings_count : 0; // save this value;
    return avarage;
  } catch (e) {
    return 0;
  }
};
