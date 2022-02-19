import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import link_api from '../../ressources/link_api';
import personService from '../../services/person.service';

/**
 * @Component : Permet d'afficher une entreprise dans la liste des entreprises
 */
const Enterprise = (props) => {
    const [isDelete, setDelete] = useState(false);

    const navigate = useNavigate();

    /**
     * Permet de se rendre à la page de consultation d'un projet
     */
    const GoToDetails = (id) => {
        navigate({
            pathname: '/enterprise/consult',
            search: `?id=` + id,
        });
    }

    /**
     * Permet de gérer la suppression d'une entreprise
     * @param {*} identerprise
     */
    const handleDelete = (identerprise) => { 
        fetch(link_api + 'enterprise/delete/' + identerprise , { 
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', authorization: personService.getToken()}
        })
        .then((response) => {
            if(response.status === 200) {
                window.location.reload(false);
            } else {
                if(response.status === 500) { 
                response.json().then((data) => {
                    alert(data.message);
                })
                }
            }
        });
    }

    return (
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
                <div className=" image d-flex flex-column justify-content-center align-items-center">
                    <h2>{props.NAME_ENTERPRISE}</h2>  
                    <h3 className="custom-h3 name mt-3">Identifiant Fox'Pro : {props.IDENTERPRISE}</h3>

                    <p>{props.DESCRIPTION_ENT}</p> 
                    
                    <div className=" d-flex mt-2"> 
                        <button onClick={() => GoToDetails(props.IDENTERPRISE)} className="btn1 btn-dark">Consulter</button> 

                        {!isDelete ? (
                            <button onClick={() => setDelete(true)} className="btn1 btn-dark red space">Supprimer</button> 
                        ) 
                        : 
                        (
                            <button onClick={() => handleDelete(props.IDENTERPRISE)} className="btn1 btn-dark orange space">Confirmer</button> 
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Enterprise