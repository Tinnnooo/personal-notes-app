import React from "react";
import RegisterInput from "../components/RegisterInput";
import {Link } from 'react-router-dom';
import {register} from '../utils/api';
import LocaleContext from "../contexts/LocaleContext";

function RegisterPage(){
    const {language} = React.useContext(LocaleContext);
    async function onRegisterHandler(user){
        await register(user);
    }

    return (
        <section className="register-page">
            <h2>{language === "id" ? "Isi form untuk mendaftar akun." : "Fill the form to register account"}</h2>
            <RegisterInput register={onRegisterHandler} />
            <p>{language === "id" ? "Sudah punya akun? " : "Already have an account? "}<Link to="/login">{language === "id" ? "Login Di sini" : "Login here"}</Link></p>
        </section>
    )
}

export default RegisterPage;