import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadedItemsComponent } from "./UploadedItemsComponent";
import { Button } from "../../BaseComponents/Button";
import { Loader } from "../../BaseComponents/Loader";
import { organizeAndSetDataForm } from "../../../Utils/uploadItemsFunctions";
import { useUser } from "../../../Context/UserContext/UserContext";
import { useUI } from "../../../Context/UI/UIContext";
import { Typography } from "../../BaseComponents/Typography";
import { uploadItemsAPI } from "../../../API/ItemsApi";

export const ShowUploadedItems = ({
    selectedFiles,
    setSelectedFiles,
    setShowModalToLogin
}) => {
    const { setMessageSuccessToaster, setMessageErrorToaster, setDataToUpload } = useUI();
    const [registerData, setRegisterData] = useState({});
    const [filesFormData, setFilesFormData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const buttonSaveRef = useRef(null);
    const { user } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const filesFormDataFiltered = organizeAndSetDataForm(
            event.target,
            selectedFiles,
            filesFormData,
        );
        if (!user) {
            setDataToUpload(filesFormDataFiltered)
            setShowModalToLogin(true)
        } else {
            setIsLoading(true);
            const response = await uploadItemsAPI(filesFormDataFiltered, user._id);
            setIsLoading(false);
            if (response.ok) {
                setMessageSuccessToaster("Song/s successfuly submited.");
                navigate('/')
            } else {
                setMessageErrorToaster("Something went wrong. Please try again.");
            }
        };
    }

    const handleRemoveFile = (indexFileToRemove) => {
        const arrayFilesFiltered = selectedFiles.filter((selectedFile, index) => {
            if (index != indexFileToRemove) {
                return selectedFile;
            }
        });
        setSelectedFiles(arrayFilesFiltered);
    };

    useEffect(() => {
        if (selectedFiles) {
            const formData = new FormData();
            let copyRegisterData = { ...registerData };

            Object.values(selectedFiles).map((selectedFile, index) => {
                formData.set(`itemFile${index + 1}`, selectedFile);
                copyRegisterData = {
                    ...copyRegisterData,
                    [`keywords${index + 1}`]: "",
                    [`itemName${index + 1}`]: selectedFile.name.substring(0, selectedFile.name.length - 4),
                };
            });

            setFilesFormData(formData);
            setRegisterData(copyRegisterData);
        }
    }, [selectedFiles]);

    return (
        <div className="relative h-[90vh] w-[80vw] p-20 flex flex-col rounded-lg z-20 bg-[url('https://res.cloudinary.com/diek1olu2/image/upload/v1684833309/ASSEME%20-%20visual/mesh-708_tgaqzp.png')]">
            <Typography
                text="ASSEME"
                type="important"
                color="yellow"
            />
            <Typography
                text="Upload your gifs and memes"
                type="big"
                color="white"
            />
            <form
                className={`flex flex-col my-8 items-center gap-3 w-full max-h-[60vh] overflow-auto px-2`}
                onSubmit={handleSubmit}
            >
                {selectedFiles.map((file, index) => {
                    return (
                        <UploadedItemsComponent
                            key={index}
                            index={index}
                            handleRemoveFile={handleRemoveFile}
                            registerData={registerData}
                            setRegisterData={setRegisterData}
                            file={file}
                        />
                    );
                })}
                <div className="hidden">
                    <Button typeButton="submit" refElement={buttonSaveRef} />
                </div>
            </form>
            <div className="w-full h-[3rem] sm:w-[10rem] sm:h-[2rem] mt-10 self-center sm:self-start">
                <Button
                    typeButton="submit"
                    text="Save"
                    color="black"
                    size="sm"
                    onClick={() => {
                        buttonSaveRef.current.click();
                    }}
                />
            </div>
            {isLoading && <Loader text="Uploading data..." />}
        </div>
    );
};