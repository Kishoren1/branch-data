const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(
  __dirname,
  "updated_data",
  "combined_data.json"
);
const outputFilePath = path.join(
  __dirname,
  "compressed_data",
  "compressed_data.json.gz"
);

function compressFile(inputFilePath, outputFilePath) {
  const inputData = fs.readFileSync(inputFilePath);

  const compressedData = zlib.gzipSync(inputData);

  fs.writeFileSync(outputFilePath, compressedData);

  console.log(`Successfully compressed ${inputFilePath} to ${outputFilePath}`);
}

const outputDir = path.dirname(outputFilePath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

compressFile(inputFilePath, outputFilePath);
