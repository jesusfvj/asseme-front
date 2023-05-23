import { useEffect, useState } from "react";
import { UploadItemsForm } from "../Components/Pages/UploadPage/UploadItemsForm";
import { Typography } from "../Components/BaseComponents/Typography";
import { useNavigate } from "react-router-dom";
import { UploadLink } from "../Components/Pages/UploadPage/UploadLink";
import { ShowUploadedItems } from "../Components/Pages/UploadPage/ShowUploadedItems";
import { ModalToLogin } from "../Components/Pages/UploadPage/ModalToLogin";
import { useUI } from "../Context/UI/UIContext";
import { AiOutlineUser } from "react-icons/ai";
import { Button } from "../Components/BaseComponents/Button";
import { useUser } from "../Context/UserContext/UserContext";

export const UploadItems = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [urlData, setUrlData] = useState("");
  const [showModalToLogin, setShowModalToLogin] = useState(false);
  const navigate = useNavigate();
  const { dataToUpload, setDataToUpload } = useUI()
  const { logout } = useUser()

  const handleNavigate = () => {
    navigate('/')
  }

  const handleLogInLogOut = () => {
    setDataToUpload(null)
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (dataToUpload !== null) {
      if (Array.isArray(dataToUpload)) {
        setSelectedFiles(dataToUpload)
      } else {
        setUrlData(dataToUpload)
      }
    }
  }, [])


  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-10' onClick={handleNavigate}></div>
      <div className={`fixed ${dataToUpload && !showModalToLogin ? 'top-[2.5%]':'top-[5%]'} left-[10%] z-20`}>
        {dataToUpload !== null && !showModalToLogin &&
          <div onClick={handleLogInLogOut} className="w-[20vw] h-[5vh] flex justify-center items-center cursor-pointer">
            <div className="flex justify-center items-center h-full w-[20%] bg-gray-700">
              <Typography
                text={<AiOutlineUser />}
                type="p1"
                color="white"
              /></div>
            <div className="w-[80%] h-full">
              <Button
                size="xs"
                color="danger"
                text="Log out"
                textWhite={true}
              />
            </div>
          </div>
        }
        {!showModalToLogin ?
          (
            selectedFiles.length === 0
              ?
              <div className={`relative flex flex-col items-center justify-center gap-8 bg-[url('https://res.cloudinary.com/diek1olu2/image/upload/v1684833309/ASSEME%20-%20visual/mesh-708_tgaqzp.png')] w-[80vw] h-screen sm:h-[90vh] rounded-lg`}>
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
                <div className="flex justify-center items-center gap-20">
                  <div className="flex flex-col justify-between items-center w-[45%] h-[50vh]">
                    <Typography
                      text="directly from your computer"
                      type="p1"
                      color="white"
                      styles="w-full text-center"
                    />
                    <Typography
                      text="upload GIF"
                      type="p2"
                      color="white"
                      styles="w-[50%] text-center"
                    />
                    <UploadItemsForm
                      setSelectedFiles={setSelectedFiles}
                    />
                  </div>
                  <div className="flex flex-col justify-between items-center w-[45%] h-[50vh]">
                    <Typography
                      text="or using a link"
                      type="p1"
                      color="white"
                      styles="w-[50%] text-center"
                    />
                    <UploadLink
                      setShowModalToLogin={setShowModalToLogin}
                      urlData={urlData}
                      setUrlData={setUrlData}
                    />
                  </div>
                </div>
              </div>
              :
              <ShowUploadedItems
                setSelectedFiles={setSelectedFiles}
                selectedFiles={selectedFiles}
                setShowModalToLogin={setShowModalToLogin}
              />
          )
          :
          <ModalToLogin />
        }
      </div>
    </>
  )
}
