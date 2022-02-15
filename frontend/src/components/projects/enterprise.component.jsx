import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @Component Permet d'afficher les projets d'une entreprise
 * @Waiting => Implémentation du controller sur la partie serveur
 */
const Project_Enterprise = () => {
  const [isProjects, setIsProject] = useState(false);
  
  const navigate = useNavigate();

  if (!isProjects) {
    return (
      <div>
        <div className="alert alert-danger" role="alert">
          Vous n'avez actuellement aucuns projets
        </div>

        <div className="col-md-12 text-center">
          <button onClick={() => {navigate('/project/create')}}>Créer un projet</button>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        Hello world!
      </div>
    )
  }
}

export default Project_Enterprise;