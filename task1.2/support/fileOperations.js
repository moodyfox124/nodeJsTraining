import fs from 'fs';
import csv from 'csvtojson';
import { pipeline } from 'stream';

const removeFile = (path) => {
  try {
    if (fs.existsSync(path)) {
      try {
        console.log(`File ${path} exists.`);
        fs.unlinkSync(path);
        console.log(`${path} was deleted`);
      } catch (err) {
        return console.error(`Deleting failed.\n${err.message}`);
      }
    }
  } catch (err) {
    return console.error(`Error occurred while checking file existence.\n${err}`)
  }
}

const readIntoRamTransformAndWrite = (readPath, writePath) => {
  removeFile(writePath);
  fs.readFile(readPath, { encoding: 'utf-8' }, (err, data) => {
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
          fs.writeFile(writePath, data, { flag: 'a' }, (err) => {
            if (err) return console.error(`Writing failed.\n${err.message}`);
          });
        });
        console.log(`Writing ended.`);
      });
  });
}

const readTransformAndWriteUsingPipelineByChunks = (readPath, writePath) => {
  const readStream = fs.createReadStream(readPath, { encoding: 'utf-8' });
  const writeStream = fs.createWriteStream(writePath, { encoding: 'utf-8' });
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
}

export { readIntoRamTransformAndWrite, readTransformAndWriteUsingPipelineByChunks, removeFile }
