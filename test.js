const fs = require("fs").promises;
const path = require("path");
const zlib = require("zlib");

const filePath = path.join(
  __dirname,
  "compressed_data",
  "compressed_data.json.gz"
);

async function decompressGzip(filePath) {
  const compressedData = await fs.readFile(filePath);
  return new Promise((resolve, reject) => {
    zlib.gunzip(compressedData, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      resolve(buffer.toString("utf-8"));
    });
  });
}

(async () => {
  try {
    const decompressedData = await decompressGzip(filePath);

    const branchData = JSON.parse(decompressedData);

    const searchByIFSC = (ifscCode) => {
      return branchData.find((branch) => branch.IFSC === ifscCode);
    };

    const searchByMICR = (micrCode) => {
      return branchData.filter((branch) => branch.MICR === micrCode);
    };

    const searchByState = (stateName) => {
      return branchData.filter(
        (branch) =>
          branch.STATE && branch.STATE.toLowerCase() === stateName.toLowerCase()
      );
    };

    const searchByCity = (cityName) => {
      return branchData.filter(
        (branch) =>
          branch.CITY && branch.CITY.toLowerCase() === cityName.toLowerCase()
      );
    };

    const searchByBranch = (branchName) => {
      return branchData.filter((branch) => {
        return (
          branch.BRANCH &&
          branch.BRANCH.toLowerCase().includes(branchName.toLowerCase())
        );
      });
    };

    // Test search functions
    const ifscResult = searchByIFSC("ABNA0000001");
    const micrResults = searchByMICR("400098012");
    const stateResults = searchByState("KARNATAKA");
    const cityResults = searchByCity("MUMBAI");
    const branchResults = searchByBranch("RTGS-HO");

    // console.log("IFSC Search Result:", ifscResult);
    console.log("MICR Search Results:", micrResults);
    // console.log("State Search Results:", stateResults);
    // console.log("City Search Results:", cityResults);
    // console.log("Branch Search Results:", branchResults);
  } catch (err) {
    console.error("Error reading or processing data:", err);
  }
})();
