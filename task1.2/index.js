
import { readIntoRamTransformAndWrite, readTransformAndWriteUsingPipelineByChunks, readTransformAndWriteLineByLine } from './support/fileOperations';

const pathToCsv = './csv/example.csv';
const outFile = __dirname + '/txt/csvOutput.txt';
const outFileFullyLoadedIntoRam = __dirname + '/txt/csvOutputFullyIntoRam.txt';
const outFileFullyLoadedLineByLine = __dirname + '/txt/csvOutputLoadedLineByLine.txt'

readIntoRamTransformAndWrite(pathToCsv, outFileFullyLoadedIntoRam);

readTransformAndWriteUsingPipelineByChunks(pathToCsv, outFile);

readTransformAndWriteLineByLine(pathToCsv, outFileFullyLoadedLineByLine); 