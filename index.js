const fs = require("fs").promises;
const path = require("path");

const dataFolder = path.join(__dirname, "data");
const outputFolder = path.join(__dirname, "updated_data");

(async () => {
  try {
    await fs.mkdir(outputFolder, { recursive: true });

    const files = await fs.readdir(dataFolder);
    let combinedData = [];

    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(dataFolder, file);
        const data = await fs.readFile(filePath, "utf-8");
        try {
          const jsonData = JSON.parse(data);

          if (Array.isArray(jsonData)) {
            combinedData = combinedData.concat(jsonData);
          } else {
            combinedData = combinedData.concat(Object.values(jsonData));
          }
        } catch (err) {
          console.error(`Error parsing JSON in file ${file}:`, err);
        }
      })
    );

    const outputFilePath = path.join(outputFolder, "combined_data.json");
    await fs.writeFile(
      outputFilePath,
      JSON.stringify(combinedData, null, 2),
      "utf-8"
    );

    console.log(`Combined data successfully written to ${outputFilePath}`);
  } catch (err) {
    console.error("Error processing files:", err);
  }
})();
