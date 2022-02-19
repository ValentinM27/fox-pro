import React, { useState, useEffect } from 'react';
import link_api from '../../ressources/link_api.js';
import personService from '../../services/person.service';

/**
 * @Component : Permet de modifier le mail et le mots de passe de l'utilisateur
 */
const Modify_pwd_login = (props) => {
    const initValue = {password : "", validatePassword : ""};
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

        if(!value.password){errors.password = "Un mot de passe est requis"}
        else if(value.password.length < 8 || value.password.length > 40){errors.password = "Le mot de passe doit faire entre 8 et 40 caractères"}

        if(!value.validatePassword){errors.validatePassword = "Vous devez valider votre mot de passe"}
        else if(value.password !== value.validatePassword){errors.validatePassword = "Les deux mots de passe sont différents"}

        if(Object.keys(errors).length === 0){
            sendData();      
        }

        return errors;
    }   

    /**
     * Permet d'envoyer les données
     */
    const sendData = () => {
        const person = {PASSWORD_P : formValues.password, validatePASSWORD_P : formValues.validatePassword};

        fetch(link_api + 'person/password/update', { 
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

    /**
     * Permet de gérer l'envoi du formulaire
     * @param {*} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validate(formValues));
    }

    return (
        <div>
            <h1 className="col-md-12 text-center">Modification mon mot de passe</h1>

            {/* Gestion de l'affichage des erreurs */}
            {apiErrors ? 
                (<div className="alert alert-danger" role="alert">
                {apiErrors}
                </div>) : null
            }

            <form onSubmit={ handleSubmit } className="form">

                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        type="password" 
                        name="password"
                        className="form-control" 
                        value={ formValues.password } 
                        onChange={ handleChange }
                    />
                </div>
                {/* Gestion de l'affichage des erreurs */}
                {formErrors.password ? 
                    (<div className="alert alert-danger" role="alert">
                    {formErrors.password}
                    </div>) : <br />
                }

                <div className="form-group">
                    <label htmlFor="validatePassword">Confirmer mot de passe</label>
                    <input 
                        type="password" 
                        name="validatePassword"
                        className="form-control" 
                        value={ formValues.validatePassword }
                        onChange={ handleChange }
                    />
                </div>
                {/* Gestion de l'affichage des erreurs */}
                {formErrors.validatePassword ? 
                    (<div className="alert alert-danger" role="alert">
                    {formErrors.validatePassword}
                    </div>) : <br />
                }

                <br />

                <div className="col-md-12 text-center">
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Modifier</button>
                    </div>      
                </div>
            </form>
            <hr />
        </div>
    )
}

export default Modify_pwd_login