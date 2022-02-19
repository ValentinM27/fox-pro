import React, { useState, useEffect } from 'react';
import link_api from '../../ressources/link_api.js';
import { useNavigate } from "react-router-dom";

/**
 * @Component : Permet à l'utilisateur de se créer un compte
 */
const Register = () => {

  const initValue = {firstname : "", lastname : "", email : "", password : "", validate_password : "", checkbox : false};
  const [formValues, setFormValues] = useState(initValue);
  const [formErrors, setFormErrors] = useState({});

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
   * Vérification des contraintes sur les champs et créations des erreurs
   * @param {*} value 
   * @returns 
   */
  const validate = (value) => {
    const errors = {};
    const mail_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(!value.firstname){errors.firstname = "Le prénom est requis"}
    
    if(!value.lastname){errors.lastname = "Le nom est requis"}
    
    if(!value.email){errors.email = "Un email est requis"}
    else if(!mail_regex.test(value.email)){errors.email = "Entrez une strucuture de mail valide"}

    if(!value.password){errors.password = "Un mot de passe est requis"}
    else if(value.password.length < 8 || value.password.length > 40){errors.password = "Le mot de passe doit faire entre 8 et 40 caractères"}

    if(!value.validate_password){errors.validate_password = "Vous devez valider votre mot de passe"}
    else if(value.password !== value.validate_password){errors.validate_password = "Les deux mots de passe sont différents"}
    
    if(!value.checkbox){errors.checkbox = "Vous devez accepter la politique de confidentialité"}

    if(Object.keys(errors).length === 0){
      sendData();      
    }

    return errors;
  }

  /**
   * Permet d'envoyer les données
   */
  const sendData = () => {
    const person = {FIRSTNAME_P : formValues.firstname, LASTNAME_P : formValues.lastname, EMAIL : formValues.email, PASSWORD_P : formValues.password, validatePASSWORD_P : formValues.validate_password};
        
    fetch(link_api + 'person/register', {
        method: 'POST',
        headers : { "Content-Type": "application/json" },
        body : JSON.stringify(person)
    }) 
    .then ((response) => {
        if(response.status === 200) {
            navigate('/login');
        }
        else { 
            response.json().then((data) => {
                setApiErrors(data.message);
            });
        }
    })
  }

  return (
      <div className="container">
          <h1 className="col-md-12 text-center">Création de votre compte Fox'Pro</h1>
          
          {/* Gestion de l'affichage des erreurs */}
          {apiErrors ? 
            (<div className="alert alert-danger" role="alert">
              {apiErrors}
            </div>) : <br />
          }
            
          <form onSubmit={handleSubmit} className="form">
              
              <div className="form-group">
                <label htmlFor="firstname" className="col-sm-2 control-label">Prénom</label>
                <input 
                  type="text" 
                  name="firstname" 
                  className="form-control" 
                  value={ formValues.firstname }
                  onChange={ handleChange }
                />
              </div>
              {/* Gestion de l'affichage des erreurs */}
              {formErrors.firstname ? 
                (<div className="alert alert-danger" role="alert">
                  {formErrors.firstname}
                </div>) : <br />
              }

              <div className="form-group">
                <label htmlFor="lastname" className="col-sm-2 control-label">Nom</label>
                <input 
                  type="text" 
                  name="lastname" 
                  className="form-control" 
                  value={ formValues.lastname } 
                  onChange={ handleChange }
                />
              </div>
              {/* Gestion de l'affichage des erreurs */}
              {formErrors.lastname ? 
                (<div className="alert alert-danger" role="alert">
                  {formErrors.lastname}
                </div>) : <br />
              }

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
                <label htmlFor="validate_password" className="col-sm-5 control-label">Valider votre mot de passe</label>
                <input 
                  type="password"
                  name="validate_password" 
                  className="form-control" 
                  value={ formValues.validate_password }
                  onChange={ handleChange } 
                />
              </div> 
              {/* Gestion de l'affichage des erreurs */}
              {formErrors.validate_password ? 
                (<div className="alert alert-danger" role="alert">
                  {formErrors.validate_password}
                </div>) : <br />
              }  
              
              <hr />

              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  value={ formValues.checkbox }
                  onChange={ () => formValues.checkbox = (!formValues.checkbox)} 
                  id="check-politique" 
                />
                <label className="form-check-label" htmlFor="check-politique">
                  J'accepte la politique de confidentialité
                </label>
              </div>
              {/* Gestion de l'affichage des erreurs */}
              {formErrors.checkbox ? 
                (<div className="alert alert-danger" role="alert">
                  {formErrors.checkbox}
                </div>) : <br />
              }  

              <div className="col-md-12 text-center">
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Créer</button>
                </div>
              </div>
              
          </form>
      </div>
    ) 
  }

  export default Register;

