import fs from 'fs';

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

export { removeFile };