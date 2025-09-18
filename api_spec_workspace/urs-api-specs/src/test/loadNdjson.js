const fs = require('fs');
const readline = require('readline');

/**
 * Loads a newline-delimited JSON file and logs each row.
 * @param {string} filePath - The path to the NDJSON file.
 * @returns {Promise<void>} A promise that resolves when the file has been processed.
 */
function loadNdjsonAndLog(filePath) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      try {
        if (line) {
          const jsonRow = JSON.parse(line);
          console.log(jsonRow);
        }
      } catch (error) {
        // Log the error and continue processing the rest of the file.
        console.error(`Error parsing JSON line in ${filePath}:`, error);
        console.error(`Problematic line: ${line}`);
      }
    });

    rl.on('close', () => {
      console.log(`Finished reading the file: ${filePath}`);
      resolve();
    });

    rl.on('error', (err) => {
      console.error(`Error reading file ${filePath}:`, err);
      reject(err);
    });
  });
}

module.exports = loadNdjsonAndLog;
