import alterFileForImport from "./common/AlterFileForImport/index.js";

const updateAppJs = ({ inJsFilePath, inCheckLines, extractRegex,
    showLog = false, showLogStep1, showLogStep2, showLogStep3 }) => {

    if (showLog) console.log("inputs : ", inJsFilePath, inCheckLines, extractRegex);

    const localCheckLines = inCheckLines;

    const importResult = alterFileForImport({
        jsFilePath: inJsFilePath,
        toInsertLine: localCheckLines.toInsertLine,
        duplicationCheck: localCheckLines.duplicationCheck,
        insertAfter: localCheckLines.insertAfter,
        extractRegex,
        showLog, showLogStep1, showLogStep2, showLogStep3
    });

    return { importResult };
};

export default updateAppJs;