import React from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/api";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import LocaleContext from "../contexts/LocaleContext";

function ArsipPage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get("keyword") || ""
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const {language} = React.useContext(LocaleContext);

    React.useEffect(() => {
        getArchivedNotes().then(({data}) => {
            setNotes(data);
            setIsLoading(false);
        });
    },[]);

    function onKeywordChangeHandler(keyword){
        setKeyword(keyword);
        setSearchParams(keyword);
    }

    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(keyword.toLowerCase()
        )
    });

        if(isLoading){
            return <p>Loading...</p>
        }

        if(!notes.length){
            <section className="notes-list-empty">
                <p className="notes-list__empty">{language === "id" ? "Tidak Ada Catatan." : "No Note"}</p>
            </section>
        }

        return(
            <section className="archives-page">
                <h2>{language === "id" ? "Catatan Arsip" : "Archived Notes"}</h2>
                <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler}/>
                <NotesList notes={filteredNotes}/>
            </section>
            
        )
}

export default ArsipPage;