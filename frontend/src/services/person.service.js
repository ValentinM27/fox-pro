import link_api from '../ressources/link_api'

/**
 * Service permettant un accès aux fonctions de l'utilisateur (Lien API)
 */
class PersonService {

    /**
     * Permet de déconnecter l'utilisateur par la suppression de son token
     * @return true : si déconnexion effectuée
     */
    logout() {
        if(localStorage.getItem('token') !== null){
            localStorage.removeItem('token');
            return true; 
        } 
        else return false;
    }

    /**
     * Permet de savoir si l'utilisateur est connecté
     * @returns true : si utilisateur connecté
     */
    isAuthenticated() {
        return (localStorage.getItem('token') !== null);
    }

    /**
     * Permet de résupérer le token de l'utilisateur'
     * @returns string : token
     */
    getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Permet de récupérer les données de l'utilisateur connecté
     */
    getPersonData() {
        return new Promise((resolve, reject) => {
            fetch(link_api + 'person/data', {
                method: 'GET',
                headers :  {"Content-Type": "application/json", authorization: this.getToken() } ,
            }) 
            .then ((response) => {
                if(response.status === 200) {
                    response.json().then((data) => {
                        resolve(data.PERSON);
                    });
                }
                else { 
                    reject('Error on fetch');
                }
            })
        })
        
    }
}

export default new PersonService();