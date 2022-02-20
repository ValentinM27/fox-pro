import React, { useState } from 'react';
import link_api from '../../../ressources/link_api';
import personService from '../../../services/person.service';
import Enterprise from '../enterprise.component'

/**
 * @Component : Permet de lister les entreprises auquelles appartient l'utilisateur
 */
const Enterprise_Emp = () => {
    const [loading, setLoading] = useState(true);
    const [enterprises, setEnterprises] = useState(null);
    const [apiErrors, setApiErrors] = useState(null);

    const fetchData = () => {
        fetch(link_api + 'enterprise/ispart' ,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json', authorization: personService.getToken()}
        })
        .then((response) => {
            if(response.status === 200){
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
    }

    if(loading) {
        fetchData();
        return (
            <div className="col-md-12 text-center">   
                <div className="spinner-border text-warning" role="status"></div>
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
                (<div>
                    {enterprises !== null && enterprises.map(enterprise => {
                        return (
                            <div key={enterprise.IDENTERPRISE}>
                                <Enterprise PERSON_ID_={enterprise.PERSON_ID_} IDENTERPRISE={enterprise.IDENTERPRISE} NAME_ENTERPRISE={enterprise.NAME_ENTERPRISE} DESCRIPTION_ENT={enterprise.DESCRIPTION_ENT}/>
                            </div>
                        )
                    })}
                </div>)}
            </div>
        )
    }
}

export default Enterprise_Emp