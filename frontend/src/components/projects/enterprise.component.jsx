import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PersonService from '../../services/person.service';
import link_api from '../../ressources/link_api';

/**
 * @Component Permet d'afficher les projets d'une entreprise
 */
const Project_Enterprise = () => {
  const [isProjects, setIsProject] = useState(false);
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiErrors, setApiErrors] = useState(null);
  

  const queryParams = new URLSearchParams(window.location.search);
  const idEnterprise = queryParams.get("id");
  
  const navigate = useNavigate();

  const fetchData = async() => { 
    fetch(link_api + 'Project/enterprise/' + idEnterprise, { 
      method: 'GET',
      headers: {'Content-Type': 'application/json', authorization: PersonService.getToken()}
    })
    .then((response) => {
      if(response.status === 200) {
        response.json().then((data) => {
            setProjects(data.PROJECTS);
            setLoading(false);
            setIsProject(true); 
        })
      } else {
        if(response.status === 500) { 
          response.json().then((data) => {
            setApiErrors(data.message);
          })
        }
        setLoading(false);
      }
    });
  } 

  if(loading) { 
    fetchData();
    return (
        <div className="col-md-12 text-center">   
            <div className="spinner-border text-warning" role="status"></div>
        </div>       
    )
  } 
  
  else {
    if (!isProjects) {
      return (
        <div>
          {apiErrors ? (
            <div className="alert alert-danger" role="alert">
              {apiErrors}
            </div>
          ) 
          : 
          (
            <div>
              <div className="alert alert-warning" role="alert">
                Vous n'avez actuellement aucuns projets 
              </div>
      
              <div className="col-md-12 text-center">
                <button onClick={() => {navigate('/project/create')}}>Créer un projet</button>
              </div>
            </div>
          )}
        </div>
        
      )
    }
    else {
      return (
        <div className="col-md-12 text-center">
          Nombre de projet : {projects.length}
          {projects !== null && projects.map(project => {
                    return (
                    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center" key={project.IDPROJECT}>
                        <div className="card p-4 w-75">
                            <div className=" image d-flex flex-column justify-content-center align-items-center"> 
                                <span>Nom : {project.NAME_PROJECT}</span> 

                                <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
                                    <span>Description : <br />{project.DESCRIPTION_P}</span> </div>
                                <div className=" d-flex mt-2"> <button className="btn1 btn-dark">Consulter</button> </div>
                            </div>
                        </div>
                    </div>
                    )
                })}
        </div>
      )
    }
  }
}

export default Project_Enterprise;