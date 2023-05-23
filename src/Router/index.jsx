import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import { LandingPage } from "../Pages/LandingPage";
import { SearchPage } from "../Pages/SearchPage";
import { ArtistPage } from "../Pages/ArtistPage";
import { LoginRegister } from "../Pages/LoginRegister";
import { AdminPage } from "../Pages/AdminPage";
import { UploadItems } from "../Pages/UploadItems";
import { ProfilePage } from "../Pages/ProfilePage";
import { LoaderPage } from "../Pages/LoaderPage";
import { ScrollTop } from "../Components/BaseComponents/ScrollTop";
import { useUser } from "../Context/UserContext/UserContext";
import { FinishUploadProcess } from "./FinishUploadProcess";

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
            <Route
              path="/*"
              element={
                <ProtectedRoutes>
                  <Routes>
                    <Route path="/profile" element={<ProfilePage />}>
                      <Route path=":userId" element={<ProfilePage />} />
                    </Route>
                  </Routes>
                </ProtectedRoutes>
              }
            />
          </Routes>{" "}
        </>
      ) : (
        <LoaderPage />
      )}
    </>
  );
}

export default Router;

