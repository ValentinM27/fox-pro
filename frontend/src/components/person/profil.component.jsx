import React, { Component } from 'react';
import PersonService from '../../services/person.service.js';

import logo_profil from '../../images/profil_logo.jpg';

/**
 * Component du profil de l'utilisateur
 */
export default class Profil extends Component {
    state = {
        loading: true,
        firstname: "",
        lastname: "",
        email: "",
        login: ""
        }

    async componentDidMount() {
        const user_data = await PersonService.getPersonData();

        if(user_data !== null){
            this.setState({
            loading: false,
            firstname: user_data[0].FIRSTNAME_P,
            lastname: user_data[0].LASTNAME_P,
            email: user_data[0].EMAIL,
            login: user_data[0].ID_PERSON_
            })
        } 
    }
    render() {
        return (
            <div className="col-md-12 text-center">
                {this.state.loading ? 
                (<div class="spinner-border text-warning" role="status"></div>) 
                :  
                (<div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                    <div className="card p-4">
                        <div className=" image d-flex flex-column justify-content-center align-items-center"> <button className="btn btn-secondary"> <img src={logo_profil} alt="Illustration profil" height="100" width="100" /></button> 
                        <span className="name mt-3">{this.state.firstname} {this.state.lastname}</span> <span>{this.state.email}</span>
                            <div className="d-flex flex-row justify-content-center align-items-center mt-3"> <span>Identifiant Fox'Pro : {this.state.login}</span> </div>
                            <div className=" d-flex mt-2"> <button className="btn1 btn-dark">Modifier</button> </div>
                        </div>
                    </div>
                </div>)}
            </div>  
        )
    }
}
