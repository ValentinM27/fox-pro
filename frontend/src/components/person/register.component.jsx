import { useState } from "react";
import link_api  from "../../ressources/link_api.js"

const Register = () => {

    /**
     * Object à envoyer dans le JSON
     */
    const [FIRSTNAME_P, setFirstname] = useState('');
    const [LASTNAME_P, setLastname] = useState('');
    const [EMAIL, setEmail] = useState('');
    const [PASSWORD_P, setPassword] = useState('');
    const [validatePASSWORD_P, setValidatePassword] = useState('');

    /**
     * Permet d'envoyer le contenu du formulaire à l'API
     * @param {*} e 
     */
    const handleOnSubmit = (e) => {
        e.preventDefault();

        const person = {FIRSTNAME_P, LASTNAME_P, EMAIL, PASSWORD_P, validatePASSWORD_P};

        console.log(link_api + 'person/register');
        
        fetch(link_api + 'person/register', {
            method: 'POST',
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify(person)
        }) 
        .then ((response) => {
            if(response.status === 200) {
                console.log("Done!");
                console.log(response);
            }
            else {
                console.log("Error");
                response.json().then((data) => {
                    console.log(data);
                });
            }
        })
    }
    
    return (
        <div ClassName="register">
            <h2>Création de votre compte Fox'Pro</h2>
            <form onSubmit={handleOnSubmit}>

                <label>Prénom</label>
                <input 
                    type="text" 
                    required value={FIRSTNAME_P} 
                    onChange={(e) => setFirstname(e.target.value)} 
                />

                <label>Nom</label>
                <input 
                    type="text"
                    required value={LASTNAME_P}
                    onChange={(e) => setLastname(e.target.value)}
                />

                <label>Email</label>
                <input 
                    type="email"
                    required value={EMAIL}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Mot de passe</label>
                <input 
                    type="password"
                    required value={PASSWORD_P}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>Valider mot de passe</label>
                <input 
                    type="password"
                    required value={validatePASSWORD_P}
                    onChange={(e) => setValidatePassword(e.target.value)}
                />

                <button>Créer un compte</button>
            </form>
        </div>
    )
}

export default Register;