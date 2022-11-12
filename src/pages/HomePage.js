import React from "react";
import LocaleContext from "../contexts/LocaleContext";
import {Link, useSearchParams} from 'react-router-dom';
import { deleteNote, getActiveNotes } from "../utils/api";
import SearchBar from "../components/SearchBar";
import {FiPlus} from 'react-icons/fi';
import NotesList from '../components/NotesList'

function HomePage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get("keyword") || ""
    });

    const [isLoading, setIsLoading] = React.useState(true);
    const {language} = React.useContext(LocaleContext);

    React.useEffect(() => {
        getActiveNotes().then(({data}) => {
            setNotes(data);
            setIsLoading(false);
        })
    }, []);

    function onKeywordChangeHandler(keyword){
        setKeyword(keyword);
        setSearchParams(keyword);
    }

    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(keyword.toLowerCase()
        );
    });

    if(isLoading){
        return(
            <p>Loading...</p>
        )
    }

    return(
        <section className="homepage">
            <h2>{language === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
            <SearchBar keyword={keyword || ''} keywordChange={onKeywordChangeHandler}/>
            <NotesList notes={filteredNotes}/>
            <div className="homepage__action">
                <Link to="/notes/new"><button className="action" type="button" title="Tambah"><FiPlus/></button></Link>
            </div>
        </section>
    )
}

export default HomePage;