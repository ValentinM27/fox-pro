import React from 'react';
import { useNavigate } from 'react-router-dom';

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
              <td class="align-middle text-center">
                <span>Bienvenue sur Fox'Pro</span><br />
                <span>L'outil pour gérer vos entreprises !</span><br />
                <button onClick={handleOnLogin} className="btn btn-primary margin-top orange">
                  Me connecter
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  )
}

export default Home;
