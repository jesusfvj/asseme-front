import { Navigate } from "react-router-dom";
import { useUI } from "../../Context/UI/UIContext";

export const FinishUploadProcess = () => {
  const { dataToUpload } = useUI();

  if (dataToUpload === null) {
    return <Navigate to="/" />
  }
  return <Navigate to="/upload" />
};