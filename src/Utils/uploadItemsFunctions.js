const organizeAndSetDataForm = (dataFromTheForm, selectedFiles, filesFormData) => {
    const form = dataFromTheForm;
    const formDataForm = new FormData(form);
    const data = Object.fromEntries(formDataForm.entries());

    //Group the data from the form according to the item number:
    const dataFiltered = {};
    for (const key in data) {
        const itemNumber = key.match(/\d+$/)[0];
        if (!dataFiltered[`formDataFile${itemNumber}`]) {
            dataFiltered[`formDataFile${itemNumber}`] = {};
        }
        dataFiltered[`formDataFile${itemNumber}`][key.replace(/\d+$/, "")] = data[key];
    }


    //Set the formData to be sent to the backend with the fields
    Object.values(selectedFiles).map((selectedFile, index) => {
        const stringifiedData = JSON.stringify(dataFiltered[`formDataFile${index + 1}`])
        filesFormData.set(`dataFile${index + 1}`, stringifiedData)
        filesFormData.set(`imageFile${index + 1}`, selectedFile)
    })

    return filesFormData;
}

export {
    organizeAndSetDataForm
}