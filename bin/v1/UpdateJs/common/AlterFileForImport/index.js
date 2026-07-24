import readFile from "../readFile.js";
import checkDuplicate from "./checkDuplicate.js";
import findInsertIndex from "./findInsertIndex.js";
import writeFile from "../writeFile.js";

import getStory from "pattern-collector-anyjs";

const alterFile = ({
    jsFilePath,
    toInsertLine,
    duplicationCheck,
    insertAfter = [],
    showLog = false,
    extractRegex, showLogStep1, showLogStep2, showLogStep3
}) => {
    if (showLog) console.log("inputs : ", jsFilePath, toInsertLine, duplicationCheck, insertAfter);

    const content = readFile(jsFilePath);

    const fromPatternCollector = getStory({
        fileContent: content,
        extractRegex,
        showLog: showLogStep1,
        showLogStep1: showLogStep2, showLogStep3
    });

    const duplicateInfo = checkDuplicate({
        inSearchText: duplicationCheck,
        inFileContentAsStory: fromPatternCollector
    });

    if (duplicateInfo.found) {
        if (showLog) {
            console.log(
                `Duplicate found at line ${duplicateInfo.lineNumber}`
            );
        };

        return duplicateInfo;
    };

    // console.log("aaaaaaaaaaaaaa : ", updated);
    // writeFile(jsFilePath, updated, fromPatternCollector.summary.importSummary.minLineNumber, toInsertLine);
    writeFile({
        inJsFilePath: jsFilePath,
        inInsertLineIndex: fromPatternCollector.summary.importSummary.minLineNumber,
        toInsertLine
    });

    return {
        found: false,
        filePath: jsFilePath,
        lineNumber: null
    };
};

export default alterFile;