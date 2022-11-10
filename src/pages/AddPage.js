import React from "react";
import { addNote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import NoteInput from "../components/NoteInput";

function AddPage(){
    const navigate = useNavigate();

    function onAddNoteHandler(title, body){
        addNote(title, body);
        navigate('/');
    }

    return(
            <NoteInput addNote={onAddNoteHandler} />
    )
}

export default AddPage;