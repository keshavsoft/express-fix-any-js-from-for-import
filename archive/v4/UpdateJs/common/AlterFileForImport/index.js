import getStory from "pattern-collector-anyjs";

import readFile from "../readFile.js";
import checkDuplicate from "./checkDuplicate.js";
import writeFile from "../writeFile.js";
import getLineStory from "./toInsertLineStory.js";

import packageJson from '../../../../../package.json' with {type: 'json'};

const alterFile = ({
    jsFilePath,
    toInsertLine, parseRegex, searchRegex,
    showLog = false, showLogStep1, showLogStep2, showLogStep3
}) => {

    if (showLog?.keysOnly) console.log(`${packageJson.name}-start`);
    if (showLog?.withValues) console.log(`${packageJson.name}-inputs : `, jsFilePath, toInsertLine, parseRegex, searchRegex);

    const content = readFile(jsFilePath);

    const lineStory = getLineStory({ toInsertLine, parseRegex, showLog });

    if (showLog?.withValues) console.log(`${packageJson.name}-lineStory : `, lineStory);

    const fromPatternCollector = getStory({
        fileContent: content,
        extractRegex: {
            importRegex: {
                parseRegex, searchRegex
            }
        },
        showLog: showLogStep1,
        showLogStep1: showLogStep2, showLogStep2: showLogStep3
    });

    if (showLog?.withValues) console.log(`${packageJson.name}-fromPatternCollector : `, fromPatternCollector);

    const duplicateInfo = checkDuplicate({
        inSearchText: lineStory.raka,
        inFileContentAsStory: fromPatternCollector.importLines
    });

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

    if (showLog?.keysOnly) console.log(`${packageJson.name}-end`);
    if (showLog?.withValues) console.log(`${packageJson.name}-outputs : `, duplicateInfo);

    return {
        inserted: true,
        found: false,
        filePath: jsFilePath,
        lineNumber: null
    };
};

export default alterFile;