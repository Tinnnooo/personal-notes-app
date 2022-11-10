import React from "react";
import PropTypes from 'prop-types';
import useInput from "./useInput";
import { register } from "../utils/api";
import { useNavigate } from "react-router-dom";

function RegisterInput(){
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const navigate = useNavigate();

    function onRegisterHandler(event){
        event.preventDefault();

        register({name: name, email: email, password: password})

        navigate('/')
    }

    return(
        <div className="input-register">
            <label htmlFor='name'>Name</label>
            <input type="text" id="name" value={name} onChange={onNameChange}/>
            <label htmlFor='email'>Email</label>
            <input type="email" id="email" value={email} onChange={onEmailChange}/>
            <label htmlFor='password'>Password</label>
            <input type="password" id="password" value={password} onChange={onPasswordChange}/>
            <button type="button" onClick={onRegisterHandler}>Register</button>
        </div>
    )
}


export default RegisterInput;