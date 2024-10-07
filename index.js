const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data");
const outputFolder = path.join(__dirname, "updated_data");

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

let combinedData = [];

fs.readdir(dataFolder, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  let fileReadCount = 0;

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const filePath = path.join(dataFolder, file);
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        try {
          const jsonObject = JSON.parse(data);
          const jsonArray = Object.values(jsonObject);
          combinedData = combinedData.concat(jsonArray);
        } catch (parseErr) {
          console.error("Error parsing JSON:", parseErr);
        }

        fileReadCount++;
        if (fileReadCount === files.length) {
          const outputFilePath = path.join(outputFolder, "combined_data.json");
          fs.writeFile(outputFilePath, JSON.stringify(combinedData), (err) => {
            if (err) {
              console.error("Error writing combined file:", err);
              return;
            }
            console.log(`Combined data written to ${outputFilePath}`);
          });
        }
      });
    }
  });
});
