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
  const nameEnterprise = queryParams.get("name");
  
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
            if(projects.length !== 0) setIsProject(true); 
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

  /**
   * Permet de gérer le style d'affichage du status du projet
   */
  const handleProjectStatus = (status) => { 
    switch(status) { 
      case 'OPEN' : {
        return (<div className="alert alert-success w-100" role="alert">
            En cours
          </div>
        )
      } 

      case 'ABANDONED' : {
        return (<div className="alert alert-secondary w-100" role="alert">
            Abandonné
          </div>
        )
      }

      case 'CLOSED' : { return (<div className="alert alert-primary w-100" role="alert">
            Cloturé
          </div>
        )
      }

      case 'MAINTENANCE' : { return (<div className="alert alert-warning w-100" role="alert">
            En maintenance
          </div>
        )
      }

      case 'SUSPENDED' : { return (<div className="alert alert-danger w-100" role="alert">
            Suspendu
          </div>
        )
      }

      default: { 
        return (<div className="alert alert-danger" role="alert">
            Status de projet non défini
          </div>
        )
      }
    }
  }

  /**
   * Permet de supprimer un projet via son id
   */
  const handleOnDelete = (idproject) => {
    fetch(link_api + 'Project/delete/' + idEnterprise + '/' + idproject, { 
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', authorization: PersonService.getToken()}
    })
    .then((response) => {
      if(response.status === 200) {
        if(projects.length === 0) setProjects(false);
        window.location.reload(false);
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
                <button onClick={() => {navigate({pathname: '/project/create', search: `?id=` + idEnterprise + `&name=` + nameEnterprise})}}>Créer un projet</button>
              </div>
            </div>
          )}
        </div>
        
      )
    }
    else {
      return (
        <div className="col-md-12 text-center">
          {apiErrors ? (
            <div className="alert alert-danger" role="alert">
              {apiErrors}
            </div>
          )
          : (<br />)}
          <h3>Nombre de projets : {projects.length}</h3>
          {projects !== null && projects.map(project => {
                    return (
                    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center" key={project.IDPROJECT}>
                        <div className="card p-2 w-75">
                            <div className="d-flex flex-column justify-content-center align-items-center"> 
                                <h2>{project.NAME_PROJECT}</h2> 
                                <h3 className="custom-h3">Crée par <b>{project.FIRSTNAME_P} {project.LASTNAME_P}</b></h3>
                                
                                <div className="custom-desc">
                                  <p>{project.DESCRIPTION_P}</p>
                                </div>
                                

                                <div className="row align-items-center">
                                  <div className="box">Date de début : <b>{new Date(project.START_DATE_P).toLocaleDateString()}</b></div>
                                  <div className="box">Date de fin prévue : <b>{new Date(project.END_DATE_P).toLocaleDateString()}</b></div>
                                </div>

                                <div className="w-75 margin-top">
                                  {handleProjectStatus(project.STATUT)}
                                </div>

                                <div className=" d-flex mt-2"> 
                                  <button className="btn1 btn-dark">Consulter</button>
                                  <button onClick={() => handleOnDelete(project.IDPROJECT)} className="btn1 btn-dark red space">Supprimer</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }).reverse()}
        </div>
      )
    }
  }
}

export default Project_Enterprise;