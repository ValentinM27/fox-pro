import React, { useState, useEffect } from 'react';
import link_api from '../../ressources/link_api';
import { useNavigate } from 'react-router-dom';

/**
 * @Component : Permet de réintialiser le mdp de l'utilisateur via mail
 */
const Init_password = () => {
    const initValue = {email: '', password: '', validatePassword: '', token: ''};
    const [formValues, setFormValues] = useState(initValue);
    const [formErrors, setFormErrors] = useState({});
    const [apiErrors, setApiErrors] = useState(null);

    const navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

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

    const validate = (value) => {
        const errors = {};
        const mail_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if(!value.email){errors.email = "Le mail est requis"}
        else if(!mail_regex.test(value.email)){errors.email = "Veuillez entrer une strucuture de mail correcte"}

        if(!value.password){errors.password = "Veuillez saisir votre mot de passe"}
        else if(value.password.length < 8 || value.password.length > 40){errors.password = "Le mot de passe fait entre 8 et 40 caractères"}

        if(!value.validatePassword){errors.validatePassword = "Vous devez valider votre mot de passe"}
        else if(value.password !== value.validatePassword){errors.validatePassword = "Les deux mots de passe sont différents"}
        
        if(Object.keys(errors).length === 0){
            sendData();      
        }

        return errors;
    }

    const sendData = () => {
        const person = {EMAIL : formValues.email, token : token, PASSWORD_P : formValues.password, validatePASSWORD_P : formValues.validatePassword}

        fetch(link_api + 'person/password/reset', {
            method : 'POST',
            headers : { "Content-Type": "application/json"},
            body : JSON.stringify(person)
        })
        .then((response) => {
            if(response.status === 200){
                navigate('/login')
            } else {
                response.json().then((data) => {
                    setApiErrors(data.message)
                })
            }
        })
    }

    return (
        <div className="container">
          <h1 className="col-md-12 text-center">Réinitialisation de votre mot de passe</h1>
          
          {/* Gestion de l'affichage des erreurs */}
          {apiErrors ? 
            (<div className="alert alert-danger" role="alert">
              {apiErrors}
            </div>) : <br />
          }
            
          <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="email" className="col-sm-2 control-label">Email</label>
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
                    <label htmlFor="password" className="col-sm-2 control-label">Mot de passe</label>
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
                    <label htmlFor="validatePassword" className="col-sm-5 control-label">Valider votre mot de passe</label>
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
                
                <hr />

                <div className="col-md-12 text-center">
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary">Réinitialiser</button>
                    </div>
                </div>
              
            </form>
        </div>
    )
}

export default Init_password