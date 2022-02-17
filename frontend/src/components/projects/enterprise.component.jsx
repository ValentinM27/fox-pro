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

                                <div className="w-75" Style="margin-top: 15px">
                                  {handleProjectStatus(project.STATUT)}
                                </div>

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