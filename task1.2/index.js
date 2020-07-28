import fs from 'fs';
import csv from 'csvtojson';
import { pipeline } from 'stream';

const pathToCsv = __dirname + '/csv/example.csv';
const outFile = __dirname + '/txt/csvOutput.txt';

const readStream = fs.createReadStream(pathToCsv, { encoding: 'utf-8' });
const writeStream = fs.createWriteStream(outFile, { encoding: 'utf-8' });


pipeline(
  readStream,
  csv(),
  writeStream,
  (err) => {
    if (err) {
      console.error('Pipeline failed', err)
    } else {
      console.log('Pipeline succeeded')
    }
  }
);

readStream.on('error', (err) => {
  console.error(`> Error occured while creating readable stream.\n`);
  throw err;
});

writeStream.on('error', (err) => {
  console.error(`> Error occured while creating writable stream.\n`);
  throw err;
});

// csv()
//   .fromFile(pathToCsv)
//   .subscribe((json) => {
//     return new Promise((resolve, reject) => {
//       const data = JSON.stringify(json) + '\n';
//       fs.writeFile('./out.txt', data, { flag: 'a' }, (err) => {
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
