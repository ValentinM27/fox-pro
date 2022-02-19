import React, { useState, useEffect } from 'react'

/**
 * @Component : Permet de modifier un projet un
 */
const Modify_project = (props) => {
    const initValues = {name : "", description : "", state : ""};
    const placeValues = {name : props.name, description : props.description, status : props.status};
    const [formValues, setFormValues] = useState(initValues);
    const [formErrors, setFormErrors] = useState({});
    const [apiErrors, setApiErrors] = useState('');

    const queryParams = new URLSearchParams(window.location.search);
    const idEnterprise = queryParams.get("id");
    const nameEnterprise = queryParams.get("name");

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
     * Permet de vérifier l'intégrités des données du formulaire
     * @param {*} value 
     */
    const validate = (value) => {
        const errors = {};

        if (value.name && (value.name.length < 2 || value.name.length > 50)){errors.name = "Veuillez saisir un nom entre 2 et 50 caractères"};

        if (value.description && (value.description.length < 10 || value.description.length > 255)){errors.description = "Veuillez saisir une description entre 10 et 255 caractères"}
        
        if(Object.keys(errors).length === 0){
            sendData();      
        }

        return errors;
    }

    /**
     * Permet d'envoyer les données à l'api
     */
    const sendData = () => {

    }

    return (
        <div className="container">
            <h1 className="col-md-12 text-center">Vous modifiez {props.name} de {nameEnterprise}</h1>

            {/* Gestion de l'affichage des erreurs */}
            {apiErrors ? 
                (<div className="alert alert-danger" role="alert">
                {apiErrors}
                </div>) : <br />
            }

            <form onSubmit={handleSubmit} className="form">

                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input 
                        type="text" 
                        name="name"
                        className="form-control" 
                        value={ formValues.name }
                        placeholder={ placeValues.name }
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
                    <label htmlFor="description">Description</label>
                    <input 
                        type="text" 
                        name="description"
                        className="form-control" 
                        value={ formValues.description }
                        placeholder={ placeValues.description }
                        onChange={ handleChange }
                    />
                </div>
                {/* Gestion de l'affichage des erreurs */}
                {formErrors.description ? 
                    (<div className="alert alert-danger" role="alert">
                    {formErrors.description}
                    </div>) : <br />
                }

                <div className="form-group">
                    <label htmlFor="status">Statut</label>
                    <select 
                        name="status"
                        className="form-control" 
                        value={ formValues.status }
                        onChange={ handleChange }
                    > 
                      <option value="OPEN">Ouvert</option>
                      <option value="ABANDONED">Abandonné</option>
                      <option value="MAINTENANCE">Maintenance</option>
                      <option value="SUSPENDED">Suspendu</option>
                      <option value="CLOSED">Cloturé</option>
                    </select>
                </div>
                <hr />

                <div className="col-md-12 text-center">
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Modifer le projet</button>
                    </div>      
                </div>

            </form>
        </div>
    )
}

export default Modify_project