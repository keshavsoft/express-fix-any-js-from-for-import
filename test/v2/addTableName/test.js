import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import index from "../../../index.js";

import getLatestVersion from "../../../bin/core/getLatestVersion.js";

import checkLines from "./checkLines.json" with { type: "json" };

import extractRegex from './extractRegex.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appJsPath = path.join(__dirname, "routes.js");

function runTests() {
    const latestVersion = getLatestVersion();

    const checkLinesString = checkLines;

    // console.log("extractRegex : ", extractRegex);
    const output = index({
        inJsFilePath: appJsPath,
        inCheckLines: checkLinesString,
        extractRegex,
        showLog: false,
        showLogStep1: false,
        showLogStep2: false,
        showLogStep3: false
    });

    console.log("output : ", output);
};

runTests();
