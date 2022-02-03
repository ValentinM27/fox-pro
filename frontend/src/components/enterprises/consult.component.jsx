import React, { useState } from 'react';
import PersonService from '../../services/person.service'
import link_api from '../../ressources/link_api';
import { useNavigate } from 'react-router-dom';


/**
 * @component Permettant de consulter les entreprises de l'utilisateur
 */
const Consult_Enterprise = () => {
    const [loading, setLoading] = useState(true);
    const [enterprises, setEnterprises] = useState(null);
    const [apiErrors, setApiErrors] = useState(null);
    const navigate = useNavigate();

    const fetchData = async() => {
        fetch(link_api + 'enterprise/retrieve', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', authorization: PersonService.getToken() }
        })
        .then((response) => {
            if(response.status === 200) {
                response.json().then((data) => {
                    setEnterprises(data.ENTERPRISES);
                    setLoading(false);
                })
            } else {
                response.json().then((data) => {
                    setApiErrors(data.message);
                    setLoading(false);
                })
            }
        })
    };

    /**
     * Permet de se rendre à la page de consultation d'un projet
     */
    const GoToDetails = (id) => {
        navigate({
            pathname: '/enterprise/consult',
            search: `?id=` + id,
        });
    }

    if(loading){
        fetchData();
        return (
            <div className="col-md-12 text-center">   
                <div className="spinner-border text-warning" role="status"></div>
            </div>       
        )
    } else {
        return (
            <div>
                <div className="col-md-12 text-center"> 
                    {apiErrors ? (<div className="alert alert-danger" role="alert">
                        {apiErrors}
                    </div>)
                    : 
                    (
                    <div className="alert alert-success" role="alert">
                        Chargement réussi
                    </div>
                    )}

                    {enterprises !== null && enterprises.map(enterprise => {
                        return (
                        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center" key={enterprise.IDENTERPRISE}>
                            <div className="card p-4">
                                <div className=" image d-flex flex-column justify-content-center align-items-center"> 
                                    <span className="name mt-3">Identifiant Fox'Pro : {enterprise.IDENTERPRISE}</span>

                                    <span>Nom entreprise : {enterprise.NAME_ENTERPRISE}</span> 

                                    <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
                                        <span>Description : {enterprise.DESCRIPTION_ENT}</span> </div>
                                    <div className=" d-flex mt-2"> <button onClick={() => GoToDetails(enterprise.IDENTERPRISE)} className="btn1 btn-dark">Consulter</button> </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>   
        )
    }
    
}

export default Consult_Enterprise;
