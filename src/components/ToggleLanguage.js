import React from "react";
import LocaleContext from "../contexts/LocaleContext";
import { MdGTranslate } from "react-icons/md";

function ToggleLanguage() {
  const { language, toggleLanguage } = React.useContext(LocaleContext);

  return (
    <>
      <button
       onClick={toggleLanguage} 
       className="toggle-locale">
       <MdGTranslate /> {language}
      </button>
    </>
  )
}

export default ToggleLanguage;
