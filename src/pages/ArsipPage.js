import React from "react";
import PropTypes from 'prop-types';
import { useSearchParams } from "react-router-dom";
import NotesList from '../components/NotesList';
import SearchBar from "../components/SearchBar";
import { getArchivedNotes } from "../utils/local-data";

function ArsipPageWrapper(){
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword') || '';

    function changeSearchParams(keyword){
        setSearchParams({keyword})
    }

    return <ArsipPage defaultKeyword={keyword} keywordChange={changeSearchParams}/>
}

class ArsipPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            notes: getArchivedNotes(),
            keyword: props.defaultKeyword || '',
        }

        this.onArsipKeywordChangeHandler = this.onArsipKeywordChangeHandler.bind(this);
    }

    onArsipKeywordChangeHandler(keyword){
        this.setState(() => {
            return{
                keyword,
            }
        });

        this.props.keywordChange(keyword);
    }

    render(){

        const notes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(this.state.keyword.toLowerCase());
        });

        return(
            <section className="archive-page">
                <h2>Catatan Arsip</h2>
                <SearchBar keyword={this.state.keyword} keywordChange={this.onArsipKeywordChangeHandler}/>
                <NotesList notes={notes}/>
            </section>
        )
    }
}

ArsipPage.propTypes = {
    keyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired
}

export default ArsipPageWrapper;