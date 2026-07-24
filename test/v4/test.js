import path from "path";
import { fileURLToPath } from "url";

import index from "../../index.js";

import extractRegex from './extractRegex.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appJsPath = path.join(__dirname, "routes.js");

function runTests() {
    const toInsertLine = "import { router as routerFromv4 } from './v4/routes.js';";

    const output = index({
        jsFilePath: appJsPath,
        toInsertLine,
        parseRegex: extractRegex.parseRegex,
        searchRegex: extractRegex.searchRegex,
        showLog: {
            keysOnly: false,
            withValues: true
        },
        showLogStep1: {
            keysOnly: false,
            withValues: false
        },
        showLogStep2: {
            keysOnly: false,
            withValues: false
        },
        showLogStep3: {
            keysOnly: false,
            withValues: false
        }
    });

    console.log("output : ", output);
};

runTests();
