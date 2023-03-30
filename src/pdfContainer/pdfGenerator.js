/* eslint-disable operator-linebreak */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { send } = require("process");

const { downloadPDFs2 } = require("../callContainer/pdfMonkey");
const { generatePdf } = require("../callContainer/pdfMonkey");

exports.grandGenerator = async function (responseData, sharesSellerType) {
  let pdfUrl1;
  let pdfUrl2;
  let pdfUrl3;
  const pdfUrlHolder = [];
  try {
    responseData.data.company.related_ceos_count =
      responseData.data.company.ceos.length;
    pdfUrl1 = await generatePdf(
      responseData.data,
      process.env.PDF_MONKEY_COMPANY
    );
    pdfUrlHolder.push(pdfUrl1);
    console.log(`--- CEO FILE COUNT: ${responseData.data.company.ceos.length}`);
    if (responseData.data.company.ceos.length > 400) {
      console.log("--- More than 400 ceo files");
      const responseCopy = JSON.parse(JSON.stringify(responseData.data));
      const xx = responseCopy.company.ceos.splice(0, 4);
      responseCopy.company.ceos = xx;

      if (responseCopy.company.ceos.length !== 0) {
        pdfUrl2 = await generatePdf(
          responseCopy,
          process.env.PDF_CEO_FIRST_PAGE
        );
        pdfUrlHolder.push(pdfUrl2);
      }
      const responseCopy25 = JSON.parse(JSON.stringify(responseData.data));
      const sendDataMain = [];
      let sendData = [];

      let a = 1;
      for (let i = 0; i < responseCopy25.company.ceos.length; i += 1) {
        sendData.push(responseCopy25.company.ceos[i]);
        if (a === 100) {
          sendDataMain.push(sendData);
          sendData = [];
          a = 0;
        }
        if (i === responseCopy25.company.ceos.length - 1) {
          sendDataMain.push(sendData);
        }
        a += 1;
      }

      let ceosStartAt = 0;
      for (let j = 0; j < sendDataMain.length; j += 1) {
        const responseCopy1 = JSON.parse(JSON.stringify(responseData.data));

        if (j === 0) {
          sendDataMain[j].splice(0, 4);
          ceosStartAt = 0;
          responseCopy1.company.previous_ceos_count = ceosStartAt;
          responseCopy1.company.ceos = sendDataMain[j];
        } else {
          responseCopy1.company.ceos = sendDataMain[j];
          ceosStartAt += sendDataMain[j - 1].length;
          responseCopy1.company.previous_ceos_count = ceosStartAt;
        }

        if (j === 1) {
          fs.writeFile(
            "./newLog.txt",
            JSON.stringify(responseCopy1, null, 2),
            (err) => {
              if (err) {
                console.error(err);
              }
            }
          );
        }
        if (responseCopy1.company.ceos.length !== 0) {
          const pdfUrl = await generatePdf(
            responseCopy1,
            process.env.PDF_CEO_BIG_PAGE
          );
          pdfUrlHolder.push(pdfUrl);
        }
      }
    } else {
      console.log("LESS THAN 400 RELATED ITEMSs");
      pdfUrl2 = await generatePdf(
        responseData.data,
        process.env.PDF_MONKEY_CEO
      );
      pdfUrlHolder.push(pdfUrl2);
    }
    if (sharesSellerType === "company" || sharesSellerType === "person") {
      console.log("---Extra analysis will be added");
      pdfUrl3 = await generatePdf(
        responseData.data,
        process.env.PDF_MONKEY_SALESAGENT
      );
      pdfUrlHolder.push(pdfUrl3);
    }
  } catch (e) {
    console.log(e);
  }
  const nameArray = [];
  try {
    for (let i = 0; i < pdfUrlHolder.length; i += 1) {
      const namePDF = uuidv4();
      nameArray.push(namePDF);
      await downloadPDFs2(pdfUrlHolder[i], namePDF);
    }
  } catch (e) {
    console.log(e);
  }
  return nameArray;
};
