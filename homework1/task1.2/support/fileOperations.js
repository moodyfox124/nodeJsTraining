import fs from 'fs';
import csv from 'csvtojson';
import { pipeline } from 'stream';
import readline from 'readline';
import path from 'path';

const removeFile = (pathToFile) => {
  try {
    if (fs.existsSync(pathToFile)) {
      try {
        console.log(`File ${pathToFile} exists.`);
        fs.unlinkSync(pathToFile);
        console.log(`${pathToFile} was deleted`);
      } catch (err) {
        return console.error(`Deleting failed.\n${err.message}`);
      }
    }
  } catch (err) {
    return console.error(`Error occurred while checking file existence.\n${err}`)
  }
}

const createDir = (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Directory created.`);
    } else {
      console.log(`Directory already exists.`);
    }
  } catch (err) {
    return console.error(`Error occurred while creating directory, path: ${dirPath}.\n${err}`);
  }
}

const removePropertyFromObject = (targetObject, removedPromerty) => {
  const modifiedObject = {};
  for (const property in targetObject) {
    if (property === removedPromerty) continue;
    modifiedObject[property] = targetObject[property];
  }
  return modifiedObject;
}

const lowerCaseObjectProperties = (targetObject) => {
  const modifiedObject = {};
  for (const property in targetObject) {
    modifiedObject[property.toLowerCase()] = targetObject[property];
  }
  return modifiedObject;
}

const readIntoRamTransformAndWrite = (readPath, writePath) => {
  const directoryPath = path.dirname(writePath);
  if (!!directoryPath) createDir(directoryPath);
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
          const objectWithLowerCaseProperties = lowerCaseObjectProperties(obj);
          const objectWithRemoverProperty = removePropertyFromObject(objectWithLowerCaseProperties, 'amount');
          const data = JSON.stringify(objectWithRemoverProperty) + '\n';
          fs.writeFile(writePath, data, { flag: 'a' }, (err) => {
            if (err) return console.error(`Writing failed.\n${err.message}`);
          });
        });
        console.log(`Writing ended.`);
      });
  });
}

function modifyJson(json) {
  Object.entries(json)
    .reduce((t, [key, value]) => {
      if (key !== 'Amount')
        json[key.toLowerCase()] = value;
      delete json[key];
    }, {});
}

const readTransformAndWriteUsingPipelineByChunks = (readPath, writePath) => {
  const directoryPath = path.dirname(writePath);
  if (!!directoryPath) createDir(directoryPath);
  const readStream = fs.createReadStream(readPath, { encoding: 'utf-8' });
  const writeStream = fs.createWriteStream(writePath, { encoding: 'utf-8' });
  pipeline(
    readStream,
    csv().subscribe((data) => {
      modifyJson(data);
    }),
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
  }).on('error', (err) => {
    return console.error(`> Error occurred while creating readable stream.\n${err.message}`);
  });

  writeStream.on('close', () => {
    console.log(`Writing for writable stream ended.`)
  }).on('error', (err) => {
    return console.error(`> Error occurred while creating writable stream.\n${err.message}`);
  });
}

const readTransformAndWriteLineByLine = (readPath, writePath) => {
  const directoryPath = path.dirname(writePath);
  if (!!directoryPath) createDir(directoryPath);
  removeFile(writePath);
  let agregatedData = '';
  const readStream = fs.createReadStream(readPath, { encoding: 'utf-8' });
  const readlineInterface = readline.createInterface({
    input: readStream
  });
  readlineInterface.on('line', (data) => {
    agregatedData += data + '\n';
  });
  readlineInterface.on('close', () => {
    csv()
      .on("error", (err) => {
        console.error(`Converting failed.\n${err.message}`);
      })
      .fromString(agregatedData)
      .then((json) => {
        json.forEach((obj) => {
          const objectWithLowerCaseProperties = lowerCaseObjectProperties(obj);
          const objectWithRemoverProperty = removePropertyFromObject(objectWithLowerCaseProperties, 'amount');
          const data = JSON.stringify(objectWithRemoverProperty) + '\n';
          fs.writeFile(writePath, data, { flag: 'a' }, (err) => {
            if (err) return console.error(`Writing failed.\n${err.message}`);
          });
        });
        console.log(`Writing ended.`);
      })
  })
}

export { readIntoRamTransformAndWrite, readTransformAndWriteUsingPipelineByChunks, removeFile, readTransformAndWriteLineByLine }
