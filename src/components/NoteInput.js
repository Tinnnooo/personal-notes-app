import React from "react";
import PropTypes from 'prop-types';
import {FiCheck} from 'react-icons/fi'

class NoteInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title: '',
            body: ''
        }

        this.onTitleChangedEventHandler = this.onTitleChangedEventHandler.bind(this);
        this.onBodyInputEventHandler = this.onBodyInputEventHandler.bind(this);
        this.onClickEventHandler = this.onClickEventHandler.bind(this);
    }

    onTitleChangedEventHandler(event){
        this.setState(() => {
            return{
                title: event.target.value,
            }
        });
    }

    onBodyInputEventHandler(event){
        this.setState(() => {
            return{
                body: event.target.innerHTML,
            }
        });
    }

    onClickEventHandler(event){
        event.preventDefault();
        this.props.addNote(this.state);
    }

    render(){
        return(
            <div className="add-new-page">
                <div className="add-new-page__input">
                    <input className="add-new-page__input__title" placeholder="Catatan rahasia" value={this.state.title} onChange={this.onTitleChangedEventHandler}/>  

                    <div className="add-new-page__input__body" contentEditable data-placeholder="Sebenarnya saya adalah..." onInput={this.onBodyInputEventHandler}>
                    </div>
                </div>

                <div className="add-new-page__action">
                    <button className="action" type="button" title="simpan" onClick={this.onClickEventHandler}><FiCheck/></button>
                </div>
            </div>
        )
    }
}

NoteInput.propTypes = {
    addNote: PropTypes.func.isRequired,
}

export default NoteInput;