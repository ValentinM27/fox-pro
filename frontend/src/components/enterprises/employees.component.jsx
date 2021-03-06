import React, {useState} from 'react';
import link_api from '../../ressources/link_api';
import personService from '../../services/person.service';
import Person from '../person/person.component.jsx'

/**
 * @Component : Permet d'afficher les employés d'une entreprise
 */
const Enterprise_employees = (props) => {
  const [loading, setLoading] = useState(true);
  const [isEmployees, setIsEmployees] = useState(false);
  const [employees, setEmployees] = useState(null);
  const [apiErrors, setApiErrors] = useState(null);

  const queryParams = new URLSearchParams(window.location.search);
  const idEnterprise = queryParams.get("id");

  const fetchData = () => {
    fetch(link_api + 'enterprise/employees/' + idEnterprise, { 
      method: 'GET',
      headers: {  'Content-Type': 'application/json', authorization: personService.getToken() }
    })
    .then((response) => {
      if(response.status === 200) {
        response.json().then((data) => {
          setEmployees(data.EMPLOYEES);
          if(employees !== null && employees.length > 0) setIsEmployees(true);
          setLoading(false);
        })
      } else {
        response.json().then((data) => {
          setApiErrors(data.message);
          setLoading(false);
        })
      }
    })
  }

  if (loading) {
    fetchData();
    return (
      <div className="spinner-border text-warning" role="status"/>
    ) 
  } else {
    return (
      <div>
        {!isEmployees ? (
          <div className="alert alert-warning" role="alert">
            Vous n'avez actuellement aucuns employés, effectuez une recherche puis cliquez sur <i>'Ajouter à une entreprise'</i>
          </div>
        )
        :
        (
          <div>
            {employees !== null && employees.map(person => {
                return (
                    <div key={person.ID_PERSON_}>
                      <Person fromEnt={true} foxproID={person.ID_PERSON_} ID_PERSON_={props.ID_PERSON_} lastname={person.LASTNAME_P} firstname={person.FIRSTNAME_P} email={person.EMAIL}/>
                    </div>
                )
            })}
          </div>
        )}  
      </div>
    )
  }
}

export default Enterprise_employees