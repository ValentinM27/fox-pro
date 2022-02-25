import React from 'react';
import { useNavigate } from 'react-router-dom';
import personService from '../services/person.service.js';

/**
 * @Component : Page d'accueil
 */
const Home = () => {
  const navigate = useNavigate();

  /**
   * Permet de se rendre à la page de connexion
   */
  const handleOnLogin = () => { 
    navigate('/login');
  }

  return (
    <div className="home">
        <table Style="min-height: 80vh" className="centered">
          <tbody>
            <tr>
              <td className="align-middle text-center">
                <span>Bienvenue sur Fox'Pro</span><br />
                <span>L'outil pour gérer vos entreprises !</span><br />

                {personService.isAuthenticated() ? (
                  <div>
                    Connecté en tant que <b>{personService.getFoxproID()}</b>
                  </div>
                ) 
                : 
                (
                  <div>
                    <button onClick={handleOnLogin} className="btn btn-dark margin-top orange">
                      Me connecter
                    </button>
                  </div>
                )}
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  )
}

export default Home;
