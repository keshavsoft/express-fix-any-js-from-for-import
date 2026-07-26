import getStory from "express-fix-any-js-from-base";

const alterFile = ({
    jsFilePath, rulesJson, extractRegex,
    showLog = false, showLogStep1, showLogStep2, showLogStep3
}) => {

    return getStory({
        jsFilePath, rulesJson, extractRegex,
        showLog, showLogStep1, showLogStep2, showLogStep3
    });
};

export default alterFile;