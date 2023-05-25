import { useUI } from '../../../Context/UI/UIContext'
import { Button } from '../../BaseComponents/Button'
import { Typography } from '../../BaseComponents/Typography'
import { deleteItem, editItem } from '../../../API/ItemsApi';
import { useUser } from '../../../Context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

export const BaseModal = ({ text, type, itemId, itemNewName }) => {
    const navigate = useNavigate()
    const { setToggleBasicModal, setIsEditing, isEditing } = useUI()
    const { user: { _id } } = useUser()
    let toastMessage = ""
    const { setMessageSuccessToaster,
        setMessageErrorToaster } = useUI()

    const handleDelete = async () => {
        let response = ""
        switch (type) {
            case "delete":
                response = await deleteItem(itemId, _id);
                toastMessage = "The item was succesfully deleted"
                break;
            case "edit":
                response = await editItem(itemId, _id, itemNewName);
                toastMessage = `The item was succesfully edited to ${itemNewName}`
                break;
            default:
                break;
        }
        if (response.ok) {
            setMessageSuccessToaster(toastMessage);
            switch (type) {
                case "delete":
                    navigate("/")
                    break;
                case "edit":
                    setIsEditing(!isEditing)
                    break;

                default:
                    break;
            }
            setToggleBasicModal(false)
        } else {
            setMessageErrorToaster(response.message)
        }
    }

    return (
        <>
            <div className="fixed z-20 h-screen w-screen top-0 bottom-0 right-0 left-0 flex justify-center items-center"
                onClick={() => { setToggleBasicModal(false) }}></div>
            <div className={`z-20 fixed top-[5vh] left-[10vw] flex flex-col items-center justify-center gap-8 bg-[url('https://res.cloudinary.com/diek1olu2/image/upload/v1684833309/ASSEME%20-%20visual/mesh-708_tgaqzp.png')] w-[80vw] h-[90vh] rounded-lg`}>
                <Typography
                    text={text}
                    type="big"
                    color="yellow"
                    styles='text-center'
                />
                <div className='flex gap-10'>
                    <div className='w-[20vw] h-10'>
                        <Button
                            text="cancel"
                            color="blue"
                            size="sm"
                            onClick={() => { setToggleBasicModal(false) }}
                        />
                    </div>
                    <div className='w-[20vw] h-10'>
                        <Button
                            text={type}
                            color="danger"
                            size="sm"
                            onClick={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
