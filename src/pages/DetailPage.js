import React from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import { getNote } from '../utils/local-data'
import NotFound from "./NotFound";

function DetailPageWrapper(){
    const { id } = useParams();
    return <DetailPage id={id} />;
}

class DetailPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            note: getNote(props.id),
        };
    }
    
    render(){
        if(this.state.note == null){
            return <NotFound/>
        }
        return(
            <>
                <NoteDetail {...this.state.note}/>
            </>
        )
    }
}

DetailPage.propTypes = {
    id: PropTypes.string.isRequired,
}

export default DetailPageWrapper;