import React, { useState, useEffect } from 'react';
import link_api from '../../ressources/link_api';
import personService from '../../services/person.service';

/**
 * @Component Permet de modifier le profil de l'utilisateur
 */
const Modify_profil = (props) => {
    const initValue = {firstname : props.firstname, lastname : props.lastname};
    const initForm = {firstname : "", lastname : ""}
    const [formValues, setFormValues] = useState(initForm);
    const [formErrors, setFormErrors] = useState({});
    const [apiErrors,setApiErrors] = useState(null);

    /**
     * Permet de gérer les changements dans les champs du formulaire
     * @param {*} event 
     */
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    }

    /**
     * Gestion de l'affichage des erreurs
     */
    useEffect(() => {}, [formErrors]);

    /**
     * Permet de valider les données du formulaire
     * @param {*} value 
     */
    const validate = (value) => {
        const errors = {};

        if(value.lastname && value.lastname.length > 50) {errors.lastname = "Veuillez saisir un nom de moins de 50 caractères"};
        
        if(value.firstname && value.firstname.length > 50) {errors.firstname = "Veuillez saisir un nom de moins de 50 caractères"};

        return errors;
    }   

    /**
     * Permet de gérer l'envoi du formulaire
     * @param {*} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validate(formValues));

        // Si il n'y a pas d'erreurs dans la saisie du formulaire, on procéde à l'envoi à l'API
        if(Object.keys(formErrors).length === 0){
            const person = {LASTNAME_P : formValues.lastname, FIRSTNAME_P : formValues.firstname};

            fetch(link_api + 'person/update', { 
                method : 'POST',
                headers: { "Content-Type": "application/json", authorization : personService.getToken()},
                body : JSON.stringify(person)
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
    }

    return (
        <div className="centered  margin-top w-75 col-md-12">
            
            <h1 className="col-md-12 text-center">Modification de votre profil</h1>

            {/* Gestion de l'affichage des erreurs */}
            {apiErrors ? 
                (<div className="alert alert-danger" role="alert">
                {apiErrors}
                </div>) : <br />
            }

            <form onSubmit={ handleSubmit } className="form">

                <div className="form-group">
                    <label htmlFor="firstname">Prénom</label>
                    <input 
                        type="text" 
                        name="firstname"
                        className="form-control" 
                        value={ formValues.firstname }
                        placeholder={ initValue.firstname } 
                        onChange={ handleChange }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">Nom</label>
                    <input 
                        type="text" 
                        name="lastname"
                        className="form-control" 
                        value={ formValues.lastname }
                        placeholder={ initValue.lastname}
                        onChange={ handleChange }
                    />
                </div>

                <hr />

                <div className="col-md-12 text-center">
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Modifier</button>
                    </div>      
                </div>

            </form>
        </div>
    )
}

export default Modify_profil