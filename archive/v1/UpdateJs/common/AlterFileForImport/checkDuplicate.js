const checkUseDuplicate = ({ inSearchText, inFileContentAsStory }) => {

    const found = inFileContentAsStory.importLines.find(element => {
        return element.folderName === inSearchText;
    });

    // console.log("aaaaaaaaa : ", inSearchText, found);

    return {
        found,
        lineNumber: found ? found.lineNumber : null
    };
};

export default checkUseDuplicate;