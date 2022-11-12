import React from "react";
import PropTypes from 'prop-types'
import LocaleContext from "../contexts/LocaleContext";

function SearchBar({keyword, keywordChange}){
    const {language} = React.useContext(LocaleContext);
    return(
        <section className="search-bar">
        <input 
        type="text" 
        placeholder={language === "id" ? "Cari berdasarkan judul ..." : "Search by title ..."}
        value={keyword} 
        onChange={ (event) => keywordChange(event.target.value)}/>
        </section>
    )
}

SearchBar.propTypes = {
    keyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired,
}

export default SearchBar;