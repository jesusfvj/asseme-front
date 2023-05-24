import { useEffect, useState } from 'react'
import { Button } from '../../BaseComponents/Button'
import { InputWithLabel } from '../../BaseComponents/InputWithLabel'
import { useUser } from '../../../Context/UserContext/UserContext';
import { useUI } from '../../../Context/UI/UIContext';
import { uploadItemUrlAPI } from '../../../API/ItemsApi';
import { useNavigate } from 'react-router-dom';

export const UploadLink = ({ setShowModalToLogin }) => {
    const [urlData, setUrlData] = useState({
        url: "",
        keywords: "",
        name: "",
    });
    const { setMessageSuccessToaster, setMessageErrorToaster, dataToUpload, setDataToUpload, setIsLoading } = useUI();
    const { user } = useUser();
    const navigate = useNavigate()

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
                    setDataToUpload(null)
                    setMessageSuccessToaster("Item successfuly submited.");
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

    useEffect(() => {
        if (dataToUpload !== null) {
            console.log(dataToUpload)
            setUrlData(urlData => ({
                ...urlData,
                name: dataToUpload.name,
                keywords: dataToUpload.keywords,
                url: dataToUpload.url
            }));
        }
    }, [])

    return (
        <form onSubmit={handleUrlSubmit} className="w-full flex flex-col justify-center">
            <div className='flex flex-col gap-5'>
                <div className='w-[30vw]'>
                    <InputWithLabel
                        name="name"
                        label="name"
                        type="text"
                        value={urlData.name}
                        onInputChange={(e) => setUrlData({ ...urlData, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className='w-[30vw]'>
                    <InputWithLabel
                        name="keywords"
                        label="Keywords: introduce a ',' between each word"
                        type="text"
                        value={urlData.keywords}
                        onInputChange={(e) => setUrlData({ ...urlData, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className='w-[30vw]'>
                    <InputWithLabel
                        name="url"
                        label="url"
                        type="text"
                        value={urlData.url}
                        onInputChange={(e) => setUrlData({ ...urlData, [e.target.name]: e.target.value })}
                    />
                </div>
            </div>
            <div className="w-full h-[3rem] mt-5">
                <Button text="Save" typeButton="submit" color="blue" size="sm" />
            </div>
        </form>
    )
}
