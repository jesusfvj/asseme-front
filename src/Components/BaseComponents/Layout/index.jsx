import { useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { VideoBackground } from "./VideoBackground";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUI } from "../../../Context/UI/UIContext";
import { useEffect } from "react";
import { toastMessageError, toastMessageSuccess } from "../../../Utils/toaster";

export const Layout = ({ children }) => {
    const arrayExcludeLocations = ["/loginregister", "/admin", "/upload"]
    const location = useLocation()

    const { setMessageSuccessToaster,
        setMessageErrorToaster,
        messageSuccessToaster,
        messageErrorToaster } = useUI()

    useEffect(() => {
        if (messageSuccessToaster !== "") {
            toastMessageSuccess(messageSuccessToaster);
            setMessageSuccessToaster("");
        }
    }, [messageSuccessToaster]);

    useEffect(() => {
        if (messageErrorToaster !== "") {
            toastMessageError(messageErrorToaster);
            setMessageErrorToaster("");
        }
    }, [messageErrorToaster]);


    return (
        <>
            {!arrayExcludeLocations.includes(location.pathname)
                ?
                <>
                    <VideoBackground />
                    <NavBar />
                    <div className="min-h-[80vh] w-screen">
                        {children}
                    </div>
                    <ToastContainer />
                </>
                :
                <>
                    <VideoBackground />
                    <div className="h-screen w-screen">
                        {children}
                    </div>
                    <ToastContainer />
                </>
            }
        </>
    )
}
