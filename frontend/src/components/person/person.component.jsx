import React from 'react';
import { useNavigate } from 'react-router-dom';
import personService from '../../services/person.service';
import link_api from '../../ressources/link_api';

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

  const handleSuppression = () => {
    if(props.fromEnt && String(props.ID_PERSON_) === String(personService.getFoxproID())) {
      return (
        <div>
          <button onClick={() => deleteFromEnterprise()} className="btn1 red btn-dark">Supprimer de l'entreprise</button> 
        </div> 
      )
    }
  }

  /**
   * Permet de supprimer un employé
   */
  const deleteFromEnterprise = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const idEnterprise = queryParams.get("id");

    fetch(link_api + 'enterprise/employees/delete/'+ idEnterprise + '/' + props.foxproID, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', authorization: personService.getToken()}
    })
    .then((response) => {
      if(response.status === 200){
        window.location.reload(false);
        alert('Employé supprimé')
      } else {
        response.json().then((data) => {
          alert(data.message);
        })
      }
    })
  }

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card p-2 w-75">
            <div className="d-flex flex-column justify-content-center align-items-center"> 
                <h2>{props.firstname} {props.lastname}</h2> 
                
                <p>
                  {props.email}
                </p>

                {props.isSearch ? (
                  <button onClick={() => addToEnterprise(true)} className="btn1 btn-dark">Ajouter à une entreprise</button> 
                ) : handleSuppression()}

            </div>
        </div>
    </div>
  )
}

export default Person;