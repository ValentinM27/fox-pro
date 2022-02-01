import link_api from '../ressources/link_api';
import PersonService from './person.service'

/**
 * Classe gérant la relation avec les endpoint de enterprise de l'API
 */
class EnterpriseService {

    /**
     * Permet de récupérer les entreprise de l'utilisateur connecté
     */
    async getCurrentUserEnterprise() {
            fetch(link_api + 'enterprise/retrieve', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', authorization: PersonService.getToken() }
            })
            .then((response) => {
                console.log(response)
                if(response.status === 200) {
                    response.json().then((data) => {
                        return data.ENTERPRISES
                    })
                } else if (response.status === 404) {
                    response.json().then((data) => {
                        return data.MESSAGES
                    })
                }
            })
    }
}

export default new EnterpriseService();