import React, { Component } from 'react';
import PersonService from '../../services/person.service.js';
import ModifyProfil from './modify.component.jsx';
import link_api from '../../ressources/link_api.js';

import logo_profil from '../../images/profil_logo.jpg';

/**
 * @Component du profil de l'utilisateur
 */
export default class Profil extends Component {
    
    state = {
        modofication: false,
        loading: true,
        firstname: "",
        lastname: "",
        email: "",
        login: "",
        delete: false
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

    /**
     * Permet de supprimer le compte de l'utilisateur
     */
    handleOnDelete() {
        fetch(link_api + 'person/delete', { 
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', authorization: PersonService.getToken()}
          })
          .then((response) => {
            if(response.status === 200) {
              PersonService.logout();
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

    render() {
        if(!this.state.modification) {
            return (
                <div className="col-md-12 text-center">
                    {this.state.loading ? 
                    (<div className="spinner-border text-warning" role="status"></div>) 
                    :  
                    (<div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                        <div className="card p-4">
                            <div className=" image d-flex flex-column justify-content-center align-items-center"> 
                                <button className="btn btn-secondary"> 
                                    <img src={logo_profil} alt="Illustration profil" height="100" width="100" />
                                </button> 
                                
                                <div className="name mt-3"><h2>{this.state.firstname} {this.state.lastname}</h2></div>
    
                                <span>{this.state.email}</span>
    
                                <div className="d-flex flex-row justify-content-center align-items-center mt-3">        
                                    <div>Identifiant Fox'Pro : <h3>{this.state.login}</h3></div> 
                                </div>

                                <div className=" d-flex mt-2">  
                                    <button onClick={() => {this.setState({modification: true})}} className="btn1 btn-dark">Modifier</button> 

                                    {this.state.delete ? (
                                        <button onClick={() => this.handleOnDelete()} className="btn1 btn-dark orange space">Confirmer</button> 
                                    ) 
                                    : 
                                    (
                                        <button onClick={() => {this.setState({delete : true})}} className="btn1 btn-dark red space">Supprimer</button> 
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>  
            )
        } else {
            /** Add handle of profil modification */
            return (
                <ModifyProfil firstname={this.state.firstname} lastname={this.state.lastname}/>
            )
        }
    }
}
