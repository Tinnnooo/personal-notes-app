import React from "react";
import LocaleContext from "../contexts/LocaleContext";
import {BsMoonFill, BsFillSunFill} from 'react-icons/bs';

function ToggleTheme(){
    const {theme, toggleTheme} = React.useContext(LocaleContext);

        return(
            <>
            <button onClick={toggleTheme} className="toggle-theme" type="button">
            {theme === "dark" ? <BsMoonFill/> : <BsFillSunFill/>}
            </button>
            </>
        )
    }

export default ToggleTheme;