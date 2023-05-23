import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../Components/Pages/Login";
import { Register } from "../Components/Pages/Register";

export const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate()
  const changeLogRegister = () => setIsRegistering(!isRegistering);
  const handleNavigate = () => {
    navigate('/')
  }
  return (
    <>
      <div className='fixed inset-0 z-10' onClick={handleNavigate}></div>
      <div className="z-10 flex items-center justify-end w-screen h-screen pr-[5vw]">
        {isRegistering ? (
          <Register changeLogRegister={changeLogRegister} />
        ) : (
          <Login changeLogRegister={changeLogRegister} />
        )}
      </div>
    </>
  );
};