import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import de component
import Projects from './enterprise.component';

/**
 * @Component : Permet de lister les projets d'une entreprise via le composant 
 * enterprise.component.jsx
 */
const Projects_list = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const idEnterprise = queryParams.get("id");
    const nameEnterprise = queryParams.get("name");
    const navigate = useNavigate();

    /**
     * Permet d'aller au @Component pour créer un projet
     * @TODO
     */
     const handleCreateProject = () => {
        navigate({
            pathname: '/project/create',
            search: `?id=` + idEnterprise + `&name=` + nameEnterprise
        });
    }

    /**
     * Permet de retouner à la page entreprise
     */
    const handleReturPreviousPage = () => { 
      navigate({
        pathname: '/enterprise/consult',
        search: `?id=` + idEnterprise
    });
    }

  return (
    <div className="col-md-12 text-center">
        <div className="alert alert-success" role="alert">
            Chargement réussi
        </div>

        <p>Vous visualisez les projets de </p><h1>{nameEnterprise}</h1>

        <button className="btn1 btn-dark" onClick={() => handleCreateProject()}>Créer un nouveau projet</button>
        <button className="btn1 btn-dark space" onClick={() => handleReturPreviousPage()}>Page entreprise</button>
        <hr />

        <Projects />
    </div>
  )
}

export default Projects_list;