/* eslint-disable no-continue */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable func-names */

exports.filterUnique = function (array) {
  const unique = [];
  const checked = {};

  for (let i = 0; i < array.length; i += 1) {
    const stringified = JSON.stringify(array[i]);

    if (checked[stringified]) {
      // eslint-disable-next-line no-continue
      continue;
    }

    unique.push(array[i]);
    checked[stringified] = true;
  }

  return unique;
};

exports.getFinancials = function (universalCompanyData) {
  const financials = universalCompanyData?.history?.financials ?? [];

  if (universalCompanyData?.financials !== undefined) {
    financials.push(universalCompanyData.financials);
  }

  const uniqueFinancials = this.filterUnique(financials)?.sort((a, b) => {
    if (new Date(a.date) >= new Date(b.date)) return -1;
    return 1;
  });
  return uniqueFinancials;
};

exports.calculateYears = function (companyData) {
  if (companyData?.events === undefined) return null;

  if (companyData?.events?.items === undefined) return null;

  const d = companyData.events.items.filter(
    (item) => item?.type === "NewCompany"
  )[0];

  if (d === undefined) {
    const d11 = new Date(
      companyData.events.items[companyData.events.items.length - 1].date
    );
    const d22 = new Date();
    const years2 = new Date(d22 - d11).getFullYear() - 1970;
    return years2;
  }
  const d1 = new Date(d.date);
  const d2 = new Date();
  const years = new Date(d2 - d1).getFullYear() - 1970;
  return years;
};

exports.get_stocks_capital = function (companyData) {
  if (companyData?.capital === undefined) return "null";

  if (companyData?.capital?.items === undefined) return "null";

  const item = companyData.capital.items.filter(
    (itm) => itm?.name === "Stamm-/Grundkapital"
  )[0];

  if (item === undefined) {
    return "null";
  }
  return item?.formattedValue;
};

exports.get_contacts = function (companyData) {
  let allItems = [];
  const address = companyData?.address?.formattedValue ?? " ";

  let contact = "";

  if (companyData?.extras === undefined) return address;

  companyData.extras.forEach((extra) => {
    if (extra?.items !== undefined) {
      allItems = allItems.concat(extra.items);
    }
  });

  const itemPhone = allItems.filter((item) => item.id === "phone")[0];
  const itemEmail = allItems.filter((item) => item.id === "email")[0];
  const itemUrl = allItems.filter((item) => item.id === "url")[0];

  if (itemPhone?.value !== undefined) {
    contact = `, ${itemPhone.value}`;
  } else if (itemEmail?.value !== undefined) {
    contact = `, ${itemEmail.value}`;
  } else if (itemUrl?.value !== undefined) {
    contact = `, ${itemUrl.value}`;
  } else {
    contact = "";
  }

  return address + contact;
};

exports.getFoundingDate = function (companyData) {
  if (companyData?.events === undefined) return null;

  if (companyData?.events?.items === undefined) return null;

  const d = companyData.events.items.filter(
    (item) => item?.type === "NewCompany"
  )[0];

  if (d === undefined) {
    return companyData.events.items[companyData.events.items.length - 1].date;
  }
  return d.date;
};

exports.lastFinancialEarningsKasseVersion = function (universalCompanyData) {
  if (universalCompanyData?.financials?.items !== undefined) {
    if (universalCompanyData.history.financials !== undefined) {
      const dateArray = [];

      for (ie in universalCompanyData.history.financials) {
        if (universalCompanyData.history.financials[ie].date !== undefined) {
          dateArray.push(
            new Date(universalCompanyData.history.financials[ie].date)
          );
        }
      }

      const maxDate = dateArray.sort((first, second) => second - first)[0];
      if (new Date(universalCompanyData.financials.date) < maxDate) {
        for (const x of universalCompanyData.history.financials) {
          if (x.date === maxDate.toISOString().split("T")[0]) {
            let z = false;
            let hld;

            for (const y of x.items) {
              if (y.id === "Cash") {
                z = true;
                hld = y;
                break;
              }
            }
            if (z === true) {
              return hld.formattedValue;
            }
            return "null";
          }
        }
      } else {
        return (
          universalCompanyData?.financials?.items?.filter(
            (item) => item?.id === "Cash"
          )[0]?.formattedValue ?? "null"
        );
      }
    } else {
      const financials = this.getFinancials(universalCompanyData);
      return (
        financials[0]?.items?.filter((item) => item?.id === "Cash")[0]
          ?.formattedValue ?? "null"
      );
    }
  }
  return null;
};

exports.lastFinancialEarnings = function (universalCompanyData) {
  if (universalCompanyData?.financials?.items !== undefined) {
    if (universalCompanyData.history.financials !== undefined) {
      const dateArray = [];
      // eslint-disable-next-line no-restricted-syntax
      for (ie in universalCompanyData.history.financials) {
        if (universalCompanyData.history.financials[ie].date !== undefined) {
          dateArray.push(
            new Date(universalCompanyData.history.financials[ie].date)
          );
        }
      }

      const maxDate = dateArray.sort((first, second) => second - first)[0];
      if (new Date(universalCompanyData.financials.date) < maxDate) {
        // eslint-disable-next-line no-restricted-syntax
        for (const x of universalCompanyData.history.financials) {
          if (x.date === maxDate.toISOString().split("T")[0]) {
            let z = false;
            let hld;

            // eslint-disable-next-line no-restricted-syntax
            for (const y of x.items) {
              if (y.id === "Earnings") {
                z = true;
                hld = y;
                break;
              }
            }
            if (z === true) {
              return hld.formattedValue;
            }
            return "null";
          }
        }
      } else {
        return (
          universalCompanyData?.financials?.items?.filter(
            (item) => item?.id === "Earnings"
          )[0]?.formattedValue ?? "null"
        );
      }
    } else {
      const financials = this.getFinancials(universalCompanyData);
      return (
        financials[0]?.items?.filter((item) => item?.id === "Earnings")[0]
          ?.formattedValue ?? "null"
      );
    }
  }
  return null;
};

exports.checkForDuplicateFinancials = function (financialsValueOrg) {
  let financialsValue = financialsValueOrg;
  const defSafe = [];
  const defSafeNumbers = [];
  for (resp in financialsValue) {
    for (let i = 0; i < financialsValue[resp].items.length; i += 1) {
      if (financialsValue[resp].items[i].name === "Gewinn") {
        defSafe.push(financialsValue[resp]);
        defSafeNumbers.push(resp);
      }
    }
  }
  const defSafeNumbersNumb = defSafeNumbers.map(Number);
  if (defSafe !== []) {
    for (let g = 0; g < defSafe.length; g += 1) {
      for (let i = 1; i < financialsValue.length; i += 1) {
        if (financialsValue[i].date === defSafe[g].date) {
          if (i !== defSafeNumbersNumb[g]) {
            financialsValue[i] = "repating_val";
          }
        }
      }
    }
  }

  let filteredArray = [];
  filteredArray = financialsValue.filter(
    (financial) => financial !== "repating_val"
  );
  financialsValue = filteredArray;
  const filterForKasse = [];
  const filterForKasseNumbers = [];
  for (resp2 in financialsValue) {
    const index = financialsValue[resp2].items.findIndex(
      (obj) => obj.name === "Gewinn"
    );
    if (index === -1) {
      const index2 = financialsValue[resp2].items.findIndex(
        (obj) => obj.name === "Kassenbestand"
      );
      if (index2 !== -1) {
        filterForKasse.push(financialsValue[resp2]);
        filterForKasseNumbers.push(resp2);
      }
    }
  }
  const numberArrayKasse = filterForKasseNumbers.map(Number);
  if (filterForKasse !== []) {
    for (let e = 0; e < filterForKasse.length; e += 1) {
      for (let i = 0; i < financialsValue.length; i += 1) {
        if (financialsValue[i].date === filterForKasse[e].date) {
          if (!numberArrayKasse.includes(i)) {
            financialsValue[i] = "repating_val";
          }
        }
      }
    }
  }
  financialsValue = financialsValue.filter(
    (financial) => financial !== "repating_val"
  );

  for (let f = 0; f < financialsValue.length; f += 1) {
    for (let i = f + 1; i < financialsValue.length; i += 1) {
      if (financialsValue[i].date === financialsValue[f].date) {
        if (financialsValue[i].items.length > financialsValue[f].items.length) {
          financialsValue[f] = "repating_val";
        } else {
          financialsValue[i] = "repating_val";
        }
      }
    }
  }

  filteredArray2 = financialsValue.filter(
    (financial) => financial !== "repating_val"
  );
  financialsValue = filteredArray2;
  return financialsValue;
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

exports.getTechTrademarks = function (universalCompanyData) {
  if (universalCompanyData?.events?.items === undefined) {
    return "";
  }

  const withArke = this.getTradeMarkDescriptions(universalCompanyData);

  let trademarksT = "";
  withArke.forEach((item) => {
    trademarksT += `${item}\n`;
  });

  return trademarksT;
};

exports.getTradeMarkDescriptions = function (universalCompanyData) {
  if (
    universalCompanyData?.events?.items === undefined ||
    !Array.isArray(universalCompanyData?.events?.items)
  ) {
    return [];
  }

  const descriptions = universalCompanyData?.events?.items.map(
    (item) => item.description
  );

  const uniqueDescriptions = filterUniqueStrings(descriptions);

  const withArke = uniqueDescriptions.filter(
    (item) => item.includes("Wort-/Bildmarke:") || item.includes("Wortmarke:")
  );
  // eslint-disable-next-line no-confusing-arrow
  const descriptionsSplited = withArke.map((item) =>
    item.split(": ").length === 2 ? item.split(": ")[1] : item
  );

  return descriptionsSplited;
};
