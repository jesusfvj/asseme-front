import { Navigate } from "react-router-dom";
import { useUI } from "../../Context/UI/UIContext";

 const FinishUploadProcess = ({children}) => {
  const { dataToUpload } = useUI();

  if (dataToUpload === null) {
    return children
  }
  return <Navigate to="/upload" />
};

export default FinishUploadProcess;
