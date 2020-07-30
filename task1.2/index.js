
import { readIntoRamTransformAndWrite, readTransformAndWriteUsingPipelineByChunks } from './support/fileOperations';

const pathToCsv = './csv/example.csv';
const outFile = __dirname + '/txt/csvOutput.txt';
const outFileFullyLoadedIntoRam = __dirname + '/txt/csvOutputFullyIntoRam.txt';

readIntoRamTransformAndWrite(pathToCsv, outFileFullyLoadedIntoRam);

readTransformAndWriteUsingPipelineByChunks(pathToCsv, outFile);
