import { Navigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext/UserContext";

const ProtectedRoutes = ({ children }) => {
  const { user, logout } = useUser();
  const token = window.localStorage.getItem("token");

  if (user && token) {
    if (user.isBanned){
      logout()
    } else {
      if (user.role === "admin") {
        return <Navigate to="/admin" />;
      } else {
        return children;
      }
    }
  }
  return <Navigate to="/" />
};

export default ProtectedRoutes;

