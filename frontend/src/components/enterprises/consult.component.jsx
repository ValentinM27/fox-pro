import React, { useState } from 'react';
import PersonService from '../../services/person.service'
import link_api from '../../ressources/link_api';
import Enterprise from './enterprise.component.jsx';


/**
 * @component Permettant de consulter les entreprises de l'utilisateur
 */
const Consult_Enterprise = () => {
    const [loading, setLoading] = useState(true);
    const [enterprises, setEnterprises] = useState(null);
    const [apiErrors, setApiErrors] = useState(null);

    const queryParams = new URLSearchParams(window.location.search);
    const foxproID = queryParams.get("foxproID");

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

    if(loading){
        fetchData();
        return (
            <div className="col-md-12 text-center">   
                <div className="spinner-border text-warning" role="status"/>
            </div>       
        )
    } else {
        return (
            <div className="col-md-12 text-center"> 
                {apiErrors ? (
                <div className="alert alert-danger" role="alert">
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
                        <div key={enterprise.IDENTERPRISE}>
                            <Enterprise ID_PERSON_={enterprise.ID_PERSON_} foxproID={foxproID} IDENTERPRISE={enterprise.IDENTERPRISE} NAME_ENTERPRISE={enterprise.NAME_ENTERPRISE} DESCRIPTION_ENT={enterprise.DESCRIPTION_ENT}/>
                        </div>
                    )
                })}
            </div> 
        )
    }
    
}

export default Consult_Enterprise;
