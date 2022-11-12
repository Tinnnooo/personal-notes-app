import React from "react";
import { FiLogOut } from "react-icons/fi";

function Logout({logout, name}){
    return(
        <button className="button-logout" type="button" onClick={logout}>{name}<FiLogOut/></button>
    )
}

export default Logout;