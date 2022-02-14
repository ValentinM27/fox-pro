import React, { useState } from 'react';
import link_api from '../../ressources/link_api';
import PersonService from '../../services/person.service';

/**
 * @Component Permet de consulter les détails d'une entreprise et d'accéder aux otions d'une entreprise
 */
const Detail_Enterprise = () => {
    const enterpriseDetail = {identerprise: "", name: "", description: "", lastname: "", firstname: ""};
    const [enteprise, setEnterprises] = useState(enterpriseDetail);
    const [loading, setLoading] = useState(true);
    const [apiErrors, setApiErrors] = useState(null);
    
    const queryParams = new URLSearchParams(window.location.search);
    const idEnterprise = queryParams.get("id");

    const fetchData = () => {
        fetch(link_api + 'enterprise/id/' + idEnterprise, {
            method: 'GET',
            headers: {  'Content-Type': 'application/json', authorization: PersonService.getToken() }
        })
        .then((response) => {
            if(response.status === 200) {
                response.json().then((data) => {

                    let dataSet = {
                        identerprise : data.ENTERPRISE[0].IDENTERPRISE,
                        name : data.ENTERPRISE[0].NAME_ENTERPRISE,
                        description : data.ENTERPRISE[0].DESCRIPTION_ENT,
                        lastname : data.ENTERPRISE[0].LASTNAME_P,
                        firstname : data.ENTERPRISE[0].FIRSTNAME_P
                    }  

                    console.log(dataSet)
                    
                    setEnterprises(dataSet);
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
                    <h1>{enteprise.name}</h1>
                </div>)}
            </div>
        )
    }
}

export default Detail_Enterprise;