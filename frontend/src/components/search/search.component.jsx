import React, { useState } from 'react';
import link_api from "../../ressources/link_api";
import personService from '../../services/person.service';
import Person from '../person/person.component';

/**
 * @Component : Permet d'eefectuer des recherches de personnes
 */
const Search = () => {
    const [loading, setLoading] = useState(true);
    const [persons, setPersons] = useState(null);
    const [apiErrors, setApiErrors] = useState(null);

    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("q");

    /**
     * Permet d'effectuer la recherche
     */
    const fetchData = () => {
        fetch(link_api + 'person/search/name/' + query,{
            method : 'GET',
            headers : { 'Content-type' : 'application/json', authorization : personService.getToken()}
        })
        .then((response) => {
            if(response.status === 200) {
                response.json().then((data) => {
                    setPersons(data.PERSONS);
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
                    Résultats de recherche pour <b>{query}</b>
                </div>
                )}

                {persons !== null && persons.map(person => {
                    return (
                        <div key={person.ID_PERSON_}>
                            <Person foxproID={person.ID_PERSON_} lastname={person.LASTNAME_P} firstname={person.FIRSTNAME_P} email={person.EMAIL}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Search