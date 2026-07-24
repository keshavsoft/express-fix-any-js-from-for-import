import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import index from "../../index.js";

import getLatestVersion from "../../bin/core/getLatestVersion.js";

import checkLines from "./checkLines.json" with { type: "json" };

import extractRegex from './extractRegex.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appJsPath = path.join(__dirname, "routes.js");

function runTests() {
    const latestVersion = getLatestVersion();

    const checkLinesString = checkLines;

    // console.log("extractRegex : ", extractRegex);
    const output = index({
        showLog: true,
        inJsFilePath: appJsPath,
        inCheckLines: checkLinesString,
        extractRegex,
        showLogStep1: true,
        showLogStep2: true,
        showLogStep3: true
    });

    console.log("output : ", output);
};

runTests();
