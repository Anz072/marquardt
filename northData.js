/* eslint-disable no-continue */
/* eslint-disable object-shorthand */
/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable func-names */
require("dotenv").config();

const fetch = (...args) =>
  // eslint-disable-next-line implicit-arrow-linebreak, no-shadow
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

function fetchNorthdata(url) {
  const init = {
    method: "GET",
    headers: {
      "X-Api-Key": process.env.NORTHDATA_KEY,
    },
  };

  return fetch(url, init)
    .then(CheckError)
    .then((data) => data)
    .catch(() => {
      const msg = `error fetching north data, \n url : ${url}`;
      throw msg;
    });
}

exports.getCompany = async function (name, address) {
  const url = `https://www.northdata.com/_api/company/v1/company?name=
  ${encodeURIComponent(name)}&address=${encodeURIComponent(address)}`;
  if (process.env.DEBUG === "true") {
    console.log(`northdata company data - ${url}`);
  }
  return fetchNorthdata(url);
};

exports.northUniversal = function (city, id) {
  const url = `https://www.northdata.de/_api/search/v1/universal?query=Amtsgericht
  ${encodeURIComponent(city)}${encodeURIComponent(id)}
  &sheets=true&financials=true&history=true&relations=true&mktgtech=true&extras=true&events=true`;
  return fetchNorthdata(url);
};

exports.northGetPerson = function (name, lastName, city, birthDay) {
  const url = `https://www.northdata.com/_api/person/v1/publications?firstName=${encodeURIComponent(
    name
  )}&lastName=${encodeURIComponent(lastName)}&address=${encodeURIComponent(
    city
  )}&birthDate=${encodeURIComponent(birthDay)}`;
  return fetchNorthdata(url);
};

exports.northShop = function (name, city) {
  const url = `https://www.northdata.com/_api/shop/v1/products?name=${name}&city=${city}`;
  return fetchNorthdata(url);
};

exports.northBuy = function (productId) {
  const url = `https://www.northdata.com/_api/shop/v1/buy?productId=${productId}`;
  return fetchNorthdata(url);
};

exports.northOrder = function (orderId) {
  const url = `https://www.northdata.de/_api/shop/v1/order?orderId=${orderId}`;
  return fetchNorthdata(url);
};

exports.getCeos = async function (universalCompanyData) {
  const related_persons = universalCompanyData.relatedPersons.items;
  for (let i = 0; i < related_persons.length; i += 1) {
    if (!related_persons[i].roles[0]?.demotion) {
      related_persons[i].active = true;
    }
  }

  const ceos_promises = [];

  related_persons.forEach((items) => {
    ceos_promises.push(
      this.getCEOsData(
        items?.person?.name?.firstName,
        items?.person?.name?.lastName,
        items?.person?.address?.city,
        items?.person?.birthDate,
        items?.active ?? false,
        items?.roles[0]?.name ?? ""
      )
    );
  });

  let ceos = [];

  if (ceos_promises.length > 0) {
    ceos = await Promise.all(ceos_promises);
  }
  return ceos;
};

function filterUniquePublishers(array) {
  const unique = [];
  const checked = {};

  for (let i = 0; i < array.length; i += 1) {
    const stringified = JSON.stringify(array[i].name);

    if (checked[stringified]) {
      continue;
    }

    unique.push(array[i]);
    checked[stringified] = true;
  }

  return unique;
}

exports.getCEOsData = async function (
  firstName,
  lastName,
  city,
  birthDate,
  active,
  role
) {
  let birthYear = "";

  try {
    let associated_Companies = [];
    let liquidated_count = null;
    let other_compnies_count = null;
    let userFound = false;

    if (birthDate !== undefined) {
      // eslint-disable-next-line prefer-template
      birthYear = " (*" + birthDate.split("-")[0] + ")";
    }

    if (
      firstName !== undefined &&
      lastName !== undefined &&
      city !== undefined &&
      birthDate !== undefined
    ) {
      const person = await this.northGetPerson(
        firstName,
        lastName,
        city,
        birthDate
      );
      if (person !== undefined) {
        const publishers = person.publications.map((item) => item.publisher);
        associated_Companies = filterUniquePublishers(publishers).map(
          (item) => ({
            name: item.name,
            address: item.address,
            subject: item.subject,
            status: item.status,
          })
        );
        liquidated_count = associated_Companies
          .map((item) => item.status)
          .filter(
            (status) => status === "liquidation" || status === "terminated"
          ).length;
        other_compnies_count = associated_Companies?.length;
        userFound = true;
      }
    }

    const agregate = {
      personFound: userFound,
      role: role ?? "",
      ceo_full_name: `${firstName} ${lastName}`,
      name: firstName,
      lastName: lastName,
      birthday: birthDate,
      birthYear: birthYear,
      city: city,
      ceo_info: `${firstName} ${lastName} ${birthDate}, ${city}`,
      associated_Companies: associated_Companies,
      liquidated: liquidated_count,
      other_compnies_count: other_compnies_count,
      active: active ?? false,
      entrepreneurship: `${firstName} ${lastName} ${birthYear} : ${
        other_compnies_count ?? 0
      } Unternehmen registriert, davon ${
        liquidated_count ?? 0
      } insolvent/liquidiert oder in Liquidation befindlich.`,
    };

    return agregate;
  } catch (e) {
    return {
      role: role ?? "",
      ceo_full_name: `${firstName} ${lastName}`,
      name: firstName,
      lastName: lastName,
      birthday: birthDate,
      birthYear: birthYear,
      city: city,
      ceo_info: `${firstName} ${lastName} ${birthDate}, ${city}`,
      associated_Companies: [],
      liquidated: null,
      other_compnies_count: null,
      active: active,
      entrepreneurship: "",
    };
  }
};
