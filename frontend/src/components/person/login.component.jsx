import React, { useState, useEffect } from 'react';
import link_api from '../../ressources/link_api.js';
import { useNavigate } from "react-router-dom";

/**
* @Component : Permet à l'utilisateur de se connecter 
*/
const Login = () => {
    const initValue = {email : "", password : ""};
    const [formValues, setFormValues] = useState(initValue);
    const [formErrors, setFormErrors] = useState({});

    const [isSubmit, setIsSubmit] = useState(false);
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
        setIsSubmit(true);

        // Si il n'y a pas d'erreurs dans la saisie du formulaire, on procéde à l'envoi à l'API
        if(Object.keys(formErrors).length === 0 && isSubmit === true){
            const person = {EMAIL : formValues.email, PASSWORD_P : formValues.password};
            
            console.log(link_api + 'person/login');

            fetch(link_api + 'person/login', {
                method : 'POST',
                headers : { "Content-Type": "application/json" },
                body : JSON.stringify(person)
            })
            .then ((response) => {
                if(response.status === 200) {
                    response.json().then((data) => {
                        localStorage.setItem("token", data.token);
                        navigate('/');
                    })
                }
                else {
                    response.json().then((data) => {
                        setApiErrors(data.errors);
                    })
                }
            })
        } 
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

        return errors;
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

                <hr />

                <div className="col-md-12 text-center">
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Me connecter</button>
                    </div>      
                </div>

            </form>
        </div>
    )
}

export default Login;