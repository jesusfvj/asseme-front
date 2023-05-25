import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Typography } from '../Components/BaseComponents/Typography';
import { Button } from '../Components/BaseComponents/Button';
import { useUI } from '../Context/UI/UIContext';
import { useUser } from "../Context/UserContext/UserContext";
import { IoTrashOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

export const GifPage = () => {
    const {
        items,
        setMessageSuccessToaster,
        messageSuccessToaster,
        setToggleBasicModal,
        setTextBaseModal,
        setTypeBaseModal,
        setItemId,
        setItemNewName,
        isEditing,
        setIsEditing,
    } = useUI()
    const { user } = useUser()
    const { gifId } = useParams();
    const [inputValue, setInputValue] = useState("")
    const foundItem = items.find((obj) => obj._id === gifId);
    const ownedGif = user?._id === foundItem.owner[0]._id
    const [foundItemName, setFoundItemName] = useState(foundItem.name)

    const handleDeleteItem = () => {
        setTextBaseModal("Are you sure you want to delete this item?")
        setTypeBaseModal("delete")
        setItemId(gifId)
        setToggleBasicModal(true)
    }

    const handleToggleInputEdit = () => {
        setIsEditing(!isEditing)
        setInputValue(foundItemName)
    }

    const handleEditItemName = () => {
        setItemNewName(inputValue)
        setTextBaseModal(`Are you sure you want to edit this item to ${inputValue}?`)
        setTypeBaseModal("edit")
        setItemId(gifId)
        setToggleBasicModal(true)
    }

    const handleCopyClipboard = (url) => {
        navigator.clipboard.writeText(url)
            .then(() => {
                setMessageSuccessToaster("Url copied to the clipboard.")

            })
            .catch((error) => {
                console.error('Failed to copy text:', error);
            });
    };

    useEffect(() => {
        if(messageSuccessToaster.includes("The item was succesfully edited to")){
            setFoundItemName(inputValue)
        }
    }, [messageSuccessToaster])
    

    return (
        <div className='relative w-screen h-[80vh] flex justify-center items-start z-20'>
            <div className='w-full h-full flex flex-col items-center mt-[10vh]'>
                <div className='flex justify-center'>
                    <img className="w-full h-full object-contain" src={foundItem.itemUrl} alt="gif" />
                    <div className='flex flex-col justify-center items-start gap-5 w-[40vw]'>
                        <div className='flex gap-2'>
                            <Typography text="Artist:" type="p1" color="yellow" styles="hover:text-blue-500" />
                            <Link to={`/artist/${foundItem.owner[0]._id}`}>
                                <Typography text={`${foundItem.owner[0].name}`} type="p1" color="ligthBlue" styles="hover:text-blue-500" />
                            </Link>
                        </div>
                        {!isEditing
                            ?
                            <div className='flex gap-2 items-center'>
                                <Typography text="Name:" type="p1" color="yellow" styles="hover:text-blue-500" />
                                <Typography text={foundItemName} type="p1" color="ligthBlue" />
                                {ownedGif &&
                                    <Typography
                                        text={<FaEdit />}
                                        type="p1"
                                        color="gray"
                                        styles="hover:text-white cursor-pointer mb-1"
                                        onClick={handleToggleInputEdit}
                                    />
                                }
                            </div>
                            :
                            <div className='flex gap-2 items-center'>
                                <Typography text="Name:" type="p1" color="yellow" styles="hover:text-blue-500" />
                                <input
                                    name="editInput"
                                    value={inputValue}
                                    type="text"
                                    onChange={(e) => { setInputValue(e.target.value) }}
                                    className="bg-transparent border-b-2 font-one text-[#144360] text-sm sm:text-lg font-normal"
                                />
                                <div className="rounded bg-blue-400 flex justify-center items-center py-1 px-2"
                                    onClick={handleEditItemName}>
                                    <Typography
                                        text={<AiOutlineCheck />}
                                        type="p1"
                                        color="white"
                                        styles="hover:text-blue-900 cursor-pointer"
                                    />
                                </div>
                                <div className="rounded bg-red-400 flex justify-center items-center py-1 px-2"
                                    onClick={handleToggleInputEdit}>
                                    <Typography
                                        text={<RxCross2 />}
                                        type="p1"
                                        color="white"
                                        styles="hover:text-red-900 cursor-pointer"
                                    />
                                </div>
                            </div>
                        }

                        {foundItem.keywords.length !== 0 &&
                            <div className='flex justify-start items-center gap-3'>
                                <Typography text="Keywords:" type="p1" color="yellow" styles="hover:text-blue-500" />
                                {foundItem.keywords.map((keyword, index) => {
                                    return (
                                        <div key={index} className='rounded-lg bg-blue-400 w-fit px-2 flex justify-center'>
                                            <Typography text={keyword} type="p1" color="blue" />
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        <Typography text={`${foundItem.lovedBy.length} likes`} type="p1" color="blue" />
                        <div className='flex gap-3 items-center'>
                            <Typography text="Url:" type="p1" color="yellow" styles="hover:text-blue-500" />
                            <Typography
                                text={<AiOutlineCopy />}
                                type="p1"
                                color="gray"
                                styles="hover:text-white cursor-pointer"
                                onClick={() => handleCopyClipboard(foundItem.itemUrl)}
                            />
                        </div>
                        {ownedGif &&
                            <div className='w-full' onClick={handleDeleteItem}>
                                <Button
                                    text={<Typography
                                        text={<IoTrashOutline />}
                                        type="p1"
                                        color="gray"
                                        styles="hover:text-white cursor-pointer"
                                    />}
                                    color="danger"
                                    styles="rounded-lg"
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}