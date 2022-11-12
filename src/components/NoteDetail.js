import React from "react";
import { FiTrash } from "react-icons/fi";
import { MdArchive, MdUnarchive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { showFormattedDate } from "../utils";
import { archiveNote, deleteNote, getActiveNotes, unarchiveNote } from "../utils/api";

function NoteDetail({id, title, createdAt, body, archived}){

    const navigate = useNavigate();
    const [notes, setNotes] = React.useState([]);

    function onDeleteNote(){
        deleteNote(id);
        setNotes(() => {
            getActiveNotes();
        })
        navigate('/');
    };

    function onArchived(){
        archiveNote(id);
        setNotes(() => {
            getActiveNotes();
        })
        navigate('/');
    };

    function onUnarchived(){
        unarchiveNote(id);
        setNotes(() => {
            getActiveNotes();
        })
        navigate('/');
    };

    if(archived){
        return(
        <section className="detail-page">
        <h3 className="detail-page__title">{title}</h3>
        <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
        <div className="detail-page__body">{body}</div>
        <div className="detail-page__action">
            <button className="action" type="button" title="Aktifkan" onClick={onUnarchived}><MdUnarchive/></button>
            <button className="action" type="button" title="Hapus" onClick={onDeleteNote}><FiTrash/></button>
        </div>
    </section>
    )
    }

    return(
        <section className="detail-page">
            <h3 className="detail-page__title">{title}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
            <div className="detail-page__body">{body}</div>
            <div className="detail-page__action">
                <button className="action" type="button" title="Arsipkan" onClick={onArchived}><MdArchive/></button>
                <button className="action" type="button" title="Hapus" onClick={onDeleteNote}><FiTrash/></button>
            </div>
        </section>
    )
}

export default NoteDetail;