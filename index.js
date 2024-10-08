const fs = require("fs").promises;
const path = require("path");

const dataFolder = path.join(__dirname, "data");
const outputFolder = path.join(__dirname, "updated_data");

(async () => {
  try {
    await fs.mkdir(outputFolder, { recursive: true });

    const files = await fs.readdir(dataFolder);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(dataFolder, file);
        const data = await fs.readFile(filePath, "utf-8");
        try {
          const jsonData = JSON.parse(data);
          const outputFilePath = path.join(outputFolder, file);

          const formattedData = Array.isArray(jsonData)
            ? jsonData
            : Object.values(jsonData);

          await fs.writeFile(
            outputFilePath,
            JSON.stringify(formattedData),
            "utf-8"
          );

          console.log(`Successfully written ${file} to ${outputFilePath}`);
        } catch (err) {
          console.error(`Error parsing JSON in file ${file}:`, err);
        }
      })
    );

    console.log("All files have been processed successfully.");
  } catch (err) {
    console.error("Error processing files:", err);
  }
})();
