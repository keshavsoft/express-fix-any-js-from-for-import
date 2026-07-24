const checkUseDuplicate = ({ inSearchText, inFileContentAsStory }) => {

    const found = inFileContentAsStory.find(element => {
        console.log("element : ", element);

        return element.folderName === inSearchText;
    });

    return {
        found,
        lineNumber: found ? found.lineNumber : null
    };
};

export default checkUseDuplicate;