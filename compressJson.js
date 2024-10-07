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
  "updated_data.json.gz"
);

function compressFile(inputFilePath, outputFilePath) {
  const inputData = fs.readFileSync(inputFilePath);

  const compressedData = zlib.deflateSync(inputData, {
    level: 9,
    flush: zlib.Z_FINISH,
  });

  fs.writeFileSync(outputFilePath, compressedData);

  console.log(`Compressed ${inputFilePath} to ${outputFilePath}`);
}

const outputDir = path.dirname(outputFilePath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

compressFile(inputFilePath, outputFilePath);
