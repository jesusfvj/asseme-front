import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessageError } from "../../../Utils/toaster";
import { Button } from "../../BaseComponents/Button";
import { Typography } from "../../BaseComponents/Typography";


export const UploadItemsForm = ({ setSelectedFiles }) => {
    const [dragActive, setDragActive] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const MAX_FILE_SIZE = 10485760;

    const handleFileInputChange = (event) => {
        const arraySelectedFiles = Array.from(event.target.files)
        let hasOversizedFile = false;
        arraySelectedFiles.forEach((file) => {
            if (file.size > MAX_FILE_SIZE) {
                hasOversizedFile = true;
                toastMessageError(`Please all files must be less than: ${MAX_FILE_SIZE / 1000000}MB`)
            }
        })
        if (!hasOversizedFile) {
            setSelectedFiles(arraySelectedFiles);
        }
    }

    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();

        switch (event.type) {
            case "dragenter":
            case "dragover":
                setDragActive(true);
                break;
            case "dragleave":
                setDragActive(false);
                break;
            default:
                break;
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const arraySelectedFiles = Array.from(e.dataTransfer.files)
            let hasOversizedFile = false;
            arraySelectedFiles.forEach((file) => {
                if (file.size > MAX_FILE_SIZE) {
                    hasOversizedFile = true;
                    toastMessageError(`Please all files must be less than: ${MAX_FILE_SIZE / 1000000}MB`)
                }
            })
            if (!hasOversizedFile) {
                setSelectedFiles(arraySelectedFiles);
            }
        }
    };

    return (
        <form className="px-8 flex flex-col sm:w-[24rem] w-full" onDragEnter={handleDrag}>
            <input
                type="file"
                id="fileInput"
                multiple
                accept="image/*"
                onChange={handleFileInputChange}
                onSubmit={(e) => e.preventDefault()}
                className="hidden"
            />
            <label
                htmlFor="fileInput"
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
                className={`relative flex justify-center items-center border-2 border-white border-dashed rounded h-[30vh] cursor-pointer transition duration-500 ${dragActive ? "hover:border-red-400" : "hover:border-gray-400"}`}
            >
                <div className="flex justify-center items-center">
                    {dragActive ?
                        <Typography
                            text="Drop it like is hot!"
                            type="p1"
                            color="danger"
                            styles="text-center"
                        />
                        :
                        <Typography
                            text={<BiImageAdd />}
                            type="important"
                            color={`${!isHovering ? 'white' : 'primary'}`}
                        />
                    }
                </div>
                {dragActive && <div className="absolute w-full h-full top-0 right-0 left-0 bottom-0"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}>
                </div>}
            </label>
            <div className="sm:w-[20rem] w-full h-[3rem]">
                <Button text="Choose your files" color="blue" size="sm" isLabel={true} htmlFor="fileInput" />
            </div>
            <ToastContainer />
        </form>
    )
}
