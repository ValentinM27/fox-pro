import React, { useState } from 'react';
import link_api from '../../ressources/link_api.js';
import personService from '../../services/person.service.js';
import projectService from '../../services/project.service.js';
import Modify from './modify.component.jsx';
import Comments from '../comments/getcomment.component.jsx';

/**
 * @Compoenent : Permet de consulter un projet en détail
 * Liste des employés : commentaires : tâches 
 */
const Detail_project = () => {
    const initValue = {idproject : "", name : "", description : "", startDate : "", endDate : "", status : "", lastname : "", firstname : "", foxproID : ""};
    const [project, setProject] = useState(initValue);
    const [loading, setLoading] = useState(true);
    const [apiErrors, setApiErrors] = useState(null);
    const [isDelete, setDelete] = useState(false);
    const [modify, setModify] = useState(false);

    const queryParams = new URLSearchParams(window.location.search);
    const idEnterprise = queryParams.get("id");
    const nameEnterprise = queryParams.get("name");
    const idProject = queryParams.get("idP");

    /**
     * Permet de récupérer les données du projet
     */
    const fetchData = () => { 
        fetch(link_api + 'project/' + idEnterprise + '/' + idProject, {
            method : 'GET',
            headers : { 'Content-Type': 'application/json', authorization : personService.getToken() }
        })
        .then((response) => {
            if(response.status === 200) { 
                response.json().then((data) => {

                    let dataSet = { 
                        idproject: data.PROJECT[0].IDPROJECT,
                        name : data.PROJECT[0].NAME_PROJECT,
                        description : data.PROJECT[0].DESCRIPTION_P,
                        startDate : data.PROJECT[0].START_DATE_P,
                        endDate: data.PROJECT[0].END_DATE_P,
                        status : data.PROJECT[0].STATUT,
                        firstname : data.PROJECT[0].FIRSTNAME_P, 
                        lastname : data.PROJECT[0].LASTNAME_P,
                        foxproID : data.PROJECT[0].ID_PERSON_
                    }

                    setProject(dataSet);
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

    /**
     * Permet de supprimer un projet via son id
     */
    const handleOnDelete = (idproject) => {
        fetch(link_api + 'Project/delete/' + idEnterprise + '/' + idproject, { 
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', authorization: personService.getToken()}
        })
        .then((response) => {
            if(response.status === 200) {
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

    const getOptions = () => {
        if(personService.getFoxproID() === project.foxproID){
            return (
                <div className=" d-flex mt-2"> 
                    <button onClick={() => {setModify(true)}} className="btn1 btn-dark">Modifier</button> 
                    {isDelete ? (
                        <button onClick={() => handleOnDelete(project.idproject)} className="btn1 btn-dark orange space">Confirmer</button> 
                    ) 
                    : 
                    (
                        <button onClick={() => setDelete(true)} className="btn1 btn-dark red space">Supprimer</button> 
                    )}
                </div>
            )    
        }
    }

    if(loading) {
        fetchData();
        return (
            <div className="col-md-12 text-center">   
                <div className="spinner-border text-warning" role="status"></div>
            </div>   
        )
    } else if(modify) {
        return(<div><Modify name={project.name} description={project.description} status={project.status} /></div>)
    } else { 
        return (
            <div className="col-md-12 text-center">
                {apiErrors ? (
                <div className="alert alert-danger" role="alert">
                    {apiErrors}
                </div>)
                : 
                (
                    <div>
                        <div>
                            <h1>{project.name} de {nameEnterprise}</h1>
                            <hr />
                        </div>

                        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                            <div className="d-flex flex-column justify-content-center align-items-center"> 
                                <h3 className="custom-h3">Crée par <b>{project.firstname} {project.lastname}</b></h3>
                                
                                <div className="custom-desc">
                                    <p>{project.description}</p>
                                </div>
                                

                                <div className="row align-items-center">
                                    <div className="box">Date de début : <b>{new Date(project.startDate).toLocaleDateString()}</b></div>
                                    <div className="box">Date de fin prévue : <b>{new Date(project.endDate).toLocaleDateString()}</b></div>
                                </div>

                                <div className="w-75 margin-top">
                                    {projectService.handleProjectStatus(project.status)}
                                </div>
                                {getOptions()}

                                <br />
                                <div>
                                    <h1>Commentaires</h1>
                                    <Comments />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Detail_project