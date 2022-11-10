import React from "react";
import NotesList from "../components/NotesList";
import {FiPlus} from 'react-icons/fi';
import { getActiveNotes } from "../utils/api";
import {Link, useSearchParams} from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import PropTypes from 'prop-types';

function HomePageWrapper(){
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword') || '';

    function changeSearchParams(keyword){
        setSearchParams({keyword});
    }

    return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams}/>
}

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            notes: getActiveNotes(),
            keyword: props.defaultKeyword || '',
        }

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    onKeywordChangeHandler(keyword){
        this.setState(() => {
            return{
                keyword,
            }
        });

        this.props.keywordChange(keyword);
    }

    render(){
        const notes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(this.state.keyword.toLowerCase()
            );
        });
        
        return (
                    <section className="homepage">
                        <h2>Catatan Aktif</h2>
                        <SearchBar keyword={this.state.keyword || ''} keywordChange={this.onKeywordChangeHandler}/>
                        <NotesList notes={notes} />
                        <div className="homepage__action">
                        <Link to='/notes/new'><button type="button" className="action" title="Tambah"><FiPlus/></button></Link>
                        </div>
                    </section>
        )
    }
}

HomePage.propTypes = {
    defaultKeyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired,
}

export default HomePageWrapper;