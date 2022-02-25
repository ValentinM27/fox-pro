import React, { useState, useEffect } from 'react';
import link_api from '../../ressources/link_api.js';
import { useNavigate } from "react-router-dom";
import personService from '../../services/person.service.js'

/**
* @Component : Permet à l'utilisateur de se connecter 
*/
const Login = () => {
    const initValue = {email : "", password : ""};
    const [formValues, setFormValues] = useState(initValue);
    const [formErrors, setFormErrors] = useState({});
    const [reinit, setReinit] = useState(false);
    
    const [apiErrors, setApiErrors] = useState('');

    const navigate = useNavigate();

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
     * Gestion de l'affichage des erreurs
     */
    useEffect(() => {}, [formErrors]);

    /**
     * Permet de valider l'intégrités des données du formulaire
     * @param {*} value 
     */
    const validate = (value) => {
        const errors = {};
        const mail_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if(!value.email){errors.email = "Le mail est requis"}
        else if(!mail_regex.test(value.email)){errors.email = "Veuillez entrer une strucuture de mail correcte"}

        if(!value.password){errors.password = "Veuillez saisir votre mot de passe"}
        else if(value.password.length < 8 || value.password.length > 40){errors.password = "Le mot de passe fait entre 8 et 40 caractères"}

        if(Object.keys(errors).length === 0){
            sendData();      
        }

        return errors;
    }

    /**
     * Procéde à l'envoie des données
     */
    const sendData = () => {
        const person = {EMAIL : formValues.email, PASSWORD_P : formValues.password};

        fetch(link_api + 'person/login', {
            method : 'POST',
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify(person)
        })
        .then ((response) => {
            if(response.status === 200) {
                response.json().then((data) => {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("foxproID", data.ID_PERSON_);
                    navigate('/');
                })
            }
            else {
                response.json().then((data) => {
                    setApiErrors(data.message, data.errors);
                })
            }
        })
    }

    /**
     * Permet d'envoyer la demande de réinitialisation du mots de passe
     */
    const handleForgotPassword = () => {
        const person = {EMAIL : formValues.email};

        fetch(link_api + 'person/password/reset/req', {
            method : 'POST',
            headers : { 'Content-Type': 'application/json', authorization: personService.getToken()},
            body : JSON.stringify(person)
        })
        .then((response) => {
            if(response.status === 200) {
                alert('Consultez vos mails')
                window.location.reload(false);
            } 
            else {
                response.json().then((data) => {
                    alert(data.message)
                })
            }
        })
    }

    return (
        <div className="container">
            <h1 className="col-md-12 text-center">Connexion à votre compte Fox'Pro</h1>

            {/* Gestion de l'affichage des erreurs */}
            {apiErrors ? 
                (<div className="alert alert-danger" role="alert">
                {apiErrors}
                </div>) : <br />
            }

            <form onSubmit={handleSubmit} className="form">

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email"
                        className="form-control" 
                        value={ formValues.email }
                        onChange={ handleChange }
                    />
                </div>
                {/* Gestion de l'affichage des erreurs */}
                {formErrors.email ? 
                    (<div className="alert alert-danger" role="alert">
                    {formErrors.email}
                    </div>) : <br />
                }

                {!reinit ? 
                (
                    <div>
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
                    </div>
                )
                : null }

                <hr />

                <div className="col-md-12 text-center">
                    <div className="form-group">
                        {!reinit ? (
                            <div>
                                <button type="submit" className="btn btn-primary">Me connecter</button>
                                <button onClick={() => setReinit(true)}className="btn btn-dark orange space">Mot de passe oublié</button>
                            </div>
                        ) 
                        : 
                        (
                            <div>
                                <button onClick={() => handleForgotPassword()}className="btn btn-dark">Réinitialiser</button>
                                <button onClick={() => setReinit(false)}className="btn btn-dark orange space">Annuler</button>
                            </div>
                        )}
                    </div>      
                </div>

            </form>
        </div>
    )
}

export default Login;