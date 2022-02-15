import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @Component : Permet d'afficher les employés d'une entreprise
 */
const Enterprise_employees = () => {
  const [isProjects, setIsProject] = useState(false);

  const navigate = useNavigate();
  
  if (!isProjects) {
    return (
      <div>
        <div className="alert alert-danger" role="alert">
          Vous n'avez actuellement aucuns employés
        </div>

        <div className="col-md-12 text-center">
          <button onClick={() => {navigate('/enterprise/employees')}}>Ajouter des employés</button>
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