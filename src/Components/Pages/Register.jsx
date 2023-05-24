import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { ageValidator, samePasswordValidator } from "../../Utils/validator";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessageError, toastMessageSuccess } from "../../Utils/toaster";
import { GoogleButton } from "../BaseComponents/GoogleButton";
import { useUser } from "../../Context/UserContext/UserContext";
import { registerWithFirebase } from "../../Utils/firebaseLoginRegister";
import { Typography } from "../BaseComponents/Typography";

export const Register = ({ changeLogRegister }) => {
    const inputClassName = "peer h-9 w-full border-b-1 text-gray-800 bg-white text-center rounded-xl px-[0.5rem]"
    const errorTextClassName = "text-xs text-red-800";
    const { register: formRegister , watch, formState: { errors }, handleSubmit } = useForm();
    const { register } = useUser();
    const navigate = useNavigate();
    const [messageEmail, setMessageEmail] = useState("")

    const handleRegisterWithFirebase = async () => {
        const responseFirebase = await registerWithFirebase();
        const {
            email,
            displayName,
            uid
        } = responseFirebase.user;
        const response = await register({
            email,
            name: displayName,
            password: uid,
            repPassword: uid,
        });
        if (response.ok) {
            toastMessageSuccess("Registration successful. You will be redirect to the main page.");
            setTimeout(() => {
                navigate("/");
            }, 2500);
        } else {
            setMessageEmail(response.message)
            toastMessageError(response.message)
        }
    }

    const onSubmit = async (data) => {
        const response = await register(data)
        if (response.ok) {
            toastMessageSuccess("Registration successful. You will be redirect to the main page.");
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
                text="Register"
                type="subtitle"
                color="darkGreen" />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-2 w-[40vw] md:w-[20vw]">
                <div className="w-full">
                    <input type="text" {...formRegister('name', {
                        required: true
                    })} className={inputClassName}
                        placeholder="name" />
                    {errors.name?.type === 'required' && <p className={errorTextClassName}>Name field is required</p>}
                </div>
                <div className="w-full">
                    <input type="text" {...formRegister('lastName', {
                        required: true
                    })} className={inputClassName}
                        placeholder="last name" />
                    {errors.lastName?.type === 'required' && <p className={errorTextClassName}>Last name field is required</p>}
                </div>
                <div className="w-full">
                    <input type="text" {...formRegister('age', {
                        required: true,
                        validate: ageValidator
                    })} className={inputClassName}
                        placeholder="age" />
                    {errors.age && <p className={errorTextClassName}>Age must be greater than 0</p>}
                </div>
                <div className="w-full">
                    <input type="email" {...formRegister('email', {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                    })} className={inputClassName}
                        placeholder="email" />
                    {errors.email?.type === 'pattern' && <p className={errorTextClassName}>Enter a valid email</p>}
                    {errors.email?.type === 'required' && <p className={errorTextClassName}>Email field is required</p>}
                </div>
                <div className="w-full">
                    <input type="password" {...formRegister('password', {
                        required: true,
                        pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/
                    })} className={inputClassName}
                        placeholder="password" />
                    {errors.password?.type === 'required' && <p className={errorTextClassName}>Password is required</p>}
                    {errors.password?.type === 'pattern' && <p className={errorTextClassName}>The password must contain at least 8 characters, one number, one capital letter and one special character</p>}
                </div>
                <div className="w-full">
                    <input type="password" {...formRegister('repPassword', {
                        required: true,
                        validate: ((value) => { samePasswordValidator(watch('password'), value) })
                    })} className={inputClassName}
                        placeholder="repeat password" />
                    {errors.repPassword && <p className={errorTextClassName}>Both password must match</p>}
                </div>
                {messageEmail && (<p className={errorTextClassName}>{messageEmail}</p>)}
                <input type="submit" value="Register" className="w-fit font-dancing text-2xl text-white transition duration-500 hover:text-[rgb(211,105,145)] mt-[0.5rem]" />
            </form>

            <GoogleButton firebaseFunction={handleRegisterWithFirebase} text="Register with Google" />

            <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-center text-md text-gray-400">I already have an account!</p>
                <button
                    onClick={changeLogRegister}
                    className="cursor-pointer font-dancing text-xl text-white transition duration-500 hover:text-[rgb(211,105,145)]"
                >
                    Log In!
                </button>
            </div>
            <ToastContainer />
        </div>
    )
}
