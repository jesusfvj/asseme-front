import { useEffect, createContext, useReducer, useState } from "react";
import { useContext } from "react";
import {
  loginUser,
  registerUser,
  getUserById,
} from "../../API/UserApi/UserApi";
import { types } from "../Types/types";
import { userReducer } from "./UserReducer";
/* import {
  deleteItem,
  updateItem,
  likeItem,
} from "../../API/ItemsApi"; */

export const UserContext = createContext();

export const useUser = () => {
  const state = useContext(UserContext);
  return state;
};

export const UserProvider = ({ children }) => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const init = async () => {
  };

  const [userState, dispatch] = useReducer(userReducer, {}, init);

  useEffect(() => {
    if (userState?.user) {
      localStorage.setItem("user", JSON.stringify(userState?.user?._id));
    }
  }, [userState.user?._id]);

  const login = async (user) => {
    const data = await loginUser(user);
    if (data.ok) {
      localStorage.setItem("user", JSON.stringify(data.user._id));
      localStorage.setItem("token", data.user.token);
      dispatch({ type: types.login, payload: data.user });
    }
    return data;
  };

  const register = async (user) => {
    const data = await registerUser(user);
    if (data.ok) {
      localStorage.setItem("user", JSON.stringify(data.user._id));
      localStorage.setItem("token", data.user.token);
      dispatch({ type: types.register, payload: data.user });
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: types.logout });
  };

  return (
    <UserContext.Provider
      value={{
        ...userState,
        login,
        logout,
        register,
        isLoginLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
