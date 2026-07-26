import getStory from "pattern-collector-anyjs";

import readFile from "../readFile.js";
import checkDuplicate from "./checkDuplicate.js";
import findInsertIndex from "./findInsertIndex/index.js";
import writeFile from "../writeFile.js";
import getLineStory from "./toInsertLineStory.js";

import packageJson from '../../../../../package.json' with {type: 'json'};

const alterFile = ({
    jsFilePath, rulesJson, extractRegex, inParseRegex,
    toCheckLinesName,
    showLog = false, showLogStep1, showLogStep2, showLogStep3
}) => {

    if (showLog?.keysOnly) console.log(`${packageJson.name}-start`);

    if (showLog?.withValues) console.log(`${packageJson.name}-inputs-jsFilePath : `, jsFilePath);
    if (showLog?.withValues) console.log(`${packageJson.name}-inputs-rulesJson : `, JSON.stringify(rulesJson));
    if (showLog?.withValues) console.log(`${packageJson.name}-inputs-parseRegex : `, JSON.stringify(parseRegex));
    if (showLog?.withValues) console.log(`${packageJson.name}-inputs-searchRegex : `, JSON.stringify(searchRegex));

    const toInsertLine = rulesJson.toInsertLine;

    const content = readFile(jsFilePath);

    const lineStory = getLineStory({
        toInsertLine, parseRegex: inParseRegex, showLog
    });

    if (showLog?.withValues) console.log(`${packageJson.name}-lineStory : `, lineStory);

    const fromPatternCollector = getStory({
        fileContent: content,
        extractRegex,
        showLog: showLogStep1,
        showLogStep1: showLogStep2, showLogStep2: showLogStep3
    });

    if (showLog?.withValues) console.log(`${packageJson.name}-fromPatternCollector : `, fromPatternCollector);

    // console.log(`-------------------- : `, fromPatternCollector);

    const duplicateInfo = checkDuplicate({
        inSearchText: lineStory.raka,
        inFileContentAsStory: fromPatternCollector[toCheckLinesName]
    });

    // console.log("----------- : ", duplicateInfo);

    if (duplicateInfo.found) {
        if (showLog) {
            console.log(
                `Duplicate found at line ${duplicateInfo.lineNumber}`
            );
        };

        return duplicateInfo;
    };

    const toInsertIndex = findInsertIndex({
        inAllLinesStory: fromPatternCollector.allLinesStory,
        inSummary: fromPatternCollector?.summary,
        rulesJson
    });

    // console.log(`toInsertIndex------------- : `, toInsertIndex);

    writeFile({
        inJsFilePath: jsFilePath,
        inInsertLineIndex: toInsertIndex,
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