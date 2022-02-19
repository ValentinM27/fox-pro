import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import link_api from '../../ressources/link_api.js';
import PersonService from '../../services/person.service.js';

/**
 * Permet de créer une entreprise
 */
const Create_enterprise = () => {
    
    const initValue = {name: "", description: ""};
    const [formValues, setFormValues] = useState(initValue);
    const [formErrors, setFormErrors] = useState({});

    const [apiErrors, setApiErrors] = useState('');

    const navigate = useNavigate();

    /**
     * Permet de gérer les chnagements dans les champs du formulaire
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
     * Permet de vérifier l'intégrités des données du formulaire
     * @param {*} value 
     */
    const validate = (value) => {
        const errors = {};

        if(!value.name){errors.name = "Veuillez entrer un nom  pour votre entreprise"}
        else if (value.name.length > 50 || value.name.length < 2){errors.name = "Le nom doit être compris entre 2 et 50 caractères"};

        if(value.description && value.description.length > 255){errors.description = "La description doit faire moins de 255 caractères"};

        if(Object.keys(errors).length === 0){
            sendData();      
        }

        return errors;
    }

    /**
     * Procéde à l'envoie des données
     */
    const sendData = () => {
        const enterprise = {NAME_ENTERPRISE : formValues.name, DESCRIPTION_ENT : formValues.description};

        fetch(link_api + 'enterprise/create', {
            method : 'POST',
            headers : { 'Content-Type': 'application/json', authorization : PersonService.getToken() },
            body : JSON.stringify(enterprise)
        })
        .then(response => {
            if(response.status === 200) {
                navigate('/enterprise');
            }
            else {
                response.json().then((data) => {
                    setApiErrors(data.message, data.errors);
                })
            }
        })
    }
    return (
        <div className="container">
            <h1 className="col-md-12 text-center">Création d'une entreprise</h1>

            {/* Gestion de l'affichage des erreurs */}
            {apiErrors ? 
                (<div className="alert alert-danger" role="alert">
                {apiErrors}
                </div>) : <br />
            }

            <form onSubmit={handleSubmit} className="form">

            <div className="form-group">
                    <label htmlFor="email">Nom de l'entreprise</label>
                    <input 
                        type="text" 
                        name="name"
                        className="form-control" 
                        value={ formValues.name }
                        onChange={ handleChange }
                    />
                </div>
                {/* Gestion de l'affichage des erreurs */}
                {formErrors.name ? 
                    (<div className="alert alert-danger" role="alert">
                    {formErrors.name}
                    </div>) : <br />
                }

                <div className="form-group">
                    <label htmlFor="password">Description</label>
                    <input 
                        type="text" 
                        name="description"
                        className="form-control" 
                        value={ formValues.description }
                        onChange={ handleChange }
                    />
                </div>
                {/* Gestion de l'affichage des erreurs */}
                {formErrors.description ? 
                    (<div className="alert alert-danger" role="alert">
                    {formErrors.description}
                    </div>) : <br />
                }

                <hr />

                <div className="col-md-12 text-center">
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Créer</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Create_enterprise;