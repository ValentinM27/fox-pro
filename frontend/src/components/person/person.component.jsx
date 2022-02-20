import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @Component : Permet d'afficher le profil d'un utilisateur
 */
const Person = (props) => {

  const navigate = useNavigate();

  const addToEnterprise = () => {
    navigate({
        pathname: '/enterprise',
        search: `?foxproID=` + props.foxproID
    })
  }

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card p-2 w-75">
            <div className="d-flex flex-column justify-content-center align-items-center"> 
                <h2>{props.firstname} {props.lastname}</h2> 
                
                <p>
                  {props.foxproID}<br />
                  {props.email}
                </p>

                <button onClick={() => addToEnterprise(true)} className="btn1 btn-dark">Ajouter à une entreprise</button> 
            </div>
        </div>
    </div>
  )
}

export default Person;