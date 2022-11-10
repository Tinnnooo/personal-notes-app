import React from "react";
import {MdGTranslate} from 'react-icons/md';
import { LocaleConsumer } from "../contexts/LocaleContext";
import {BiExit} from 'react-icons/bi';

function ToggleMenu({logout, authedUser, name}){
    if(authedUser){
        return(
            <LocaleConsumer>
            {({locale, toggleLocale}) => {
                return(
                <>
                    <button className="toggle-locale" onClick={toggleLocale}><MdGTranslate/></button>
                    <button className="button-logout" onClick={logout}><BiExit/>{name}</button>
                </>
                )
            }}
            </LocaleConsumer>
        )
    }

    return(
        <LocaleConsumer>
        {({locale, toggleLocale}) => {
            return(
                
            <button className="toggle-locale" onClick={toggleLocale}><MdGTranslate/></button>
        
            )
        }}
        </LocaleConsumer>

    )
}

export default ToggleMenu;