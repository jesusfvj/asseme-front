import { useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { VideoBackground } from "./VideoBackground";

export const Layout = ({ children }) => {
    const arrayExcludeLocations = ["/loginregister", "/admin", "/upload"]
    const location = useLocation()

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
                </>
                :
                <>
                    <VideoBackground />
                    <div className="h-screen w-screen">
                        {children}
                    </div>
                </>
            }
        </>
    )
}
