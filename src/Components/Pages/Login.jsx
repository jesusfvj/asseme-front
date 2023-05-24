import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputWithLabel } from "../BaseComponents/InputWithLabel";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessageError, toastMessageSuccess } from "../../Utils/toaster";
import { loginWithFirebase } from "../../Utils/firebaseLoginRegister";
import { GoogleButton } from "../BaseComponents/GoogleButton";
import { useUser } from "../../Context/UserContext/UserContext";
import { Typography } from "../BaseComponents/Typography";


export const Login = ({ changeLogRegister }) => {
  const errorTextClassName = "text-xs text-red-80 text-center";
  const navigate = useNavigate();
  const { user, login } = useUser();
  const token = window.localStorage.getItem("token");
  const [messageEmail, setMessageEmail] = useState("")
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginWithFirebase = async () => {
    const responseFirebase = await loginWithFirebase();
    const {
      email,
      uid
    } = responseFirebase.user;
    const response = await login({
      email,
      password: uid,
    });
    if (response.ok) {
      toastMessageSuccess("Login successful.");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setMessageEmail(response.message)
      toastMessageError(response.message)
    }
  }

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogInSubmit = async (event) => {
    event.preventDefault();
    const response = await login(loginData)
    if (response.ok) {
      toastMessageSuccess("Login successful.");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } else {
      setMessageEmail(response.message)
      toastMessageError(response.message)
    }
  }

  return (
    <div className="z-10 flex flex-col justify-center items-center gap-5 w-[50vw] h-[90vh] rounded-lg bg-[url('https://res.cloudinary.com/diek1olu2/image/upload/v1684796408/ASSEME%20-%20visual/mesh-274_qmkwf8.png')]">
      <Typography
        text="Log In"
        type="subtitle"
        color="darkGreen" />
      <form onSubmit={handleLogInSubmit} className='flex flex-col justify-center items-center w-[20vw] gap-3'>
        <InputWithLabel
          name="email"
          label="Email"
          type="email"
          value={loginData.email}
          onInputChange={handleLoginInputChange}
        />
        <InputWithLabel
          name="password"
          label="Password"
          type="password"
          value={loginData.password}
          onInputChange={handleLoginInputChange}
        />
        {messageEmail && (<p className={errorTextClassName}>{messageEmail}</p>)}
        {user && !token && (<p className={errorTextClassName}>Session has expired, please log in again.</p>)}
        <button
          type="submit"
          className="w-fit font-dancing text-2xl text-white transition duration-500 hover:text-[rgb(211,105,145)] mt-[0.5rem]"
        >Log in</button>
      </form>

      <GoogleButton firebaseFunction={handleLoginWithFirebase} text="Login with Google" />

      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-center text-md text-gray-400">I don't have an account!</p>
        <button
          onClick={changeLogRegister}
          className="cursor-pointer font-dancing text-xl text-white transition duration-500 hover:text-[rgb(211,105,145)]"
        >
          Register
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}
