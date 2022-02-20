import React from 'react';
import personService from '../../services/person.service';
import link_api from '../../ressources/link_api';

/**
 * @Component : Structure d'un commentaire
 */
const Comment = (props) => {

    /**
     * Permet de gérer les options créateur commentaire
     */
    const getOptions = () => {
        if(String(personService.getFoxproID()) === String(props.foxproId)) {
            return (
                <div className=" d-flex mt-2"> 
                    <button onClick={() => handleOnDelete()} className="btn1 btn-dark delete">X</button> 
                </div>
            )
        }
    }

    const handleOnDelete = () => {
        fetch(link_api + 'comments/delete/' + props.idcomment, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', authorization : personService.getToken()}
        })
        .then((response) => {
            if(response.status === 200) {
                window.location.reload(false);
            } else {
                response.json().then((data) => {
                    alert(data.message);
                })
            }
        })
    }

    return (
        <div className="col-md-12 text-center">
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center comment">
                <div className="d-flex flex-column justify-content-center align-items-center"> 
                    <h3 className="custom-h3">Posté par <b>{props.firstname} {props.lastname}</b> le <b>{new Date(props.postDate).toLocaleDateString()}</b></h3>
                    
                    <div>
                        <p>{props.content}</p>
                    </div>
                </div>

                {getOptions()}
            </div>
        </div>
        
    )
}

export default Comment;