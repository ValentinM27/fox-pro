import React, { useState } from 'react';
import link_api from '../../ressources/link_api'
import personService from '../../services/person.service.js';
import Comment from './comment.component.jsx'
import CreateComment from './createcomment.component.jsx';

/**
 * @Component : Permet de gérer les commentaires 
 */
const Get_Comments = () => {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState(null);
    const [apiErrors, setApiErrors] = useState(null);

    const queryParams = new URLSearchParams(window.location.search);
    const idEnterprise = queryParams.get("id");
    const idProject = queryParams.get("idP");

    /**
     * Permet de récupérer les commentaires
     */
    const fetchData = async() => {
        fetch(link_api + 'comments/retrieve/' + idEnterprise + '/' + idProject, {
            method : 'GET',
            headers : { 'Content-Type': 'application/json', authorization : personService.getToken()}
        })
        .then((response) => {
            if(response.status === 200) {
                response.json().then((data) => {
                    setComments(data.COMMENTS);
                    setLoading(false);
                })
            } else {
                response.json().then((data) => {
                    setApiErrors(data.message);
                    setLoading(false);
                })
            }
        })
    }

    if(loading) {
        fetchData();
        return (
            <div className="col-md-12 text-center">   
                <div className="spinner-border text-warning" role="status"></div>
            </div>       
        )
    } else {
        return (
            <div>
                {apiErrors ? (
                <div className="alert alert-danger" role="alert">
                {apiErrors}
                </div>
                ) 
                : 
                (<div>
                    <CreateComment />
                    {comments !== null && comments.map(comment => {
                        return (
                            <div key={comment.IDCOMMENT}>
                                <Comment idcomment={comment.IDCOMMENT} firstname={comment.FIRSTNAME_P} lastname={comment.LASTNAME_P} content={comment.CONTENT_COMMENT} postDate={comment.POST_DATE_COMMENT} foxproId={comment.ID_PERSON_}/>
                            </div>
                        )
                    })}
                </div>)}  
            </div>
        )
    }
}

export default Get_Comments;