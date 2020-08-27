
import { readIntoRamTransformAndWrite, readTransformAndWriteUsingPipelineByChunks, readTransformAndWriteLineByLine } from './support/fileOperations';
import path from 'path';

const pathToCsv = path.join('.', '/csv/example.csv');
const outFile = path.join(__dirname, '/txt/csvOutput.txt');
const outFileFullyLoadedIntoRam = path.join(__dirname, '/txt/csvOutputFullyIntoRam.txt');
const outFileFullyLoadedLineByLine = path.join(__dirname, '/txt/csvOutputLoadedLineByLine.txt');

readIntoRamTransformAndWrite(pathToCsv, outFileFullyLoadedIntoRam);

readTransformAndWriteUsingPipelineByChunks(pathToCsv, outFile);

readTransformAndWriteLineByLine(pathToCsv, outFileFullyLoadedLineByLine); 