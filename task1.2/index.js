import fs from 'fs';
import csv from 'csvtojson';
import { pipeline } from 'stream';
import { removeFile } from './utils/fileOperations';
const pathToCsv = __dirname + '/csv/example.csv';
const outFile = __dirname + '/txt/csvOutput.txt';
const outFileFullyLoadedIntoRam = __dirname + '/txt/csvOutputFullyIntoRam.txt';

const readStream = fs.createReadStream(pathToCsv, { encoding: 'utf-8' });
const writeStream = fs.createWriteStream(outFile, { encoding: 'utf-8' });

removeFile(outFileFullyLoadedIntoRam);
fs.readFile(pathToCsv, { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    return console.error(`Reading failed. ${err.message}`);
  }
  console.log(`Reading ended.`)
  let readedFullyFile = data;
  csv()
    .on("error", (err) => {
      console.error(`Converting failed.\n${err.message}`);
    })
    .fromString(readedFullyFile)
    .then((json) => {
      json.forEach((obj) => {
        const data = JSON.stringify(obj) + '\n';
        fs.writeFile(outFileFullyLoadedIntoRam, data, { flag: 'a' }, (err) => {
          if (err) return console.error(`Writing failed.\n${err.message}`);
        });
      });
      console.log(`Writing ended.`);
    });
});


pipeline(
  readStream,
  csv(),
  writeStream,
  (err) => {
    if (err) {
      return console.error(`Pipeline failed. ${err.message}`);
    } else {
      console.log('Pipeline succeeded')
    }
  }
);

readStream.on('close', () => {
  console.log(`Reading for readable stream ended.`)
});

readStream.on('error', (err) => {
  return console.error(`> Error occurred while creating readable stream.\n${err.message}`);
});

writeStream.on('close', () => {
  console.log(`Writing for writable stream ended.`)
});

writeStream.on('error', (err) => {
  return console.error(`> Error occurred while creating writable stream.\n${err.message}`);
});

// csv()
//   .fromFile(pathToCsv)
//   .subscribe((json) => {
//     return new Promise((resolve, reject) => {
//       const data = JSON.stringify(json) + '\n';
//       fs.writeFile(outFileFullyLoadedIntoRam, data, { flag: 'a' }, (err) => {
//         if (err) {
//           console.error(`Failed to write. Error: ${err}`);
//           throw err;
//         }
//       });
//       resolve();
//     })
//   }, (err) => console.error(`Failed to read. Error: ${err}`), (data) => {
//     console.log(`File written`);
//   });
