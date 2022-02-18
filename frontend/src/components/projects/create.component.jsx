import React, { useState, useEffect } from 'react'
import link_api from '../../ressources/link_api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import personService from '../../services/person.service';

/**
 * @Component Permet de créer un projet 
 */
const Create_Project = () => {
  const initValue = {name : "", status : "OPEN", description : "", startDate : "", endDate : ""};
  const [formValues, setFormValues] = useState(initValue);
  const [formErrors, setFormErrors] = useState({});

  const [apiErrors, setApiErrors] = useState('');

  const navigate = useNavigate();

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues))

    if(Object.keys(formErrors).length === 0) {
      const project = {NAME_PROJECT : formValues.name, STATUT : formValues.status, DESCRIPTION_P : formValues.description, START_DATE_P : moment(formValues.startDate).format('YYYY/MM/DD'), END_DATE_P : moment(formValues.endDate).format('YYYY/MM/DD')};
      
      fetch(link_api + 'project/create/' + idEnterprise, {
        method : 'POST',
        headers : {"Content-Type": "application/json", authorization : personService.getToken()}, 
        body : JSON.stringify(project)
      })
      .then((response) => {
        if(response.status === 200) {
          navigate({
            pathname: '/projects',
            search: `?id=` + idEnterprise + `&name=` + nameEnterprise
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            setApiErrors(data.message);
          })
        }
      })
    };
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

    if(!value.name){errors.name = "Veuillez saisir un nom de projet"}
    else if(value.name.length < 2 || value.name.length > 50){errors.name = "Veuillez saisir un nom entre 2 et 50 caractères"};

    if(!value.description){errors.description = "Veuillez saisir une description"}
    else if (value.description.length < 10 || value.description.length > 255){errors.description = "Veuillez saisir une description entre 10 et 255 caractères"}

    const startDate = new Date(value.startDate);
    const endDate = new Date(value.endDate);

    if(!startDate.getTime()){errors.startDate = "Veuillez saisir une date de début"}

    if(!endDate.getTime()){errors.endDate = "Veuillez saisir une date de fin"}
    else if(startDate.getTime() > endDate.getTime()){errors.endDate = "Veuillez saisir une date de fin ultérieur à la date de début"};
    
    return errors;
  }

  return (
    <div className="container">
            <h1 className="col-md-12 text-center">Création d'un projet pour {nameEnterprise}</h1>

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
                    <label htmlFor="startDate">Date de début</label>
                    <input 
                        type="date" 
                        name="startDate"
                        className="form-control" 
                        value={ formValues.startDate }
                        onChange={ handleChange }
                    />
                </div>
                {/* Gestion de l'affichage des erreurs */}
                {formErrors.startDate ? 
                    (<div className="alert alert-danger" role="alert">
                    {formErrors.startDate}
                    </div>) : <br />
                }

                <div className="form-group">
                    <label htmlFor="endDate">Date de fin</label>
                    <input 
                        type="date" 
                        name="endDate"
                        className="form-control" 
                        value={ formValues.endDate }
                        onChange={ handleChange }
                    />
                </div>
                {/* Gestion de l'affichage des erreurs */}
                {formErrors.endDate ? 
                    (<div className="alert alert-danger" role="alert">
                    {formErrors.endDate}
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
                        <button type="submit" className="btn btn-primary">Créer le projet</button>
                    </div>      
                </div>

            </form>
        </div>
  )
}

export default Create_Project