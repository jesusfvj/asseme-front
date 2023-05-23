import { useState } from 'react'
import { Button } from '../../BaseComponents/Button'
import { InputWithLabel } from '../../BaseComponents/InputWithLabel'
import { useUser } from '../../../Context/UserContext/UserContext';
import { useUI } from '../../../Context/UI/UIContext';

export const UploadLink = ({ setShowModalToLogin, urlData, setUrlData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { setMessageSuccessToaster, setMessageErrorToaster, setDataToUpload } = useUI();
    const { user } = useUser();

    const handleUrlSubmit = async (event) => {
        event.preventDefault();
        if (urlData !== "") {
            if (!user) {
                setDataToUpload(urlData)
                setShowModalToLogin(true)
            } else {
                setIsLoading(true);
                const response = await uploadItemUrlAPI(urlData, user._id)
                setIsLoading(false);
                if (response.ok) {
                    setMessageSuccessToaster("Gif/s successfuly submited.");
                    navigate('/')
                } else {
                    setMessageErrorToaster("Something went wrong. Please try again.");
                }
            }
        }
        else {
            setMessageErrorToaster("Field can't be empty");
        }
    }

    return (
        <form onSubmit={handleUrlSubmit} className="w-full flex flex-col justify-center">
            <InputWithLabel
                name="url"
                label="your url"
                type="text"
                value={urlData}
                onInputChange={(e) => setUrlData(e.target.value)}
            />
            <div className="w-full h-[3rem] mt-5">
                <Button text="Save" typeButton="submit" color="blue" size="sm" />
            </div>
        </form>
    )
}
