import React, { useState, useEffect } from 'react';

function Register(){

  const initValue = {firstname : "", lastname : "", email : "", password : "", validate_password : ""};
  const [formValues, setFormValues] = useState(initValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
    console.log(formValues);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true)
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit === true) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (value) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(!value.firstname){errors.firstname = "Le prénom est requis"}
    if(!value.lastname){errors.lastname = "Le nom est requis"}
    if(!value.email){errors.email = "Un email est requis"}
    if(!value.password){errors.password = "Un mot de passe est requis"}
    if(!value.validate_password){errors.validate_password = "Vous devez valider votre mot de passe"}
    if(value.password !== value.validate_password){errors.validate_password = "Validation incorrect"}

    return errors;
  }

  return (
      <div className="container">
          <h1 className="col-md-12 text-center">Création de votre compte Fox'Pro</h1>

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
              {formErrors.firstname ? 
                (<div class="alert alert-danger" role="alert">
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
              {formErrors.lastname ? 
                (<div class="alert alert-danger" role="alert">
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

              {formErrors.email ? 
                (<div class="alert alert-danger" role="alert">
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

              {formErrors.password ? 
                (<div class="alert alert-danger" role="alert">
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

              {formErrors.validate_password ? 
                (<div class="alert alert-danger" role="alert">
                  {formErrors.validate_password}
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

  export default Register;

