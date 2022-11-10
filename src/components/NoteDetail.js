import React from "react";
import PropTypes from 'prop-types';
import {showFormattedDate} from '../utils/index'
import {BiArchiveIn, BiArchiveOut, BiTrashAlt} from 'react-icons/bi';
import { archiveNote, deleteNote, unarchiveNote } from "../utils/local-data";
import { useNavigate } from "react-router-dom";

function NoteDetail({id, title, body , createdAt, archived}) {

    const navigate = useNavigate()
    const noteID = id;
    
    function onArchiveEventHandler(){
        archiveNote(noteID);
        navigate('/');
    }

    function onActiveEventHandler(){
        unarchiveNote(noteID);
        navigate('/')
    }

    function onDeleteEventHandler(){
        deleteNote(noteID);
        navigate('/');
    }

    const date = showFormattedDate(createdAt);
        if(archived === true){
            return (
                <section className="detail-page">
                    <h3 className="detail-page__title">{title}</h3>
                    <p className="detail-page__createdAt">{date}</p>
                    <div className="detail-page__body">{body}</div>
        
                    <div className="detail-page__action">
                    <button className="action" type="button" title="Aktifkan" onClick={onActiveEventHandler}><BiArchiveOut/></button>
                    <button className="action" type="button" title="Hapus" onClick={onDeleteEventHandler}><BiTrashAlt/></button>
                    </div>
                </section>
                
            )
        }

        return (
            <section className="detail-page">
                <h3 className="detail-page__title">{title}</h3>
                <p className="detail-page__createdAt">{date}</p>
                <div className="detail-page__body">{body}</div>
    
                <div className="detail-page__action">
                <button className="action" type="button" title="Arsipkan" onClick={onArchiveEventHandler}><BiArchiveIn/></button>
                    <button className="action" type="button" title="Hapus" onClick={onDeleteEventHandler}><BiTrashAlt/></button>
                </div>
            </section>
        )
}

NoteDetail.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
}

export default NoteDetail;