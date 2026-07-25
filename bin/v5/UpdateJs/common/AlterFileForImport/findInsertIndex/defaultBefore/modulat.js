const getFromSummary = (inSummary) => {
    let index = null;

    if (inSummary?.exportSummary) {
        const minLine = inSummary?.exportSummary?.minLineNumber;
        if (minLine !== Infinity) {
            index = minLine;
        };
    };

    if (inSummary?.consumeSummary) {
        const minLine = inSummary?.consumeSummary?.minLineNumber;
        if (minLine !== Infinity) {
            index = minLine;
        };
    };

    return index;
};

export default getFromSummary;
