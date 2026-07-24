import fs from "fs";
import readFile from "./readFile.js";

const writeFile = ({ inJsFilePath, inInsertLineIndex, toInsertLine }) => {
    const content = readFile(inJsFilePath);

    const lines = content.split("\n");

    const updatedLines = lines.toSpliced(inInsertLineIndex - 1, 0, toInsertLine);

    fs.writeFileSync(inJsFilePath, updatedLines.join("\n"));
};

export default writeFile;