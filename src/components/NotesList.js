import React from "react";
import PropTypes from 'prop-types';
import NotesItem from './NotesItem';
import LocaleContext from "../contexts/LocaleContext";
function NotesList({ notes }){
    const {langauge} = React.useContext(LocaleContext);
    if(!notes.length){
        return(
            <section className="notes-list-empty">
                <p className="notes-list__empty">{langauge === "id" ? "Tidak Ada Catatan" : "No Note"}</p>
            </section>
        )
    }

    return (
        <section className="notes-list">
            {notes.map((note) => (
                <NotesItem key={note.id} {...note}/>
            ))}
        </section>
    )
}

NotesList.propType = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NotesList;