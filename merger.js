const PDFMerger = require("pdf-merger-js");

exports.mergeFunction = async function (nameArray, mergedName) {
  const merger = new PDFMerger();
  return new Promise((resolve) => {
    (async () => {
      for (let i = 0; i < nameArray.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await merger.add(`./mainPdfs/${nameArray[i]}.pdf`);
      }
      await merger.save(`./mainPdfs/${mergedName}.pdf`);
      console.log("---Dossier merged");

      resolve();
      // Export the merged PDF as a nodejs Buffer
      // const mergedPdfBuffer = await merger.saveAsBuffer();
      // fs.writeSync('merged.pdf', mergedPdfBuffer);
    })();
  });
};
