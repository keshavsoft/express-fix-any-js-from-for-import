import baseRegex from "pattern-collector-base-regex";

import packageJson from '../../../../../package.json' with {type: 'json'};

const startFunc = ({ toInsertLine, parseRegex, showLog }) => {

    if (showLog?.withValues) console.log(`${packageJson.name}-toInsertLineStory-inputs : `, parseRegex, toInsertLine);

    const fromPatternCollector = baseRegex({
        matchLine: toInsertLine,
        parseRegex, showLog
    });

    if (showLog?.withValues) console.log(`${packageJson.name}-toInsertLineStory-outputs : `, fromPatternCollector);

    return fromPatternCollector;
};

export default startFunc;