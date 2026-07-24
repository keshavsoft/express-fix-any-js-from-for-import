import readFile from "../readFile.js";
import checkDuplicate from "./checkDuplicate.js";
import findInsertIndex from "./findInsertIndex.js";
import writeFile from "../writeFile.js";
import getLineStory from "./toInsertLineStory.js";

import getStory from "pattern-collector-anyjs";

const alterFile = ({
    jsFilePath,
    toInsertLine, extractRegex,
    showLog = false,
    showLogStep1, showLogStep2, showLogStep3
}) => {
    if (showLog) console.log("inputs : ", jsFilePath, toInsertLine);

    const content = readFile(jsFilePath);

    const lineStory = getLineStory({ toInsertLine, parseRegex: extractRegex.parseRegex, showLog });

    const fromPatternCollector = getStory({
        fileContent: content,
        extractRegex: {
            importRegex: extractRegex
        },
        showLog: showLogStep1,
        showLogStep1: showLogStep2, showLogStep3
    });

    const duplicateInfo = checkDuplicate({
        inSearchText: lineStory.raka,
        inFileContentAsStory: fromPatternCollector.importLines
    });

    // console.log("----------- : ", toInsertLine, lineStory, duplicateInfo);

    if (duplicateInfo.found) {
        if (showLog) {
            console.log(
                `Duplicate found at line ${duplicateInfo.lineNumber}`
            );
        };

        return duplicateInfo;
    };

    writeFile({
        inJsFilePath: jsFilePath,
        inInsertLineIndex: fromPatternCollector.summary.importSummary.minLineNumber,
        toInsertLine
    });

    return {
        inserted: true,
        found: false,
        filePath: jsFilePath,
        lineNumber: null
    };
};

export default alterFile;