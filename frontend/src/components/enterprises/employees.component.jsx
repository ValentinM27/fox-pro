import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @Component : Permet d'afficher les employés d'une entreprise
 */
const Enterprise_employees = () => {
  const [isEmployees, setIsEmployees] = useState(false);
  const navigate = useNavigate();
  
  if (!isEmployees) {
    return (
      <div>
        <div className="alert alert-warning" role="alert">
          Vous n'avez actuellement aucuns employés, effectuez une recherche puis cliquez sur <i>'Ajouter à une entreprise'</i>
        </div>
      </div>
    ) 
  } else {
    return (
      <div>Hello world !</div>
    )
  }
}

export default Enterprise_employees