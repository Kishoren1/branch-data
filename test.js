const fs = require("fs").promises;
const path = require("path");

const dataFolder = path.join(__dirname, "updated_data");

const searchBranchData = async (searchType, searchValue) => {
  try {
    const files = await fs.readdir(dataFolder);

    let searchResults = [];

    for (const file of files) {
      const filePath = path.join(dataFolder, file);

      const fileContent = await fs.readFile(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);

      const filteredData = jsonData.filter((entry) => {
        return (
          entry[searchType] &&
          entry[searchType].toString().toUpperCase() ===
            searchValue.toUpperCase()
        );
      });

      searchResults = searchResults.concat(filteredData);
    }

    return searchResults.length > 0
      ? searchResults
      : `No results found for ${searchType}: ${searchValue}`;
  } catch (err) {
    console.error(`Error searching for ${searchType}:`, err);
    return null;
  }
};

(async () => {
  try {
    // const searchTypeIFSC = "IFSC";
    // const searchValueIFSC = "UTIB0001077";
    // const resultIFSC = await searchBranchData(searchTypeIFSC, searchValueIFSC);
    // console.log(`Results for IFSC (${searchValueIFSC}):`, resultIFSC);

    // const searchTypeMICR = "MICR";
    // const searchValueMICR = "400065001";
    // const resultMICR = await searchBranchData(searchTypeMICR, searchValueMICR);
    // console.log(`Results for MICR (${searchValueMICR}):`, resultMICR);

    // const searchTypeState = "STATE";
    // const searchValueState = "MAHARASHTRA";
    // const resultState = await searchBranchData(
    //   searchTypeState,
    //   searchValueState
    // );
    // console.log(`Results for STATE (${searchValueState}):`, resultState);

    // const searchTypeCity = "CITY";
    // const searchValueCity = "MUMBAI";
    // const resultCity = await searchBranchData(searchTypeCity, searchValueCity);
    // console.log(`Results for CITY (${searchValueCity}):`, resultCity);

    const searchTypeBranch = "BRANCH";
    const searchValueBranch = "Abhyudaya Co-operative Bank IMPS";
    const resultBranch = await searchBranchData(
      searchTypeBranch,
      searchValueBranch
    );
    console.log(`Results for BRANCH (${searchValueBranch}):`, resultBranch);
  } catch (error) {
    console.error("Error during testing:", error);
  }
})();
