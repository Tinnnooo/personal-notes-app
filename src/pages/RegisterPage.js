import React from "react";
import RegisterInput from "../components/RegisterInput";
import {Link } from 'react-router-dom';
import {register} from '../utils/api';

function RegisterPage(){
    async function onRegisterHandler(user){
        await register(user);
    }

    return (
        <section className="register-page">
            <h2>Isi form untuk mendaftar akun.</h2>
            <RegisterInput register={onRegisterHandler} />
            <p>Sudah punya akun? <Link to="/login">Login Di sini</Link></p>
        </section>
    )
}

export default RegisterPage;