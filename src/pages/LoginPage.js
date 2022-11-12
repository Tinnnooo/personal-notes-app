import React from "react";
import {Link} from 'react-router-dom';
import LoginInput from "../components/LoginInput";
import LocaleContext from "../contexts/LocaleContext";
import { login } from "../utils/api";

function LoginPage({loginSuccess}){
    const {language} = React.useContext(LocaleContext);
    async function onLogin({email, password}){
        const {error, data} = await login({email, password});

        if(!error){
            loginSuccess(data);
        }
    }

    return(
        <section className="login-page">
            <h2>{language === "id" ? "Yuk, login untuk menggunakan aplikasi" : "Login to use app, please"}</h2>
            <LoginInput login={onLogin}/>
            <p>{language === "id" ? "Belum punya akun?" : "Don't have account?"} <Link to="/register">{language === "id" ? "Daftar di sini" : "Register here"}</Link></p>
        </section>
    )
}

export default LoginPage;