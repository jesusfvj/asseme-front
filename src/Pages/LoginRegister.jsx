import { useState } from "react";
import { Login } from "../Components/Pages/Login";
import { Register } from "../Components/Pages/Register";

export const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const changeLogRegister = () => setIsRegistering(!isRegistering);
  return (
    <div className="z-10 flex items-center justify-end w-screen h-screen pr-[5vw]">
      {isRegistering ? (
        <Register changeLogRegister={changeLogRegister} />
      ) : (
        <Login changeLogRegister={changeLogRegister} />
      )}
    </div>
  );
};