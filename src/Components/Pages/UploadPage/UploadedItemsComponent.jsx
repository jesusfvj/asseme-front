import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Typography } from "../../BaseComponents/Typography";
import { Button } from "../../BaseComponents/Button";
import { InputWithLabel } from "../../BaseComponents/InputWithLabel";
import { toastMessageError } from "../../../Utils/toaster";

export const UploadedItemsComponent = (
    {
        index,
        handleRemoveFile,
        registerData,
        setRegisterData,
        file
    }) => {

    const [previewImage, setPreviewImage] = useState("")

    const handleInputChange = (event) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
        } else {
            toastMessageError(`Please choose an image with a size less than: ${MAX_FILE_SIZE / 1000000}MB`)
        }
    }, [])

    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-10 sm:gap-5 w-full py-5">
            <Typography
                text={index + 1}
                type="p1"
                color="white"
                styles="hidden sm:flex"
            />
            <Typography
                text={`Gif ${index + 1}`}
                type="big"
                color="white"
                styles="flex sm:hidden"
            />
            <img className="w-14 h-w-14" src={previewImage} alt={`item ${index + 1}`} />
            <div className="w-[30vw]">
                <InputWithLabel
                    name={`itemName${index + 1}`}
                    label="Gif name"
                    type="text"
                    value={registerData[`itemName${index + 1}`]}
                    onInputChange={handleInputChange}
                    sizeContainer="w-full sm:w-1/4"
                    styles="text-xs"
                    required={true}
                />
            </div>
            <div className="w-[30vw]">
                <InputWithLabel
                    name={`keywords${index + 1}`}
                    label="Keywords: introduce a ',' between each word"
                    type="text"
                    sizeContainer="w-full sm:w-1/4"
                    styles="text-xs"
                    value={registerData[`keywords${index + 1}`]}
                    required={true}
                    onInputChange={handleInputChange}
                />
            </div>
            <div className="w-full sm:w-fit h-8 sm:h-[5vh] rounded bg-red-400 transition duration-500 hover:bg-red-500 sm:bg-transparent hover:sm:bg-transparent">
                <Button
                    text={<Typography
                        text={<AiFillDelete />}
                        type="p1"
                        color="white"
                        styles="flex justify-center items-center cursor-pointer"
                    />}
                    size="sm"
                    color="transparent"
                    styles="cursor-pointer"
                    onClick={() => { handleRemoveFile(index) }}
                />
            </div>
        </div>
    )
}
