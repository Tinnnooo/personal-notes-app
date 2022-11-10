import React from "react";
import PropTypes from 'prop-types';
import NotesItem from './NotesItem';
function NotesList({ notes }){
    if(!notes.length){
        return(
            <section className="notes-list-empty">
                <p className="notes-list__empty">Tidak ada catatan</p>
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