import { Route, Routes } from "react-router-dom";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import { LandingPage } from "../Pages/LandingPage";
import { SearchPage } from "../Pages/SearchPage";
import { ArtistPage } from "../Pages/ArtistPage";
import { LoginRegister } from "../Pages/LoginRegister";
import { AdminPage } from "../Pages/AdminPage";
import { UploadItems } from "../Pages/UploadItems";
import { LoaderPage } from "../Pages/LoaderPage";
import { ScrollTop } from "../Components/BaseComponents/ScrollTop";
import { useUser } from "../Context/UserContext/UserContext";
import FinishUploadProcess from "./FinishUploadProcess";
import { GifPage } from "../Pages/GifPage";

function Router() {
  const { isLoginLoading } = useUser();
  return (
    <>
      {!isLoginLoading ? (
        <>
          <ScrollTop />
          <Routes>
            <Route path="/" element={
              <FinishUploadProcess>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                </Routes>
              </FinishUploadProcess>
            }
            />
            <Route path="/search" element={<SearchPage />}>
              <Route path=":query" element={<SearchPage />} />
            </Route>
            <Route path="/artist" element={<ArtistPage />}>
              <Route path=":artistId" element={<ArtistPage />} />
            </Route>
            <Route path="/gif" element={<GifPage />}>
              <Route path=":gifId" element={<GifPage />} />
            </Route>
            <Route path="/loginregister" element={<LoginRegister />} />
            <Route path="/upload" element={<UploadItems />} />
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <Routes>
                  <Route path="/" element={<AdminPage />} />
                </Routes>
              </ProtectedAdminRoute>
            }
            />
          </Routes>{""}
        </>
      ) : (
        <LoaderPage />
      )}
    </>
  );
}

export default Router;

