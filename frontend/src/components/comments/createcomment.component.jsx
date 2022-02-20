import React, { useState, useEffect } from 'react';
import personService from '../../services/person.service';
import link_api from '../../ressources/link_api'
import moment from 'moment';

/**
 * @Component : Permet de créer et poster un commentaire
 */
const Create_comment = () => {
    const initValue = {content : "", postDate : ""};
    const [formValues, setFormValues] = useState(initValue);
    const [formErrors, setFormErrors] = useState({});
    const [apiErrors, setApiErrors] = useState(null);

    const queryParams = new URLSearchParams(window.location.search);
    const idProject = queryParams.get("idP");

    /**
     * Permet de gérer les changements dans les champs du formulaire
     * @param {*} event 
     */
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    }

    /**
     * Permet de gérer l'envoi du formulaire
     * @param {*} event 
     */
     const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validate(formValues));
    }

    /**
     * Permet de valider l'intégrité des données du formulaire 
     * @param {*} value 
     */
    const validate = (value) => {
        const errors = {};

        if(!value.content) {errors.content = "Veuillez saisir quelque chose"}
        else if(value.content.length > 255) {errors.content = "Veuillez respecter la limite de 255 caractères"};

        if(Object.keys(errors).length === 0){
            sendData();      
        }

        return errors;
    }

    const sendData = () => {
        const comment = {CONTENT_COMMENT : formValues.content, POST_DATE_COMMENT : moment(Date.now()).format('YYYY/MM/DD')};

        fetch(link_api + 'comments/create/' + idProject, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', authorization: personService.getToken() },
            body: JSON.stringify(comment)
        })
        .then((response) => {
            if(response.status === 200) {
                window.location.reload(false);
            } else {
                response.json().then((data) => {
                    setApiErrors(data.message, data.errors);
                })
            }
        })
    }

    /**
     * Gestion de l'affichage des erreurs
     */
    useEffect(() => {}, [formErrors]);

    return (
        <div className="container">
            {/* Gestion de l'affichage des erreurs */}
            {apiErrors ? 
                (<div className="alert alert-danger" role="alert">
                {apiErrors}
                </div>) : null
            }

            <form onSubmit={handleSubmit} className="form">

                <div className="form-group">
                    <label htmlFor="content" />
                    <textarea 
                        type="text" 
                        name="content"
                        className="form-control form-control-lg resize-none"
                        rows="3" 
                        cols="40"
                        value={ formValues.content }
                        onChange={ handleChange }
                    />
                </div>
                {/* Gestion de l'affichage des erreurs */}
                {formErrors.content ? 
                    (<div className="alert alert-danger" role="alert">
                    {formErrors.content}
                    </div>) : <br />
                }

                <div className="col-md-12 text-center">
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Poster</button>
                    </div>      
                </div>
                
                <hr />
            </form>
        </div>
    )
}

export default Create_comment;