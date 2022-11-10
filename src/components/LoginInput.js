import React from "react";
import { useNavigate } from "react-router-dom";
import useInput from "./useInput";

function LoginInput({login}){
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const navigate = useNavigate();

    async function onSubmitHandler(event){
        event.preventDefault();

        login({
            email: email,
            password: password, 
        });

        navigate('/');
    }

    return (
        <div className="input-login">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={onEmailChange} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={onPasswordChange} />
            <button type="button" onClick={onSubmitHandler}>Login</button>
        </div>
    )
}

export default LoginInput;